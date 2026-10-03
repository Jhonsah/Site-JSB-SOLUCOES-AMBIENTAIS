const legalCarousel = document.querySelector("[data-legal-carousel]");
const legalCarouselTrack = document.querySelector("[data-legal-carousel-track]");
const legalCarouselPrev = document.querySelector("[data-legal-carousel-prev]");
const legalCarouselNext = document.querySelector("[data-legal-carousel-next]");
const legalCarouselDots = document.querySelector("[data-legal-carousel-dots]");

if (legalCarousel && legalCarouselTrack && window.JSB_LEGAL_DATABASE) {
  const featuredIds = [
    "lei-15190-2025",
    "ba-10431-2006",
    "ba-inema-001-2016",
    "lei-12651-2012",
    "lei-11428-2006",
    "ba-inema-22129-2021",
    "ba-sema-37-2017",
    "lc-140-2011",
    "in-ibama-8-2017"
  ];

  const laws = featuredIds
    .map(id => window.JSB_LEGAL_DATABASE.find(law => law.id === id))
    .filter(Boolean);

  const searchLink = law => {
    const params = new URLSearchParams({ q: law.title });
    if (law.uf && law.uf !== "BR") params.set("uf", law.uf);
    return "base-legal-ambiental.html?" + params.toString();
  };

  legalCarouselTrack.innerHTML = laws.map((law, index) => `
    <article class="law-carousel-card${index === 0 ? " featured" : ""}">
      <div class="law-carousel-meta">
        <span class="law-carousel-badge">${index === 0 ? "Atualização regulatória" : law.scope === "Estadual" ? "Bahia · Estadual" : "Base legal"}</span>
        <span>${law.authority}</span>
      </div>
      <h3>${law.title}</h3>
      <p>${law.summary}</p>
      <div class="law-carousel-ref">
        <strong>Verificação:</strong> ${law.verified}
      </div>
      <div class="law-carousel-actions">
        <a href="${searchLink(law)}">Ver na Base Legal →</a>
        <a href="${law.url}" target="_blank" rel="noopener">Fonte oficial ↗</a>
      </div>
    </article>
  `).join("");

  const cards = Array.from(legalCarouselTrack.querySelectorAll(".law-carousel-card"));
  let activeIndex = 0;
  let autoTimer;

  const cardsPerView = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  };

  const pageCount = () => Math.max(1, Math.ceil(cards.length / cardsPerView()));

  const cardStep = () => {
    const first = cards[0];
    if (!first) return legalCarouselTrack.clientWidth;
    const styles = getComputedStyle(legalCarouselTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return first.getBoundingClientRect().width + gap;
  };

  const renderDots = () => {
    const count = pageCount();
    activeIndex = Math.min(activeIndex, count - 1);
    legalCarouselDots.innerHTML = Array.from({ length: count }, (_, i) =>
      '<button type="button" aria-label="Ir para grupo ' + (i + 1) + '" class="' + (i === activeIndex ? 'active' : '') + '"></button>'
    ).join("");

    Array.from(legalCarouselDots.querySelectorAll("button")).forEach((dot, i) => {
      dot.addEventListener("click", () => goToPage(i));
    });
  };

  const updateDots = () => {
    Array.from(legalCarouselDots.querySelectorAll("button")).forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
    });
  };

  const goToPage = index => {
    const count = pageCount();
    activeIndex = (index + count) % count;
    legalCarouselTrack.scrollTo({
      left: activeIndex * cardStep() * cardsPerView(),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
    updateDots();
  };

  const next = () => goToPage(activeIndex + 1);
  const prev = () => goToPage(activeIndex - 1);

  const stopAuto = () => {
    if (autoTimer) window.clearInterval(autoTimer);
  };

  const startAuto = () => {
    stopAuto();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoTimer = window.setInterval(next, 8000);
  };

  legalCarouselNext?.addEventListener("click", () => {
    next();
    startAuto();
  });

  legalCarouselPrev?.addEventListener("click", () => {
    prev();
    startAuto();
  });

  legalCarousel.addEventListener("mouseenter", stopAuto);
  legalCarousel.addEventListener("mouseleave", startAuto);
  legalCarousel.addEventListener("focusin", stopAuto);
  legalCarousel.addEventListener("focusout", startAuto);

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      renderDots();
      goToPage(activeIndex);
    }, 150);
  });

  renderDots();
  startAuto();
}