const projectCarousel = document.querySelector("[data-project-carousel]");
const projectTrack = document.querySelector("[data-project-carousel-track]");
const projectPrevButtons = Array.from(document.querySelectorAll("[data-project-carousel-prev]"));
const projectNextButtons = Array.from(document.querySelectorAll("[data-project-carousel-next]"));
const projectDots = document.querySelector("[data-project-carousel-dots]");

if (projectCarousel && projectTrack) {
  const cards = Array.from(projectTrack.querySelectorAll(".project-card"));
  let activePage = 0;
  let autoTimer;

  const cardsPerView = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  };

  const pageCount = () => Math.max(1, Math.ceil(cards.length / cardsPerView()));

  const cardStep = () => {
    const first = cards[0];
    if (!first) return projectTrack.clientWidth;
    const styles = getComputedStyle(projectTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return first.getBoundingClientRect().width + gap;
  };

  const maxScroll = () => Math.max(0, projectTrack.scrollWidth - projectTrack.clientWidth);

  const pageScrollLeft = page => {
    const target = page * cardStep() * cardsPerView();
    return Math.min(target, maxScroll());
  };

  const updateDots = () => {
    if (!projectDots) return;
    Array.from(projectDots.querySelectorAll("button")).forEach((dot, index) => {
      dot.classList.toggle("active", index === activePage);
    });
  };

  const goToPage = page => {
    const count = pageCount();
    activePage = (page + count) % count;
    projectTrack.scrollTo({
      left: pageScrollLeft(activePage),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
    updateDots();
  };

  const renderDots = () => {
    if (!projectDots) return;
    const count = pageCount();
    activePage = Math.min(activePage, count - 1);

    projectDots.innerHTML = Array.from({ length: count }, (_, index) =>
      '<button type="button" aria-label="Ir para grupo ' + (index + 1) + '" class="' + (index === activePage ? 'active' : '') + '"></button>'
    ).join("");

    Array.from(projectDots.querySelectorAll("button")).forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToPage(index);
        startAuto();
      });
    });
  };

  const stopAuto = () => {
    if (autoTimer) window.clearInterval(autoTimer);
  };

  const startAuto = () => {
    stopAuto();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (pageCount() <= 1) return;
    autoTimer = window.setInterval(() => goToPage(activePage + 1), 5000);
  };

  projectPrevButtons.forEach(button => {
    button.addEventListener("click", () => {
      goToPage(activePage - 1);
      startAuto();
    });
  });

  projectNextButtons.forEach(button => {
    button.addEventListener("click", () => {
      goToPage(activePage + 1);
      startAuto();
    });
  });

  projectCarousel.addEventListener("focusin", stopAuto);
  projectCarousel.addEventListener("focusout", startAuto);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAuto();
    } else {
      startAuto();
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      renderDots();
      goToPage(activePage);
      startAuto();
    }, 160);
  });

  renderDots();
  startAuto();
}
