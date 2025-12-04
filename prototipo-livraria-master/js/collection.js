document.addEventListener('DOMContentLoaded', function () {
  const gradeDeLivros = document.getElementById('book-grid');
  if (!gradeDeLivros) return;

  const usuario = localStorage.getItem('loggedUser');
  if (!usuario) {
    window.location.href = './login.html';
    return; 
  }

  const chaveColecao = `collection_${usuario}`;

  function obterColecao() {
    return JSON.parse(localStorage.getItem(chaveColecao)) || [];
  }


  function criarCartaoLivroHTML(livro) {
    return `
      <div class="book-card">
        <img src="${livro.cover}" alt="Capa do livro ${livro.title}" class="book-cover">
        <h3 class="book-title">${livro.title}</h3>
        <p class="book-author">${livro.author}</p>
        <p class="book-description">${livro.description}</p>
        <div class="book-footer">
          <button class="read-button">Ler Livro</button>
        </div>
      </div>
    `;
  }

  function renderizarColecao() {
    const colecao = obterColecao();
    gradeDeLivros.innerHTML = ''; 

    if (colecao.length === 0) {
      gradeDeLivros.innerHTML = '<p class="empty-collection-message">Sua coleção está vazia. Adicione livros do Códice para começar.</p>';
    } else {
      const todosOsCardsHTML = colecao.map(livro => criarCartaoLivroHTML(livro)).join('');
      gradeDeLivros.innerHTML = todosOsCardsHTML;
    }
  }

  renderizarColecao();
});