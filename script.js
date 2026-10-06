const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

// Mantém a navegação pública consistente em todas as páginas.
if (mainNav) {
  const oldProjectsLink = [...mainNav.querySelectorAll("a")].find(link =>
    (link.getAttribute("href") || "").endsWith("projetos.html")
  );
  if (oldProjectsLink) {
    oldProjectsLink.href = "areas-de-atuacao.html";
    oldProjectsLink.textContent = "Atuação";
  }

  const knowledgeLink = [...mainNav.querySelectorAll("a")].find(link => {
    const href = link.getAttribute("href") || "";
    return href === "#conhecimento" || href === "index.html#conhecimento";
  });

  if (knowledgeLink) {
    knowledgeLink.href = "base-legal-ambiental.html";
    knowledgeLink.classList.add("nav-legal-link");
    knowledgeLink.innerHTML = 'Base Legal <span class="nav-new-badge" aria-label="Novidade">Novo</span>';
  }
}

const navLinks = document.querySelectorAll(".main-nav a");
const yearEl = document.querySelector("#ano");
const revealElements = document.querySelectorAll(".reveal");

// Atalho fixo de contato. Enquanto o WhatsApp corporativo não estiver definido,
// o botão direciona para a seção de contato do site.
if (!document.querySelector(".floating-contact")) {
  const isHome = /(^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith("/");
  const contact = document.createElement("a");
  contact.className = "floating-contact";
  contact.href = isHome ? "#contato" : "index.html#contato";
  contact.setAttribute("aria-label", "Falar com a JSB");
  contact.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.7 9.7 0 0 1-3.8-.8L3 21l1.7-4.4A8.3 8.3 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/><path d="M8.2 10.1h7.6M8.2 13.5h5.2"/></svg><span>Fale conosco</span>';
  document.body.appendChild(contact);
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.focus();
    }
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
}

// Consulta de referências estaduais nas páginas de serviços.
const stateLawSelect = document.querySelector("[data-state-law-select]");
const stateLawResult = document.querySelector("[data-state-law-result]");

if (stateLawSelect && stateLawResult) {
  const stateLawData = {
    BA: [
      {
        badge: "Bahia · Política Ambiental",
        title: "Lei Estadual nº 10.431/2006",
        text: "Institui a Política de Meio Ambiente e de Proteção à Biodiversidade do Estado da Bahia e compõe a base legal estadual para proteção ambiental e licenciamento.",
        url: "https://www.ba.gov.br/meioambiente/sites/site-sema/files/migracao_2024/arquivos/File/Legislacao/Leis/lei10431.pdf"
      },
      {
        badge: "Bahia · Regulamento",
        title: "Decreto Estadual nº 14.024/2012",
        text: "Aprova o regulamento da Política Estadual de Meio Ambiente e disciplina procedimentos relacionados ao licenciamento ambiental no Estado da Bahia.",
        url: "https://www.ba.gov.br/meioambiente/sites/site-sema/files/migracao_2024/arquivos/File/FERFA/Legislacao/novo14024.pdf"
      },
      {
        badge: "Bahia · Fauna Ameaçada",
        title: "Portaria SEMA nº 37/2017",
        text: "Torna pública a Lista Oficial das Espécies da Fauna Ameaçadas de Extinção do Estado da Bahia, referência estadual para identificação de espécies ameaçadas em estudos e levantamentos faunísticos.",
        url: "https://gestor.meioambiente.ba.gov.br/Consultas/ConsultaPublicacao/index.php?PaginaMostrada=28&alt=0&ano=&classificacao=&colegiado=&dt_publicacao_inicio=&dt_publicacao_termino=&num_processo=&numero=&order=4&texto=&tipoPublicacao=22&typeOrder=0"
      },
      {
        badge: "Bahia · INEMA",
        title: "IN INEMA nº 001/2016",
        text: "Estabelece diretrizes, critérios e procedimentos para a Autorização para Manejo de Fauna Silvestre no licenciamento ambiental estadual, incluindo levantamento, salvamento, afugentamento, monitoramento, soltura e ações correlatas.",
        url: "https://www.ba.gov.br/inema/sites/site-inema/files/migracao_2024/arquivos/wp-content/files/IN_INEMA_n001_2016_-_AMF.pdf"
      },
      {
        badge: "Bahia · Destinação",
        title: "Portaria INEMA nº 22.129/2021",
        text: "Regulamenta a destinação de animais silvestres e o cadastro de Áreas de Soltura de Animais Silvestres, incluindo critérios para avaliação e cadastramento das ASAS.",
        url: "https://www.ba.gov.br/inema/sites/site-inema/files/migracao_2024/arquivos/wp-content/files/Portaria_22129-2021_Destinao_Fauna_Silvestre.pdf"
      }
    ]
  };

  const stateNames = {
    AC:"Acre", AL:"Alagoas", AP:"Amapá", AM:"Amazonas", BA:"Bahia", CE:"Ceará",
    DF:"Distrito Federal", ES:"Espírito Santo", GO:"Goiás", MA:"Maranhão", MT:"Mato Grosso",
    MS:"Mato Grosso do Sul", MG:"Minas Gerais", PA:"Pará", PB:"Paraíba", PR:"Paraná",
    PE:"Pernambuco", PI:"Piauí", RJ:"Rio de Janeiro", RN:"Rio Grande do Norte",
    RS:"Rio Grande do Sul", RO:"Rondônia", RR:"Roraima", SC:"Santa Catarina",
    SP:"São Paulo", SE:"Sergipe", TO:"Tocantins"
  };

  const renderStateLaw = () => {
    const uf = stateLawSelect.value;

    if (!uf) {
      stateLawResult.innerHTML = "<p>Selecione um estado para visualizar as referências estaduais já cadastradas.</p>";
      return;
    }

    const laws = stateLawData[uf];

    if (!laws || laws.length === 0) {
      stateLawResult.innerHTML =
        '<div class="state-law-empty"><strong>' + stateNames[uf] + '</strong><p>Ainda não há referência estadual específica cadastrada para esta UF nesta versão do site. Isso não significa ausência de norma aplicável. A verificação deve considerar o órgão ambiental competente e as regras vigentes para o processo.</p></div>';
      return;
    }

    stateLawResult.innerHTML = laws.map((law) =>
      '<article class="state-law-card">' +
        '<span class="legal-badge">' + law.badge + '</span>' +
        '<h4>' + law.title + '</h4>' +
        '<p>' + law.text + '</p>' +
        '<a href="' + law.url + '" target="_blank" rel="noopener">Consultar fonte oficial ↗</a>' +
      '</article>'
    ).join("");
  };

  stateLawSelect.addEventListener("change", renderStateLaw);
}


