const container = document.querySelector('.cards-container');
let polls = []

document.addEventListener('DOMContentLoaded', async () => {
  const emptyPolls = document.querySelector('.empty-polls');

  if (!token) {
    emptyPolls.style.display='none';
    return
  }

  document.querySelector(".alert-to-login").style.display = "none";

  try {
    const data = await api.getPolls();
    if (data?.polls?.length > 0 || !token) {
      emptyPolls.style.display='none';
    }

    if (data?.polls) {

      polls = data.polls;

      polls.forEach((poll) => {
        const card = document.createElement('div');
        card.className = 'card';
        let expiresDate = ''
        if (poll.expires_at) {
          expiresDate = poll.expires_at.split('-').reverse().join('/');
        }

        card.innerHTML = `
          <div class="card-options">
            ${poll.is_poll_creator ? "<img src=\"../img/edit.png\" class=\"edit-icon\" data-poll-id=\"" + poll.id + "\" />" : ''}
            ${poll.is_poll_creator ? "<img src=\"../img/delete.png\" class=\"delete-icon\" data-poll-id=\"" + poll.id + "\"/>" : ''}
          </div>
          <div class="card-header">
            <h3 class="card-title">${poll.title}</h3>
            <p class="card-date">Data de Expiração: ${expiresDate}</p>
          </div>
          <p class="card-description">${poll.description}</p>
          <div class="vote-options">
            ${poll.poll_options.map(option => `
              <button
                class="${option.voted ? 'voted-option' : 'vote-option'}"
                data-poll-id="${poll.id}"
                data-option-id="${option.id}" ${poll.is_blocked ? 'disabled' : ''}
              >
                ${option.text}
              </button>
            `).join('')}
          </div>
        `;

        container.appendChild(card);
      });

      container.addEventListener('click', async (event) => {     
        if (event.target.classList.contains('vote-option') || event.target.classList.contains('voted-option')) {
          const pollId = event.target.dataset.pollId;
          const optionId = event.target.dataset.optionId;
          await api.postVote(pollId, optionId);
          parent.postMessage('reload', '*');
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
})
