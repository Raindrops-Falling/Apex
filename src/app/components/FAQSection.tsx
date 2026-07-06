import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { CurvedLines } from './CurvedLines';

const faqs = [
  { q: 'What is Apex?', a: 'Apex is an agentic study platform designed to manage scheduling and cognitive load for learners. It gives you an applied learning system at the click of a button — automatically building study plans, spacing your revisions, and adapting to how your brain retains information.' },
  { q: 'Who is Apex designed for?', a: "Apex is built for students at every level — from school and college through postgraduate and professional qualifications. Whether you're juggling multiple subjects or preparing for a single high-stakes exam, Apex adapts to your schedule and goals." },
  { q: 'How does cognitive load management work?', a: 'Apex tracks your study sessions and tests to measure how much mental effort each topic demands. It then schedules new material and reviews at the right moments — spacing harder content when your mind is fresh and lighter review when energy is lower.' },
  { q: 'What subjects and courses does Apex support?', a: 'Apex supports any subject you can study. Add your courses, upload syllabi or reading lists, and Apex builds a personalised schedule. Sciences, humanities, languages, professional qualifications, and bootcamp curricula all work out of the box.' },
  { q: 'How long does it take to get set up?', a: 'Most learners have their first study plan ready in under five minutes. Enter your courses and deadlines, and Apex generates a full semester schedule immediately. You are productive from day one.' },
  { q: 'Is my study data secure?', a: 'Yes. Apex is built with strong privacy principles — your notes, progress, and schedule are encrypted at rest and in transit. We never sell or share your data, and we never train our models on your personal study content.' },
];

export function FAQSection() {
  return (
    <section style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* top-left to bottom-right — distinct from adjacent sections */}
      <CurvedLines direction="tl-br" opacity={0.07} count={12} spacing={120} />

      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 relative z-10"
        style={{ borderTop: '1px solid rgba(28,40,20,0.1)' }}>

        <h2 className="mb-12 md:mb-14 text-center md:text-left"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 800, color: '#1a2010',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
          Frequently asked questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} style={{ borderColor: 'rgba(28,40,20,0.12)' }}>
              <AccordionTrigger className="hover:no-underline py-5 text-left"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: '#1a2010', lineHeight: 1.4 }}>
                {item.q}
              </AccordionTrigger>
              <AccordionContent
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(28,40,20,0.65)', lineHeight: 1.75, paddingBottom: 20 }}>
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
