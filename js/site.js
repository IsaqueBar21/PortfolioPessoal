/* ==================================================================
   JAVASCRIPT DO SITE — faz duas coisas simples:
   1) abre e fecha o menu no celular
   2) faz os blocos aparecerem suavemente quando você rola a página
   ================================================================== */

/* ---------- 1) MENU DO CELULAR ---------- */
const botao = document.querySelector('.menu-toggle'); // botão ☰
const menu = document.getElementById('menu');          // lista de links

if (botao && menu) {
  // Ao clicar no ☰: abre/fecha o menu e avisa leitores de tela (aria-expanded)
  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', String(aberto));
  });

  // Ao clicar em um link do menu, fecha o menu
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove('aberto');
      botao.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- 2) ANIMAÇÃO AO ROLAR ---------- */
// Todo elemento com a classe "rv" (reveal) começa invisível (ver css/site.css)
const elementos = document.querySelectorAll('.rv');

if ('IntersectionObserver' in window) {
  // O "observer" avisa quando um elemento entra na tela (12% visível)
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('on');      // "on" = mostra com animação
        observador.unobserve(entrada.target);    // anima só uma vez
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach((el) => observador.observe(el));
} else {
  // Navegadores muito antigos: mostra tudo sem animação
  elementos.forEach((el) => el.classList.add('on'));
}
