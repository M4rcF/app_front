const tbody = document.querySelector('#users-table tbody');
let users = []

document.addEventListener('DOMContentLoaded', async () => {
  if (!token) {
    parent.postMessage('reload', '*')
    return
  }

  try {
    const response = await api.getUsers();

    if (response.status == 401) {
      alert("Apenas usuários administradores podem acessar essa tela!")
      parent.postMessage('reload', '*')
      return
    } else {
      document.getElementById('users-table').style.display = 'table'
    }

    users = response.users

    // Popula a tabela de usuários
    users.forEach((user) => {
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

  } catch (error) {
    console.error(`Error: ${error}`);
  }
});
