(function () {
  async function cargarGaleriaPublica() {
    const contenedor = document.getElementById("galeriaFotos");

    if (!contenedor || typeof supabaseClient === "undefined") return;

    const { data, error } = await supabaseClient
      .from("galeria_fotos")
      .select("titulo, categoria, url, creado_en")
      .order("creado_en", { ascending: false });

    if (error) {
      console.error("Error cargando galería:", error);
      contenedor.innerHTML =
        '<div class="empty">La galería estará disponible próximamente.</div>';
      return;
    }

    if (!data || data.length === 0) {
      contenedor.innerHTML =
        '<div class="empty">Todavía no hay fotos publicadas.</div>';
      return;
    }

    contenedor.innerHTML = "";

    data.forEach(function (foto) {
      const item = document.createElement("article");
      item.className = "gallery-item";

      const imagen = document.createElement("img");
      imagen.src = foto.url;
      imagen.alt = foto.titulo || "Foto de Pool & Beach";
      imagen.loading = "lazy";

      const caption = document.createElement("div");
      caption.className = "gallery-caption";

      const titulo = document.createElement("strong");
      titulo.textContent = foto.titulo || "Pool & Beach";

      const categoria = document.createElement("small");
      categoria.textContent = foto.categoria
        ? "📷 " + foto.categoria
        : "";

      caption.appendChild(titulo);
      caption.appendChild(categoria);

      item.appendChild(imagen);
      item.appendChild(caption);

      contenedor.appendChild(item);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      cargarGaleriaPublica
    );
  } else {
    cargarGaleriaPublica();
  }
})();