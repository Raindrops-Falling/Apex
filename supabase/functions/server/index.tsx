import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";

const app = new Hono();

app.use('*', logger(console.log));
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

function getSupabaseUser(accessToken: string) {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );
}

// Health check
app.get("/make-server-0158a663/health", (c) => c.json({ status: "ok" }));

// ── Auth: upsert profile after OAuth sign-in ──────────────────────────────
// Called by the frontend after a successful Google OAuth session is confirmed.
// Creates or updates the public.profiles row for this user.
app.post("/make-server-0158a663/auth/upsert-profile", async (c) => {
  const accessToken = c.req.header("Authorization")?.split(" ")[1];
  if (!accessToken) return c.json({ error: "No access token" }, 401);

  const supabaseUser = getSupabaseUser(accessToken);
  const { data: { user }, error: userErr } = await supabaseUser.auth.getUser();
  if (userErr || !user) {
    console.log("upsert-profile: could not get user:", userErr);
    return c.json({ error: "Unauthorized" }, 401);
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from("profiles")
    .upsert({ id: user.id, email: user.email }, { onConflict: "id" });

  if (error) {
    console.log("upsert-profile error:", error);
    return c.json({ error: error.message }, 500);
  }

  return c.json({ success: true, userId: user.id });
});

// ── Notebooks ─────────────────────────────────────────────────────────────
app.get("/make-server-0158a663/notebooks", async (c) => {
  const accessToken = c.req.header("Authorization")?.split(" ")[1];
  if (!accessToken) return c.json({ error: "Unauthorized" }, 401);

  const supabaseUser = getSupabaseUser(accessToken);
  const { data: { user }, error: userErr } = await supabaseUser.auth.getUser();
  if (userErr || !user) return c.json({ error: "Unauthorized" }, 401);

  const { data, error } = await supabaseUser
    .from("notebooks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ notebooks: data });
});

// ── Concepts ──────────────────────────────────────────────────────────────
app.get("/make-server-0158a663/concepts/:notebookId", async (c) => {
  const accessToken = c.req.header("Authorization")?.split(" ")[1];
  if (!accessToken) return c.json({ error: "Unauthorized" }, 401);

  const supabaseUser = getSupabaseUser(accessToken);
  const { data: { user }, error: userErr } = await supabaseUser.auth.getUser();
  if (userErr || !user) return c.json({ error: "Unauthorized" }, 401);

  const notebookId = c.req.param("notebookId");
  const { data, error } = await supabaseUser
    .from("concepts")
    .select("*")
    .eq("notebook_id", notebookId)
    .eq("user_id", user.id);

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ concepts: data });
});

Deno.serve(app.fetch);
