const senhaCorreta = "1234";

const relatorios = [
  {
    nome: "Suporte do Siat",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNTkxYWNkOWUtYmQyZC00ZjJmLWE4YjYtMWQ4YzViN2U2ZDNjIiwidCI6IjlmYjUxODkzLTdhM2UtNGM4NC05OGQ3LWY5ZWVmNTgwNWU3ZCJ9",
    categoria: "gerenciaadministrativa",
    descricao: "Análise dos indicadores de produtividade do setor de suporte do siat.",
  },
  {
    nome: "Relatório do Projeto",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNTkxYWNkOWUtYmQyZC00ZjJmLWE4YjYtMWQ4YzViN2U2ZDNjIiwidCI6IjlmYjUxODkzLTdhM2UtNGM4NC05OGQ3LWY5ZWVmNTgwNWU3ZCJ9",
    categoria: "analiseprojeto",
    descricao: "Análise dos indicadores de produtividade do setor de suporte do siat.",
  },
  {
    nome: "Relatório da Gerência de Vistoria",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNTkxYWNkOWUtYmQyZC00ZjJmLWE4YjYtMWQ4YzViN2U2ZDNjIiwidCI6IjlmYjUxODkzLTdhM2UtNGM4NC05OGQ3LWY5ZWVmNTgwNWU3ZCJ9",
    categoria: "gerenciavistoria",
    descricao: "Análise dos indicadores de produtividade do setor de suporte do siat.",
  },
  {
    nome: "Relatório da Normas e Cadastros",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNTkxYWNkOWUtYmQyZC00ZjJmLWE4YjYtMWQ4YzViN2U2ZDNjIiwidCI6IjlmYjUxODkzLTdhM2UtNGM4NC05OGQ3LWY5ZWVmNTgwNWU3ZCJ9",
    categoria: "normascadastro",
    descricao: "Análise dos indicadores de produtividade do setor de suporte do siat.",
  },
  {
    nome: "Relatório da Perícia de Incêndio",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNTkxYWNkOWUtYmQyZC00ZjJmLWE4YjYtMWQ4YzViN2U2ZDNjIiwidCI6IjlmYjUxODkzLTdhM2UtNGM4NC05OGQ3LWY5ZWVmNTgwNWU3ZCJ9",
    categoria: "periciaincendio",
    descricao: "Análise dos indicadores de produtividade do setor de suporte do siat.",
  },
  
];

function autenticar() {
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erroSenha");
  if (senha === senhaCorreta) {
    document.getElementById("loginDiv").classList.add("hidden");
    document.getElementById("conteudo").classList.remove("hidden");
    filtrarRelatorios();
  } else {
    erro.textContent = "Senha incorreta. Tente novamente.";
  }
}

function filtrarRelatorios() {
  const categoria = document
    .getElementById("categoriaSelect")
    .value.toLowerCase();
  const busca = document.getElementById("buscaInput").value.toLowerCase();
  const cardsDiv = document.getElementById("cards");
  cardsDiv.innerHTML = "";

  const filtrados = relatorios.filter((r) => {
    return (
      (!categoria || r.categoria === categoria) &&
      (!busca || r.nome.toLowerCase().includes(busca))
    );
  });

  if (filtrados.length === 0) {
    cardsDiv.innerHTML = "<p>Nenhum relatório encontrado.</p>";
  }

  filtrados.forEach((rel) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${rel.nome}</h4>
      <p><strong>Descrição:</strong> ${rel.descricao}</p>
      <p class="categoria-tag">${formatarCategoria(rel.categoria)}</p>
    `;
    card.onclick = () => mostrarRelatorio(rel.url);
    cardsDiv.appendChild(card);
  });
}

function formatarCategoria(categoria) {
  const categoriasFormatadas = {
    periciaincendio: "Perícia de Incêndio",
    analiseprojeto: "Análise de Projetos",
    normascadastro: "Normas e Cadastros",
    gerenciavistoria: "Gerência de Vistoria",
    gerenciaadministrativa: "Gerencia Administrativa",
  };

  return categoriasFormatadas[categoria] || categoria.charAt(0).toUpperCase() + categoria.slice(1);
}

function mostrarRelatorio(url) {
  if (!url.startsWith("https://app.powerbi.com/")) {
    alert("URL inválida para visualização.");
    return;
  }
  document.getElementById("conteudo").classList.add("hidden");
  const relatorioView = document.getElementById("relatorioView");
  document.getElementById("relatorioIframe").src = url;
  relatorioView.style.display = "flex";
}

function voltarParaLista() {
  document.getElementById("relatorioView").style.display = "none";
  document.getElementById("relatorioIframe").src = "";
  document.getElementById("conteudo").classList.remove("hidden");
}

function atualizaDataHora() {
  const dataHora = new Date().toLocaleString("pt-BR");
  document.getElementById("dataHora").textContent = dataHora;
}
atualizaDataHora();
setInterval(atualizaDataHora, 1000);
