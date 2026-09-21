import { useState } from "react";
import API_URL from "../api";

function ResumenHojaVida({ datos, onVolver }) {
  const [registrando, setRegistrando] = useState(false);

  // Función auxiliar que hace la petición POST y maneja errores.
  // Si el servidor responde con error, lanza una excepción con el mensaje que enseñó Flask.
  const enviarPost = async (ruta, datosCuerpo) => {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosCuerpo),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    // Mostramos el error interno que manda Flask para saber qué falló
    console.error("Respuesta completa del servidor:", resultado);
    throw new Error(
      resultado.error || resultado.mensaje || `Error al llamar a ${ruta}`
    );
  }

  return resultado;
};

  const finalizar = async () => {
    if (registrando) return;
    setRegistrando(true);

    try {
      // PASO 1: Registrar la información personal.
      const datosPersonales = {
        foto: datos.foto ? datos.foto.name : null,
        nombres: datos.nombres.trim(),
        apellidos: datos.apellidos.trim(),
        correo: datos.correo.trim(),
        direccion: datos.direccion.trim(),
        perfil_profesional: datos.perfilProfesional.trim(),
      };

      const respuestaPersonal = await enviarPost(
        "/api/registrohv",
        datosPersonales
      );
      const idHojaVida = respuestaPersonal.id;

      // PASO 2: Registrar las formaciones académicas.
      for (const formacion of datos.formacionesAcademicas) {
        await enviarPost(
          `/api/hojas-vida/${idHojaVida}/estudios_registrar`,
          {
            nivel_formacion: formacion.nivelFormacion,
            institucion: formacion.institucion,
            titulo_obtenido: formacion.tituloObtenido,
            fecha_inicio_academico: formacion.fechaInicioAcademico,
            fecha_fin_academico: formacion.fechaFinAcademico,
            promedio: parseFloat(formacion.promedio),
          }
        );
      }

      // PASO 3: Registrar los cursos (relación directa con la hoja de vida).
      for (const curso of datos.cursos) {
        await enviarPost(`/api/hojas-vida/${idHojaVida}/cursos_registrar`, {
          nombre_curso: curso,
        });
      }

      // PASO 4: Registrar las experiencias y, dentro de cada una, sus habilidades.
      for (const experiencia of datos.experiencias) {
        const respuestaExperiencia = await enviarPost(
          `/api/hojas-vida/${idHojaVida}/experiencias_registrar`,
          {
            empresa: experiencia.empresa,
            cargo: experiencia.cargo,
            area: experiencia.area,
            fecha_ingreso: experiencia.fechaIngreso,
            fecha_retiro: experiencia.fechaRetiro || null,
            funciones: experiencia.funciones,
            referencia_laboral: experiencia.referenciaLaboral,
            certificado_laboral: experiencia.certificadoLaboral
              ? experiencia.certificadoLaboral.name
              : null,
          }
        );

        const idExperiencia = respuestaExperiencia.id_experiencia;

        for (const habilidad of experiencia.habilidades) {
          await enviarPost(
            `/api/experiencias/${idExperiencia}/habilidades_registrar`,
            { nombre_habilidad: habilidad }
          );
        }
      }

      alert(
        `¡Hoja de vida registrada correctamente! Tu ID de hoja de vida es ${idHojaVida}.`
      );
    } catch (error) {
      console.error("Error en el registro completo:", error);

      if (error.message === "Failed to fetch") {
        alert(
          "No se pudo conectar con el servidor. Verifica que Flask esté corriendo en el puerto 5000."
        );
      } else {
        alert(`No se pudo completar el registro: ${error.message}`);
      }
    } finally {
      setRegistrando(false);
    }
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
          {/* Información personal */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Información personal</h3>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Fotografía</span>
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
              <span className="etiqueta-resumen">Nombre completo</span>
              <span className="valor-resumen">
                {nombres || apellidos
                  ? `${nombres} ${apellidos}`.trim()
                  : "Sin registrar"}
              </span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Correo electrónico</span>
              <span className="valor-resumen">
                {correo || "Sin registrar"}
              </span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Dirección</span>
              <span className="valor-resumen">
                {direccion || "Sin registrar"}
              </span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Perfil profesional</span>
              <span className="valor-resumen">
                {perfilProfesional || "Sin registrar"}
              </span>
            </div>
          </div>

          {/* Formación académica */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Formación académica</h3>

            {formacionesAcademicas && formacionesAcademicas.length > 0 ? (
              formacionesAcademicas.map((formacion, indice) => (
                <div key={indice} className="card-experiencia-resumen">
                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">
                      Nivel de formación
                    </span>
                    <span className="valor-resumen">
                      {formacion.nivelFormacion || "Sin especificar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Institución</span>
                    <span className="valor-resumen">
                      {formacion.institucion || "Sin especificar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Título obtenido</span>
                    <span className="valor-resumen">
                      {formacion.tituloObtenido || "Sin especificar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Periodo</span>
                    <span className="valor-resumen">
                      {formacion.fechaInicioAcademico || "Inicio?"} -{" "}
                      {formacion.fechaFinAcademico || "Fin?"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">
                      Promedio académico
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
              <span className="etiqueta-resumen">Cursos realizados</span>
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

          {/* Experiencia laboral (con sus habilidades dentro) */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Experiencia laboral</h3>

            {experiencias && experiencias.length > 0 ? (
              experiencias.map((experiencia, indice) => (
                <div key={indice} className="card-experiencia-resumen">
                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Empresa</span>
                    <span className="valor-resumen">
                      {experiencia.empresa || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Cargo</span>
                    <span className="valor-resumen">
                      {experiencia.cargo || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Área</span>
                    <span className="valor-resumen">
                      {experiencia.area || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Periodo</span>
                    <span className="valor-resumen">
                      {experiencia.fechaIngreso || "Ingreso?"} -{" "}
                      {experiencia.fechaRetiro || "Retiro?"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Funciones</span>
                    <span className="valor-resumen">
                      {experiencia.funciones || "Sin registrar"}
                    </span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Referencia</span>
                    <span className="valor-resumen">
                      {experiencia.referenciaLaboral || "Sin registrar"}
                    </span>
                  </div>

                  {experiencia.certificadoLaboral && (
                    <div className="fila-resumen">
                      <span className="etiqueta-resumen">
                        Certificado laboral
                      </span>
                      <span className="valor-resumen">
                        {experiencia.certificadoLaboral.name}
                      </span>
                    </div>
                  )}

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Habilidades</span>
                    <div className="valor-resumen">
                      {experiencia.habilidades &&
                      experiencia.habilidades.length > 0 ? (
                        <ul className="lista-cursos-resumen">
                          {experiencia.habilidades.map(
                            (habilidad, indiceHabilidad) => (
                              <li key={indiceHabilidad}>{habilidad}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        <span className="texto-ayuda">
                          Sin habilidades asociadas a esta experiencia.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="texto-ayuda">
                No has agregado experiencias laborales aún.
              </p>
            )}
          </div>

          <div className="botones">
            <button type="button" onClick={onVolver} disabled={registrando}>
              Volver y editar
            </button>
            <button
              type="submit"
              onClick={finalizar}
              className="boton-primario"
              disabled={registrando}
            >
              {registrando ? "Registrando..." : "Finalizar registro"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResumenHojaVida;