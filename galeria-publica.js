(function () {

async function cargarGaleria() {

const galeria = document.getElementById("galeriaFotos");
if (!galeria) return;
try {
  if (!window.supabaseClient) {
    galeria.innerHTML =
      '<div class="empty">No se pudo conectar con la galería.</div>';
    return;
  }
  const resultado = await window.supabaseClient
    .from("galeria_fotos")
    .select("id,titulo,categoria,url,creado_en")
    .order("creado_en", { ascending: false });
  const data = resultado.data;
  const error = resultado.error;
  if (error) {
    console.error("Error de Supabase en galería:", error);
    galeria.innerHTML =
      '<div class="empty">No se pudo cargar la galería.</div>';
    return;
  }
  if (!data || data.length === 0) {
    galeria.innerHTML =
      '<div class="empty">Todavía no hay fotos publicadas.</div>';
    return;
  }
  galeria.innerHTML = "";
  data.forEach(function (foto) {
    if (!foto.url) return;
    const item = document.createElement("div");
    item.className = "gallery-item";
    const imagen = document.createElement("img");
    imagen.src = foto.url;
    imagen.alt = foto.titulo || "Pool & Beach";
    imagen.loading = "lazy";
    imagen.onerror = function () {
      imagen.style.display = "none";
      const mensaje = document.createElement("div");
      mensaje.className = "empty";
      mensaje.textContent =
        "No se pudo cargar esta imagen.";
      item.insertBefore(
        mensaje,
        item.firstChild
      );
    };
    const caption = document.createElement("div");
    caption.className = "gallery-caption";
    const titulo = document.createElement("strong");
    titulo.textContent =
      foto.titulo || "Pool & Beach";
    const categoria = document.createElement("small");
    categoria.textContent =
      foto.categoria || "";
    caption.appendChild(titulo);
    caption.appendChild(categoria);
    item.appendChild(imagen);
    item.appendChild(caption);
    galeria.appendChild(item);
  });
  if (!galeria.children.length) {
    galeria.innerHTML =
      '<div class="empty">Todavía no hay fotos publicadas.</div>';
  }
} catch (error) {
  console.error(
    "Error cargando galería:",
    error
  );
  galeria.innerHTML =
    '<div class="empty">No se pudo cargar la galería.</div>';
}

}

if (document.readyState === “loading”) {

document.addEventListener(
  "DOMContentLoaded",
  cargarGaleria
);

} else {

cargarGaleria();

}

})();