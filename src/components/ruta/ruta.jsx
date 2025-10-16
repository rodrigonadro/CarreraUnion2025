import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../navbar/navbar";
import './ruta.css';

export default function Ruta() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    { src: "https://gruporfpqa.vteximg.com.br/arquivos/ruta-10k.png", label: "10Km" },
    { src: "https://gruporfpqa.vteximg.com.br/arquivos/ruta_5k.png", label: "5Km" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const goNext = () => setCurrentIndex((i) => (i + 1) % slides.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="ruta-container">
      <Navbar />

      {/* DESKTOP: Carrusel */}
      {!isMobile && (
        <div className="carousel">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={slides[currentIndex].src}
              src={slides[currentIndex].src}
              alt={`Ruta ${slides[currentIndex].label}`}
              className="carousel-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <motion.div
            key={slides[currentIndex].label}
            className="distance-badge"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {slides[currentIndex].label}
          </motion.div>

          {currentIndex === 0 ? (
            <button className="carousel-btn right" onClick={goNext}></button>
          ) : (
            <button className="carousel-btn left" onClick={goPrev}></button>
          )}
        </div>
      )}

      {/* MOBILE: Mostrar ambas imágenes apiladas */}
      {isMobile && (
        <div className="mobile-ruta">
          {slides.map((slide, idx) => (
            <div className="mobile-card" key={idx}>
              <img src={slide.src} alt={`Ruta ${slide.label}`} className="mobile-image" />
              <div className="distance-badge">{slide.label}</div>
            </div>
          ))}
        </div>
      )}

      <p className="ruta-text">
        Salida y meta: Explanada del Parque Centenario de Beisbol Cd. Deportiva.
      </p>

      <a
        href="https://www.farmatodo.com.mx/registro-carrera"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-inscribirme"
      >
        Inscribirme
      </a>

      {!isMobile && (<div className="footer-sponsors-container">
        <img
          src="https://gruporfpqa.vteximg.com.br/arquivos/Patrocinadores_landing.png"
          alt="Patrocinadores"
          className="footer-sponsors"
        />
      </div>)}

      {isMobile && (<div className="footer">
        <a href="https://www.farmatodo.com.mx/aviso-de-privacidad">Aviso de privacidad</a>
      </div>)}
    </div>
  );
}
