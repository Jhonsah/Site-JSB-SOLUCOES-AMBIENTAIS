const legalDatabase = window.JSB_LEGAL_DATABASE || [];

const legalStateNames = {
  BA: "Bahia", AC:"Acre", AL:"Alagoas", AP:"Amapá", AM:"Amazonas", CE:"Ceará", DF:"Distrito Federal",
  ES:"Espírito Santo", GO:"Goiás", MA:"Maranhão", MT:"Mato Grosso", MS:"Mato Grosso do Sul", MG:"Minas Gerais",
  PA:"Pará", PB:"Paraíba", PR:"Paraná", PE:"Pernambuco", PI:"Piauí", RJ:"Rio de Janeiro", RN:"Rio Grande do Norte",
  RS:"Rio Grande do Sul", RO:"Rondônia", RR:"Roraima", SC:"Santa Catarina", SP:"São Paulo", SE:"Sergipe", TO:"Tocantins"
};

const normalizeLegalText = (value = "") =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const topicRules = [
  { topic: "fauna", terms: ["fauna","animal","animais","resgate","afugentamento","salvamento","captura","soltura","manejo"] },
  { topic: "supressao", terms: ["supressao","vegetacao","arvore","arvores","cortar","corte","retirar","terreno","desmatamento","limpeza","farmacia"] },
  { topic: "licenciamento", terms: ["licenciamento","licenca","obra","empreendimento","construir","construcao","farmacia"] },
  { topic: "ameacadas", terms: ["ameacada","ameacadas","extincao","conservacao"] },
  { topic: "levantamento", terms: ["levantamento","inventario","diagnostico","estudo fauna","inventario florestal"] },
  { topic: "recursos_hidricos", terms: ["agua","outorga","captacao","poco","pocos","barramento","irrigacao","recurso hidrico","recursos hidricos","efluente"] },
  { topic: "rural", terms: ["cefir","car","imovel rural","propriedade rural","reserva legal","app","regularizacao rural"] },
  { topic: "geotecnologia", terms: ["drone","drones","mapa","mapas","geoprocessamento","gis","georreferenciamento","cartografia"] },
  { topic: "recuperacao", terms: ["prad","recuperacao","area degradada","reabilitacao","remediacao","desativacao","encerramento"] },
  { topic: "ruido", terms: ["ruido","ruído","poluicao sonora","pressao sonora","som ambiental","monitoramento de ruido"] },
  { topic: "educacao ambiental", terms: ["educacao ambiental","educação ambiental","pea","dds ambiental","palestra ambiental","oficina ambiental","treinamento ambiental"] },
  { topic: "exoticas", terms: ["especie exotica","espécie exótica","exotica invasora","exótica invasora","invasora","apis mellifera","abelha africana","abelha africanizada","enxame","fauna sinantropica","fauna sinantrópica"] },
  { topic: "residuos", terms: ["residuo","resíduo","residuos","resíduos","lixo","pgrs","coleta seletiva","logistica reversa","logística reversa","aterro","rejeito"] },
  { topic: "unidades_conservacao", terms: ["unidade de conservacao","unidade de conservação","uc","parque","apa","rppn","snuc","zona de amortecimento"] },
  { topic: "pesquisa_uc", terms: ["pesquisa cientifica","pesquisa científica","coleta biologica","coleta biológica","atividade didatica","atividade didática","pesquisa em uc"] },
  { topic: "emergencia", terms: ["emergencia ambiental","emergência ambiental","acidente ambiental","vazamento","derramamento","grave risco","iminente perigo"] },
  { topic: "florestal", terms: ["politica florestal","política florestal","manejo florestal","produto florestal","reposicao florestal","reposição florestal","codigo florestal estadual"] }
];

