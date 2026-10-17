const projectCarousel = document.querySelector("[data-project-carousel]");
const projectTrack = document.querySelector("[data-project-carousel-track]");
const projectProgress = document.querySelector("[data-project-carousel-progress]");

if (projectCarousel && projectTrack) {
  const cards = Array.from(projectTrack.querySelectorAll(".project-card"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const cardStep = () => {
    const first = cards[0];
    if (!first) return projectTrack.clientWidth;
    const styles = getComputedStyle(projectTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return first.getBoundingClientRect().width + gap;
  };

  const updateProgress = () => {
    if (!projectProgress) return;
    const thumb = projectProgress.querySelector("span");
    if (!thumb) return;

    const total = projectTrack.scrollWidth;
    const visible = projectTrack.clientWidth;
    const maxScroll = Math.max(0, total - visible);
    const width = total > 0 ? Math.min(100, (visible / total) * 100) : 100;
    const position = maxScroll > 0 ? (projectTrack.scrollLeft / maxScroll) * (100 - width) : 0;
    const value = maxScroll > 0 ? Math.round((projectTrack.scrollLeft / maxScroll) * 100) : 100;

    thumb.style.width = `${width}%`;
    thumb.style.left = `${Math.max(0, Math.min(100 - width, position))}%`;
    projectProgress.setAttribute("aria-valuenow", String(value));
  };

  const scrollByCard = direction => {
    projectTrack.scrollBy({
      left: direction * cardStep(),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  };

  projectTrack.addEventListener("keydown", event => {
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

  projectTrack.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartScroll = projectTrack.scrollLeft;
    projectTrack.classList.add("is-dragging");
    projectTrack.setPointerCapture?.(event.pointerId);
  });

  projectTrack.addEventListener("pointermove", event => {
    if (!dragging) return;
    projectTrack.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
  });

  const endDrag = event => {
    if (!dragging) return;
    dragging = false;
    projectTrack.classList.remove("is-dragging");
    if (projectTrack.hasPointerCapture?.(event.pointerId)) {
      projectTrack.releasePointerCapture(event.pointerId);
    }
  };

  projectTrack.addEventListener("pointerup", endDrag);
  projectTrack.addEventListener("pointercancel", endDrag);
  projectTrack.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  updateProgress();
}
