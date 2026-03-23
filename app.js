// const API_URL = "http://localhost:10000/comentarios";
const API_URL = "https://back-guardado-comentario-variable-sesion.onrender.com/comentarios";

const formulario = document.getElementById("formulario");
const contenedor = document.getElementById("contenedor-comentarios");

// 🔄 Obtener comentarios
async function obtenerComentarios() {
  const res = await fetch(API_URL, {
    method: "GET",
    credentials: "include"
  });

  const data = await res.json();

  contenedor.innerHTML = "";


  data.comentarios.forEach(comentario => {
  const col = document.createElement("div");
  col.classList.add("col-md-4"); // 👈 columna de 6 (2 por fila)

  col.innerHTML = `
    <div class="testimonial-item">
      <img src="assets/img/testimonials/testimonials-1.jpg" class="testimonial-img" alt="">
      <h3>Usuario</h3>
      <h4>Visitante</h4>
      <div class="stars">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
      </div>
      <p>
        <i class="bi bi-quote quote-icon-left"></i>
        <span>${comentario}</span>
        <i class="bi bi-quote quote-icon-right"></i>
      </p>
    </div>
  `;

  contenedor.appendChild(col);
});
}

// 💾 Guardar comentario
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.getElementById("comentario");
  const texto = input.value;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comentario: texto }),
    credentials: "include"
  });

  input.value = "";

  obtenerComentarios();
});

// 🚀 Inicializar
obtenerComentarios();