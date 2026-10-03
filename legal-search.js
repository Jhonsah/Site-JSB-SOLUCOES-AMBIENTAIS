const legalDatabase = [
  {
    id: "cf-225",
    title: "Constituição Federal — art. 225",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["licenciamento", "fauna", "flora", "supressao", "biodiversidade"],
    keywords: ["meio ambiente", "fauna", "flora", "degradacao", "impacto ambiental", "estudo previo"],
    summary: "Estabelece o direito ao meio ambiente ecologicamente equilibrado e impõe ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo, incluindo proteção da fauna e flora e exigência de estudo prévio de impacto ambiental para atividades potencialmente causadoras de significativa degradação.",
    relevance: "É a base constitucional para proteção ambiental, licenciamento, fauna, flora e avaliação de impactos.",
    url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
    verified: "out/2026"
  },
  {
    id: "lei-5197-1967",
    title: "Lei nº 5.197/1967 — Proteção à Fauna",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["fauna", "resgate", "manejo", "captura", "salvamento"],
    keywords: ["fauna silvestre", "captura", "apanha", "perseguicao", "animais silvestres"],
    summary: "Dispõe sobre a proteção da fauna silvestre e estabelece regras gerais para utilização, perseguição, destruição, caça ou apanha de animais silvestres.",
    relevance: "É uma das referências federais centrais para atividades que envolvam manejo de fauna silvestre.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l5197compilado.htm",
    verified: "out/2026"
  },
  {
    id: "lei-6938-1981",
    title: "Lei nº 6.938/1981 — Política Nacional do Meio Ambiente",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["licenciamento", "impacto", "gestao ambiental"],
    keywords: ["politica nacional meio ambiente", "sisnama", "licenciamento", "poluidor", "degradacao"],
    summary: "Institui a Política Nacional do Meio Ambiente, estrutura o Sisnama e estabelece instrumentos de gestão ambiental, entre eles o licenciamento.",
    relevance: "Ajuda a contextualizar o licenciamento e a atuação dos órgãos ambientais.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l6938compilada.htm",
    verified: "out/2026"
  },
  {
    id: "lei-9605-1998",
    title: "Lei nº 9.605/1998 — Lei de Crimes Ambientais",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["fauna", "flora", "supressao", "responsabilidade"],
    keywords: ["crime ambiental", "fauna", "flora", "corte arvore", "captura", "autorizacao"],
    summary: "Dispõe sobre sanções penais e administrativas derivadas de condutas e atividades lesivas ao meio ambiente, incluindo condutas contra a fauna e a flora.",
    relevance: "É relevante quando a atividade pode depender de autorização ambiental ou envolver fauna e vegetação protegidas.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l9605.htm",
    verified: "out/2026"
  },
  {
    id: "decreto-6514-2008",
    title: "Decreto nº 6.514/2008 — Infrações e Sanções Administrativas Ambientais",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["fauna", "flora", "supressao", "responsabilidade"],
    keywords: ["infracao ambiental", "multa", "fauna", "flora", "desmatamento", "supressao"],
    summary: "Regulamenta infrações e sanções administrativas ambientais federais e trata de condutas relacionadas à fauna, flora e outras formas de degradação ambiental.",
    relevance: "Ajuda a identificar consequências administrativas de intervenções ambientais executadas em desacordo com a legislação.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/decreto/d6514.htm",
    verified: "out/2026"
  },
  {
    id: "lc-140-2011",
    title: "Lei Complementar nº 140/2011",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["competencia", "licenciamento", "fauna", "flora", "supressao"],
    keywords: ["competencia", "uniao", "estado", "municipio", "licenciamento", "autorizacao ambiental"],
    summary: "Organiza a cooperação administrativa entre União, Estados, Distrito Federal e Municípios nas ações de proteção ambiental e ajuda a definir qual ente atua no licenciamento e em autorizações ambientais.",
    relevance: "É fundamental para entender por que a localização do empreendimento, sozinha, não define qual órgão será competente.",
    url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp140.htm",
    verified: "out/2026"
  },
  {
    id: "lei-12651-2012",
    title: "Lei nº 12.651/2012 — Proteção da Vegetação Nativa",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["flora", "supressao", "vegetacao", "app", "reserva legal"],
    keywords: ["arvore", "arvores", "vegetacao nativa", "supressao vegetal", "app", "reserva legal", "imovel rural"],
    summary: "Dispõe sobre a proteção da vegetação nativa e estabelece regras relacionadas a Áreas de Preservação Permanente, Reserva Legal e intervenções em vegetação.",
    relevance: "É uma referência importante quando a dúvida envolve corte ou supressão de vegetação nativa, especialmente em APP, Reserva Legal ou imóvel rural.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12651.htm",
    verified: "out/2026"
  },
  {
    id: "lei-11428-2006",
    title: "Lei nº 11.428/2006 — Lei da Mata Atlântica",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["flora", "supressao", "vegetacao", "mata atlantica"],
    keywords: ["mata atlantica", "vegetacao", "supressao", "corte", "arvore", "arvores"],
    summary: "Dispõe sobre a utilização e proteção da vegetação nativa do Bioma Mata Atlântica e estabelece regras específicas para supressão e intervenção quando o bioma for aplicável.",
    relevance: "Pode ser determinante em terrenos inseridos no Bioma Mata Atlântica ou em formações vegetais abrangidas pela lei.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11428.htm",
    verified: "out/2026"
  },
  {
    id: "lei-15190-2025",
    title: "Lei nº 15.190/2025 — Lei Geral do Licenciamento Ambiental",
    scope: "Federal",
    uf: "BR",
    authority: "Presidência da República",
    themes: ["licenciamento", "empreendimento", "estudos ambientais"],
    keywords: ["licenciamento ambiental", "obra", "empreendimento", "farmacia", "construcao", "estudo ambiental"],
    summary: "Estabelece normas gerais para o licenciamento ambiental no Brasil e disciplina modalidades, estudos, procedimentos e responsabilidades aplicáveis ao processo.",
    relevance: "É uma referência geral para dúvidas sobre implantação de empreendimentos e necessidade de licenciamento ambiental.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15190.htm",
    verified: "out/2026"
  },
  {
    id: "in-ibama-146-2007",
    title: "IN Ibama nº 146/2007",
    scope: "Federal",
    uf: "BR",
    authority: "Ibama",
    themes: ["fauna", "resgate", "salvamento", "monitoramento", "levantamento"],
    keywords: ["levantamento fauna", "monitoramento fauna", "salvamento fauna", "resgate fauna", "destinacao fauna"],
    summary: "Estabelece critérios para procedimentos relacionados a levantamento, monitoramento, salvamento, resgate e destinação de fauna silvestre no contexto de empreendimentos e atividades.",
    relevance: "É uma das referências federais diretamente relacionadas a estudos e salvamento de fauna.",
    url: "https://www.ibama.gov.br/component/legislacao/?view=legislacao&legislacao=113065",
    verified: "out/2026"
  },
  {
    id: "in-ibama-8-2017",
    title: "IN Ibama nº 8/2017 — Abio",
    scope: "Federal",
    uf: "BR",
    authority: "Ibama",
    themes: ["fauna", "resgate", "afugentamento", "salvamento", "monitoramento", "levantamento", "captura"],
    keywords: ["abio", "captura", "coleta", "transporte material biologico", "afugentamento", "resgate", "levantamento fauna", "monitoramento fauna"],
    summary: "Disciplina a Autorização para Captura, Coleta e Transporte de Material Biológico no licenciamento ambiental federal e define conceitos relacionados a afugentamento, resgate, monitoramento, levantamento e soltura.",
    relevance: "É especialmente relevante quando o manejo de fauna está inserido em processo de licenciamento ambiental federal.",
    url: "https://www.ibama.gov.br/component/legislacao/?view=legislacao&legislacao=137264",
    verified: "out/2026"
  },
  {
    id: "cfbio-706-2024",
    title: "Resolução CFBio nº 706/2024",
    scope: "Federal",
    uf: "BR",
    authority: "Conselho Federal de Biologia",
    themes: ["fauna", "profissional", "manejo", "captura", "soltura"],
    keywords: ["biologo", "biólogo", "fauna", "captura", "contencao", "marcacao", "soltura", "vertebrados"],
    summary: "Padroniza procedimentos de estudo, registro, captura, contenção, marcação, soltura e coleta de animais vertebrados na atuação do Biólogo, com princípios de biossegurança e bem-estar.",
    relevance: "É uma referência profissional quando o serviço envolve procedimentos com fauna vertebrada realizados por Biólogos.",
    url: "https://cfbio.gov.br/2024/07/10/resolucao-no-706-de-22-de-junho-de-2024/",
    verified: "out/2026"
  },
  {
    id: "mma-1704-2026",
    title: "Portaria MMA nº 1.704/2026 — Fauna Ameaçada",
    scope: "Federal",
    uf: "BR",
    authority: "MMA / ICMBio",
    themes: ["fauna", "ameacadas", "levantamento", "monitoramento"],
    keywords: ["especies ameacadas", "extincao", "aves", "anfibios", "repteis", "mamiferos", "invertebrados terrestres"],
    summary: "Atualiza a Lista Nacional Oficial de Espécies da Fauna Ameaçadas de Extinção para invertebrados terrestres, aves, anfíbios, répteis e mamíferos.",
    relevance: "É referência para análise do status de conservação dos registros faunísticos.",
    url: "https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/fauna-brasileira/portarias-fauna-ameacada",
    verified: "out/2026"
  },
  {
    id: "mma-1667-2026",
    title: "Portaria MMA nº 1.667/2026 — Fauna Aquática Ameaçada",
    scope: "Federal",
    uf: "BR",
    authority: "MMA / ICMBio",
    themes: ["fauna", "ameacadas", "levantamento", "monitoramento", "aquaticos"],
    keywords: ["peixes", "invertebrados aquaticos", "especies ameacadas", "extincao", "fauna aquatica"],
    summary: "Atualiza a Lista Nacional Oficial de Espécies da Fauna Ameaçadas de Extinção para peixes e invertebrados aquáticos.",
    relevance: "Deve ser considerada quando o levantamento ou monitoramento incluir fauna aquática.",
    url: "https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/fauna-brasileira/portarias-fauna-ameacada",
    verified: "out/2026"
  },
  {
    id: "ba-10431-2006",
    title: "Lei Estadual nº 10.431/2006 — Bahia",
    scope: "Estadual",
    uf: "BA",
    authority: "Estado da Bahia",
    themes: ["licenciamento", "fauna", "flora", "supressao", "biodiversidade"],
    keywords: ["bahia", "licenciamento", "supressao vegetacao", "fauna", "flora", "biodiversidade"],
    summary: "Institui a Política de Meio Ambiente e de Proteção à Biodiversidade do Estado da Bahia e integra a base estadual para licenciamento, proteção da fauna, flora e demais recursos ambientais.",
    relevance: "É uma referência central para consultas ambientais vinculadas ao licenciamento estadual da Bahia.",
    url: "https://www.ba.gov.br/meioambiente/sites/site-sema/files/migracao_2024/arquivos/File/Legislacao/Leis/lei10431.pdf",
    verified: "out/2026"
  },
  {
    id: "ba-14024-2012",
    title: "Decreto Estadual nº 14.024/2012 — Bahia",
    scope: "Estadual",
    uf: "BA",
    authority: "Estado da Bahia",
    themes: ["licenciamento", "fauna", "flora", "supressao"],
    keywords: ["bahia", "licenciamento", "autorizacao", "vegetacao", "fauna", "flora"],
    summary: "Regulamenta a Política Estadual de Meio Ambiente e disciplina procedimentos relacionados ao licenciamento e às autorizações ambientais no Estado da Bahia.",
    relevance: "Complementa a Lei Estadual nº 10.431/2006 na análise de procedimentos ambientais estaduais.",
    url: "https://www.ba.gov.br/meioambiente/sites/site-sema/files/migracao_2024/arquivos/File/FERFA/Legislacao/novo14024.pdf",
    verified: "out/2026"
  },
  {
    id: "ba-inema-001-2016",
    title: "IN INEMA nº 001/2016 — Manejo de Fauna na Bahia",
    scope: "Estadual",
    uf: "BA",
    authority: "INEMA",
    themes: ["fauna", "resgate", "afugentamento", "salvamento", "monitoramento", "levantamento", "soltura"],
    keywords: ["bahia", "resgate fauna", "afugentamento fauna", "salvamento fauna", "amf", "levantamento fauna", "monitoramento fauna", "soltura"],
    summary: "Estabelece diretrizes, critérios e procedimentos para a Autorização para Manejo de Fauna Silvestre no licenciamento ambiental estadual da Bahia.",
    relevance: "É a principal referência estadual cadastrada nesta base para levantamento, salvamento, afugentamento, resgate, monitoramento e soltura de fauna no licenciamento do INEMA.",
    url: "https://www.ba.gov.br/inema/sites/site-inema/files/migracao_2024/arquivos/wp-content/files/IN_INEMA_n001_2016_-_AMF.pdf",
    verified: "out/2026"
  },
  {
    id: "ba-inema-22129-2021",
    title: "Portaria INEMA nº 22.129/2021 — Destinação de Fauna",
    scope: "Estadual",
    uf: "BA",
    authority: "INEMA",
    themes: ["fauna", "resgate", "soltura", "destinacao", "asas"],
    keywords: ["bahia", "areas de soltura", "asas", "destinacao animais", "resgate fauna", "soltura fauna"],
    summary: "Regulamenta a destinação de animais silvestres e o cadastro de Áreas de Soltura de Animais Silvestres no Estado da Bahia.",
    relevance: "É importante quando a dúvida envolve destinação ou soltura de animais resgatados.",
    url: "https://www.ba.gov.br/inema/sites/site-inema/files/migracao_2024/arquivos/wp-content/files/Portaria_22129-2021_Destinao_Fauna_Silvestre.pdf",
    verified: "out/2026"
  },
  {
    id: "ba-sema-37-2017",
    title: "Portaria SEMA nº 37/2017 — Fauna Ameaçada da Bahia",
    scope: "Estadual",
    uf: "BA",
    authority: "SEMA Bahia",
    themes: ["fauna", "ameacadas", "levantamento", "monitoramento"],
    keywords: ["bahia", "especies ameacadas", "fauna ameacada", "extincao", "levantamento fauna"],
    summary: "Torna pública a Lista Oficial das Espécies da Fauna Ameaçadas de Extinção do Estado da Bahia.",
    relevance: "É referência estadual para identificar espécies ameaçadas registradas em levantamentos e monitoramentos na Bahia.",
    url: "https://gestor.meioambiente.ba.gov.br/Consultas/ConsultaPublicacao/index.php?PaginaMostrada=28&alt=0&ano=&classificacao=&colegiado=&dt_publicacao_inicio=&dt_publicacao_termino=&num_processo=&numero=&order=4&texto=&tipoPublicacao=22&typeOrder=0",
    verified: "out/2026"
  },
  {
    id: "ba-sema-supressao",
    title: "SEMA Bahia — Orientação sobre Supressão de Vegetação Nativa",
    scope: "Estadual",
    uf: "BA",
    authority: "SEMA Bahia",
    themes: ["flora", "supressao", "vegetacao", "autorizacao"],
    keywords: ["bahia", "supressao vegetacao", "cortar arvores", "retirar arvores", "terreno", "asv"],
    summary: "Página institucional da SEMA Bahia informa que a supressão de vegetação nativa depende de autorização do órgão competente e direciona para os procedimentos administrativos aplicáveis.",
    relevance: "É uma referência prática inicial para dúvidas sobre retirada de vegetação nativa na Bahia.",
    url: "https://www.ba.gov.br/meioambiente/117/supressao-de-vegetacao-nativa",
    verified: "out/2026"
  }
];

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
  { topic: "levantamento", terms: ["levantamento","inventario","diagnostico","estudo fauna"] }
];

