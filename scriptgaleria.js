// Seleciona todas as imagens da galeria
const imagens = document.querySelectorAll(".quadrado img");

// Seleciona os elementos do Lightbox
const lightbox = document.getElementById("lightbox");
const imagemExpandida = document.getElementById("imagem-expandida");
const fechar = document.getElementById("fechar");

// Função para ampliar as imagens
imagens.forEach(imagem => {

    imagem.addEventListener("click", () => {

        imagemExpandida.src = imagem.src;
        imagemExpandida.alt = imagem.alt;

        lightbox.classList.add("ativo");

        document.body.style.overflow = "hidden";
    });

});

// Função para fechar a imagem
function fecharImagem() {

    lightbox.classList.remove("ativo");

    document.body.style.overflow = "";
}

// Fecha pelo botão X
fechar.addEventListener("click", fecharImagem);

// Fecha ao clicar fora da imagem
lightbox.addEventListener("click", evento => {

    if (evento.target === lightbox) {
        fecharImagem();
    }

});

// Fecha ao pressionar ESC
document.addEventListener("keydown", evento => {

    if (evento.key === "Escape") {
        fecharImagem();
    }

});
