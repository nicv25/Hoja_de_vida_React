function ResumenHojaVida({ datos, onVolver, onFinalizar }) {
  const confirmar = (e) => {
    e.preventDefault();
    onFinalizar();
  };

  // Convierte el archivo de la foto en una URL temporal para poder mostrarla
  const urlFoto = datos.foto ? URL.createObjectURL(datos.foto) : null;

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 4 de 4</span>
          <h2 className="formulario-titulo">Resumen de tu Hoja de Vida</h2>
          <p className="formulario-descripcion">
            Verifica que toda la información esté correcta antes de finalizar.
          </p>
        </div>

        <form className="formulario" onSubmit={confirmar}>
          <div className="resumen-bloque">
            <h3 className="resumen-titulo">Información Personal</h3>

            <div className="resumen-foto">
              {urlFoto ? (
                <img
                  src={urlFoto}
                  alt="Fotografía del aprendiz"
                  className="foto-preview"
                />
              ) : (
                <p className="texto-ayuda">No se adjuntó fotografía.</p>
              )}
            </div>

            <p><strong>Nombres:</strong> {datos.nombres}</p>
            <p><strong>Apellidos:</strong> {datos.apellidos}</p>
            <p><strong>Correo:</strong> {datos.correo}</p>
            <p><strong>Dirección:</strong> {datos.direccion}</p>
            <p><strong>Perfil profesional:</strong> {datos.perfilProfesional}</p>
          </div>

          <div className="linea-separadora"></div>

          <div className="resumen-bloque">
            <h3 className="resumen-titulo">Información Académica</h3>
            <p><strong>Nivel de formación:</strong> {datos.nivelFormacion}</p>
            <p><strong>Institución:</strong> {datos.institucion}</p>
            <p><strong>Título obtenido:</strong> {datos.tituloObtenido}</p>
            <p><strong>Fecha de inicio:</strong> {datos.fechaInicioAcademico}</p>
            <p><strong>Fecha de finalización:</strong> {datos.fechaFinAcademico}</p>
            <p><strong>Promedio:</strong> {datos.promedio}</p>

            <p><strong>Cursos realizados:</strong></p>
            {datos.cursos.length === 0 ? (
              <p className="texto-ayuda">No se registraron cursos.</p>
            ) : (
              <ul className="lista-cursos-resumen">
                {datos.cursos.map((curso, indice) => (
                  <li key={indice}>{curso}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="linea-separadora"></div>

          <div className="resumen-bloque">
            <h3 className="resumen-titulo">Experiencia Laboral</h3>
            <p><strong>Empresa:</strong> {datos.empresa}</p>
            <p><strong>Cargo:</strong> {datos.cargo}</p>
            <p><strong>Área:</strong> {datos.area}</p>
            <p><strong>Fecha de ingreso:</strong> {datos.fechaIngreso}</p>
            <p><strong>Fecha de retiro:</strong> {datos.fechaRetiro}</p>
            <p><strong>Funciones:</strong> {datos.funciones}</p>
            <p><strong>Referencia laboral:</strong> {datos.referenciaLaboral}</p>
            <p>
              <strong>Certificado laboral:</strong>{" "}
              {datos.certificadoLaboral
                ? datos.certificadoLaboral.name
                : "No adjuntado"}
            </p>
          </div>

          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver
            </button>

            <button type="submit">Finalizar registro</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ResumenHojaVida;