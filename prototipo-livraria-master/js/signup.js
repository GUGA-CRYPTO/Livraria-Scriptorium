document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signup-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordConfirmInput = document.getElementById('passwordConfirm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = (emailInput.value || '').trim().toLowerCase();
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (!name || !email || !password) return;
    if (password !== passwordConfirm) {
      alert('As senhas não coincidem.');
      return;
    }

    const usuarios = obterUsuarios();
    if (usuarios.some(u => u.email.toLowerCase() === email)) {
      alert('Já existe uma conta com este e-mail.');
      return;
    }

    const novoUsuario = { name: name, email: email, password: password };
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    // Inicializa chaves do usuário
    const chaveCarrinho = `cart_${email}`;
    const chaveColecao = `collection_${email}`;
    if (!localStorage.getItem(chaveCarrinho)) localStorage.setItem(chaveCarrinho, JSON.stringify([]));
    if (!localStorage.getItem(chaveColecao)) localStorage.setItem(chaveColecao, JSON.stringify([]));

    alert('Conta criada com sucesso. Faça login.');
    window.location.href = './login.html';
  });
});
