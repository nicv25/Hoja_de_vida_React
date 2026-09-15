function FormularioPersonal({ datos, setDatos, onSiguiente, guardarhv }) {
const continuar = async (e) => {
  e.preventDefault();

  switch (true) {
    case !datos.nombres:
      alert("Por favor, ingrese sus nombres.");
      return;
    case !datos.apellidos:
      alert("Por favor, ingrese sus apellidos.");
      return;
    case !datos.correo:
      alert("Por favor, ingrese su correo electrónico.");
      return;
    case !datos.correo.includes("@"):
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    case !datos.direccion:
      alert("Por favor, ingrese su dirección.");
      return;
    case !datos.perfilProfesional:
      alert("Por favor, escriba una breve descripción de su perfil profesional.");
      return;
    default: {
      const guardado = await guardarhv();
      if (guardado) onSiguiente();   // solo avanza si la API guardó bien
    }
  }
};

  return (
    <main className="contenedor-principal">
      <section className="formulario-card">
        <div className="formulario-encabezado">
          <span className="formulario-indicador">Paso 1 de 4</span>
          <h2 className="formulario-titulo">Información Personal</h2>
          <p className="formulario-descripcion">
            Registra tus datos básicos de contacto y presentación profesional.
          </p>
        </div>

        <form className="formulario" onSubmit={continuar}>
          <div className="campo">
            <label>Fotografía</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setDatos({ ...datos, foto: e.target.files[0] })
              }
            />
            <small className="texto-ayuda">
              Selecciona una imagen en formato JPG, JPEG o PNG.
            </small>
          </div>

          <div className="campo">
            <label>Nombres</label>
            <input
              type="text"
              placeholder="Ingrese sus nombres"
              value={datos.nombres}
              onChange={(e) =>
                setDatos({ ...datos, nombres: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Apellidos</label>
            <input
              type="text"
              placeholder="Ingrese sus apellidos"
              value={datos.apellidos}
              onChange={(e) =>
                setDatos({ ...datos, apellidos: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              value={datos.correo}
              onChange={(e) =>
                setDatos({ ...datos, correo: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Dirección</label>
            <input
              type="text"
              placeholder="Ingrese su dirección"
              value={datos.direccion}
              onChange={(e) =>
                setDatos({ ...datos, direccion: e.target.value })
              }
            />
          </div>

          <div className="campo">
            <label>Perfil Profesional</label>
            <textarea
              rows="5"
              placeholder="Escriba una breve descripción"
              value={datos.perfilProfesional}
              onChange={(e) =>
                setDatos({ ...datos, perfilProfesional: e.target.value })
              }
            ></textarea>
          </div>

          <div className="botones">
            <button type="submit">Continuar</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FormularioPersonal;