import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './pages/ThemeContext.jsx'
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Publishable Key:", clerkPubKey);
createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </ClerkProvider>
  
  </StrictMode>
)
