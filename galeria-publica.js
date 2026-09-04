(function () {
  function mostrarMensaje(texto) {
    const galeria = document.getElementById("galeriaFotos");
    if (!galeria) return;
    galeria.innerHTML = "";
    const mensaje = document.createElement("div");
    mensaje.className = "empty";
    mensaje.textContent = texto;
    galeria.appendChild(mensaje);
  }
  async function cargarGaleria() {
    const galeria = document.getElementById("galeriaFotos");
    if (!galeria) return;
    try {
      if (!window.supabaseClient) {
        mostrarMensaje(
          "No se pudo conectar con la galería."
        );
        return;
      }
      const respuesta =
        await window.supabaseClient
          .from("galeria_fotos")
          .select(
            "id,titulo,categoria,url,creado_en"
          )
          .order(
            "creado_en",
            { ascending: false }
          );
      if (respuesta.error) {
        console.error(
          "Error cargando galería:",
          respuesta.error
        );
        mostrarMensaje(
          "No se pudo cargar la galería."
        );
        return;
      }
      const fotos = respuesta.data || [];
      if (fotos.length === 0) {
        mostrarMensaje(
          "Todavía no hay fotos publicadas."
        );
        return;
      }
      galeria.innerHTML = "";
      fotos.forEach(function (foto) {
        if (!foto.url) return;
        const item =
          document.createElement("div");
        item.className =
          "gallery-item";
        const imagen =
          document.createElement("img");
        imagen.src = foto.url;
        imagen.alt =
          foto.titulo || "Pool & Beach";
        imagen.loading = "lazy";
        imagen.onerror = function () {
          imagen.style.display = "none";
          const error =
            document.createElement("div");
          error.className = "empty";
          error.textContent =
            "No se pudo cargar esta imagen.";
          item.insertBefore(
            error,
            item.firstChild
          );
        };
        const caption =
          document.createElement("div");
        caption.className =
          "gallery-caption";
        const titulo =
          document.createElement("strong");
        titulo.textContent =
          foto.titulo || "Pool & Beach";
        const categoria =
          document.createElement("small");
        categoria.textContent =
          foto.categoria || "";
        caption.appendChild(titulo);
        caption.appendChild(categoria);
        item.appendChild(imagen);
        item.appendChild(caption);
        galeria.appendChild(item);
      });
      if (!galeria.children.length) {
        mostrarMensaje(
          "Todavía no hay fotos publicadas."
        );
      }
    } catch (error) {
      console.error(
        "Error inesperado en galería:",
        error
      );
      mostrarMensaje(
        "No se pudo cargar la galería."
      );
    }
  }
  function iniciarGaleria() {
    cargarGaleria();
  }
  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarGaleria
    );
  } else {
    iniciarGaleria();
  }
})();