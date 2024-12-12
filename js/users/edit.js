try {
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalButton = document.getElementById('closeModal');
  const editForm = document.getElementById('editForm');
  
  const emailInput = document.getElementById('email');
  const nomeInput = document.getElementById('nome');
  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const isAdminSelect = document.getElementById('is_admin');
  
  let currentUserId = null;
  
  tbody.addEventListener('click', (event) => {
    if (event.target.classList.contains('editar')) {
      const userId = event.target.dataset.editId;
      currentUserId = userId;
  
      const user = users.find((u) => u.id == userId);
      if (user) {
          emailInput.value = user.email;
          nomeInput.value = user.individual.name;
          cpfInput.value = user.individual.cpf;
          telefoneInput.value = user.individual.cellphone;
          isAdminSelect.value = user.is_admin ? "sim" : "nao";
      }
  
      modalOverlay.style.display = 'flex';
    }
  });
  
  // Fecha o modal
  closeModalButton.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
  });
  
  // Salva as alterações
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const updatedUser = {
        email: emailInput.value,
        name: nomeInput.value,
        cpf: cpfInput.value,
        cellphone: telefoneInput.value,
        is_admin: isAdminSelect.value === "sim",
    };
  
    // Atualiza o usuário no servidor (mock)
    await api.putUser(currentUserId, updatedUser);
  
    alert('Usuário atualizado com sucesso!');
    modalOverlay.style.display = 'none';
  
    parent.postMessage('reload', '*')
  });

  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses ao DDD
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen no número
    e.target.value = value;
  });

  cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2'); // Adiciona o hífen
    e.target.value = value;
  });
} catch (error) {
  console.error(`Error ${error}`)
}