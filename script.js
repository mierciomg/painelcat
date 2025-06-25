const relatorios = [
    {
    nome: "Indicadores Suporte Siat",
    descricao: "Indicadores de produtividade do setor de suporte do siat.",
    setor: "gerenciaadministrativa",
    setor_nome: "Gerência Administrativa",
    url: "https://app.powerbi.com/view?r=eyJrIjoiNTkxYWNkOWUtYmQyZC00ZjJmLWE4YjYtMWQ4YzViN2U2ZDNjIiwidCI6IjlmYjUxODkzLTdhM2UtNGM4NC05OGQ3LWY5ZWVmNTgwNWU3ZCJ9"
  },
  {
    nome: "Relatório de Projetos 2025",
    descricao: "Análise dos projetos recebidos no primeiro semestre.",
    setor: "analiseprojeto",
    setor_nome: "Análise de Projetos",
    url: "relatorios/projetos2025.html"
  },
  {
    nome: "Relatório de Projetos 2025",
    descricao: "Análise dos projetos recebidos no primeiro semestre.",
    setor: "analiseprojeto",
    setor_nome: "Análise de Projetos",
    url: "relatorios/projetos2025.html"
  },
  {
    nome: "Vistorias Janeiro",
    descricao: "Relatório de vistorias realizadas em janeiro.",
    setor: "gerenciavistoria",
    setor_nome: "Gerência de Vistoria",
    url: "relatorios/vistorias_jan.html"
  },
  {
    nome: "Cadastro Normas",
    descricao: "Listagem e atualizações de normas técnicas.",
    setor: "normascadastro",
    setor_nome: "Normas e Cadastros",
    url: "relatorios/normas.html"
  },
  {
    nome: "Perícia Q1",
    descricao: "Indicadores de perícias realizadas no 1º trimestre.",
    setor: "periciaincendio",
    setor_nome: "Perícia de Incêndio",
    url: "relatorios/pericia_q1.html"
  }
];

function renderizarRelatorios(filtrados) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  const iconesPorSetor = {
    analiseprojeto: "📐",
    gerenciaadministrativa: "📊",
    gerenciavistoria: "📝",
    normascadastro: "📚",
    periciaincendio: "🔥"
  };

  if (filtrados.length === 0) {
    container.innerHTML = "<p>Nenhum relatório encontrado.</p>";
    return;
  }

  filtrados.forEach((relatorio) => {
    const card = document.createElement("div");
    card.className = `card ${relatorio.setor}`;
    const icone = iconesPorSetor[relatorio.setor] || "📄";

    card.innerHTML = `
      <h3><span class="card-icon">${icone}</span> ${relatorio.nome}</h3>
      <p><strong>Descrição:</strong> ${relatorio.descricao}</p>
      <p><strong>Setor:</strong> ${relatorio.setor_nome}</p>
      <button onclick="abrirRelatorio('${relatorio.url}')">Visualizar</button>
    `;
    container.appendChild(card);
  });
}

function filtrarRelatorios() {
  const categoria = document.getElementById("categoriaSelect").value.toLowerCase();
  const busca = document.getElementById("buscaInput").value.toLowerCase();

  const filtrados = relatorios.filter((r) => {
    return (
      (categoria === "" || r.setor === categoria) &&
      r.nome.toLowerCase().includes(busca)
    );
  });

  renderizarRelatorios(filtrados);
}

function abrirRelatorio(url) {
  document.getElementById("conteudo").style.display = "none";
  document.getElementById("relatorioView").style.display = "block";
  document.getElementById("relatorioIframe").src = url;
  document.querySelector("footer").style.display = "none";
}

function voltarParaLista() {
  document.getElementById("relatorioView").style.display = "none";
  document.getElementById("relatorioIframe").src = "";
  document.getElementById("conteudo").style.display = "block";
  document.querySelector("footer").style.display = "block";
}

function atualizarDataHora() {
  const agora = new Date();
  document.getElementById("dataHora").textContent = agora.toLocaleString("pt-BR");
}

window.onload = () => {
  atualizarDataHora();
  renderizarRelatorios(relatorios);
};
