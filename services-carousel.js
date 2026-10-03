(() => {
  const carousel = document.querySelector("[data-services-carousel]");
  if (!carousel) return;
  const track = carousel.querySelector("[data-services-track]");
  const previous = carousel.querySelector("[data-services-prev]");
  const next = carousel.querySelector("[data-services-next]");
  const status = carousel.querySelector("[data-services-status]");
  if (!track || !previous || !next || !status) return;
  const cards = Array.from(track.querySelectorAll(".service-card"));
  if (!cards.length) return;

  const metrics = () => {
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    const width = cards[0].getBoundingClientRect().width;
    const available = track.clientWidth - (parseFloat(styles.paddingLeft) || 0) - (parseFloat(styles.paddingRight) || 0);
    const step = width + gap;
    return {
      step,
      visible: Math.max(1, Math.round((available + gap) / step)),
      maximum: Math.max(0, track.scrollWidth - track.clientWidth)
    };
  };

  const update = () => {
    const { step, visible, maximum } = metrics();
    const first = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maximum - 1;
    status.textContent = "Serviços " + (first + 1) + " a " + Math.min(first + visible, cards.length) + " de " + cards.length;
  };

  const goTo = left => {
    const { maximum } = metrics();
    track.scrollTo({
      left: Math.max(0, Math.min(left, maximum)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  };

  previous.addEventListener("click", () => {
    const { step, visible } = metrics();
    goTo(track.scrollLeft - step * visible);
  });
  next.addEventListener("click", () => {
    const { step, visible } = metrics();
    goTo(track.scrollLeft + step * visible);
  });
  track.addEventListener("keydown", event => {
    if (event.target !== track) return;
    const { step, visible, maximum } = metrics();
    const targets = {
      ArrowLeft: track.scrollLeft - step * visible,
      ArrowRight: track.scrollLeft + step * visible,
      Home: 0,
      End: maximum
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    goTo(targets[event.key]);
  });
  let frame;
  track.addEventListener("scroll", () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener("resize", update);
  carousel.classList.add("is-enhanced");
  update();
})();
