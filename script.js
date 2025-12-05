
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdtZK1U0tjxWpjxbhw04um_HHN5qI9Y2PHrMzTLYwJb_sLxGA/formResponse";

const ENTRY_GRADO = "entry.1020526872";
const ENTRY_LISTA = "entry.1822507633";


// =======================================================
// CAPTURAR ELEMENTOS DEL FORMULARIO
// =======================================================

const formulario = document.getElementById("formulario-voto");
const votoInput = document.getElementById("voto-seleccionado");
const gradoInput = document.getElementById("grado");
const boton = formulario.querySelector("button");


// =======================================================
// SELECCIÓN DE GRADO
// =======================================================

const grados = document.querySelectorAll(".grade-card");

grados.forEach(card => {
  card.addEventListener("click", () => {
    grados.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    gradoInput.value = card.dataset.grado;
  });
});


// =======================================================
// SELECCIÓN DE LISTA
// =======================================================

const listas = document.querySelectorAll(".lista-card");

listas.forEach(card => {
  card.addEventListener("click", () => {
    listas.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    votoInput.value = card.dataset.voto;
  });
});


// =======================================================
// ENVÍO A GOOGLE FORMS
// =======================================================

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  enviarVoto();
});

function enviarVoto() {

  const grado = gradoInput.value;
  const lista = votoInput.value;

  if (!grado || !lista) {
    Swal.fire({
      icon: "warning",
      title: "Faltan datos",
      text: "Selecciona tu Grado y una Lista.",
      confirmButtonColor: "#1e3c72",
    });
    return;
  }

  boton.disabled = true;
  boton.textContent = "Enviando voto...";

  Swal.fire({
    title: "Registrando voto...",
    text: "Por favor espera...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  const formData = new FormData();
  formData.append(ENTRY_GRADO, grado);
  formData.append(ENTRY_LISTA, lista);

  fetch(GOOGLE_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
    .then(() => {
      Swal.close();

      Swal.fire({
        icon: "success",
        title: "¡Voto registrado!",
        html: "Tu voto ha sido enviado correctamente.<br><br>🎉 Gracias por participar.",
        confirmButtonText: "Aceptar y reiniciar",
        confirmButtonColor: "#00AEEF",
      }).then(() => {
        window.location.reload();
      });

    })
    .catch(() => {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Error al enviar",
        text: "No se pudo registrar el voto.",
        confirmButtonColor: "#d33",
      });

      boton.disabled = false;
      boton.textContent = "CONFIRMAR MI VOTO";
    });
}
