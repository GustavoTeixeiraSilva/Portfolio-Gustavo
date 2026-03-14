document.addEventListener("DOMContentLoaded", () => {
  setupActiveMenu();
  setupTypingEffect();
  setupRevealOnScroll();
  setupMobileMenu();
  setupCardHoverEffect();
  setupSmoothAnchorScroll();
});

/* =========================
   MENU ATIVO
========================= */
function setupActiveMenu() {
  const navLinks = document.querySelectorAll(".nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.style.color = "#00e5ff";
      link.style.fontWeight = "800";
      link.style.textShadow = "0 0 12px rgba(0, 229, 255, 0.35)";
    }
  });
}

/* =========================
   TEXTO DIGITANDO NA HOME
========================= */
function setupTypingEffect() {
  const typingTarget = document.querySelector(".hero-text h2");

  if (!typingTarget) return;

  const words = [
    "Web & Software Developer",
    "Criando sites modernos",
    "Desenvolvendo interfaces profissionais",
    "Construindo soluções web"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    const visibleText = currentWord.substring(0, charIndex);

    typingTarget.textContent = visibleText;

    if (!isDeleting) {
      charIndex++;

      if (charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
      }
    }

    const speed = isDeleting ? 45 : 85;
    setTimeout(type, speed);
  }

  type();
}

/* =========================
   ANIMAÇÃO AO ROLAR
========================= */
function setupRevealOnScroll() {
  const elements = document.querySelectorAll(`
    .hero-text,
    .hero-card,
    .skill,
    .skill-box,
    .project-card,
    .contact-card,
    .about-card,
    .info-box,
    .projects-hero,
    .about-hero,
    .contact-hero
  `);

  if (!elements.length) return;

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(35px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

  function reveal() {
    const trigger = window.innerHeight * 0.88;

    elements.forEach((el) => {
      const top = el.getBoundingClientRect().top;

      if (top < trigger) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal();
}

/* =========================
   MENU MOBILE AUTOMÁTICO
========================= */
function setupMobileMenu() {
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");

  if (!header || !nav) return;
  if (document.querySelector(".menu-toggle")) return;

  const button = document.createElement("button");
  button.className = "menu-toggle";
  button.setAttribute("aria-label", "Abrir menu");
  button.innerHTML = "☰";

  header.appendChild(button);

  const style = document.createElement("style");
  style.innerHTML = `
    .menu-toggle{
      display:none;
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.12);
      color:#fff;
      font-size:24px;
      width:46px;
      height:46px;
      border-radius:12px;
      cursor:pointer;
      transition:0.3s ease;
    }

    .menu-toggle:hover{
      color:#00e5ff;
      border-color:rgba(0,229,255,0.35);
      box-shadow:0 0 18px rgba(0,229,255,0.12);
    }

    @media (max-width: 768px){
      .menu-toggle{
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .header{
        position:relative;
      }

      .nav{
        display:none !important;
        position:absolute;
        top:85px;
        right:5%;
        width:220px;
        flex-direction:column;
        gap:14px;
        padding:18px;
        background:rgba(10, 15, 30, 0.95);
        border:1px solid rgba(255,255,255,0.08);
        border-radius:18px;
        backdrop-filter:blur(12px);
        box-shadow:0 20px 40px rgba(0,0,0,0.35);
        z-index:999;
      }

      .nav.nav-open{
        display:flex !important;
      }

      .nav a{
        padding:10px 12px;
        border-radius:12px;
      }

      .nav a:hover{
        background:rgba(255,255,255,0.05);
      }
    }
  `;
  document.head.appendChild(style);

  button.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    button.innerHTML = nav.classList.contains("nav-open") ? "✕" : "☰";
  });

  document.addEventListener("click", (e) => {
    const clickedInsideNav = nav.contains(e.target);
    const clickedButton = button.contains(e.target);

    if (!clickedInsideNav && !clickedButton) {
      nav.classList.remove("nav-open");
      button.innerHTML = "☰";
    }
  });
}

/* =========================
   EFEITO NOS CARDS
========================= */
function setupCardHoverEffect() {
  const cards = document.querySelectorAll(
    ".project-card, .contact-card, .skill, .skill-box, .about-card, .hero-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.transition = "transform 0.12s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.transition = "transform 0.35s ease";
    });
  });
}

/* =========================
   SCROLL SUAVE PARA ÂNCORAS
========================= */
function setupSmoothAnchorScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}