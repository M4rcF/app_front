const form = document.getElementById('login-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    try {
      const response = await authentication.postLogin(user);
      alert('Usuário logado com sucesso!');

      sessionStorage.setItem('token', response.token);

      parent.postMessage('login', '*');
    } catch (error) {
      alert('Erro ao logar. Por favor, verifique email e senha.');
      console.error(error.message);
    }
  });
} else {
  console.error('Formulário não encontrado.');
}
