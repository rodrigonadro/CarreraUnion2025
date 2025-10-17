import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"  // 👈 Import necesario para rutas internas
import './navbar.css'

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <motion.header
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`navbar ${isMobile ? "navbar-mobile" : ""}`}
    >
      <div className="navbar-inner">

        {/* Logo sección izquierda */}
        <div className="navbar-left">
          {!isMobile && (
            <img
              src="https://gruporfpqa.vteximg.com.br/arquivos/farmaciaU_nav.png"
              alt="Farmacias Unión"
              className="logo-main"
            />
          )}
          {!isMobile && (
            <img
              src="https://gruporfpqa.vteximg.com.br/arquivos/marcas_nav.png"
              alt="Marcas"
              className="logo-sponsors"
            />
          )}
        </div>

        {/* Links de navegación */}
        <div className={`navbar-right ${isMobile ? "navbar-right-mobile" : ""}`}>
          {/* El icono de home SIEMPRE visible */}
          <a href="/" className="home-link">
            <img
              src="https://gruporfpqa.vteximg.com.br/arquivos/home_landing.png"
              alt="home"
              className="icon-home"
            />
          </a>

          {/* Links visibles siempre */}
          <nav className="nav-menu">
            <Link to="/convocatoria">Convocatoria</Link>
            <Link to="/ruta">Nuestras rutas</Link>
            <Link to="/galeria">Galeria</Link>                        
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
