import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home'
import CursosPage from './pages/CursosPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import AdminDashboard from './Admin/pages/AdminDashboard'
import AdminCursos from './pages/AdminCursos'
import AdminCursoForm from './pages/AdminCursoForm'
import SobreNosotrosPage from './pages/SobreNosotrosPage'
import ContactoPage from './pages/ContactoPage'
import AdminDocente from './pages/AdminDocentes'
import AdminOfertaCursos from './pages/AdminOfertaCurso'
import EstudiantePage from './pages/EstudiantePage'
import EstudianteCursoDetallePage from './pages/EstudianteCursoDetalle'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/curso/:id" element={<CourseDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/verificar-email" element={<EmailVerificationPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/cursos" element={<AdminCursos />} /> {/*crud completo de cursos*/}
            <Route path='/admin/docentes' element={<AdminDocente/>}  /> {/* crud completo docentes*/}
            <Route path='/admin/oferta-cursos' element={<AdminOfertaCursos/>} /> {/* crud completo oferta*/}
            <Route path="/admin/cursos/nuevo" element={<AdminCursoForm />} />
            <Route path="/admin/cursos/editar/:id" element={<AdminCursoForm />} />
            <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
            <Route path="/contacto" element={<ContactoPage />} />

            {/*Estudiante*/}
            <Route path='/Estudiante' element={<EstudiantePage/>}  />
            <Route path='/Estudiante/curso/:id' element={<EstudianteCursoDetallePage/>}  />
            {/* routee*/}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
