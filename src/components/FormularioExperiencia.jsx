import { useState } from "react";

function FormularioExperiencia({ datos, setDatos, onVolver, onSiguiente }) {
  // Lista segura: si aún no existe en "datos", se usa un arreglo vacío.
  const experiencias = datos.experiencias || [];

  // Estado temporal para escribir una nueva experiencia.
  // IMPORTANTE: cada experiencia nace con su propia lista de habilidades.
  const [nuevaExperiencia, setNuevaExperiencia] = useState({
    empresa: "",
    cargo: "",
    area: "",
    fechaIngreso: "",
    fechaRetiro: "",
    funciones: "",
    referenciaLaboral: "",
    certificadoLaboral: null,
    habilidades: [],
  });

  // Estado temporal para escribir la habilidad de la experiencia que se está creando.
  const [nuevaHabilidad, setNuevaHabilidad] = useState("");

  // Agrega la habilidad a la experiencia NUEVA (la que se está diligenciando).
  const agregarHabilidad = () => {
    const habilidadLimpia = nuevaHabilidad.trim();

    if (!habilidadLimpia) {
      alert("Escribe una habilidad antes de agregarla.");
      return;
    }

    const habilidadRepetida = nuevaExperiencia.habilidades.some(
      (habilidad) =>
        habilidad.toLowerCase() === habilidadLimpia.toLowerCase()
    );

    if (habilidadRepetida) {
      alert("Esta habilidad ya fue agregada a esta experiencia.");
      return;
    }

    setNuevaExperiencia({
      ...nuevaExperiencia,
      habilidades: [...nuevaExperiencia.habilidades, habilidadLimpia],
    });

    setNuevaHabilidad("");
  };

  // Quita una habilidad de la experiencia NUEVA (antes de guardarla).
  const quitarHabilidadNuevaExperiencia = (indiceHabilidad) => {
    setNuevaExperiencia({
      ...nuevaExperiencia,
      habilidades: nuevaExperiencia.habilidades.filter(
        (_, indice) => indice !== indiceHabilidad
      ),
    });
  };

  const agregarExperiencia = () => {
    const experienciaCompleta =
      nuevaExperiencia.empresa.trim() &&
      nuevaExperiencia.cargo.trim() &&
      nuevaExperiencia.area.trim() &&
      nuevaExperiencia.fechaIngreso &&
      nuevaExperiencia.fechaRetiro &&
      nuevaExperiencia.funciones.trim() &&
      nuevaExperiencia.referenciaLaboral.trim();

    if (!experienciaCompleta) {
      alert("Completa todos los campos de la experiencia antes de agregarla.");
      return;
    }

    setDatos({
      ...datos,
      experiencias: [...experiencias, nuevaExperiencia],
    });

    setNuevaExperiencia({
      empresa: "",
      cargo: "",
      area: "",
      fechaIngreso: "",
      fechaRetiro: "",
      funciones: "",
      referenciaLaboral: "",
      certificadoLaboral: null,
      habilidades: [],
    });
    setNuevaHabilidad("");
  };

  const eliminarExperiencia = (indice) => {
    setDatos({
      ...datos,
      experiencias: experiencias.filter((_, i) => i !== indice),
    });
  };

  // Quita una habilidad de una experiencia YA guardada en la lista.
  const eliminarHabilidadDeExperiencia = (indiceExperiencia, indiceHabilidad) => {
    setDatos({
      ...datos,
      experiencias: experiencias.map((experiencia, indice) => {
        if (indice !== indiceExperiencia) return experiencia;

        return {
          ...experiencia,
          habilidades: experiencia.habilidades.filter(
            (_, i) => i !== indiceHabilidad
          ),
        };
      }),
    });
  };

  const continuar = (e) => {
    e.preventDefault();

    // Advertencia cuando el usuario dejó algo escrito sin agregar.
    const hayTextoSinAgregar =
      nuevaHabilidad.trim().length > 0 ||
      nuevaExperiencia.empresa.trim() ||
      nuevaExperiencia.cargo.trim() ||
      nuevaExperiencia.area.trim() ||
      nuevaExperiencia.fechaIngreso ||
      nuevaExperiencia.fechaRetiro ||
      nuevaExperiencia.funciones.trim() ||
      nuevaExperiencia.referenciaLaboral.trim();

    if (hayTextoSinAgregar) {
      const respuesta = window.confirm(
        "Tienes una experiencia o habilidad sin agregar. ¿Deseas continuar de todos modos?"
      );
      if (!respuesta) return;
    }

    onSiguiente();
  };

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 3 de 4</span>
          <h2 className="formulario-titulo">Experiencia y habilidades</h2>
          <p className="formulario-descripcion">
            Registra tu experiencia laboral y, dentro de cada experiencia, las
            habilidades que aplicaste.
          </p>
        </div>

        <form className="formulario" onSubmit={continuar}>
          <h3 className="subtitulo-formulario">Nueva experiencia laboral</h3>

          <div className="campo">
            <label>Empresa</label>
            <input
              type="text"
              placeholder="Nombre de la empresa"
              value={nuevaExperiencia.empresa}
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  empresa: e.target.value,
                })
              }
            />
          </div>

          <div className="campo">
            <label>Cargo desempeñado</label>
            <input
              type="text"
              placeholder="Ejemplo: Desarrollador Junior"
              value={nuevaExperiencia.cargo}
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  cargo: e.target.value,
                })
              }
            />
          </div>

          <div className="campo">
            <label>Área</label>
            <input
              type="text"
              placeholder="Ejemplo: Gestión administrativa"
              value={nuevaExperiencia.area}
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  area: e.target.value,
                })
              }
            />
          </div>

          <div className="campo">
            <label>Fecha de ingreso</label>
            <input
              type="date"
              value={nuevaExperiencia.fechaIngreso}
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  fechaIngreso: e.target.value,
                })
              }
            />
          </div>

          <div className="campo">
            <label>Fecha de retiro</label>
            <input
              type="date"
              value={nuevaExperiencia.fechaRetiro}
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  fechaRetiro: e.target.value,
                })
              }
            />
          </div>

          <div className="campo">
            <label>Funciones realizadas</label>
            <textarea
              placeholder="Describe las principales funciones del cargo"
              value={nuevaExperiencia.funciones}
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  funciones: e.target.value,
                })
              }
            />
          </div>

          <div className="campo">
            <label>Referencia laboral</label>
            <input
              type="text"
              placeholder="Nombre y teléfono de la referencia"
              value={nuevaExperiencia.referenciaLaboral}
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  referenciaLaboral: e.target.value,
                })
              }
            />
          </div>

          <div className="campo">
            <label>Adjuntar certificado laboral</label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  certificadoLaboral: e.target.files[0] || null,
                })
              }
            />
            <p className="texto-ayuda">
              Puedes adjuntar un certificado laboral si lo tienes.
            </p>
          </div>

          {/* Las habilidades ahora pertenecen a esta experiencia específica */}
          <div className="campo">
            <label>Habilidades de esta experiencia</label>
            <div className="campo-cursos">
              <input
                type="text"
                placeholder="Ejemplo: Trabajo en equipo"
                value={nuevaHabilidad}
                onChange={(e) => setNuevaHabilidad(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    agregarHabilidad();
                  }
                }}
              />
              <button
                type="button"
                className="boton-agregar"
                onClick={agregarHabilidad}
              >
                Agregar
              </button>
            </div>
            <p className="texto-ayuda">
              Estas habilidades quedarán asociadas únicamente a esta
              experiencia.
            </p>

            {nuevaExperiencia.habilidades.length > 0 && (
              <ul className="lista-cursos">
                {nuevaExperiencia.habilidades.map((habilidad, indice) => (
                  <li key={indice} className="item-curso">
                    <span>{habilidad}</span>
                    <button
                      type="button"
                      className="boton-eliminar"
                      onClick={() => quitarHabilidadNuevaExperiencia(indice)}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className="boton-agregar"
            onClick={agregarExperiencia}
          >
            Agregar experiencia
          </button>

          {experiencias.length === 0 ? (
            <p className="texto-ayuda">
              No has agregado experiencias laborales aún.
            </p>
          ) : (
            <div className="lista-experiencias">
              {experiencias.map((experiencia, indice) => (
                <div key={indice} className="experiencia-card">
                  <h4>
                    {experiencia.empresa} — {experiencia.cargo}
                  </h4>
                  <p>
                    <strong>Área:</strong> {experiencia.area}
                  </p>
                  <p>
                    <strong>Periodo:</strong> {experiencia.fechaIngreso} a{" "}
                    {experiencia.fechaRetiro}
                  </p>
                  <p>
                    <strong>Funciones:</strong> {experiencia.funciones}
                  </p>
                  <p>
                    <strong>Referencia:</strong> {experiencia.referenciaLaboral}
                  </p>
                  {experiencia.certificadoLaboral && (
                    <p>
                      <strong>Archivo adjunto:</strong>{" "}
                      {experiencia.certificadoLaboral.name}
                    </p>
                  )}

                  <div className="habilidades-experiencia">
                    <p>
                      <strong>Habilidades asociadas:</strong>
                    </p>
                    {experiencia.habilidades.length === 0 ? (
                      <p className="texto-ayuda">
                        Esta experiencia no tiene habilidades registradas.
                      </p>
                    ) : (
                      <ul className="lista-cursos">
                        {experiencia.habilidades.map(
                          (habilidad, indiceHabilidad) => (
                            <li key={indiceHabilidad} className="item-curso">
                              <span>{habilidad}</span>
                              <button
                                type="button"
                                className="boton-eliminar"
                                onClick={() =>
                                  eliminarHabilidadDeExperiencia(
                                    indice,
                                    indiceHabilidad
                                  )
                                }
                              >
                                Quitar
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>

                  <button
                    type="button"
                    className="boton-eliminar"
                    onClick={() => eliminarExperiencia(indice)}
                  >
                    Eliminar experiencia
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver
            </button>
            <button type="submit">Ver resumen</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FormularioExperiencia;