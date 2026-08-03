function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-texto">
        Sistema de Hoja de Vida · Registro de aprendices
      </p>

      <p className="footer-copy">
        © {anioActual} Servicio Nacional de Aprendizaje - SENA
      </p>
    </footer>
  );
}

export default Footer;