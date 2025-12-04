document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  if (!form || !emailInput || !passwordInput) return; 

  
  function iniciarSessao(emailUsuario) {
    localStorage.setItem('loggedUser', emailUsuario);
    
    const chaveCarrinho = `cart_${emailUsuario}`;
    const chaveColecao = `collection_${emailUsuario}`;
    if (!localStorage.getItem(chaveCarrinho)) localStorage.setItem(chaveCarrinho, JSON.stringify([]));
    if (!localStorage.getItem(chaveColecao)) localStorage.setItem(chaveColecao, JSON.stringify([]));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    if (!email || !password) return; 

    const usuarios = obterUsuarios();
    const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === email);
    if (!usuarioEncontrado) {
      alert('Usuário não encontrado. Cadastre-se primeiro.');
      return;
    }

    if (usuarioEncontrado.password !== password) {
      alert('Senha incorreta.');
      return;
    }

    iniciarSessao(usuarioEncontrado.email);
    window.location.href = './codex.html';
  });
});
