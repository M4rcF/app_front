document.addEventListener('DOMContentLoaded', async () => {
  if (token) {
    document.querySelector(".alert-to-login").style.display="none"
    const container = document.querySelector('.cards-container');
    const apiUrl = 'http://localhost:5000/api/polls';

    try {
      const data = await api.getPolls();

      const polls = data.polls;

      container.innerHTML = '';

      polls.forEach((poll) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <div class="card-header">
            <h3 class="card-title">${poll.title}</h3>
            <p class="card-date">Data de Expiração: ${new Date(poll.expires_at).toLocaleDateString('pt-BR')}</p>
          </div>
          <p class="card-description">${poll.description}</p>
          <div class="vote-options">
            ${poll.poll_options.map(option => `
              <button class="vote-option" data-poll-id="${poll.id}" data-option-id="${option.id}" ${poll.is_blocked ? 'disabled' : ''}>
                ${option.text}
              </button>
            `).join('')}
          </div>
        `;

        container.appendChild(card);
      });

      container.addEventListener('click', async (event) => {
        if (event.target.classList.contains('vote-option')) {
          const pollId = event.target.dataset.pollId;
          const optionId = event.target.dataset.optionId;

          try {
            const voteResponse = await fetch(`${apiUrl}/${pollId}/vote`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ option_id: optionId }),
            });

            if (voteResponse.ok) {
              alert('Voto computado com sucesso!');
            } else {
              alert('Erro ao computar voto.');
            }
          } catch (error) {
            console.error(error);
            alert('Erro ao enviar voto.');
          }
        }
      });
    } catch (error) {
      console.error(error);
      container.innerHTML = '';
    }
  }
});
