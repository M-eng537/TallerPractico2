document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".elemento-carrusel");
  const btnPrev = document.querySelector(".boton-previo");
  const btnNext = document.querySelector(".boton-siguiente");
  const indicadores = document.querySelectorAll(".indicadores-carrusel button");

  let indiceActual = 0;
  const totalSlides = slides.length;
  let intervalo;

  function mostrarSlide(indice) {
    if (indice < 0) indice = totalSlides - 1;
    if (indice >= totalSlides) indice = 0;

    slides.forEach((s) => s.classList.remove("active"));
    indicadores.forEach((i) => i.classList.remove("active"));

    slides[indice].classList.add("active");
    indicadores[indice].classList.add("active");

    indiceActual = indice;
  }

  function iniciarIntervalo() {
    intervalo = setInterval(() => {
      mostrarSlide(indiceActual + 1);
    }, 5000);
  }

  function reiniciarIntervalo() {
    clearInterval(intervalo);
    iniciarIntervalo();
  }

  btnPrev.addEventListener("click", () => {
    mostrarSlide(indiceActual - 1);
    reiniciarIntervalo();
  });

  btnNext.addEventListener("click", () => {
    mostrarSlide(indiceActual + 1);
    reiniciarIntervalo();
  });

  indicadores.forEach((boton, idx) => {
    boton.addEventListener("click", () => {
      mostrarSlide(idx);
      reiniciarIntervalo();
    });
  });

  mostrarSlide(indiceActual);
  iniciarIntervalo();
});
