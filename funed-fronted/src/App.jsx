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
import AdminPagos from './Admin/pages/AdminPagos';
import AdminPagoDetalle from './Admin/pages/AdminPagoDetalle';
import EstudiantePage from './pages/EstudiantePage'
import EstudianteCursoDetallePage from './pages/EstudianteCursoDetalle'
import ProcesoPago from './pages/ProcesoPago';
import PerfilPage from './pages/PerfilPage'
import AdminModulos from './pages/AdminModulos'
import AdminModuloDocente from './pages/AdminModuloDocente'
import { RequireAuth, RequireRole } from './auth/RouteGuards'
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/NotFound'


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
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin" element={<RequireRole roles={["admin"]}><AdminDashboard /></RequireRole>} />
            <Route path="/admin/cursos" element={<RequireRole roles={["admin"]}><AdminCursos /></RequireRole>} /> {/*crud completo de cursos*/}
            <Route path='/admin/docentes' element={<RequireRole roles={["admin"]}><AdminDocente/></RequireRole>}  /> {/* crud completo docentes*/}
            <Route path='/admin/oferta-cursos' element={<RequireRole roles={["admin"]}><AdminOfertaCursos/></RequireRole>} /> {/* crud completo oferta*/}
            <Route path="/admin/pagos" element={<RequireRole roles={["admin"]}><AdminPagos /></RequireRole>} />
            <Route path="/admin/pagos/:id" element={<RequireRole roles={["admin"]}><AdminPagoDetalle /></RequireRole>} />
            <Route path="/admin/cursos/nuevo" element={<RequireRole roles={["admin"]}><AdminCursoForm /></RequireRole>} />
            <Route path="/admin/cursos/editar/:id" element={<RequireRole roles={["admin"]}><AdminCursoForm /></RequireRole>} />
            <Route path="/admin/modulos" element={<RequireRole roles={["admin"]}><AdminModulos /></RequireRole>} />
            <Route path="/admin/modulo-docente" element={<RequireRole roles={["admin"]}><AdminModuloDocente /></RequireRole>} />
            <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/pago/curso/:id" element={<RequireAuth><ProcesoPago/></RequireAuth>} />
            <Route path="/perfil" element={<RequireAuth><PerfilPage /></RequireAuth>} />

            {/*Estudiante*/}
            <Route path='/Estudiante' element={<RequireRole roles={["Estudiante"]}><EstudiantePage/></RequireRole>}  />
            <Route path='/Estudiante/curso/:id' element={<RequireRole roles={["Estudiante"]}><EstudianteCursoDetallePage/></RequireRole>}  />
            {/* routee*/}

            {/* 404 fallback */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