const relatedServicesByTopic = {
  fauna: [
    ["projeto-manejo-fauna.html", "Resgate de Fauna Silvestre"],
    ["levantamento-faunistico.html", "Levantamento Faunístico"],
    ["plano-salvamento-fauna-silvestre.html", "Plano para Salvamento de Fauna"]
  ],
  supressao: [
    ["flora-supressao-vegetal.html", "Flora e Supressão Vegetal"],
    ["projeto-inventario-florestal.html", "Inventário Florestal"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  licenciamento: [
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  levantamento: [
    ["levantamento-faunistico.html", "Levantamento Faunístico"],
    ["projeto-monitoramento-fauna.html", "Monitoramento de Fauna"],
    ["biomonitoramento-ambiental.html", "Biomonitoramento Ambiental"]
  ],
  recursos_hidricos: [
    ["index.html#servicos", "Soluções Ambientais"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  rural: [
    ["projeto-inventario-florestal.html", "Inventário Florestal"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  geotecnologia: [
    ["projeto-mapeamento-drones.html", "Mapeamento com Drones"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"]
  ],
  recuperacao: [
    ["recuperacao-areas-degradadas.html", "Recuperação de Áreas Degradadas"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  ruido: [
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  "educacao ambiental": [
    ["educacao-ambiental.html", "Educação Ambiental"],
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"]
  ],
  exoticas: [
    ["servicos-fauna.html", "Serviços de Fauna"],
    ["projeto-manejo-fauna.html", "Manejo e Resgate de Fauna"],
    ["index.html#contato", "Avaliação técnica da ocorrência"]
  ],
  residuos: [
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  unidades_conservacao: [
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["servicos-fauna.html", "Serviços de Fauna"]
  ],
  pesquisa_uc: [
    ["servicos-fauna.html", "Serviços de Fauna"],
    ["biomonitoramento-ambiental.html", "Biomonitoramento Ambiental"],
    ["index.html#contato", "Avaliação técnica da pesquisa"]
  ],
  emergencia: [
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["index.html#contato", "Avaliação técnica da ocorrência"]
  ],
  florestal: [
    ["flora-supressao-vegetal.html", "Flora e Supressão Vegetal"],
    ["projeto-inventario-florestal.html", "Inventário Florestal"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"]
  ]
};

const searchForm = document.querySelector("[data-legal-search-form]");
const queryInput = document.querySelector("[data-legal-query]");
const ufSelect = document.querySelector("[data-legal-uf]");
const resultsEl = document.querySelector("[data-legal-results]");
const resultsTitle = document.querySelector("[data-legal-results-title]");
const contextEl = document.querySelector("[data-legal-query-context]");
const professionalNote = document.querySelector("[data-professional-note]");
const servicesBox = document.querySelector("[data-related-services]");
const servicesLinks = document.querySelector("[data-related-service-links]");
const exampleButtons = document.querySelectorAll("[data-legal-example]");

function detectTopics(query) {
  const normalized = normalizeLegalText(query);
  return topicRules
    .filter(rule => rule.terms.some(term => normalized.includes(normalizeLegalText(term))))
    .map(rule => rule.topic);
}

function scoreLaw(law, query, topics) {
  const normalizedQuery = normalizeLegalText(query);
  const queryTokens = normalizedQuery.split(" ").filter(token => token.length > 2);
  const title = normalizeLegalText(law.title);
  const summary = normalizeLegalText(law.summary);
  const keywords = normalizeLegalText(law.keywords.join(" "));
  const themes = law.themes.map(normalizeLegalText);

  let score = 0;
  topics.forEach(topic => {
    if (themes.includes(topic)) score += 8;
  });

  queryTokens.forEach(token => {
    if (title.includes(token)) score += 4;
    if (keywords.includes(token)) score += 3;
    if (summary.includes(token)) score += 1;
  });

  if (normalizedQuery && normalizeLegalText(law.title).includes(normalizedQuery)) score += 10;
  return score;
}

function renderResults(query, uf) {
  const normalizedQuery = normalizeLegalText(query);
  const topics = detectTopics(query);
  const isProfessionalQuery = /\b(biologo|biólogo|profissional|responsavel tecnico|responsável técnico)\b/i.test(query);

  professionalNote.hidden = !isProfessionalQuery;

  if (!normalizedQuery) {
    resultsTitle.textContent = "Faça uma busca para consultar a base";
    contextEl.hidden = true;
    servicesBox.hidden = true;
    resultsEl.innerHTML = '<div class="legal-search-empty"><strong>Você pode pesquisar em linguagem comum.</strong><p>Descreva a atividade ou a dúvida. A ferramenta apresentará referências potencialmente relacionadas, sem substituir a análise do caso concreto.</p></div>';
    return;
  }

  const scored = legalDatabase
    .filter(law => uf ? (law.uf === "BR" || law.uf === uf) : law.uf === "BR")
    .map(law => ({ law, score: scoreLaw(law, query, topics) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.law.scope === "Estadual" ? -1 : 1));

  resultsTitle.textContent = scored.length
    ? scored.length + (scored.length === 1 ? " referência encontrada" : " referências encontradas")
    : "Nenhuma referência cadastrada foi localizada";

  const stateText = uf ? " • Estado selecionado: " + legalStateNames[uf] : " • Abrangência: federal";
  const topicText = topics.length ? " • Temas identificados: " + topics.join(", ") : "";
  contextEl.hidden = false;
  contextEl.innerHTML = "<strong>Busca:</strong> " + query.replace(/[<>]/g, "") + stateText + topicText;

  if (!scored.length) {
    resultsEl.innerHTML = '<div class="legal-search-empty"><strong>A base ainda não encontrou uma correspondência cadastrada.</strong><p>Isso não significa ausência de legislação aplicável. Tente usar termos como “resgate de fauna”, “supressão vegetal”, “licenciamento” ou selecione um estado.</p></div>';
    renderRelatedServices(topics);
    return;
  }

  resultsEl.innerHTML = scored.map(({ law }) => `
    <article class="legal-result-card">
      <div class="legal-result-meta">
        <span class="legal-result-scope ${law.scope === "Estadual" ? "state" : "federal"}">${law.scope}${law.uf !== "BR" ? " · " + law.uf : ""}</span>
        <span>${law.authority}</span>
      </div>
      <h3>${law.title}</h3>
      <div class="legal-result-block">
        <strong>Em linguagem simples</strong>
        <p>${law.summary}</p>
      </div>
      <div class="legal-result-block">
        <strong>Por que pode ser relevante?</strong>
        <p>${law.relevance}</p>
      </div>
      <div class="legal-result-footer">
        <span>Verificação da referência: ${law.verified}</span>
        <a href="${law.url}" target="_blank" rel="noopener">Consultar fonte oficial ↗</a>
      </div>
    </article>
  `).join("");

  renderRelatedServices(topics);
}

function renderRelatedServices(topics) {
  const links = [];
  topics.forEach(topic => {
    (relatedServicesByTopic[topic] || []).forEach(item => {
      if (!links.some(existing => existing[0] === item[0])) links.push(item);
    });
  });

  if (!links.length) {
    servicesBox.hidden = true;
    return;
  }

  servicesLinks.innerHTML = links.slice(0, 4).map(([url, label]) =>
    '<a href="' + url + '">' + label + ' →</a>'
  ).join("");
  servicesBox.hidden = false;
}

function updateUrl(query, uf) {
  const url = new URL(window.location.href);
  if (query) url.searchParams.set("q", query); else url.searchParams.delete("q");
  if (uf) url.searchParams.set("uf", uf); else url.searchParams.delete("uf");
  window.history.replaceState({}, "", url);
}

function runSearch() {
  const query = queryInput.value.trim();
  const uf = ufSelect.value;
  updateUrl(query, uf);
  renderResults(query, uf);
}

if (searchForm && queryInput && ufSelect) {
  const params = new URLSearchParams(window.location.search);
  queryInput.value = params.get("q") || "";
  ufSelect.value = params.get("uf") || "";

  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    runSearch();
  });

  exampleButtons.forEach(button => {
    button.addEventListener("click", () => {
      queryInput.value = button.dataset.legalExample || "";
      queryInput.focus();
      runSearch();
    });
  });

  if (queryInput.value) {
    renderResults(queryInput.value, ufSelect.value);
  }
}
