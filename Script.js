/* =========================================================
   BOLETIM DIGITAL - 9º ANO
   Dados fictícios para demonstração.
   ========================================================= */

/* ---------------------------------------------------------
   CONCEITO: ARRAY e OBJETO
   - Array = uma lista, representada por [ ... ]
   - Objeto = um "pacote" com várias informações, { chave: valor }
   Aqui temos um array de objetos: cada objeto é uma disciplina.
--------------------------------------------------------- */
const disciplinas = [
  { disciplina: "Língua Portuguesa", tri1: 78, tri2: "8,2", tri3: 8.6, faltas: [2, 2, 1] },
  { disciplina: "Matemática", tri1: 55, tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências", tri1: 84, tri2: 7.9, tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História", tri1: "7,1", tri2: 82, tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia", tri1: 69, tri2: "7,5", tri3: 7.8, faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 88, tri2: 8.4, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte", tri1: "9,2", tri2: 87, tri3: 9.0, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 96, tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 91, tri2: 8.9, tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira", tri1: 76, tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática", tri1: 58, tri2: "5,9", tri3: 6.2, faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72, tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 49, tri2: 5.5, tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento", tri1: "8,0", tri2: 84, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais", tri1: 64, tri2: "6,6", tri3: 7.0, faltas: [1, 1, 1] }
];

/* Constante que define a média mínima de referência */
const MEDIA_MINIMA = 6.0;

/* ---------------------------------------------------------
   CONCEITO: FUNÇÃO
   - Função = um bloco de código com nome que faz uma tarefa.
   Esta função transforma qualquer nota recebida na escala 0 a 10.
   Regras:
   - vazio/null/undefined  -> null (nota ainda não lançada)
   - 0 a 10                -> fica igual
   - 10 a 100              -> divide por 10
   - aceita vírgula ou ponto
   - valores fora das regras -> null (inválido)
--------------------------------------------------------- */
function normalizarNota(valor) {
  // Nota ainda não lançada
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Se for texto, troca vírgula por ponto para poder converter
  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }

  // Converte para número
  const numero = Number(valor);

  // CONCEITO: if
  // Verifica se é um número válido
  if (isNaN(numero)) {
    return null;
  }

  // Regra: entre 0 e 10 fica igual
  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  // Regra: maior que 10 e até 100 divide por 10
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  // Fora das regras = inválido
  return null;
}

/* ---------------------------------------------------------
   FUNÇÃO: formatarNota
   Mostra a nota com 1 casa decimal (ex: 8,5).
   Se for null, mostra "Ainda não lançada".
--------------------------------------------------------- */
function formatarNota(nota) {
  if (nota === null) {
    return '<span class="nota-vazia">Ainda não lançada</span>';
  }
  // toFixed(1) deixa com 1 casa decimal; replace troca ponto por vírgula
  return nota.toFixed(1).replace(".", ",");
}

/* ---------------------------------------------------------
   FUNÇÃO: calcularMedia
   Recebe um array de notas (já normalizadas) e calcula a média
   usando SOMENTE as notas válidas.
--------------------------------------------------------- */
function calcularMedia(notas) {
  // Filtra apenas as notas que não são null
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  // Se não houver nenhuma nota válida, retorna null
  if (validas.length === 0) {
    return null;
  }

  // Soma todas as notas válidas
  let soma = 0;
  validas.forEach(function (n) {
    soma += n;
  });

  // Divide pela quantidade de notas válidas
  return soma / validas.length;
}

/* ---------------------------------------------------------
   FUNÇÃO: somarFaltas
   Recebe um array de faltas e devolve a soma total.
--------------------------------------------------------- */
function somarFaltas(faltas) {
  let total = 0;
  faltas.forEach(function (f) {
    total += f;
  });
  return total;
}

/* ---------------------------------------------------------
   FUNÇÃO: definirSituacao
   Decide a situação da disciplina com base na média.
--------------------------------------------------------- */
function definirSituacao(media) {
  if (media === null) {
    return { texto: "Nota ainda não disponível", classe: "situacao-indisponivel" };
  }
  if (media >= MEDIA_MINIMA) {
    return { texto: "Bom desempenho", classe: "situacao-bom" };
  }
  return { texto: "Atenção", classe: "situacao-atencao" };
}

