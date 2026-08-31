import { useState } from "react";

function FormularioExperiencia({ datos, setDatos, onVolver, onSiguiente }) {
  // Listas seguras: si aún no existen en "datos", se usan arreglos vacíos.
  const experiencias = datos.experiencias || [];
  const habilidades = datos.habilidades || [];

  // Estado temporal para escribir una nueva experiencia.
  const [nuevaExperiencia, setNuevaExperiencia] = useState({
    empresa: "",
    cargo: "",
    area: "",
    fechaIngreso: "",
    fechaRetiro: "",
    funciones: "",
    referenciaLaboral: "",
    certificadoLaboral: null,
  });

  // Estado temporal para escribir una nueva habilidad.
  const [nuevaHabilidad, setNuevaHabilidad] = useState("");

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
    });
  };

  const eliminarExperiencia = (indice) => {
    setDatos({
      ...datos,
      experiencias: experiencias.filter((_, i) => i !== indice),
    });
  };

  const agregarHabilidad = () => {
    const habilidadLimpia = nuevaHabilidad.trim();

    if (!habilidadLimpia) {
      alert("Escribe una habilidad antes de agregarla.");
      return;
    }

    const habilidadRepetida = habilidades.some(
      (habilidad) =>
        habilidad.toLowerCase() === habilidadLimpia.toLowerCase()
    );

    if (habilidadRepetida) {
      alert("Esta habilidad ya fue agregada.");
      return;
    }

    setDatos({
      ...datos,
      habilidades: [...habilidades, habilidadLimpia],
    });

    setNuevaHabilidad("");
  };

  const eliminarHabilidad = (indice) => {
    setDatos({
      ...datos,
      habilidades: habilidades.filter((_, i) => i !== indice),
    });
  };

  const continuar = (e) => {
    e.preventDefault();
    onSiguiente();
  };

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 3 de 4</span>

          <h2 className="formulario-titulo">
            Experiencia y habilidades
          </h2>

          <p className="formulario-descripcion">
            Registra tu experiencia laboral y las habilidades que tienes.
          </p>
        </div>

        <form className="formulario" onSubmit={continuar}>
          <h3 className="subtitulo-formulario">
            Nueva experiencia laboral
          </h3>

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
              placeholder="Ejemplo: Desarrollo de software"
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
              rows="4"
              placeholder="Describe las funciones desempeñadas"
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
              placeholder="Nombre y teléfono"
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
              onChange={(e) =>
                setNuevaExperiencia({
                  ...nuevaExperiencia,
                  certificadoLaboral: e.target.files[0] || null,
                })
              }
            />

            <small className="texto-ayuda">
              Puedes adjuntar un certificado laboral si lo tienes.
            </small>
          </div>

          <div className="botones">
            <button
              type="button"
              className="boton-agregar"
              onClick={agregarExperiencia}
            >
              Agregar experiencia
            </button>
          </div>

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
                    <strong>Periodo:</strong>{" "}
                    {experiencia.fechaIngreso} a{" "}
                    {experiencia.fechaRetiro}
                  </p>

                  <p>
                    <strong>Funciones:</strong> {experiencia.funciones}
                  </p>

                  <p>
                    <strong>Referencia:</strong>{" "}
                    {experiencia.referenciaLaboral}
                  </p>

                  {experiencia.certificadoLaboral && (
                    <p className="texto-ayuda">
                      Archivo adjunto:{" "}
                      {experiencia.certificadoLaboral.name}
                    </p>
                  )}

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

          <hr className="linea-separadora" />

          <h3 className="subtitulo-formulario">Habilidades</h3>

          <div className="campo">
            <label>Agregar una habilidad</label>

            <div className="campo-cursos">
              <input
                type="text"
                placeholder="Ejemplo: React, MySQL o Trabajo en equipo"
                value={nuevaHabilidad}
                onChange={(e) => setNuevaHabilidad(e.target.value)}
              />

              <button
                type="button"
                className="boton-agregar"
                onClick={agregarHabilidad}
              >
                Agregar habilidad
              </button>
            </div>

            <small className="texto-ayuda">
              Registra habilidades técnicas o habilidades personales.
            </small>
          </div>

          {habilidades.length === 0 ? (
            <p className="texto-ayuda">
              No has agregado habilidades aún.
            </p>
          ) : (
            <ul className="lista-cursos">
              {habilidades.map((habilidad, indice) => (
                <li key={indice} className="item-curso">
                  <span>{habilidad}</span>

                  <button
                    type="button"
                    className="boton-eliminar"
                    onClick={() => eliminarHabilidad(indice)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver
            </button>

            <button type="submit">
              Ver resumen
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FormularioExperiencia;