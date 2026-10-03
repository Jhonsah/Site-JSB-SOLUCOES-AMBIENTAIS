const faqSearch = document.querySelector("[data-faq-search]");
const faqItems = Array.from(document.querySelectorAll("[data-faq-item]"));
const faqFilterButtons = Array.from(document.querySelectorAll("[data-faq-filter]"));
const faqEmpty = document.querySelector("[data-faq-empty]");

let activeFaqFilter = "all";

const normalizeFaq = (value = "") =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

function updateFaqList() {
  const query = normalizeFaq(faqSearch ? faqSearch.value : "");
  let visible = 0;

  faqItems.forEach(item => {
    const categories = (item.dataset.category || "").split(" ");
    const text = normalizeFaq(item.textContent || "");
    const categoryMatch = activeFaqFilter === "all" || categories.includes(activeFaqFilter);
    const queryMatch = !query || text.includes(query);
    const show = categoryMatch && queryMatch;

    item.hidden = !show;
    if (show) visible += 1;
  });

  if (faqEmpty) faqEmpty.hidden = visible !== 0;
}

if (faqSearch) {
  faqSearch.addEventListener("input", updateFaqList);
}

faqFilterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFaqFilter = button.dataset.faqFilter || "all";
    faqFilterButtons.forEach(item => item.classList.toggle("active", item === button));
    updateFaqList();
  });
});

updateFaqList();