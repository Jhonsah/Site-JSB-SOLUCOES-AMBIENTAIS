const legalDatabase = window.JSB_LEGAL_DATABASE || [];

const legalStateNames = {
  BA: "Bahia", AC:"Acre", AL:"Alagoas", AP:"Amapá", AM:"Amazonas", CE:"Ceará", DF:"Distrito Federal",
  ES:"Espírito Santo", GO:"Goiás", MA:"Maranhão", MT:"Mato Grosso", MS:"Mato Grosso do Sul", MG:"Minas Gerais",
  PA:"Pará", PB:"Paraíba", PR:"Paraná", PE:"Pernambuco", PI:"Piauí", RJ:"Rio de Janeiro", RN:"Rio Grande do Norte",
  RS:"Rio Grande do Sul", RO:"Rondônia", RR:"Roraima", SC:"Santa Catarina", SP:"São Paulo", SE:"Sergipe", TO:"Tocantins"
};

const legalMunicipalities = {
  AL: ["Maceió"],
  BA: ["Salvador", "Barreiras", "Camaçari", "Feira de Santana", "Ilhéus", "Itabuna", "Lauro de Freitas", "Simões Filho", "Vitória da Conquista"],
  CE: ["Fortaleza"],
  MA: ["São Luís"],
  PB: ["João Pessoa"],
  PE: ["Recife"],
  PI: ["Teresina"],
  RN: ["Natal"],
  SE: ["Aracaju"]
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
  { topic: "florestal", terms: ["politica florestal","política florestal","manejo florestal","produto florestal","reposicao florestal","reposição florestal","codigo florestal estadual"] },
  { topic: "clima", terms: ["mudanca do clima","mudança do clima","clima","gases de efeito estufa","gee","carbono","mitigacao climatica","adaptação climática"] },
  { topic: "saneamento", terms: ["saneamento","esgotamento sanitario","esgotamento sanitário","esgoto","abastecimento de agua","drenagem urbana"] },
  { topic: "zona_costeira", terms: ["zona costeira","orla","praia","manguezal","restinga","duna","estuário","gerenciamento costeiro"] },
  { topic: "patrimonio_genetico", terms: ["patrimonio genetico","patrimônio genético","sisgen","conhecimento tradicional associado","reparticao de beneficios","repartição de benefícios"] },
  { topic: "servicos_ambientais", terms: ["pagamento por servicos ambientais","pagamento por serviços ambientais","psa","servicos ecossistemicos","serviços ecossistêmicos"] },
  { topic: "qualidade_agua", terms: ["qualidade da agua","qualidade da água","classe de agua","classe de água","corpo hidrico","corpo hídrico","enquadramento de agua"] },
  { topic: "efluentes", terms: ["efluente","efluentes","lancamento de efluente","lançamento de efluente","corpo receptor","tratamento de esgoto"] },
  { topic: "qualidade_ar", terms: ["qualidade do ar","poluicao atmosferica","poluição atmosférica","emissao atmosferica","emissão atmosférica","mp2 5","mp10"] },
  { topic: "areas_contaminadas", terms: ["area contaminada","área contaminada","solo contaminado","remediacao","remediação","valores orientadores de solo","agua subterranea contaminada"] },
  { topic: "residuos_construcao", terms: ["residuo da construcao","resíduo da construção","rcc","pgrcc","entulho","demolicao","demolição"] }
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
  ],
  clima: [
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["recuperacao-areas-degradadas.html", "Recuperação de Áreas Degradadas"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"]
  ],
  saneamento: [
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  zona_costeira: [
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["servicos-fauna.html", "Serviços de Fauna"]
  ],
  patrimonio_genetico: [
    ["servicos-fauna.html", "Serviços de Fauna"],
    ["biomonitoramento-ambiental.html", "Biomonitoramento Ambiental"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  servicos_ambientais: [
    ["recuperacao-areas-degradadas.html", "Recuperação de Áreas Degradadas"],
    ["flora-supressao-vegetal.html", "Flora e Supressão Vegetal"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  qualidade_agua: [
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"]
  ],
  efluentes: [
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"]
  ],
  qualidade_ar: [
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"]
  ],
  areas_contaminadas: [
    ["recuperacao-areas-degradadas.html", "Recuperação de Áreas Degradadas"],
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  residuos_construcao: [
    ["licenciamento-ambiental.html", "Licenciamento Ambiental"],
    ["analises-ambientais.html", "Análises e Monitoramentos Ambientais"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ]
};

const searchForm = document.querySelector("[data-legal-search-form]");
const queryInput = document.querySelector("[data-legal-query]");
const ufSelect = document.querySelector("[data-legal-uf]");
const municipalitySelect = document.querySelector("[data-legal-municipality]");
const municipalityWrap = document.querySelector("[data-legal-municipality-wrap]");
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

function renderResults(query, uf, municipality = "") {
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
    .filter(law => {
      if (!uf) return law.uf === "BR";
      if (law.uf === "BR") return true;
      if (law.uf !== uf) return false;
      if (law.scope === "Municipal") {
        return municipality && normalizeLegalText(law.municipality || "") === normalizeLegalText(municipality);
      }
      return true;
    })
    .map(law => ({ law, score: scoreLaw(law, query, topics) }))
    .filter(item => item.score > 0)
    .sort((a, b) => {
      const scopeRank = { Municipal: 3, Estadual: 2, Federal: 1 };
      return b.score - a.score || (scopeRank[b.law.scope] || 0) - (scopeRank[a.law.scope] || 0);
    });

  resultsTitle.textContent = scored.length
    ? scored.length + (scored.length === 1 ? " referência encontrada" : " referências encontradas")
    : "Nenhuma referência cadastrada foi localizada";

  const stateText = uf ? " • Estado selecionado: " + legalStateNames[uf] : " • Abrangência: federal";
  const municipalityText = municipality ? " • Município: " + municipality : "";
  const topicText = topics.length ? " • Temas identificados: " + topics.join(", ") : "";
  contextEl.hidden = false;
  contextEl.innerHTML = "<strong>Busca:</strong> " + query.replace(/[<>]/g, "") + stateText + municipalityText + topicText;

  if (!scored.length) {
    resultsEl.innerHTML = '<div class="legal-search-empty"><strong>A base ainda não encontrou uma correspondência cadastrada.</strong><p>Isso não significa ausência de legislação aplicável. Tente usar termos como “resgate de fauna”, “supressão vegetal”, “licenciamento” ou selecione um estado.</p></div>';
    renderRelatedServices(topics);
    return;
  }

  resultsEl.innerHTML = scored.map(({ law }) => `
    <article class="legal-result-card">
      <div class="legal-result-meta">
        <span class="legal-result-scope ${law.scope === "Municipal" ? "municipal" : (law.scope === "Estadual" ? "state" : "federal")}">${law.scope}${law.uf !== "BR" ? " · " + law.uf : ""}${law.scope === "Municipal" && law.municipality ? " · " + law.municipality : ""}</span>
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

function updateMunicipalityOptions(uf, selectedMunicipality = "") {
  if (!municipalitySelect || !municipalityWrap) return;

  const municipalities = legalMunicipalities[uf] || [];
  municipalitySelect.innerHTML = '<option value="">Estado inteiro — não incluir normas municipais</option>' +
    municipalities.map(city => '<option value="' + city + '">' + city + ' — incluir normas municipais</option>').join("");

  municipalityWrap.hidden = municipalities.length === 0;
  municipalitySelect.disabled = municipalities.length === 0;

  if (selectedMunicipality && municipalities.includes(selectedMunicipality)) {
    municipalitySelect.value = selectedMunicipality;
  }
}

function updateUrl(query, uf, municipality) {
  const url = new URL(window.location.href);
  if (query) url.searchParams.set("q", query); else url.searchParams.delete("q");
  if (uf) url.searchParams.set("uf", uf); else url.searchParams.delete("uf");
  if (municipality) url.searchParams.set("municipio", municipality); else url.searchParams.delete("municipio");
  window.history.replaceState({}, "", url);
}

function runSearch() {
  const query = queryInput.value.trim();
  const uf = ufSelect.value;
  const municipality = municipalitySelect && !municipalitySelect.disabled ? municipalitySelect.value : "";
  updateUrl(query, uf, municipality);
  renderResults(query, uf, municipality);
}

if (searchForm && queryInput && ufSelect) {
  const params = new URLSearchParams(window.location.search);
  queryInput.value = params.get("q") || "";
  ufSelect.value = params.get("uf") || "";
  updateMunicipalityOptions(ufSelect.value, params.get("municipio") || "");

  ufSelect.addEventListener("change", () => {
    updateMunicipalityOptions(ufSelect.value);
    if (queryInput.value.trim()) runSearch();
  });

  if (municipalitySelect) {
    municipalitySelect.addEventListener("change", () => {
      if (queryInput.value.trim()) runSearch();
    });
  }

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
    renderResults(queryInput.value, ufSelect.value, municipalitySelect && !municipalitySelect.disabled ? municipalitySelect.value : "");
  }
}
