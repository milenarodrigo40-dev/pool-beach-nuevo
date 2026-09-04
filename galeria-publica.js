const SUPABASE_URL =
  "https://nmpakeovqkdajtswjpgm.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_FyuFdiW_2eXNScLd9MShng_rLxxztsu";

const supabaseGaleria = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function cargarGaleriaPublica() {
  const contenedor = document.getElementById("galeriaFotos");

  if (!contenedor) return;

  contenedor.innerHTML =
    '<p style="text-align:center;">Cargando galería...</p>';

  try {
    const { data, error } = await supabaseGaleria
      .from("galeria_fotos")
      .select("titulo,categoria,url,creado_en")
      .order("creado_en", { ascending: false });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      contenedor.innerHTML = `
        <div style="
          text-align:center;
          padding:30px;
          color:#9fb4c2;
        ">
          Todavía no hay fotos publicadas.
        </div>
      `;
      return;
    }

    contenedor.innerHTML = "";

    data.forEach((foto) => {
      const articulo = document.createElement("article");

      articulo.className = "gallery-item";

      const imagen = document.createElement("img");

      imagen.src = foto.url;
      imagen.alt = foto.titulo || "Pool & Beach";
      imagen.loading = "lazy";

      imagen.style.width = "100%";
      imagen.style.height = "240px";
      imagen.style.objectFit = "cover";
      imagen.style.display = "block";
      imagen.style.borderRadius = "16px";

      imagen.onerror = function () {
        articulo.remove();
      };

      articulo.appendChild(imagen);

      if (foto.titulo || foto.categoria) {
        const texto = document.createElement("div");

        texto.style.padding = "12px 4px";

        if (foto.titulo) {
          const titulo = document.createElement("div");

          titulo.textContent = foto.titulo;
          titulo.style.fontWeight = "800";
          titulo.style.fontSize = "16px";

          texto.appendChild(titulo);
        }

        if (foto.categoria) {
          const categoria = document.createElement("div");

          categoria.textContent = foto.categoria;
          categoria.style.color = "#8fb7c8";
          categoria.style.fontSize = "13px";
          categoria.style.marginTop = "4px";

          texto.appendChild(categoria);
        }

        articulo.appendChild(texto);
      }

      contenedor.appendChild(articulo);
    });

  } catch (error) {
    console.error("Error cargando galería:", error);

    contenedor.innerHTML = `
      <div style="
        text-align:center;
        padding:30px;
        color:#ffb0b0;
      ">
        No se pudo cargar la galería.
      </div>
    `;
  }
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    cargarGaleriaPublica
  );
} else {
  cargarGaleriaPublica();
}