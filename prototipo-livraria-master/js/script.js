const livros = [
  {
    title: "O Morro dos Ventos Uivantes",
    author: "por Emily Brontë",
    description:
      "Uma história de amor e vingança que atravessa gerações na sombria charneca inglesa.",
    cover:
      "https://cdl-static.s3-sa-east-1.amazonaws.com/covers/gg/9788582851425/o-morro-dos-ventos-uivantes.jpg",
    price: 45.5,
  },
  {
    title: "Frankenstein",
    author: "por Mary Shelley",
    description:
      "A trágica história de Victor Frankenstein e sua monstruosa criação, explorando os limites da ciência e da humanidade.",
    cover:
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982146160/frankenstein-9781982146160_hr.jpg",
    price: 39.9,
  },
  {
    title: "O Retrato de Dorian Gray",
    author: "por Oscar Wilde",
    description:
      "Um jovem vende sua alma pela juventude eterna, mergulhando em uma vida de depravação enquanto seu retrato envelhece.",
    cover:
      "https://epubpdfgratis.com/wp-content/uploads/2024/07/O-retrato-de-Dorian-Gray.jpg",
    price: 42.0,
  },
  {
    title: "Drácula",
    author: "por Bram Stoker",
    description:
      "O romance epistolar que define o vampiro moderno, uma obra-prima do horror gótico sobre a luta contra a sedução das trevas.",
    cover:
      "https://darkside.vtexassets.com/arquivos/ids/171649/197-2-dracula-de-bram-stoker-dark-edition--2-.jpg?v=637327496337100000",
    price: 55.99,
  },
  {
    title: "O Corvo",
    author: "por Edgar Allan Poe",
    description:
      "Um poema narrativo sombrio e melancólico sobre a visita de um corvo falante a um amante enlutado.",
    cover: "https://m.media-amazon.com/images/I/91GKn4g3fML.jpg",
    price: 29.9,
  },
  {
    title: "A Divina Comédia",
    author: "por Dante Alighieri",
    description:
      "Uma jornada épica pela alma humana, guiada através do Inferno, Purgatório e Paraíso em busca da redenção.",
    cover:
      "https://images.dlivros.org/Dante-Aliguieri/divina-comedia-obra-completa-ilustrada-dante-aliguieri_large.webp",
    price: 75.0,
  },
  {
    title: "Dom Quixote",
    author: "por Miguel de Cervantes",
    description: "Um lindo livro",
    cover: "https://images-na.ssl-images-amazon.com/images/I/91d0tA2ScaL.jpg",
    price: 80.0,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const gradeDeLivros = document.getElementById("book-grid");
  const campoDeBusca = document.getElementById("search-input");

  if (!gradeDeLivros) return;

  function obterColecaoDoUsuario() {
    const usuario = localStorage.getItem("loggedUser");
    const chave = usuario ? `collection_${usuario}` : "bookCollection";
    return JSON.parse(localStorage.getItem(chave)) || [];
  }

  function criarCartaoLivroHTML(livro) {
    return `
            <div class="book-card">
                <img src="${livro.cover}" 
                alt="Capa do livro ${livro.title}" class="book-cover">
                <h3 class="book-title">${livro.title}</h3>
                <p class="book-author">${livro.author}</p>
                <p class="book-description">${livro.description}</p>
                <div class="book-footer">
                    <p class="book-price">R$ ${livro.price
                      .toFixed(2)
                      .replace(".", ",")}</p>
                    <button class="add-button" data-title="${
                      livro.title
                    }">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
  }

  function renderizarLivrosDoCodice(livrosParaRenderizar) {
    gradeDeLivros.innerHTML = "";

    if (!livrosParaRenderizar || livrosParaRenderizar.length === 0) {
      gradeDeLivros.innerHTML =
        '<p class="empty-collection-message">Nenhum livro encontrado com este título.</p>';
      return;
    }

    const colecao = obterColecaoDoUsuario();

    const todosOsCardsHTML = livrosParaRenderizar
      .map((livro) => criarCartaoLivroHTML(livro))
      .join("");
    gradeDeLivros.innerHTML = todosOsCardsHTML;

    adicionarListenersAosBotoesAdicionar();
  }

  function adicionarListenersAosBotoesAdicionar() {
    const botoesAdicionar = document.querySelectorAll(".add-button");
    botoesAdicionar.forEach((botao) => {
      botao.addEventListener("click", (evento) => {
        const tituloDoLivro = evento.currentTarget.getAttribute("data-title");
        adicionarAoCarrinho(tituloDoLivro);
        renderizarLivrosDoCodice(livros);
      });
    });
  }

  
  function adicionarAoCarrinho(titulo) {
    const usuario = localStorage.getItem("loggedUser");
    if (!usuario) {
      window.location.href = "./login.html";
      return;
    }

    const livroParaAdicionar = livros.find((livro) => livro.title === titulo);
    if (!livroParaAdicionar) return;

    const chaveCarrinho = `cart_${usuario}`;
    const carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
    const jaEstaNoCarrinho = carrinho.some((b) => b.title === titulo);

    if (jaEstaNoCarrinho) {
      alert("Este livro já está no carrinho!");
      return;
    }

    carrinho.push(livroParaAdicionar);
    localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
    alert(`"${titulo}" foi adicionado ao Carrinho de Compras!`);
  }

  function lidarComBusca() {
    const termoDeBusca = (
      campoDeBusca && campoDeBusca.value ? campoDeBusca.value : ""
    ).toLowerCase();
    const livrosFiltrados = livros.filter((livro) =>
      livro.title.toLowerCase().includes(termoDeBusca)
    );
    renderizarLivrosDoCodice(livrosFiltrados);
  }

  if (campoDeBusca) campoDeBusca.addEventListener("input", lidarComBusca);

  renderizarLivrosDoCodice(livros);
});