/* ---------------------------------------------------------
   FUNÇÃO: processarDisciplinas
   Percorre o array de disciplinas, normaliza as notas,
   calcula média, soma faltas e situação.
   Devolve um novo array já tratado.
--------------------------------------------------------- */
function processarDisciplinas(lista) {
  return lista.map(function (item) {
    // Normaliza cada trimestre
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);

    // Calcula a média somente com as notas disponíveis
    const media = calcularMedia([n1, n2, n3]);

    // Soma as faltas dos 3 trimestres
    const totalFaltas = somarFaltas(item.faltas);

    // Define a situação
    const situacao = definirSituacao(media);

    // Devolve um objeto novo com tudo organizado
    return {
      disciplina: item.disciplina,
      tri1: n1,
      tri2: n2,
      tri3: n3,
      media: media,
      faltas: totalFaltas,
      situacao: situacao
    };
  });
}

/* =========================================================
   CONCEITO: DOM
   DOM é a forma como o JavaScript "enxerga" o HTML.
   Com document.getElementById("...") conseguimos pegar
   elementos da página e alterá-los.
   ========================================================= */

/* Guarda os dados já processados */
const dadosProcessados = processarDisciplinas(disciplinas);

/* ---------------------------------------------------------
   FUNÇÃO: preencherTabela
   Cria as linhas da tabela automaticamente.
--------------------------------------------------------- */
function preencherTabela(dados) {
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = ""; // limpa antes de preencher

  // CONCEITO: forEach
  // Percorre cada item do array executando uma função.
  dados.forEach(function (item) {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${item.disciplina}</td>
      <td>${formatarNota(item.tri1)}</td>
      <td>${formatarNota(item.tri2)}</td>
      <td>${formatarNota(item.tri3)}</td>
      <td>${formatarNota(item.media)}</td>
      <td>${item.faltas}</td>
      <td class="${item.situacao.classe}">${item.situacao.texto}</td>
    `;

    corpo.appendChild(linha);
  });
}

/* ---------------------------------------------------------
   FUNÇÃO: criarCard
   Cria o HTML de um card de resumo.
--------------------------------------------------------- */
function criarCard(titulo, valor, classeExtra) {
  const classe = classeExtra ? "card " + classeExtra : "card";
  return `
    <div class="${classe}">
      <h3>${titulo}</h3>
      <div class="valor">${valor}</div>
    </div>
  `;
}

/* ---------------------------------------------------------
   FUNÇÃO: preencherResumo
   Calcula os totais e monta os cards do topo.
--------------------------------------------------------- */
function preencherResumo(dados) {
  const area = document.getElementById("areaResumo");

  // --- Média geral (média das médias disponíveis) ---
  const mediasValidas = dados
    .map(function (d) { return d.media; })
    .filter(function (m) { return m !== null; });

  let mediaGeral = null;
  if (mediasValidas.length > 0) {
    let soma = 0;
    mediasValidas.forEach(function (m) { soma += m; });
    mediaGeral = soma / mediasValidas.length;
  }

  // --- Total de faltas (soma de todas as disciplinas) ---
  let totalFaltas = 0;
  dados.forEach(function (d) { totalFaltas += d.faltas; });

  // --- Contagem de situações ---
  let bomDesempenho = 0;
  let atencao = 0;

  dados.forEach(function (d) {
    if (d.situacao.texto === "Bom desempenho") bomDesempenho++;
    if (d.situacao.texto === "Atenção") atencao++;
  });

  // --- Frequência FICTÍCIA de 92% (apenas demonstração) ---
  // ATENÇÃO: este valor é apenas ilustrativo nesta versão.
  // No futuro, a frequência será calculada de outra forma.
  const frequenciaFicticia = "92%";

  // Monta todos os cards
  let html = "";
  html += criarCard("Média Geral", mediaGeral !== null ? mediaGeral.toFixed(1).replace(".", ",") : "—");
  html += criarCard("Total de Faltas", totalFaltas);
  html += criarCard("Bom Desempenho", bomDesempenho + " disciplinas");
  html += criarCard("Precisam de Atenção", atencao + " disciplinas", atencao > 0 ? "atencao" : "");
  html += criarCard("Frequência", frequenciaFicticia + " — adequada");

  area.innerHTML = html;
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO
   Aqui o site começa a funcionar de verdade.
--------------------------------------------------------- */
preencherResumo(dadosProcessados);
preencherTabela(dadosProcessados);