const authentication = {
  postSignUp: async (user) => {
    try {
      console.log('Tentando enviar para a API de cadastro:', user);
      const url = 'http://localhost:5000/api/sign_up';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Erro ao conectar à API ${error}`);
    }
  },

  postLogin: async (user) => {
    try {
      console.log('Tentando enviar para a API de login:', user);
      const url = 'http://localhost:5000/api/login';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Erro ao conectar à API ${error}`);
    }
  },

  postLogout: async (token) => {
    try {
      console.log(`Tentando enviar para a API de logout ${token}`);
      const url = 'http://localhost:5000/api/logout';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Erro ao conectar à API ${error}`);
    }
  },
};