import { useState } from "react";
import "./App.css";
import API_URL from "./api";
import Header from "./components/Header";
import FormularioPersonal from "./components/FormularioPersonal";
import FormularioAcademico from "./components/FormularioAcademico";
import FormularioExperiencia from "./components/FormularioExperiencia";
import ResumenHojaVida from "./components/ResumenHojaVida";
import Footer from "./components/Footer";

function App() {
  const [pasoActual, setPasoActual] = useState("personal");

  const [datosHojaVida, setDatosHojaVida] = useState({
    // Información personal
    foto: null,
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    perfilProfesional: "",

    // Información académica
    cursos: [],
    formacionesAcademicas: [],

    // Información laboral
    // Las habilidades ya no van aquí: viven dentro de cada objeto de "experiencias".
    experiencias: [],
  });

  // CONECTAR REACT CON FLASK — Información Personal
  const guardarhv = async () => {
    try {
      const datosapi = {
        foto: datosHojaVida.foto ? datosHojaVida.foto.name : null,
        nombres: datosHojaVida.nombres,
        apellidos: datosHojaVida.apellidos,
        correo: datosHojaVida.correo,
        direccion: datosHojaVida.direccion,
        perfil_profesional: datosHojaVida.perfilProfesional,
      };

      const respuesta = await fetch(`${API_URL}/api/registrohv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosapi),
      });

      if (!respuesta.ok) {
        const errorServidor = await respuesta.json();
        console.error("Error del servidor:", errorServidor);
        alert("No se pudo guardar: revisa los datos");
        return false; // avisamos que falló
      }

      const resultado = await respuesta.json();
      console.log("Hoja de vida registrada:", resultado);
      alert("¡Información personal guardada!");
      return true; // avisamos que salió bien
    } catch (error) {
      console.error("Error al conectar con Flask:", error);
      alert("No se pudo conectar con el servidor");
      return false;
    }
  };

  return (
    <div className="app">
      <Header pasoActual={pasoActual} />

      {pasoActual === "personal" && (
        <FormularioPersonal
          datos={datosHojaVida}
          setDatos={setDatosHojaVida}
          onSiguiente={() => setPasoActual("academico")}
          guardarhv={guardarhv}
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
        />
      )}

      <Footer />
    </div>
  );
}

export default App;