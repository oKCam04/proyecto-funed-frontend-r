import { Route, BrowserRouter as Router, Routes } from 'react-router-dom' 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home'
import CursosPage from './pages/CursosPage'
import SobreNosotrosPage from './pages/SobreNosotrosPage'
import ContactoPage from './pages/ContactoPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>}/>    
            <Route path="/cursos" element={<CursosPage/>}/>    
            <Route path="/sobre-nosotros" element={<SobreNosotrosPage/>}/>    
            <Route path="/contacto" element={<ContactoPage/>}/>    
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
