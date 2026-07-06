import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { UploadPage } from './pages/UploadPage';

export const router = createBrowserRouter([
  { path: '/',       Component: LandingPage },
  { path: '/login',  Component: LoginPage   },
  { path: '/upload', Component: UploadPage  },
]);
