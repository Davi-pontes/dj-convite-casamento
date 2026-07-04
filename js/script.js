/**
 * Script de Interações para o Envelope de Casamento Jhenifer e Davi
 * Desenvolvido por um Engenheiro Front-end Sênior & UI/UX Designer
 */

// ==========================================
// CONFIGURAÇÃO DO ENDPOINT DO CONVITE
// ==========================================
// Insira abaixo o link/URL do site ou arquivo onde o seu convite completo está localizado.
const ENDPOINT_CONVITE = "https://daviejhenifer.my.canva.site/convite"; 

document.addEventListener("DOMContentLoaded", () => {
    
    // Inicializar o Preloader
    setupPreloader();

    // Inicializar o Sistema do Envelope com Redirecionamento
    setupInteractiveEnvelope();
});

/**
 * Remove o preloader de carregamento após a página carregar
 */
function setupPreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("fade-out");
            }, 3000); // Exibição sutil do monograma inicial
        });
    }
}

/**
 * Controla o efeito e a animação de abertura do envelope e seu redirecionamento
 */
function setupInteractiveEnvelope() {
    const waxSeal = document.querySelector(".wax-seal");
    const envelope = document.querySelector(".envelope");
    const envelopeWrapper = document.querySelector(".envelope-wrapper");
    const cardTitle = document.getElementById("card-status-title");
    const cardDesc = document.getElementById("card-status-desc");
    const openInstruction = document.getElementById("open-instruction-text");

    let isRedirecting = false;

    if (waxSeal && envelope && envelopeWrapper) {
        // Bloqueia rolagem do navegador para manter o foco total no envelope
        document.body.classList.add("envelope-active");

        const openAndRedirectHandler = () => {
            if (isRedirecting) return;
            isRedirecting = true;

            // 1. Modifica instruções de texto
            if (openInstruction) {
                openInstruction.textContent = "Abrindo convite...";
                openInstruction.style.animation = "none";
                openInstruction.style.opacity = "0.6";
            }

            // 2. Inicia animação de abrir a aba e ocultar o selo de cera
            envelope.classList.add("open-animation");

            // 3. Modifica os textos internos do convite enquanto ele sobe
            setTimeout(() => {
                if (cardTitle) cardTitle.textContent = "Abrindo...";
                if (cardDesc) {
                    cardDesc.textContent = "Redirecionando...";
                    cardDesc.style.color = "var(--color-gold)";
                    cardDesc.style.fontWeight = "600";
                }
            }, 600);

            // 4. Efeito de Zoom/Aproximação Premium antes de sair da página
            setTimeout(() => {
                envelopeWrapper.style.transition = "all 1s cubic-bezier(0.76, 0, 0.24, 1)";
                envelopeWrapper.style.transform = "scale(1.15)";
                envelopeWrapper.style.opacity = "0";
            }, 1400);

            // 5. Redirecionamento oficial para o Endpoint do Convite
            setTimeout(() => {
                window.location.href = ENDPOINT_CONVITE;
            }, 2200);
        };

        // Eventos para acionar a animação ao clicar no lacre de cera ou em qualquer parte do envelope
        waxSeal.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita cliques duplicados
            openAndRedirectHandler();
        });

        envelope.addEventListener("click", openAndRedirectHandler);
    }
}
