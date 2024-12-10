const apiUrl = 'http://localhost:5000/api';
const token = sessionStorage.getItem('token');

const showErrorIfExists = async (response) => {
  if (response.status == 401) {
    sessionStorage.removeItem('token');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na API: ${response.status} - ${errorText}`);
  }
}

const api = {
  getPolls: async () => {
    try {
      const response = await fetch(`${apiUrl}/polls`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      showErrorIfExists(response);

      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar enquetes.');
    }
  },

  postPoll: async (poll) => {
    try {
      const response = await fetch(`${apiUrl}/polls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(poll),
      });

      showErrorIfExists(response);

      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar a enquete.');
    }
  },

  getUsers: async () => {
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      showErrorIfExists(response);
    
      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar lista de usuários');
    }
  },

  putUser: async (user_id, user) => {
    try {
      const response = await fetch(`${apiUrl}/users/${user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      showErrorIfExists(response);
    
      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar usuário');
    }
  }
}
