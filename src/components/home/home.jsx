import './home.css'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from '../navbar/navbar.jsx';

export default function Home() {
  const [startMoveUp, setStartMoveUp] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!showMain) document.body.classList.add("intro-active");
    const t1 = setTimeout(() => setStartMoveUp(true), 2000);
    const t2 = setTimeout(() => setShowMain(true), 3500);
    const t3 = setTimeout(() => setShowNavbar(true), 3500);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.body.classList.remove("intro-active");
    };
  }, []);

  useEffect(() => {
    if (showMain) document.body.classList.remove("intro-active");
  }, [showMain]);

  const raceInfo = {
    "3Km": { title: "Recreativa Categoría única general", price: "$200.00", url: "https://www.farmatodo.com.mx/caminata-3-km-v2/p" },
    "5Km": { title: "Categoría única general", price: "$270.00", url: "https://www.farmatodo.com.mx/carrera-5-km-v2/p" },
    "10Km": { title: "Todas las categorias", price: "$330.00", url: "https://www.farmatodo.com.mx/carrera-10-km-000800051332/p" }
  };

  return (
    <div className="app-container">

      {/* Navbar */}
      {showNavbar && <Navbar />}

      {/* Intro Animation */}
      {!showMain && (
        <div className="intro">
          <div className="intro-inner">
            <motion.img
              src={isMobile
                ? "https://gruporfpqa.vteximg.com.br/arquivos/union_mob_landing.png"
                : "https://gruporfpqa.vteximg.com.br/arquivos/farmacia-union.png"}
              alt="Farmacia Unión"
              initial={{ y: -200, opacity: 1 }}
              animate={!startMoveUp
                ? { y: [-200, 0, -45, 0, -18, 0] }
                : { y: -180, opacity: 0, scale: 0.85 }}
              transition={!startMoveUp
                ? { duration: 2, times: [0, 0.45, 0.7, 0.85, 0.95, 1], ease: "easeOut" }
                : { duration: 0.9, ease: "easeIn" }}
              className={`intro-logo ${isMobile ? "intro-logo--mobile" : "intro-logo--desktop"}`}
            />
            <motion.img
              src={isMobile
                ? "https://gruporfpqa.vteximg.com.br/arquivos/union2_mob_landing.png"
                : "https://gruporfpqa.vteximg.com.br/arquivos/footer_race.png"}
              alt="Footer grande (intro)"
              initial={{ opacity: 1, y: 0 }}
              animate={startMoveUp ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`intro-footer ${isMobile ? "intro-footer--mobile" : "intro-footer--desktop"}`}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <motion.main
        className="main"
        initial={{ opacity: 0 }}
        animate={showMain ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
      >
        {isMobile && (
          <motion.img
            src="https://gruporfpqa.vteximg.com.br/arquivos/farmaciaU_nav.png"
            initial={{ opacity: 0, y: 8 }}
            animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="main-logo-mobile-union"
          />)}
        <motion.img
          src="https://gruporfpqa.vteximg.com.br/arquivos/powerade.png"
          initial={{ opacity: 0, y: 8 }}
          animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className={`main-powerade ${isMobile ? "main-powerade--mobile" : "main-powerade--desktop"}`}
        />

        <div className="main-inner">
          {isMobile && (
            <motion.img
              src="https://gruporfpqa.vteximg.com.br/arquivos/carrera_mob2.png"
              alt="Carrera"
              initial={{ opacity: 0, y: 30 }}
              animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="main-logo_mobile-union"
            />)}
          {!isMobile && (
            <motion.img
              src="https://gruporfpqa.vteximg.com.br/arquivos/carrera_main.png"
              alt="Carrera"
              initial={{ opacity: 0, y: 30 }}
              animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="main-logo"
            />)}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="main-text"
          >
            <h3>EN UNIÓN <span className="highlight">EL DEPORTE</span> ES MEJOR</h3>
            <p>
              La emoción de correr juntos regresa este 5 de octubre con la 10ª
              edición de la Carrera Farmacias Unión. Vive un recorrido lleno de
              energía, salud y comunidad, donde cada paso es una celebración.
            </p>
          </motion.div>

          {/* Botones de distancia */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="race-section"
          >
            {!selectedDistance ? (
              <div className="race-buttons">
                {["3Km", "5Km", "10Km"].map(d => (
                  <button key={d} className="race-button" onClick={() => setSelectedDistance(d)}>
                    {d}
                  </button>
                ))}
              </div>
            ) : (
              <div className="race-info">
                <button className="race-info__back" onClick={() => setSelectedDistance(null)} title="Regresar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7v6h6"></path>
                    <path d="M21 17a8 8 0 0 0-8-8H3"></path>
                  </svg>
                </button>
                <p className="race-info__title">{raceInfo[selectedDistance].title}</p>
                <p className="race-info__price"><strong>Precio: {raceInfo[selectedDistance].price}</strong></p>
                <a className="race-info__cta" href={raceInfo[selectedDistance].url} target="_blank" rel="noreferrer">
                  Quiero correr esta carrera
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer className="footer" initial={{ opacity: 0, y: 10 }} animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.7, delay: 1 }}>
          <div className="footer-icons">
            <a href="https://www.instagram.com/farmatodo_mexico/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/people/Farmatodo/61577322527320/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
            </a>
          </div>
          <p>Farmatodo_Mexico</p>
          <a href="https://www.farmatodo.com.mx/aviso-de-privacidad">Aviso de privacidad</a>
          <img src="https://gruporfpqa.vteximg.com.br/arquivos/Patrocinadores_landing.png" alt="Patrocinadores grandes" className="footer-sponsors" />
        </motion.footer>

      </motion.main>
    </div>
  )
}
