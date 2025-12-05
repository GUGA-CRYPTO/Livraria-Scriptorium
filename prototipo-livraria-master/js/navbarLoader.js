
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('navbar-container');
  if (!container) return; 

  function getLoggedEmail() {
    return localStorage.getItem('loggedUser');
  }

  function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = './index.html';
  }

  
  function initNavbar() {
    const loginLink = container.querySelector('#nav-login');
    const cartCountSpan = container.querySelector('#cart-count');
    const email = getLoggedEmail();

  
    if (loginLink) {
      if (email) {
        const usuarios = obterUsuarios(); 
        const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (usuario) {
          loginLink.textContent = `Olá, ${usuario.name}`;
          loginLink.href = './collection.html';
    
          if (!container.querySelector('#nav-logout')) {
            const sep = document.createTextNode(' | ');
            const out = document.createElement('a');
            out.id = 'nav-logout';
            out.href = '#';
            out.textContent = 'Sair';
            out.addEventListener('click', (e) => { e.preventDefault(); logout(); });
            loginLink.parentNode.insertBefore(sep, loginLink.nextSibling);
            loginLink.parentNode.insertBefore(out, loginLink.nextSibling.nextSibling);
          }
          
        } else {
          localStorage.removeItem('loggedUser');
          loginLink.textContent = 'Login';
          loginLink.href = './login.html';
        }
      } else {
        loginLink.textContent = 'Login';
        loginLink.href = './login.html';
      }
    }

    if (cartCountSpan) {
      const count = email ? (JSON.parse(localStorage.getItem(`cart_${email}`)) || []).length : (JSON.parse(localStorage.getItem('guestCart')) || []).length;
      cartCountSpan.textContent = count;
    }


    const hamburger = container.querySelector('.hamburger-menu');
    const navLinks = container.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.addEventListener('click', () => {
        const aberto = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      });


      for (const a of navLinks.querySelectorAll('a')) {
        a.addEventListener('click', () => {
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      }
    }
  }

  fetch('./navbar.html')
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
      initNavbar();
    })
    .catch(() => { container.innerHTML = '<nav>Erro ao carregar menu.</nav>'; });
});
