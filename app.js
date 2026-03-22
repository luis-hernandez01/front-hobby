// const API_URL = "http://localhost:10000/comentarios";
const API_URL = "https://back-guardado-comentario-variable-sesion.onrender.com/comentarios";

const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista-comentarios");

// 🔄 Obtener comentarios del backend
async function obtenerComentarios() {
  const res = await fetch(API_URL, {
    method: "GET",
    credentials: "include" // 👈 importante para sesión
  });

  const data = await res.json();

  // Limpiar lista
  lista.innerHTML = "";

  // Pintar comentarios
  data.comentarios.forEach(comentario => {
    const li = document.createElement("li");
    li.textContent = comentario;
    lista.appendChild(li);
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
    credentials: "include" // 👈 clave para mantener sesión
  });

  input.value = "";

  // Recargar comentarios
  obtenerComentarios();
});

// 🚀 Cargar comentarios al iniciar
obtenerComentarios();