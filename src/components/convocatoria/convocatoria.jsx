import Navbar from "../navbar/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import './convocatoria.css';

export default function Convocatoria() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Tomamos las TRES secciones como slides
  const slides = [
    {
      id: "bases",
      title: "Bases",
      content: (
        <div className="info-card">
          <div className="info-content">
            <p className="highlight">
              Fecha: 5 de Octubre de 2025.<br />
              Hora de salida: 06:00 am.
            </p>
            <p className="title">Inscripciones:</p>
            <p>
              Del 22 de agosto al 2 de octubre inscríbete aquí o en Farmacias Unión Tabasco.
            </p>
            <p className="title">Distancia:</p>
            <ul>
              <li>3 km. Recreativa Categoría única general</li>
              <li>5 km. Categoría única general</li>
              <li>10 km.</li>
                <li>Categoría Juvenil (14 a 18 años)</li>
                <li>Categoría Libre (19 a 39 años)</li>
                <li>Categoría Máster (40 a 49 años)</li>
                <li>Categoría Veterano (50 años en adelante)</li>
                <li>Categoría Capacidades Diferentes</li>
              </ul>
            <p className="title">Entrega de kits</p>
            <p>
              4 de Octubre, de 10:00 a 17:00 hrs.<br />
              En la explanada del parque Centenario de Beisbol.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "premios5k",
      title: "Premios",
      content: (
        <div className="info-card premios5k-mobile">
          <div className="info-content">
            <p className="highlight-5km">
              Distancia 5 km.<br />
            </p>
            <p className="sub-highlight-5km">
              5 primeros lugares absolutos femenil y varonil.
            </p>
            <div className="premios5k-grid">
              <div className="premio-box categoria">General</div>
              <div className="premio-box edad">14 años<br />en adelante</div>
              <div className="bonus-box-mob">
                <div className="bonus-title">Bono 1er. Tabasqueño</div>
                <div className="bonus-amount">$2,500.00</div>
              </div>
              <div className="premio-box premio-item"><span className="circle">1er</span>$4,500.00</div>
              <div className="premio-box premio-item"><span className="circle">2do</span>$2,500.00</div>
              <div className="premio-box premio-item"><span className="circle">3er</span>$1,500.00</div>
              <div className="premio-box premio-item"><span className="circle">4to</span>$1,000.00</div>
              <div className="premio-box premio-item"><span className="circle">5to</span>$500.00</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "premios10k",
      title: "Premios",
      content: (
        <div className="info-card">
          <div className="info-content">
            <p className="highlight">
              Distancia 10 km.<br />
              5 primeros lugares de cada categoría, ambas ramas.
            </p>
            <div className="premios-grid">
              <div className="premio-col">Juvenil</div>
              <div className="premio-col">14 a 18 años</div>
              <div className="premio-col"><span className="circle">1er</span>$6,000</div>

              <div className="premio-col">Libre</div>
              <div className="premio-col">19 a 39 años</div>
              <div className="premio-col"><span className="circle">2do</span>$4,000</div>

              <div className="premio-col">Máster</div>
              <div className="premio-col">40 a 49 años</div>
              <div className="premio-col"><span className="circle">3er</span>$2,000</div>

              <div className="premio-col">Veterano</div>
              <div className="premio-col">50 años<br />en adelante</div>
              <div className="premio-col"><span className="circle">4to</span>$1,500</div>

              <div className="premio-col">Discapacidad<br />Silla de ruedas</div>
              <div className="premio-col">14 años<br />en adelante</div>
              <div className="premio-col">$500.00</div>

              <div className="premio-col">Discapacidad<br />Ciegos y débiles<br />visuales</div>
              <div className="premio-col">14 años<br />en adelante</div>
              <div className="premio-col">$500.00</div>
            </div>
            <div className="bonus-box" style={{ color: "#FFFFFF" }}>Bono 1er. Tabasqueño<span >$3,000.00</span></div>
          </div>
        </div>
      )
    }
  ];

  const goNext = () => setCurrentIndex((i) => (i + 1) % slides.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
  return (
    <div className="convocatoria-page-container">
      <Navbar />
      {isMobile ? (<div>
        <div className="mobile-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentIndex].id}
              className="carousel-slide"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4 }}
            >
              <div className="card-title-mob">{slides[currentIndex].title}</div>
              {slides[currentIndex].content}
            </motion.div>
          </AnimatePresence>

          {currentIndex > 0 && (
            <button className="carousel-btn left" onClick={goPrev}></button>
          )}
          {currentIndex < slides.length - 1 && (
            <button className="carousel-btn right" onClick={goNext}></button>
          )}
        </div>
        <div className="inscribirme-container-mob">
          <a
            href="https://www.farmatodo.com.mx/registro-carrera"
            target="_blank"
            rel="noopener noreferrer"
            className="inscribirme-btn-mob"
          >
            Inscribirme
          </a>
        </div>
      </div>) : (<div>
        {/* Botón Inscribirme */}
        <div className="inscribirme-container">
          <a
            href="https://www.farmatodo.com.mx/registro-carrera"
            target="_blank"
            rel="noopener noreferrer"
            className="inscribirme-btn"
          >
            Inscribirme
          </a>
        </div>

        <div className="convocatoria-main-content">
          <div className="convocatoria-header-section">
            <div className="header-card">
              <h3>Bases</h3>
            </div>
            <div className="header-card header-card--highlight">
              <h3>Premios</h3>
            </div>
          </div>

          <div className="convocatoria-sections-container">
            {/* Sección Bases */}
            <div className="info-card">
              <div className="info-content">
                <p className="highlight-desk">
                  Fecha: 5 de Octubre de 2025.<br />
                  Hora de salida: 06:00 am.
                </p>

                <p className="title">Inscripciones:</p>
                <p>
                  Del 22 de agosto al 2 de octubre inscríbete aquí o en Farmacias Unión Tabasco.
                </p>

                <p className="title">Distancia:</p>
                <ul>
                  <li>3 km. Recreativa Categoría única general</li>
                  <li>5 km. Categoría única general</li>
                  <li>10 km.</li>
                    <li>Categoría Juvenil (14 a 18 años)</li>
                    <li>Categoría Libre (19 a 39 años)</li>
                    <li>Categoría Máster (40 a 49 años)</li>
                    <li>Categoría Veterano (50 años en adelante)</li>
                    <li>Categoría Capacidades Diferentes</li>
                </ul>

                <p className="title">Entrega de kits</p>
                <p>
                  4 de Octubre, de 10:00 a 17:00 hrs.<br />
                  En la explanada del parque Centenario de Beisbol.
                </p>
              </div>
            </div>

            {/* Premios 5k */}
            <div className="info-card">
              <div className="info-content">
                <p className="highlight-desk">
                  Distancia 5 km.<br />
                  5 primeros lugares absolutos femenil y varonil.
                </p>
                <div className="premios-grid">
                  <div className="premio-col">General</div>
                  <div className="premio-col">14 años<br />en adelante</div>
                  <div className="premio-col premios-list">
                    <div className="premio-item"><span className="circle">1er</span>$4,500.00</div>
                    <div className="premio-item"><span className="circle">2do</span>$2,500.00</div>
                    <div className="premio-item"><span className="circle">3er</span>$1,500.00</div>
                    <div className="premio-item"><span className="circle">4to</span>$1,000.00</div>
                    <div className="premio-item"><span className="circle">5to</span>$500.00</div>
                  </div>
                </div>
                <div className="bonus-box" style={{ color: "#FFFFFF" }}>Bono 1er. Tabasqueño <span >$2,500.00</span></div>
              </div>
            </div>

            {/* Premios 10k */}
            <div className="info-card">
              <div className="info-content">
                <p className="highlight-desk">
                  Distancia 10 km.<br />
                  5 primeros lugares de cada categoría, ambas ramas.
                </p>
                <div className="premios-grid">
                  <div className="premio-col">Juvenil</div>
                  <div className="premio-col">14 a 18 años</div>
                  <div className="premio-col"><span className="circle">1er</span>$6,000</div>

                  <div className="premio-col">Libre</div>
                  <div className="premio-col">19 a 39 años</div>
                  <div className="premio-col"><span className="circle">2do</span>$4,000</div>

                  <div className="premio-col">Máster</div>
                  <div className="premio-col">40 a 49 años</div>
                  <div className="premio-col"><span className="circle">3er</span>$2,000</div>

                  <div className="premio-col">Veterano</div>
                  <div className="premio-col">50 años<br />en adelante</div>
                  <div className="premio-col"><span className="circle">4to</span>$1,500</div>

                  <div className="premio-col">Discapacidad<br />Silla de ruedas</div>
                  <div className="premio-col">14 años<br />en adelante</div>
                  <div className="premio-col">$500.00</div>

                  <div className="premio-col">Discapacidad<br />Ciegos y débiles<br />visuales</div>
                  <div className="premio-col">14 años<br />en adelante</div>
                  <div className="premio-col">$500.00</div>
                </div>
                <div className="bonus-box" style={{ color: "#FFFFFF" }}>Bono 1er. Tabasqueño <span >$2,500.00</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>)}

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
