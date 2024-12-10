const token = sessionStorage.getItem('token');
const logoutButton = document.getElementById('logout-button');

if (token) {
  document.querySelector('.nav-login').style.display='none'
} else {
  document.getElementById('nav-users').style.display='none'
}

if (logoutButton && token) {
  logoutButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      await authentication.postLogout(token);
      alert('Usuário deslogado com sucesso!');

      sessionStorage.removeItem('token');

      window.location.reload();
    } catch (error) {
      alert('Erro ao deslogar. Por favor, tente novamente.');
      console.error(error.message);
    }
  });
}