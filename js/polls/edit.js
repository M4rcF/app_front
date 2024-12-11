function openEditModal(poll) {
  const modal = document.getElementById('editPollModal');
  const titleInput = document.getElementById('pollTitle');
  const descriptionInput = document.getElementById('pollDescription');
  const expiresAtDate = document.getElementById('expires_at');
  const optionsContainer = document.getElementById('pollOptionsContainer');
  const addOptionBtn = document.getElementById('addOptionBtn');

  titleInput.value = poll.title;
  expiresAtDate.value = poll.expires_at;
  descriptionInput.value = poll.description;

  optionsContainer.innerHTML = '';
  poll.poll_options.forEach((option, index) => {
    createOptionField(option.text, index);
  });

  addOptionBtn.onclick = () => {
    const newIndex = optionsContainer.children.length;
    createOptionField('', newIndex);
    updateRemoveButtonsState();
  };

  modal.style.display = 'block';

  document.querySelector('.close-btn-edit').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  const form = document.getElementById('editPollForm');
  form.onsubmit = async (e) => {
    e.preventDefault();

    const updatedPoll = {
      title: titleInput.value,
      description: descriptionInput.value,
      expires_at: expiresAtDate.value,
      poll_options: Array.from(optionsContainer.querySelectorAll('input')).map(
        (input) => ({ text: input.value })
      ),
    };

    try {
      await api.putPoll(poll.id, updatedPoll);
      modal.style.display = 'none';

      location.reload();
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  function createOptionField(optionText, index) {
    const removeButtons = optionsContainer.querySelectorAll(
      '.remove-option-btn'
    );
    if (removeButtons.length === 4) {
      return
    }
    const optionElement = document.createElement('div');
    optionElement.className = 'option-field';
    optionElement.innerHTML = `
      <label for="option-${index}">Opção ${index + 1}:</label>
      <input type="text" id="option-${index}" name="option-${index}" value="${optionText}" required />
      <button type="button" class="remove-option-btn">Remover</button>
    `;
    optionsContainer.appendChild(optionElement);

    optionElement
      .querySelector('.remove-option-btn')
      .addEventListener('click', () => {
        optionsContainer.removeChild(optionElement);
        updateRemoveButtonsState();
      });
  }

  function updateRemoveButtonsState() {
    const removeButtons = optionsContainer.querySelectorAll(
      '.remove-option-btn'
    );
    const isRemovable = removeButtons.length > 1;

    removeButtons.forEach((button) => {
      button.disabled = !isRemovable;
    });
  }

  updateRemoveButtonsState();
}

container.addEventListener('click', async (event) => {
  if (event.target.classList.contains('edit-icon')) {
    const pollId = event.target.dataset.pollId;
    const poll = polls.find(p => p.id === parseInt(pollId));
    openEditModal(poll);
  }
});