function ResumenHojaVida({ datos, onVolver }) {
  const finalizar = () => {
    alert("Hoja de vida registrada correctamente.");
    console.log("Datos completos de la hoja de vida:", datos);
    
    // Aquí enviarías los datos a tu API Flask
    // fetch("/api/hoja-vida", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(datos),
    // });
  };

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 4 de 4</span>
          <h2 className="formulario-titulo">Vista Previa</h2>
          <p className="formulario-descripcion">
            Revisa que toda la información sea correcta antes de finalizar.
          </p>
        </div>

        <div className="formulario">
          {/* Información Personal */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Información Personal</h3>
            
            <div className="fila-resumen">
              <span className="etiqueta-resumen">Nombres:</span>
              <span className="valor-resumen">{datos.nombres || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Apellidos:</span>
              <span className="valor-resumen">{datos.apellidos || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Correo electrónico:</span>
              <span className="valor-resumen">{datos.correo || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Dirección:</span>
              <span className="valor-resumen">{datos.direccion || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Perfil Profesional:</span>
              <span className="valor-resumen">{datos.perfilProfesional || "—"}</span>
            </div>
          </div>

          {/* Información Académica */}
          <div className="seccion-resumen">
            <h3 className="seccion-titulo-resumen">Información Académica</h3>
            
            <div className="fila-resumen">
              <span className="etiqueta-resumen">Nivel de formación:</span>
              <span className="valor-resumen">{datos.nivelFormacion || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Institución:</span>
              <span className="valor-resumen">{datos.institucion || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Título obtenido:</span>
              <span className="valor-resumen">{datos.tituloObtenido || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Fecha de inicio:</span>
              <span className="valor-resumen">{datos.fechaInicioAcademico || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Fecha de finalización:</span>
              <span className="valor-resumen">{datos.fechaFinAcademico || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Promedio académico:</span>
              <span className="valor-resumen">{datos.promedio || "—"}</span>
            </div>

            <div className="fila-resumen">
              <span className="etiqueta-resumen">Cursos realizados:</span>

            {datos.cursos && datos.cursos.length > 0 && (
              <div className="fila-resumen">
                <ul className="lista-cursos-resumen">
                  {datos.cursos.map((curso, indice) => (
                    <span className="valor-resumen"><li key={indice}>{curso}</li></span>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </div>

          {/* Experiencia Laboral */}
          {datos.experiencias && datos.experiencias.length > 0 && (
            <div className="seccion-resumen">
              <h3 className="seccion-titulo-resumen">Experiencia Laboral</h3>
              
              {datos.experiencias.map((exp, indice) => (
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
                    <span className="etiqueta-resumen">Fecha de ingreso:</span>
                    <span className="valor-resumen">{exp.fechaIngreso || "—"}</span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Fecha de retiro:</span>
                    <span className="valor-resumen">{exp.fechaRetiro || "—"}</span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Funciones:</span>
                    <span className="valor-resumen">{exp.funciones || "—"}</span>
                  </div>

                  <div className="fila-resumen">
                    <span className="etiqueta-resumen">Referencia:</span>
                    <span className="valor-resumen">{exp.referenciaLaboral || "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botones de acción */}
          <div className="botones">
            <button type="button" onClick={onVolver}>
              Volver y editar
            </button>

            <button type="button" onClick={finalizar}>
              Finalizar registro
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResumenHojaVida;