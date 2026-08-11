import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import FormularioPersonal from "./components/FormularioPersonal";
import FormularioAcademico from "./components/FormularioAcademico";
import FormularioExperiencia from "./components/FormularioExperiencia";
import ResumenHojaVida from "./components/ResumenHojaVida";
import Footer from "./components/Footer";

function App() {
  // Controla qué paso se muestra actualmente
  const [pasoActual, setPasoActual] = useState("personal");

  // Objeto central con todos los datos de la hoja de vida
  const [datosHojaVida, setDatosHojaVida] = useState({
    // Información personal
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    perfilProfesional: "",

    // Información académica
    nivelFormacion: "",
    institucion: "",
    tituloObtenido: "",
    fechaInicioAcademico: "",
    fechaFinAcademico: "",
    promedio: "",

    // Experiencia laboral
    empresa: "",
    cargo: "",
    area: "",
    fechaIngreso: "",
    fechaRetiro: "",
    funciones: "",
    referenciaLaboral: "",
    certificadoLaboral: null,
  });

  return (
    <div className="app">
      <Header pasoActual={pasoActual} />

      {pasoActual === "personal" && (
        <FormularioPersonal
          datos={datosHojaVida}
          setDatos={setDatosHojaVida}
          onSiguiente={() => setPasoActual("academico")}
        />
      )}

      {pasoActual === "academico" && (
        <FormularioAcademico
          datos={datosHojaVida}
          setDatos={setDatosHojaVida}
          onVolver={() => setPasoActual("personal")}
          onSiguiente={() => setPasoActual("experiencia")}
        />
      )}

      {pasoActual === "experiencia" && (
        <FormularioExperiencia
          datos={datosHojaVida}
          setDatos={setDatosHojaVida}
          onVolver={() => setPasoActual("academico")}
          onSiguiente={() => setPasoActual("resumen")}
        />
      )}

      {pasoActual === "resumen" && (
        <ResumenHojaVida
          datos={datosHojaVida}
          onVolver={() => setPasoActual("experiencia")}
          onFinalizar={() => {
            alert("Hoja de vida registrada correctamente.");
            console.log(datosHojaVida);

          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;