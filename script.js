const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const yearEl = document.querySelector("#ano");
const revealElements = document.querySelectorAll(".reveal");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
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
        badge: "Bahia · INEMA",
        title: "IN INEMA nº 001/2016",
        text: "Estabelece diretrizes, critérios e procedimentos para a Autorização para Manejo de Fauna Silvestre no licenciamento ambiental no Estado da Bahia, incluindo atividades como levantamento, salvamento, afugentamento, monitoramento, soltura e ações correlatas.",
        url: "https://www.ba.gov.br/inema/sites/site-inema/files/migracao_2024/arquivos/wp-content/files/IN_INEMA_n001_2016_-_AMF.pdf"
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