/* Galeria ampliável — páginas técnicas */
const projectGalleryPhotos = Array.from(document.querySelectorAll(".project-gallery-photo"));

if (projectGalleryPhotos.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Visualização ampliada da fotografia");
  lightbox.innerHTML =
    '<div class="gallery-lightbox-panel">' +
      '<button class="gallery-lightbox-close" type="button" aria-label="Fechar imagem ampliada">×</button>' +
      '<img class="gallery-lightbox-image" alt="" draggable="false" />' +
      '<div class="gallery-lightbox-caption"></div>' +
    '</div>';

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".gallery-lightbox-image");
  const lightboxCaption = lightbox.querySelector(".gallery-lightbox-caption");
  const closeButton = lightbox.querySelector(".gallery-lightbox-close");
  let lastFocusedElement = null;

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.classList.remove("gallery-lightbox-open");
    lightboxImage.removeAttribute("src");
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  const openLightbox = (figure) => {
    const image = figure.querySelector("img");
    if (!image) return;

    lastFocusedElement = figure;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";
    const caption = figure.querySelector("figcaption");
    lightboxCaption.textContent = caption ? caption.textContent : (image.alt || "");

    lightbox.classList.add("open");
    document.body.classList.add("gallery-lightbox-open");
    closeButton.focus();
  };

  projectGalleryPhotos.forEach((figure) => {
    const image = figure.querySelector("img");
    if (!image) return;

    image.draggable = false;
    image.addEventListener("dragstart", (event) => event.preventDefault());
    image.addEventListener("contextmenu", (event) => event.preventDefault());

    figure.setAttribute("role", "button");
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("aria-label", "Ampliar fotografia: " + (image.alt || "registro de campo"));

    figure.addEventListener("click", () => openLightbox(figure));
    figure.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(figure);
      }
    });
  });

  lightboxImage.addEventListener("dragstart", (event) => event.preventDefault());
  lightboxImage.addEventListener("contextmenu", (event) => event.preventDefault());

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}


// Cards de navegação clicáveis por toda a superfície
document.querySelectorAll(".service-card, .project-card").forEach((card) => {
  if (card.matches("a, button")) return;

  const primaryLink = card.querySelector("a[href]");
  if (!primaryLink) return;

  card.classList.add("card-clickable");
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button, input, select, textarea, label")) return;
    window.location.href = primaryLink.href;
  });
});
