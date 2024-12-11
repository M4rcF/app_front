console.log('token', token);

if (!token) {
  console.log('oi');
  parent.postMessage('blocked', '*')
}


document.addEventListener('DOMContentLoaded', async () => {
  const response = await api.getUsers();
  const tbody = document.getElementById('tbody-list');
  tbody.innerHTML = '';

  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalButton = document.getElementById('closeModal');
  const editForm = document.getElementById('editForm');

  const emailInput = document.getElementById('email');
  const nomeInput = document.getElementById('nome');
  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const isAdminSelect = document.getElementById('is_admin');

  let currentUserId = null;

  // Popula a tabela de usuários
  response.users.forEach((user) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${user.id}</td>
          <td>${user.email}</td>
          <td>${user.individual.name}</td>
          <td>${user.individual.cpf}</td>
          <td>${user.individual.cellphone}</td>
          <td>${user.is_admin}</td>
          <td>
              <button class="editar" data-edit-id="${user.id}">Editar</button>
          </td>
      `;
      tbody.appendChild(tr);
  });

  // Abre o modal ao clicar em "Editar"
  tbody.addEventListener('click', (event) => {
      if (event.target.classList.contains('editar')) {
          const userId = event.target.dataset.editId;
          currentUserId = userId;

          const user = response.users.find((u) => u.id == userId);
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

      parent.postMessage('logged', '*')
  });
});
