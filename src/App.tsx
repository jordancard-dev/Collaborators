
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import AnimatedRoutes from './pages/AnimatedRoutes';

function App() {
  const siteName = import.meta.env.VITE_APP_TITLE || '';
  return (
    <main>
      <BrowserRouter>
        {siteName && <h1>{siteName}</h1>}
        <Navbar />
        <AnimatedRoutes />

      </BrowserRouter>
    </main>
  )
}

export default App
