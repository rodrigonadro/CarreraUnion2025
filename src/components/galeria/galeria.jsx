import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import Navbar from "../navbar/navbar";
import "./galeria.css";

export default function Galeria() {
    const [isMobile, setIsMobile] = useState(false);
    const [startMoveUp, setStartMoveUp] = useState(false);
    const [showMain, setShowMain] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);
    const imagenesArray = Array.from({ length: 4 }, (_, i) => `/images/${i + 1}.JPG`);
    const thumbs = Array.from({ length: 60 }, (_, i) => `/images/thumbs/${i + 1}.JPG`);
    const imagenes = Array.from({ length: 60 }, (_, i) => `/images/${i + 1}.JPG`);
    const [mostrarGaleriaCompleta, setMostrarGaleriaCompleta] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const imagenesPorPagina = 15;
    const indiceInicial = (paginaActual - 1) * imagenesPorPagina;
    const indiceFinal = indiceInicial + imagenesPorPagina;
    const imagenesPagina = imagenes.slice(indiceInicial, indiceFinal);
    const totalPaginas = Math.ceil(imagenes.length / imagenesPorPagina);
    const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);
    const mediaSeleccionado = indiceSeleccionado !== null ? imagenes[indiceSeleccionado] : null;
    const [miniCarouselIndex, setMiniCarouselIndex] = useState(0);

    const siguientePagina = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual((p) => p + 1);
        }
    };
    const anteriorPagina = () => {
        if (paginaActual > 1) {
            setPaginaActual((p) => p - 1);
        }
    };

    const imagenAnterior = () => {
        if (indiceSeleccionado === null) return; 
        setIndiceSeleccionado(prev =>
            prev > 0 ? prev - 1 : imagenes.length - 1
        );
    };

    const imagenSiguiente = () => {
        if (indiceSeleccionado === null) return; 
        setIndiceSeleccionado(prev =>
            prev < imagenes.length - 1 ? prev + 1 : 0
        );
    };

    useEffect(() => {
        if (!showMain) document.body.classList.add("intro-active");
        const t1 = setTimeout(() => setStartMoveUp(true), 2000);
        const t2 = setTimeout(() => setShowMain(true), 3500);
        const t3 = setTimeout(() => setShowNavbar(true), 3500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            document.body.classList.remove("intro-active");
        };
    }, []);

    useEffect(() => {
        if (showMain) document.body.classList.remove("intro-active");
    }, [showMain]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="ruta-container">
            <Navbar />

            {!mostrarGaleriaCompleta && (
                <div className="galeria-main-content">
                    <div className="galeria-header-section">
                        <div className="galeria-card">
                            <div className="fila-superior">
                                <div className="columna-video">
                                    <motion.video
                                        src="/src/assets/video/Video Carrera Union Web.mp4"
                                        controls
                                        autoPlay
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                {!isMobile && (
                                    <div className="columna-texto">
                                        <h1>¡Ver nuestra <br /> galería completa!</h1>
                                        <button
                                            className="carousel-btn-galeria"
                                            onClick={() => {
                                                setMostrarGaleriaCompleta(true);
                                                setPaginaActual(1);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="fila-inferior">
                                {isMobile ? (
                                    <div className="mini-carousel-container">
                                        <button
                                            className="carousel-btn-galeria left movil"
                                            onClick={() =>
                                                setMiniCarouselIndex(prev => (prev > 0 ? prev - 1 : imagenesArray.length - 2))
                                            }
                                        >
                                        </button>

                                        <div className="mini-carousel-view">
                                            {imagenesArray
                                                .slice(miniCarouselIndex, miniCarouselIndex + 2)
                                                .map((src, index) => (
                                                    <img
                                                        key={index}
                                                        src={src}
                                                        alt={`Imagen ${miniCarouselIndex + index + 1}`}
                                                        onClick={() => setIndiceSeleccionado(miniCarouselIndex + index)}
                                                    />
                                                ))}
                                        </div>

                                        <button
                                            className="carousel-btn-galeria right movil"
                                            onClick={() =>
                                                setMiniCarouselIndex(prev =>
                                                    prev < imagenesArray.length - 2 ? prev + 1 : 0
                                                )
                                            }
                                        >
                                        </button>
                                    </div>
                                ) : (
                                    <div className="imagenes-grid">
                                        {imagenesArray.map((src, index) => (
                                            <img
                                                key={index}
                                                src={src}
                                                alt={`Imagen ${index + 1}`}
                                                onClick={() => setIndiceSeleccionado(indiceInicial + index)}
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                )}
                                {isMobile && (
                                    <div className="">
                                        <button
                                            className="btn-galeria"
                                            onClick={() => {
                                                setMostrarGaleriaCompleta(true);
                                                setPaginaActual(1);
                                            }}
                                        >
                                            Ver galería
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mostrarGaleriaCompleta && (
                <div className="galeria-main-content galeria-completa">
                    <div className="galeria-header-section">
                        <div className="galeria-card">
                            <div className="fila-inferior">
                                <div className="imagenes-grid-section-completa">
                                    {imagenesPagina.map((src, index) => (
                                        <img
                                        key={index}
                                        src={thumbs[indiceInicial + index]} // Miniatura para mostrar
                                        alt={`Imagen ${indiceInicial + index + 1}`}
                                        onClick={() => setIndiceSeleccionado(indiceInicial + index)} // Usará imagen original al hacer clic
                                        loading="lazy"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="paginacion-container">
                                <button
                                    className="btn-galeria"
                                    onClick={anteriorPagina}
                                    disabled={paginaActual === 1}
                                >
                                    Página anterior
                                </button>
                                <span className="numero-pagina">
                                    {paginaActual}/{totalPaginas}
                                </span>
                                <button
                                    className="btn-galeria"
                                    onClick={siguientePagina}
                                    disabled={paginaActual === totalPaginas}
                                >
                                    Siguiente página
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {mediaSeleccionado && (
                    <motion.div
                        className="overlay-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="lightbox-icons">
                            <a href={mediaSeleccionado} download>
                                <Download size={28} />
                            </a>
                            <button className="btn-cerrar" onClick={() => setIndiceSeleccionado(null)}>
                                <X size={28} />
                            </button>
                        </div>

                        <motion.img
                            src={mediaSeleccionado}
                            alt="Ampliada"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="imagen-lightbox"
                        />

                        <div className="lightbox-controls">
                            <button className="carousel-btn-galeria left" onClick={imagenAnterior}></button>
                            <button className="carousel-btn-galeria right" onClick={imagenSiguiente}></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isMobile && (
                <div className="footer-sponsors-container-galeria">
                    <img
                        src="https://gruporfpqa.vteximg.com.br/arquivos/Patrocinadores_landing.png"
                        alt="Patrocinadores"
                        className="footer-sponsors"
                    />
                </div>
            )}

            {isMobile && (<div className="footer-sponsors-galeria">
                <a href="https://www.farmatodo.com.mx/aviso-de-privacidad">Aviso de privacidad</a>
            </div>)}
        </div>
    );
}