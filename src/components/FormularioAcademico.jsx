// FormularioAcademico.jsx
import { useState } from "react";

function FormularioAcademico({ datos, setDatos, onVolver, onSiguiente }) {
  const [nuevoCurso, setNuevoCurso] = useState("");
  const [nuevaFormacion, setNuevaFormacion] = useState({
    nivelFormacion: "",
    institucion: "",
    tituloObtenido: "",
    fechaInicioAcademico: "",
    fechaFinAcademico: "",
    promedio: "",
  });
  const [erroresFormacion, setErroresFormacion] = useState({});
  const [erroresGenerales, setErroresGenerales] = useState("");

  const agregarCurso = (e) => {
    e.preventDefault();
    const cursoLimpio = nuevoCurso.trim();

    if (!cursoLimpio) {
      alert("Escribe el nombre de un curso antes de agregarlo.");
      return;
    }

    setDatos({
      ...datos,
      cursos: [...datos.cursos, cursoLimpio],
    });

    setNuevoCurso("");
  };

  const eliminarCurso = (indice) => {
    setDatos({
      ...datos,
      cursos: datos.cursos.filter((_, i) => i !== indice),
    });
  };

  const validarFormacion = () => {
    const errores = {};

    if (!nuevaFormacion.nivelFormacion.trim()) {
      errores.nivelFormacion = "El nivel de formación es obligatorio.";
    }

    if (!nuevaFormacion.institucion.trim()) {
      errores.institucion = "La institución es obligatoria.";
    } else if (nuevaFormacion.institucion.trim().length < 3) {
      errores.institucion = "La institución debe tener al menos 3 caracteres.";
    }

    if (!nuevaFormacion.tituloObtenido.trim()) {
      errores.tituloObtenido = "El título obtenido es obligatorio.";
    }

    if (!nuevaFormacion.fechaInicioAcademico) {
      errores.fechaInicioAcademico = "La fecha de inicio es obligatoria.";
    }

    if (!nuevaFormacion.fechaFinAcademico) {
      errores.fechaFinAcademico = "La fecha de finalización es obligatoria.";
    }

    if (!nuevaFormacion.promedio) {
      errores.promedio = "El promedio es obligatorio.";
    } else {
      const valor = parseFloat(nuevaFormacion.promedio);
      if (isNaN(valor) || valor < 0 || valor > 5) {
        errores.promedio = "El promedio debe estar entre 0 y 5.";
      }
    }

    setErroresFormacion(errores);
    return Object.keys(errores).length === 0;
  };

  const agregarFormacionAcademica = (e) => {
    e.preventDefault();
    if (!validarFormacion()) return;

    setDatos({
      ...datos,
      formacionesAcademicas: [
        ...datos.formacionesAcademicas,
        { ...nuevaFormacion },
      ],
    });

    setNuevaFormacion({
      nivelFormacion: "",
      institucion: "",
      tituloObtenido: "",
      fechaInicioAcademico: "",
      fechaFinAcademico: "",
      promedio: "",
    });
    setErroresFormacion({});
  };

  const eliminarFormacion = (indice) => {
    setDatos({
      ...datos,
      formacionesAcademicas: datos.formacionesAcademicas.filter(
        (_, i) => i !== indice
      ),
    });
  };

  const continuar = (e) => {
    e.preventDefault();

    if (datos.formacionesAcademicas.length === 0) {
      setErroresGenerales("Debes agregar al menos una formación académica.");
      return;
    }

    setErroresGenerales("");
    onSiguiente();
  };

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 2 de 4</span>
          <h2 className="formulario-titulo">Información Académica</h2>
          <p className="formulario-descripcion">
            Cuéntanos sobre tu formación académica más reciente.
          </p>
        </div>

        <form className="formulario" onSubmit={continuar}>
          <h3 className="subtitulo-formulario">Nueva formación académica</h3>

          <div className="campo">
            <label>Nivel de formación</label>
            <select
              value={nuevaFormacion.nivelFormacion}
              onChange={(e) =>
                setNuevaFormacion({
                  ...nuevaFormacion,
                  nivelFormacion: e.target.value,
                })
              }
            >
              <option value="">Seleccione...</option>
              <option>Bachiller</option>
              <option>Técnico</option>
              <option>Tecnólogo</option>
              <option>Universitario</option>
              <option>Especialización</option>
              <option>Maestría</option>
              <option>Doctorado</option>
            </select>
            {erroresFormacion.nivelFormacion && (
              <small className="texto-error">
                {erroresFormacion.nivelFormacion}
              </small>
            )}
          </div>

          <div className="campo">
            <label>Institución educativa</label>
            <input
              type="text"
              placeholder="Nombre de la institución"
              value={nuevaFormacion.institucion}
              onChange={(e) =>
                setNuevaFormacion({
                  ...nuevaFormacion,
                  institucion: e.target.value,
                })
              }
            />
            {erroresFormacion.institucion && (
              <small className="texto-error">
                {erroresFormacion.institucion}
              </small>
            )}
          </div>

          <div className="campo">
            <label>Título obtenido</label>
            <input
              type="text"
              placeholder="Ejemplo: Tecnólogo en ADSO"
              value={nuevaFormacion.tituloObtenido}
              onChange={(e) =>
                setNuevaFormacion({
                  ...nuevaFormacion,
                  tituloObtenido: e.target.value,
                })
              }
            />
            {erroresFormacion.tituloObtenido && (
              <small className="texto-error">
                {erroresFormacion.tituloObtenido}
              </small>
            )}
          </div>

          <div className="campo">
            <label>Fecha de inicio</label>
            <input
              type="date"
              value={nuevaFormacion.fechaInicioAcademico}
              onChange={(e) =>
                setNuevaFormacion({
                  ...nuevaFormacion,
                  fechaInicioAcademico: e.target.value,
                })
              }
            />
            {erroresFormacion.fechaInicioAcademico && (
              <small className="texto-error">
                {erroresFormacion.fechaInicioAcademico}
              </small>
            )}
          </div>

          <div className="campo">
            <label>Fecha de finalización</label>
            <input
              type="date"
              value={nuevaFormacion.fechaFinAcademico}
              onChange={(e) =>
                setNuevaFormacion({
                  ...nuevaFormacion,
                  fechaFinAcademico: e.target.value,
                })
              }
            />
            {erroresFormacion.fechaFinAcademico && (
              <small className="texto-error">
                {erroresFormacion.fechaFinAcademico}
              </small>
            )}
          </div>

          <div className="campo">
            <label>Promedio académico</label>
            <input
              type="number"
              step="0.1"
              placeholder="Ejemplo: 4.5"
              value={nuevaFormacion.promedio}
              onChange={(e) =>
                setNuevaFormacion({
                  ...nuevaFormacion,
                  promedio: e.target.value,
                })
              }
            />
            {erroresFormacion.promedio && (
              <small className="texto-error">{erroresFormacion.promedio}</small>
            )}
          </div>

          {/* Cursos realizados (no anidar forms) */}
          <div className="campo">
            <label>Cursos realizados</label>

            <div className="campo-cursos">
              <input
                type="text"
                placeholder="Ejemplo: Desarrollo Web con React"
                value={nuevoCurso}
                onChange={(e) => setNuevoCurso(e.target.value)}
              />
              <button
                type="button"
                onClick={agregarCurso}
                className="boton-agregar"
              >
                Agregar
              </button>
            </div>

            {datos.cursos.length === 0 ? (
              <p className="texto-ayuda">No has agregado cursos aún.</p>
            ) : (
              <ul className="lista-cursos">
                {datos.cursos.map((curso, indice) => (
                  <li key={indice} className="item-curso">
                    <span>{curso}</span>
                    <button
                      type="button"
                      onClick={() => eliminarCurso(indice)}
                      className="boton-eliminar"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Lista de formaciones académicas */}
          {datos.formacionesAcademicas.length === 0 ? (
            <p className="texto-ayuda">
              No has agregado formaciones académicas aún.
            </p>
          ) : (
            <div className="lista-experiencias">
              {datos.formacionesAcademicas.map((formacion, indice) => (
                <div key={indice} className="experiencia-card">
                  <h4>
                    {formacion.institucion} — {formacion.tituloObtenido}
                  </h4>
                  <p>
                    <strong>Nivel:</strong> {formacion.nivelFormacion}
                  </p>
                  <p>
                    <strong>Periodo:</strong>{" "}
                    {formacion.fechaInicioAcademico} a{" "}
                    {formacion.fechaFinAcademico}
                  </p>
                  <p>
                    <strong>Promedio:</strong> {formacion.promedio}
                  </p>
                  <button
                    type="button"
                    onClick={() => eliminarFormacion(indice)}
                    className="boton-eliminar"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

          {erroresGenerales && (
            <small className="texto-error">{erroresGenerales}</small>
          )}

          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver
            </button>

            <button
              type="button"
              onClick={agregarFormacionAcademica}
            >
              Agregar formación
            </button>

            <button type="submit">
              Continuar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FormularioAcademico;