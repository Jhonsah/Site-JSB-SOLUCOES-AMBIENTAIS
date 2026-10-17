const legalCarousel = document.querySelector("[data-legal-carousel]");
const legalCarouselTrack = document.querySelector("[data-legal-carousel-track]");
const legalCarouselProgress = document.querySelector("[data-legal-carousel-progress]");

if (legalCarousel && legalCarouselTrack && Array.isArray(window.JSB_LEGAL_DATABASE) && window.JSB_LEGAL_DATABASE.length) {
  const featuredIds = [
    "lei-15190-2025",
    "cf-225",
    "lei-6938-1981",
    "lc-140-2011",
    "lei-12651-2012",
    "lei-11428-2006",
    "in-ibama-146-2007",
    "in-ibama-8-2017",
    "mma-1704-2026"
  ];

  const laws = featuredIds
    .map(id => window.JSB_LEGAL_DATABASE.find(law => law.id === id))
    .filter(Boolean);

  const searchLink = law => {
    const params = new URLSearchParams({ q: law.title });
    if (law.uf && law.uf !== "BR") params.set("uf", law.uf);
    return "base-legal-ambiental.html?" + params.toString();
  };

  if (!laws.length) {
    // Mantém o fallback estático do HTML quando os registros esperados não estão disponíveis.
  } else {
    legalCarouselTrack.innerHTML = laws.map((law, index) => `
    <article class="law-carousel-card${index === 0 ? " featured" : ""}">
      <div class="law-carousel-meta">
        <span class="law-carousel-badge">${index === 0 ? "Atualização regulatória" : "Âmbito federal"}</span>
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
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const cardStep = () => {
    const first = cards[0];
    if (!first) return legalCarouselTrack.clientWidth;
    const styles = getComputedStyle(legalCarouselTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return first.getBoundingClientRect().width + gap;
  };

  const updateProgress = () => {
    if (!legalCarouselProgress) return;
    const thumb = legalCarouselProgress.querySelector("span");
    if (!thumb) return;

    const total = legalCarouselTrack.scrollWidth;
    const visible = legalCarouselTrack.clientWidth;
    const maxScroll = Math.max(0, total - visible);
    const width = total > 0 ? Math.min(100, (visible / total) * 100) : 100;
    const position = maxScroll > 0 ? (legalCarouselTrack.scrollLeft / maxScroll) * (100 - width) : 0;
    const value = maxScroll > 0 ? Math.round((legalCarouselTrack.scrollLeft / maxScroll) * 100) : 100;

    thumb.style.width = `${width}%`;
    thumb.style.left = `${Math.max(0, Math.min(100 - width, position))}%`;
    legalCarouselProgress.setAttribute("aria-valuenow", String(value));
  };

  const scrollByCard = direction => {
    legalCarouselTrack.scrollBy({
      left: direction * cardStep(),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  };

  legalCarouselTrack.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  });

  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  legalCarouselTrack.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartScroll = legalCarouselTrack.scrollLeft;
    legalCarouselTrack.classList.add("is-dragging");
    legalCarouselTrack.setPointerCapture?.(event.pointerId);
  });

  legalCarouselTrack.addEventListener("pointermove", event => {
    if (!dragging) return;
    legalCarouselTrack.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
  });

  const endDrag = event => {
    if (!dragging) return;
    dragging = false;
    legalCarouselTrack.classList.remove("is-dragging");
    if (legalCarouselTrack.hasPointerCapture?.(event.pointerId)) {
      legalCarouselTrack.releasePointerCapture(event.pointerId);
    }
  };

  legalCarouselTrack.addEventListener("pointerup", endDrag);
  legalCarouselTrack.addEventListener("pointercancel", endDrag);
  legalCarouselTrack.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  updateProgress();
  }
}