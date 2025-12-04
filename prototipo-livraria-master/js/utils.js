
function obterUsuarios() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem('users', JSON.stringify(usuarios));
}