document.addEventListener('DOMContentLoaded', async () => {
  if (!token) {
    parent.postMessage('reload', '*')
    return
  }

  try {
    const votesTable = document.getElementById('votes-table');
    const emptyDiv = document.getElementById('empty-div');
    const tbody = document.querySelector('#votes-table tbody');

    const response = await api.getVotes();

    if (response.status == 401) {
      alert("Apenas usuários administradores podem acessar essa tela!")
      parent.postMessage('reload', '*')
      return
    }

    if (response.votes.length > 0) {
      votesTable.style.display = 'table';
      emptyDiv.style.display = 'none';

      console.log('votes', response)
      response.votes.forEach((vote) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${vote.id}</td>
            <td>${vote.individual_name}</td>
            <td>${vote.poll}</td>
            <td>${vote.poll_option}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (error) {
    alert(`Error: ${error}`)
  }
})