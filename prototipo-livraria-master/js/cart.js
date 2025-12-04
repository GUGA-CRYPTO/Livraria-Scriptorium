document.addEventListener('DOMContentLoaded', function () {
  const gradeCarrinho = document.getElementById('cart-grid');
  const elementoTotalCarrinho = document.getElementById('cart-total-value');
  const botaoFinalizar = document.getElementById('finalize-button');


  const usuario = localStorage.getItem('loggedUser');
  if (!usuario) {
    window.location.href = './login.html';
    return;
  }

  const chaveCarrinho = `cart_${usuario}`;


  function obterCarrinho() {
    return JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
  }

  function salvarCarrinho(carrinho) {
    localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
  }

  function obterColecao() {
    const chaveColecao = `collection_${usuario}`;
    return JSON.parse(localStorage.getItem(chaveColecao)) || [];
  }

  function salvarColecao(colecao) {
    const chaveColecao = `collection_${usuario}`;
    localStorage.setItem(chaveColecao, JSON.stringify(colecao));
  }

  function criarCartaoLivroHTML(livro) {
    return `
      <div class="book-card">
        <img src="${livro.cover}" alt="Capa do livro ${livro.title}" class="book-cover">
        <h3 class="book-title">${livro.title}</h3>
        <p class="book-author">${livro.author}</p>
        <div class="book-footer">
          <p class="book-price">R$ ${livro.price.toFixed(2).replace('.', ',')}</p>
          <button class="remove-button" data-title="${livro.title}">Remover</button>
        </div>
      </div>
    `;
  }

  
  function renderizarCarrinho() {
    const carrinho = obterCarrinho();
    if (!gradeCarrinho) return; 

    gradeCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
      gradeCarrinho.innerHTML = '<p class="empty-collection-message">Seu carrinho está vazio.</p>';
      atualizarPrecoTotal(0); 
      return;
    }

    const precoTotal = carrinho.reduce((soma, livro) => soma + livro.price, 0);
    
    const todosOsCardsHTML = carrinho.map(livro => criarCartaoLivroHTML(livro)).join('');

    gradeCarrinho.innerHTML = todosOsCardsHTML;
    atualizarPrecoTotal(precoTotal);
    adicionarListenersAosBotoesRemover();
  }


  function atualizarPrecoTotal(total) {
    if (elementoTotalCarrinho) {
      elementoTotalCarrinho.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }

  function removerDoCarrinhoPorTitulo(titulo) {
    const carrinho = obterCarrinho();
    const novoCarrinho = carrinho.filter(livro => livro.title !== titulo);
    salvarCarrinho(novoCarrinho);
    renderizarCarrinho(); 
  }

  function adicionarListenersAosBotoesRemover() {
    const botoesRemover = document.querySelectorAll('.remove-button');
    botoesRemover.forEach(botao => {
      botao.addEventListener('click', (evento) => {
        const titulo = evento.currentTarget.getAttribute('data-title');
        removerDoCarrinhoPorTitulo(titulo);
      });
    });
  }

  
  botaoFinalizar.addEventListener('click', () => {
    const carrinho = obterCarrinho();
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    const colecao = obterColecao();

    carrinho.forEach(livroDoCarrinho => {
      const existe = colecao.some(c => c.title === livroDoCarrinho.title);
      if (!existe) colecao.push(livroDoCarrinho);
    });

    salvarColecao(colecao);
    salvarCarrinho([]); 

    alert('Compra finalizada (fictícia). Os livros foram adicionados à sua coleção.');
    window.location.href = './collection.html';
  });

  renderizarCarrinho();
});
