function Header({ pasoActual }) {
  const pasos = {
    personal: "Paso 1 de 4 · Información Personal",
    academico: "Paso 2 de 4 · Información Académica",
    experiencia: "Paso 3 de 4 · Experiencia",
    resumen: "Paso 4 de 4 · Resumen",
  };

  return (
    <header className="header">
      <div className="header-contenido">
        <div>
          <h1 className="header-titulo">Sistema de Hoja de Vida</h1>
        </div>

        <span className="header-paso">{pasos[pasoActual]}</span>
      </div>
    </header>
  );
}

export default Header;