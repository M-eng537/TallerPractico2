firebase.initializeApp({
  apiKey: "AIzaSyAA45qymDyQO6Xu80X7YvwNCtj99OOOlvk",
  authDomain: "changnex-page.firebaseapp.com",
  projectId: "changnex-page",
  storageBucket: "changnex-page.firebasestorage.app",
  messagingSenderId: "476046654790",
  appId: "1:476046654790:web:8b6f5378920ee385fe3947",
});

const db = firebase.firestore();

const modal = document.getElementById("modal-estatico");
const btnAbrir = document.getElementById("btn-mostrar-modal");
const btnCerrar = document.getElementById("btn-cerrar-modal");
const inputCorreo = document.getElementById("campo-correo");
const mensajeError = document.getElementById("error-correo");
const btnAceptar = document.getElementById("btn-aceptar");
const btnRechazar = document.getElementById("btn-rechazar");

const correoEsValido = (correo) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

btnAbrir.addEventListener("click", () => {
  const correo = inputCorreo.value.trim();

  if (correoEsValido(correo)) {
    mensajeError.classList.add("hidden");
    inputCorreo.classList.remove("error");
    btnAbrir.disabled = true;

    document.getElementById("btn-texto").textContent = "Procesando...";
    document.getElementById("spinner").classList.remove("hidden");

    setTimeout(() => {
      btnAbrir.disabled = false;
      document.getElementById("btn-texto").textContent = "¡Suscríbete!";
      document.getElementById("spinner").classList.add("hidden");

      modal.classList.remove("modal-oculto");
      modal.classList.add("modal-visible");
    }, 1000);
  } else {
    mensajeError.classList.remove("hidden");
    inputCorreo.classList.add("error");
  }
});

const cerrarModal = () => {
  modal.classList.remove("modal-visible");
  modal.classList.add("modal-oculto");
  inputCorreo.value = "";
  inputCorreo.classList.remove("error");
  mensajeError.classList.add("hidden");
};

const guardarCorreo = (correo) => {
  db.collection("suscritos")
    .add({ correo, fecha: new Date() })
    .then(() => {
      console.log("Correo guardado correctamente");
    })
    .catch((error) => {
      console.error("Error al guardar el correo:", error);
    });
};

btnCerrar.addEventListener("click", cerrarModal);
btnAceptar.addEventListener("click", () => {
  const correo = inputCorreo.value.trim();
  if (correoEsValido(correo)) {
    guardarCorreo(correo);
  }
  cerrarModal();
});
btnRechazar.addEventListener("click", cerrarModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

inputCorreo.addEventListener("input", () => {
  inputCorreo.classList.remove("error");
  mensajeError.classList.add("hidden");
});
