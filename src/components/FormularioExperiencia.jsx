import { useState } from "react";

function FormularioExperiencia({ datos, setDatos, onVolver, onSiguiente }) {
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

  const agregarExperiencia = (e) => {
    e.preventDefault();
    setDatos({
      ...datos,
      experiencias: [...datos.experiencias, nuevaExperiencia],
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
      experiencias: datos.experiencias.filter((_, i) => i !== indice),
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
          <span className="formulario-indicador">Paso 3 de 3</span>
          <h2 className="formulario-titulo">Experiencia</h2>
          <p className="formulario-descripcion">
            Registra tu experiencia laboral más reciente.
          </p>
        </div>

        <form className="formulario" onSubmit={continuar}>
          <h3 className="subtitulo-formulario">Nueva Experiencia Laboral</h3>

          <div className="campo">
            <label>Empresa</label>
            <input
              type="text"
              placeholder="Nombre de la empresa"
              value={nuevaExperiencia.empresa}
              onChange={(e) =>
                setNuevaExperiencia({ ...nuevaExperiencia, empresa: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Cargo desempeñado</label>
            <input
              type="text"
              placeholder="Cargo"
              value={nuevaExperiencia.cargo}
              onChange={(e) =>
                setNuevaExperiencia({ ...nuevaExperiencia, cargo: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Área</label>
            <input
              type="text"
              placeholder="Área de trabajo"
              value={nuevaExperiencia.area}
              onChange={(e) =>
                setNuevaExperiencia({ ...nuevaExperiencia, area: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Fecha de ingreso</label>
            <input
              type="date"
              value={nuevaExperiencia.fechaIngreso}
              onChange={(e) =>
                setNuevaExperiencia({ ...nuevaExperiencia, fechaIngreso: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Fecha de retiro</label>
            <input
              type="date"
              value={nuevaExperiencia.fechaRetiro}
              onChange={(e) =>
                setNuevaExperiencia({ ...nuevaExperiencia, fechaRetiro: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Funciones realizadas</label>
            <textarea
              rows="4"
              placeholder="Describa las funciones desempeñadas"
              value={nuevaExperiencia.funciones}
              onChange={(e) =>
                setNuevaExperiencia({ ...nuevaExperiencia, funciones: e.target.value })
              }
            ></textarea>
          </div>

          <div className="campo">
            <label>Referencia laboral</label>
            <input
              type="text"
              placeholder="Nombre y teléfono"
              value={nuevaExperiencia.referenciaLaboral}
              onChange={(e) =>
                setNuevaExperiencia({ ...nuevaExperiencia, referenciaLaboral: e.target.value })
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
                  certificadoLaboral: e.target.files[0],
                })
              }
            />
          </div>

          <div className="botones">
            <button type="submit" onClick={agregarExperiencia}>
              Agregar Experiencia
            </button>
          </div>

        {datos.experiencias.length === 0 ? (
          <p className="texto-ayuda">No has agregado experiencias aún.</p>
        ) : (
          <div className="lista-experiencias">
            {datos.experiencias.map((exp, indice) => (
              <div key={indice} className="experiencia-card">
                <h4>{exp.empresa} — {exp.cargo}</h4>
                <p><strong>Área:</strong> {exp.area}</p>
                <p><strong>Periodo:</strong> {exp.fechaIngreso} a {exp.fechaRetiro}</p>
                <p><strong>Funciones:</strong> {exp.funciones}</p>
                <p><strong>Referencia:</strong> {exp.referenciaLaboral}</p>
                {exp.certificadoLaboral && (
                  <p className="texto-ayuda">
                    Archivo adjunto: {exp.certificadoLaboral.name}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => eliminarExperiencia(indice)}
                  className="boton-eliminar"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="botones">
          <button type="button" onClick={onVolver}>
            Volver
          </button>

          <button type="submit" onClick={continuar}>
            Ver resumen
          </button>
        </div>
        </form>
      </section>
    </main>
  );
}

export default FormularioExperiencia;