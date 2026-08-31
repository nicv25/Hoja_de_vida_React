function ResumenHojaVida({ datos, onVolver }) {
  const finalizar = () => {
    alert("Hoja de vida registrada correctamente.");

    console.log("Datos completos de la hoja de vida:", datos);

    // Más adelante, aquí se realizará la solicitud POST hacia Flask.
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
    habilidades,
  } = datos;

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 4 de 4</span>

          <h2 className="formulario-titulo">
            Vista previa de hoja de vida
          </h2>

          <p className="formulario-descripcion">
            Revisa que toda la información sea correcta antes de finalizar.
          </p>
        </div>

        <div className="formulario">
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">
              Información personal
            </h3>

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
              <span className="etiqueta-resumen">
                Correo electrónico:
              </span>

              <span className="valor-resumen">
                {correo || "Sin registrar"}
              </span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Dirección:</span>

              <span className="valor-resumen">
                {direccion || "Sin registrar"}
              </span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">
                Perfil profesional:
              </span>

              <span className="valor-resumen">
                {perfilProfesional || "Sin registrar"}
              </span>
            </div>
          </div>

          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">
              Formación académica
            </h3>

            {formacionesAcademicas &&
            formacionesAcademicas.length > 0 ? (
              formacionesAcademicas.map((formacion, indice) => (
                <div key={indice} className="card-experiencia-resumen">
                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">
                      Nivel de formación:
                    </span>

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
                    <span className="etiqueta-resumen">
                      Título obtenido:
                    </span>

                    <span className="valor-resumen">
                      {formacion.tituloObtenido || "Sin especificar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Periodo:</span>

                    <span className="valor-resumen">
                      {formacion.fechaInicioAcademico || "¿Inicio?"} -{" "}
                      {formacion.fechaFinAcademico || "¿Fin?"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">
                      Promedio académico:
                    </span>

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
              <span className="etiqueta-resumen">
                Cursos realizados:
              </span>

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

          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">
              Experiencia laboral
            </h3>

            {experiencias && experiencias.length > 0 ? (
              experiencias.map((experiencia, indice) => (
                <div key={indice} className="card-experiencia-resumen">
                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Empresa:</span>

                    <span className="valor-resumen">
                      {experiencia.empresa || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Cargo:</span>

                    <span className="valor-resumen">
                      {experiencia.cargo || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Área:</span>

                    <span className="valor-resumen">
                      {experiencia.area || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Periodo:</span>

                    <span className="valor-resumen">
                      {experiencia.fechaIngreso || "¿Ingreso?"} -{" "}
                      {experiencia.fechaRetiro || "¿Retiro?"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Funciones:</span>

                    <span className="valor-resumen">
                      {experiencia.funciones || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Referencia:</span>

                    <span className="valor-resumen">
                      {experiencia.referenciaLaboral || "Sin registrar"}
                    </span>
                  </div>

                  {experiencia.certificadoLaboral && (
                    <div className="fila-resumen">
                      <span className="etiqueta-resumen">
                        Certificado laboral:
                      </span>

                      <span className="valor-resumen">
                        {experiencia.certificadoLaboral.name}
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

          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Habilidades</h3>

            {habilidades && habilidades.length > 0 ? (
              <ul className="lista-cursos-resumen">
                {habilidades.map((habilidad, indice) => (
                  <li key={indice}>{habilidad}</li>
                ))}
              </ul>
            ) : (
              <p className="texto-ayuda">
                No registraste habilidades.
              </p>
            )}
          </div>

          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver y editar
            </button>

            <button
              type="button"
              onClick={finalizar}
              className="boton-primario"
            >
              Finalizar registro
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResumenHojaVida;