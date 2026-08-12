import { useState } from "react";

function FormularioAcademico({ datos, setDatos, onVolver, onSiguiente }) {
  // Estado temporal para escribir un nuevo curso
  const [nuevoCurso, setNuevoCurso] = useState("");

  const continuar = (e) => {
    e.preventDefault();

    if (
      !datos.nivelFormacion ||
      !datos.institucion ||
      !datos.tituloObtenido ||
      !datos.fechaInicioAcademico ||
      !datos.fechaFinAcademico ||
      !datos.promedio
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    onSiguiente();
  };

  // Agrega el curso escrito al arreglo de cursos
  const agregarCurso = () => {
    if (nuevoCurso.trim() === "") {
      alert("Escribe el nombre del curso antes de agregarlo.");
      return;
    }

    setDatos({
      ...datos,
      cursos: [...datos.cursos, nuevoCurso],
    });

    setNuevoCurso("");
  };

  // Elimina un curso según su posición en el arreglo
  const eliminarCurso = (indice) => {
    setDatos({
      ...datos,
      cursos: datos.cursos.filter((_, i) => i !== indice),
    });
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
          <div className="campo">
            <label>Nivel de formación</label>
            <select
              value={datos.nivelFormacion}
              onChange={(e) =>
                setDatos({ ...datos, nivelFormacion: e.target.value })
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
          </div>

          <div className="campo">
            <label>Institución educativa</label>
            <input
              type="text"
              placeholder="Nombre de la institución"
              value={datos.institucion}
              onChange={(e) =>
                setDatos({ ...datos, institucion: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Título obtenido</label>
            <input
              type="text"
              placeholder="Ejemplo: Tecnólogo en ADSO"
              value={datos.tituloObtenido}
              onChange={(e) =>
                setDatos({ ...datos, tituloObtenido: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Fecha de inicio</label>
            <input
              type="date"
              value={datos.fechaInicioAcademico}
              onChange={(e) =>
                setDatos({ ...datos, fechaInicioAcademico: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Fecha de finalización</label>
            <input
              type="date"
              value={datos.fechaFinAcademico}
              onChange={(e) =>
                setDatos({ ...datos, fechaFinAcademico: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Promedio académico</label>
            <input
              type="number"
              step="0.1"
              placeholder="Ejemplo: 4.5"
              value={datos.promedio}
              onChange={(e) =>
                setDatos({ ...datos, promedio: e.target.value })
              }
            />
          </div>

          <div className="linea-separadora"></div>

          <div className="campo">
            <label>Cursos Realizados</label>

            <div className="agregar-curso">
              <input
                type="text"
                placeholder="Ejemplo: HTML y CSS"
                value={nuevoCurso}
                onChange={(e) => setNuevoCurso(e.target.value)}
              />

              <button type="button" onClick={agregarCurso}>
                + Agregar
              </button>
            </div>

            {datos.cursos.length === 0 ? (
              <p className="texto-ayuda">Aún no has agregado ningún curso.</p>
            ) : (
              <ul className="lista-cursos">
                {datos.cursos.map((curso, indice) => (
                  <li key={indice} className="item-curso">
                    <span>{curso}</span>
                    <button
                      type="button"
                      className="boton-eliminar"
                      onClick={() => eliminarCurso(indice)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver
            </button>

            <button type="submit">Continuar</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FormularioAcademico;