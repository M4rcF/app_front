const form = document.getElementById('sign-up-form');

if (form) {
  const cellphoneInput = document.getElementById('cellphone')
  const cpfInput = document.getElementById('cpf')

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      name: document.getElementById('name').value,
      cpf: document.getElementById('cpf').value,
      cellphone: cellphoneInput.value,
    };

    try {
      await authentication.postSignUp(user);
      alert('Usuário cadastrado com sucesso!');

      parent.postMessage('register', '*')
    } catch (error) {
      alert('Erro ao cadastrar. Por favor, tente novamente.');
      console.error(error.message);
    }
  });

  cellphoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
  });

  cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2'); // Adiciona o hífen
    e.target.value = value;
  });
} else {
  console.error('Formulário não encontrado.');
}