const relatedServicesByTopic = {
  fauna: [
    ["projeto-manejo-fauna.html", "Resgate de Fauna Silvestre"],
    ["levantamento-faunistico.html", "Levantamento Faunístico"],
    ["plano-salvamento-fauna-silvestre.html", "Plano para Salvamento de Fauna"]
  ],
  supressao: [
    ["projeto-inventario-florestal.html", "Inventário Florestal"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  licenciamento: [
    ["index.html#servicos", "Licenciamento Ambiental"],
    ["projeto-elaboracao-mapas.html", "Elaboração de Mapas"],
    ["index.html#contato", "Avaliação técnica da demanda"]
  ],
  levantamento: [
    ["levantamento-faunistico.html", "Levantamento Faunístico"],
    ["projeto-monitoramento-fauna.html", "Monitoramento de Fauna"]
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
    .filter(law => !uf || law.uf === "BR" || law.uf === uf)
    .map(law => ({ law, score: scoreLaw(law, query, topics) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.law.scope === "Estadual" ? -1 : 1));

  resultsTitle.textContent = scored.length
    ? scored.length + (scored.length === 1 ? " referência encontrada" : " referências encontradas")
    : "Nenhuma referência cadastrada foi localizada";

  const stateText = uf ? " • Estado selecionado: " + legalStateNames[uf] : "";
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