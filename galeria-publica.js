(function(){

const SUPABASE_URL =
“https://nmpakeovqkdajtswjpgm.supabase.co”;

const SUPABASE_ANON_KEY =
“sb_publishable_FyuFdiW_2eXNScLd9MShng_rLxxztsu”;

function mostrarMensaje(texto){

const galeria =
  document.getElementById("galeriaFotos");
if(!galeria) return;
galeria.innerHTML = "";
const mensaje =
  document.createElement("div");
mensaje.className = "empty";
mensaje.textContent = texto;
galeria.appendChild(mensaje);

}

async function cargarGaleria(){

const galeria =
  document.getElementById("galeriaFotos");
if(!galeria) return;
try{
  if(!window.supabase){
    mostrarMensaje(
      "No se pudo conectar con la galería."
    );
    return;
  }
  const cliente =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
  const resultado =
    await cliente
      .from("galeria_fotos")
      .select("id,titulo,categoria,url,creado_en")
      .order("creado_en",{ascending:false});
  if(resultado.error){
    console.error(
      "Error de Supabase:",
      resultado.error
    );
    mostrarMensaje(
      "No se pudo cargar la galería."
    );
    return;
  }
  const fotos =
    resultado.data || [];
  if(fotos.length === 0){
    mostrarMensaje(
      "Todavía no hay fotos publicadas."
    );
    return;
  }
  galeria.innerHTML = "";
  fotos.forEach(function(foto){
    if(!foto.url) return;
    const item =
      document.createElement("div");
    item.className =
      "gallery-item";
    const imagen =
      document.createElement("img");
    imagen.src =
      foto.url;
    imagen.alt =
      foto.titulo ||
      "Pool & Beach";
    imagen.loading =
      "lazy";
    imagen.onerror =
      function(){
        imagen.style.display =
          "none";
        const error =
          document.createElement("div");
        error.className =
          "empty";
        error.textContent =
          "No se pudo cargar esta imagen.";
        item.appendChild(error);
      };
    const caption =
      document.createElement("div");
    caption.className =
      "gallery-caption";
    const titulo =
      document.createElement("strong");
    titulo.textContent =
      foto.titulo ||
      "Pool & Beach";
    const categoria =
      document.createElement("small");
    categoria.textContent =
      foto.categoria ||
      "";
    caption.appendChild(titulo);
    caption.appendChild(categoria);
    item.appendChild(imagen);
    item.appendChild(caption);
    galeria.appendChild(item);
  });
  if(!galeria.children.length){
    mostrarMensaje(
      "Todavía no hay fotos publicadas."
    );
  }
}catch(error){
  console.error(
    "Error cargando galería:",
    error
  );
  mostrarMensaje(
    "No se pudo cargar la galería."
  );
}

}

if(
document.readyState === “loading”
){

document.addEventListener(
  "DOMContentLoaded",
  cargarGaleria
);

}else{

cargarGaleria();

}

})();