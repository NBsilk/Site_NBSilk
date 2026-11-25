const imagens = document.querySelectorAll(".quadrado img");
const lightbox = document.getElementById("lightbox");
const imagemExpandida = document.getElementById("imagem-expandida");
const fechar = document.getElementById("fechar");

// Abre a imagem
imagens.forEach(imagem => {

    imagem.addEventListener("click", () => {

        imagemExpandida.src = imagem.src;
        imagemExpandida.alt = imagem.alt;
        lightbox.style.display = "flex";

    });

});

// Fecha a imagem
function fecharImagem() {
    lightbox.style.display = "none";
}

// Fecha pelo botão X
fechar.addEventListener("click", fecharImagem);

// Fecha clicando no fundo
lightbox.addEventListener("click", evento => {

    if (evento.target === lightbox) {
        fecharImagem();
    }

});

// Fecha pressionando ESC
document.addEventListener("keydown", evento => {

    if (evento.key === "Escape") {
        fecharImagem();
    }

});
