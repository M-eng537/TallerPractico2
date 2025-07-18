document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formularioContacto");

  const campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    telefono: document.getElementById("telefono"),
    empresa: document.getElementById("empresa"),
    asunto: document.getElementById("asunto"),
    preferencia: document.getElementById("preferencia"),
    ubicacion: document.getElementById("ubicacion"),
    mensaje: document.getElementById("mensaje"),
  };

  const errores = {
    nombre: document.getElementById("error-nombre"),
    correo: document.getElementById("error-correo"),
    telefono: document.getElementById("error-telefono"),
    empresa: document.getElementById("error-empresa"),
    asunto: document.getElementById("error-asunto"),
    preferencia: document.getElementById("error-preferencia"),
    ubicacion: document.getElementById("error-ubicacion"),
    mensaje: document.getElementById("error-mensaje"),
  };

  const regex = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,40}$/,
    correo: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    telefono: /^\(?\+?593\)?\s?9\d{4}\s?\d{4}$/,
    empresa: /^[a-zA-Z0-9\s]{0,40}$/,
    mensaje: /^.{5,}$/,
  };

  const validarCampo = (campo, tipo) => {
    let valido = false;
    const valor = campo.value.trim();

    if (tipo === "select") {
      if (valor === "") {
        errores[campo.id].textContent = "Por favor, selecciona una opción.";
        mostrarError(campo);
      } else {
        ocultarError(campo);
        valido = true;
      }
    } else if (tipo === "texto") {
      if (valor === "") {
        errores[campo.id].textContent = "Este campo es obligatorio.";
        mostrarError(campo);
      } else if (campo.id in regex) {
        if (!regex[campo.id].test(valor)) {
          errores[campo.id].textContent = "Formato inválido.";
          mostrarError(campo);
        } else {
          ocultarError(campo);
          valido = true;
        }
      } else {
        ocultarError(campo);
        valido = true;
      }
    } else if (tipo === "telefono") {
      if (valor === "") {
        ocultarError(campo);
        valido = true;
      } else if (!regex.telefono.test(valor)) {
        errores[campo.id].textContent = "Formato inválido: (+593) 9 XXXX XXXX";
        mostrarError(campo);
      } else {
        ocultarError(campo);
        valido = true;
      }
    } else if (tipo === "mensaje") {
      if (valor === "") {
        errores[campo.id].textContent = "Este campo es obligatorio.";
        mostrarError(campo);
      } else if (!regex.mensaje.test(valor)) {
        errores[campo.id].textContent = "El mensaje debe tener al menos 5 caracteres.";
        mostrarError(campo);
      } else {
        ocultarError(campo);
        valido = true;
      }
    }
    return valido;
  };

  const mostrarError = (campo) => {
    campo.classList.add("error-campo");
    campo.classList.remove("exito-campo");
    errores[campo.id].classList.remove("oculto");
  };

  const ocultarError = (campo) => {
    campo.classList.remove("error-campo");
    campo.classList.add("exito-campo");
    errores[campo.id].classList.add("oculto");
  };

  Object.values(campos).forEach((campo) => {
    campo.addEventListener("input", () => {
      switch (campo.id) {
        case "nombre":
        case "correo":
        case "empresa":
          validarCampo(campo, "texto");
          break;
        case "telefono":
          validarCampo(campo, "telefono");
          break;
        case "asunto":
        case "preferencia":
          validarCampo(campo, "select");
          break;
        case "mensaje":
          validarCampo(campo, "mensaje");
          break;
        case "ubicacion":
          ocultarError(campo);
          break;
      }
    });
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreValido = validarCampo(campos.nombre, "texto");
    const correoValido = validarCampo(campos.correo, "texto");
    const telefonoValido = validarCampo(campos.telefono, "telefono");
    const empresaValida = validarCampo(campos.empresa, "texto");
    const asuntoValido = validarCampo(campos.asunto, "select");
    const preferenciaValida = validarCampo(campos.preferencia, "select");
    const mensajeValido = validarCampo(campos.mensaje, "mensaje");

    let ubicacionValida = true;
    if (campos.ubicacion.value.trim() !== "") {
      ubicacionValida = true;
      ocultarError(campos.ubicacion);
    } else {
      ocultarError(campos.ubicacion);
    }

    const formularioValido =
      nombreValido && correoValido && telefonoValido && empresaValida && asuntoValido && preferenciaValida && ubicacionValida && mensajeValido;

    if (formularioValido) {
      document.getElementById("contenedorMensajes").classList.remove("hidden");

      const fila = document.createElement("tr");
      const fecha = new Date().toLocaleString("es-EC");

      fila.innerHTML = `
      <td class="px-4 py-2 border">${campos.nombre.value}</td>
      <td class="px-4 py-2 border">${campos.correo.value}</td>
      <td class="px-4 py-2 border">${campos.telefono.value || "-"}</td>
      <td class="px-4 py-2 border">${campos.empresa.value || "-"}</td>
      <td class="px-4 py-2 border">${campos.asunto.value}</td>
      <td class="px-4 py-2 border">${campos.preferencia.value}</td>
      <td class="px-4 py-2 border">${campos.ubicacion.value || "-"}</td>
      <td class="px-4 py-2 border">${campos.mensaje.value}</td>
      <td class="px-4 py-2 border">${fecha}</td>
    `;

      document.getElementById("tablaMensajes").prepend(fila);

      formulario.reset();

      Object.values(campos).forEach((campo) => {
        campo.classList.remove("error-campo", "exito-campo");
      });

      Object.values(errores).forEach((error) => {
        error.classList.add("oculto");
        error.textContent = "";
      });

      alert("Formulario enviado correctamente. ¡Gracias por contactarnos!");
    }
  });
});
