import { useState } from "react";

function FormularioPersonal({ datos, setDatos, onSiguiente }) {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    // Nombres
    if (!datos.nombres.trim()) {
      nuevosErrores.nombres = "Los nombres son obligatorios.";
    } else if (datos.nombres.trim().length < 2) {
      nuevosErrores.nombres = "Los nombres deben tener al menos 2 caracteres.";
    }

    // Apellidos
    if (!datos.apellidos.trim()) {
      nuevosErrores.apellidos = "Los apellidos son obligatorios.";
    } else if (datos.apellidos.trim().length < 2) {
      nuevosErrores.apellidos = "Los apellidos deben tener al menos 2 caracteres.";
    }

    // Correo (validación simple)
    if (!datos.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(datos.correo)) {
      nuevosErrores.correo = "Ingresa un correo electrónico válido.";
    }

    // Dirección
    if (!datos.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria.";
    } else if (datos.direccion.trim().length < 5) {
      nuevosErrores.direccion = "La dirección debe tener al menos 5 caracteres.";
    }

    // Perfil profesional
    if (!datos.perfilProfesional.trim()) {
      nuevosErrores.perfilProfesional = "El perfil profesional es obligatorio.";
    } else if (datos.perfilProfesional.trim().length < 2) {
      nuevosErrores.perfilProfesional = "Escribe al menos 30 caracteres en el perfil profesional.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const continuar = (e) => {
    e.preventDefault();
    if (!validarCampos()) return; // si hay errores, no avanzamos
    onSiguiente();
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
                setDatos({ ...datos, foto: e.target.files[0] || null })
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
            {errores.nombres && (
              <small className="texto-error">{errores.nombres}</small>
            )}
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
            {errores.apellidos && (
              <small className="texto-error">{errores.apellidos}</small>
            )}
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
            {errores.correo && (
              <small className="texto-error">{errores.correo}</small>
            )}
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
            {errores.direccion && (
              <small className="texto-error">{errores.direccion}</small>
            )}
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
            {errores.perfilProfesional && (
              <small className="texto-error">{errores.perfilProfesional}</small>
            )}
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