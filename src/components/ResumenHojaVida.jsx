function ResumenHojaVida({ datos, onVolver }) {
  const finalizar = () => {
    alert("Hoja de vida registrada correctamente.");
    console.log("Datos completos de la hoja de vida:", datos);
    // Aquí luego podrás enviar los datos al backend o generar un PDF
  };

  const {
    foto,
    nombres,
    apellidos,
    correo,
    direccion,
    perfilProfesional,
    formacionesAcademicas,
    cursos,
    experiencias,
  } = datos;

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 4 de 4</span>
          <h2 className="formulario-titulo">Vista previa de hoja de vida</h2>
          <p className="formulario-descripcion">
            Revisa que toda la información sea correcta antes de finalizar.
          </p>
        </div>

        <div className="formulario">
          {/* Información Personal */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Información Personal</h3>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Fotografía:</span>
              <div className="valor-resumen">
                {foto ? (
                  <img
                    src={URL.createObjectURL(foto)}
                    alt="Fotografía de perfil"
                    style={{
                      maxWidth: "120px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span className="texto-ayuda">
                    No has cargado una fotografía.
                  </span>
                )}
              </div>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Nombre completo:</span>
              <span className="valor-resumen">
                {nombres || apellidos
                  ? `${nombres} ${apellidos}`.trim()
                  : "Sin registrar"}
              </span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Correo electrónico:</span>
              <span className="valor-resumen">{correo || "Sin registrar"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Dirección:</span>
              <span className="valor-resumen">{direccion || "Sin registrar"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Perfil profesional:</span>
              <span className="valor-resumen">
                {perfilProfesional || "Sin registrar"}
              </span>
            </div>
          </div>

          {/* Información Académica */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Formación Académica</h3>

            {formacionesAcademicas && formacionesAcademicas.length > 0 ? (
              formacionesAcademicas.map((formacion, indice) => (
                <div key={indice} className="card-experiencia-resumen">
                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Nivel de formación:</span>
                    <span className="valor-resumen">
                      {formacion.nivelFormacion || "Sin especificar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Institución:</span>
                    <span className="valor-resumen">
                      {formacion.institucion || "Sin especificar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Título obtenido:</span>
                    <span className="valor-resumen">
                      {formacion.tituloObtenido || "Sin especificar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Periodo:</span>
                    <span className="valor-resumen">
                      {(formacion.fechaInicioAcademico || "¿Inicio?") +
                        " - " +
                        (formacion.fechaFinAcademico || "¿Fin?")}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Promedio académico:</span>
                    <span className="valor-resumen">
                      {formacion.promedio || "Sin registrar"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="texto-ayuda">
                No has agregado formaciones académicas aún.
              </p>
            )}

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Cursos realizados:</span>
              <div className="valor-resumen">
                {cursos && cursos.length > 0 ? (
                  <ul className="lista-cursos-resumen">
                    {cursos.map((curso, indice) => (
                      <li key={indice}>{curso}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="texto-ayuda">
                    No registraste cursos adicionales.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Experiencia Laboral</h3>

            {experiencias && experiencias.length > 0 ? (
              experiencias.map((exp, indice) => (
                <div key={indice} className="card-experiencia-resumen">
                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Empresa:</span>
                    <span className="valor-resumen">{exp.empresa || "—"}</span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Cargo:</span>
                    <span className="valor-resumen">{exp.cargo || "—"}</span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Área:</span>
                    <span className="valor-resumen">{exp.area || "—"}</span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Periodo:</span>
                    <span className="valor-resumen">
                      {(exp.fechaIngreso || "¿Ingreso?") +
                        " - " +
                        (exp.fechaRetiro || "¿Retiro?")}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Funciones:</span>
                    <span className="valor-resumen">{exp.funciones || "—"}</span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Referencia:</span>
                    <span className="valor-resumen">
                      {exp.referenciaLaboral || "—"}
                    </span>
                  </div>

                  {exp.certificadoLaboral && (
                    <div className="fila-resumen">
                      <span className="etiqueta-resumen">Certificado:</span>
                      <span className="valor-resumen">
                        {exp.certificadoLaboral.name}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="texto-ayuda">
                No has agregado experiencias laborales aún.
              </p>
            )}
          </div>

          {/* Botones de acción */}
          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver y editar
            </button>

            <button type="button" onClick={finalizar} className="boton-primario">
              Finalizar registro
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResumenHojaVida;