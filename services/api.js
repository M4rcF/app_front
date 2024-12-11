const apiUrl = 'http://localhost:5000/api';
const token = sessionStorage.getItem('token');

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

      const data = await response.json();

      return { ...data, status: response.status };
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

      const data = await response.json();

      return { ...data, status: response.status };
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar a enquete.');
    }
  },

  postVote: async (poll_id, poll_option_id) => {
    try {
      const response = await fetch(`${apiUrl}/polls/${poll_id}/poll_options/${poll_option_id}/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return { ...data, status: response.status };
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar voto.');
    }
  },

  putPoll: async (poll_id, poll) => {
    try {
      const response = await fetch(`${apiUrl}/polls/${poll_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(poll),
      });

      const data = await response.json();

      return { ...data, status: response.status };
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar voto.');
    }
  },

  deletePoll: async (poll_id) => {
    try {
      const response = await fetch(`${apiUrl}/polls/${poll_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return { ...data, status: response.status };
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar voto.');
    }
  },

  getVotes: async () => {
    try {
      const response = await fetch(`${apiUrl}/votes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    
      const data = await response.json();

      return { ...data, status: response.status };
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar lista de votos');
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

      const data = await response.json();

      return { ...data, status: response.status };
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

      const data = await response.json();

      return { ...data, status: response.status };
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar usuário');
    }
  }
}
