const form = document.getElementById('sign-up-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      name: document.getElementById('name').value,
      cpf: document.getElementById('cpf').value,
      cellphone: document.getElementById('cellphone').value,
    };

    try {
      const response = await authentication.postSignUp(user);
      alert('Usuário cadastrado com sucesso!');

      form.reset();
    } catch (error) {
      alert('Erro ao cadastrar. Por favor, tente novamente.');
      console.error(error.message);
    }
  });
} else {
  console.error('Formulário não encontrado.');
}
