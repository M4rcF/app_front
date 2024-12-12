const form = document.getElementById('create-poll-form');
const optionsContainer = document.getElementById('poll-options-container');
const addOptionButton = document.getElementById('add-option-button');

if (!token) {
  alert('Para criar uma enquete vc precisa estar logado!');
  parent.postMessage('reload', '*')
}

createOptionField('', 0);
createOptionField('', 1);

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
    const isRemovable = removeButtons.length > 2;

    removeButtons.forEach((button) => {
      button.disabled = !isRemovable;
    });
}

updateRemoveButtonsState();

addOptionButton.onclick = () => {
  const newIndex = optionsContainer.children.length;
  createOptionField('', newIndex);
  updateRemoveButtonsState();
};

if (form && token) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const poll = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      expires_at: document.getElementById('expires_at').value,
      poll_options: Array.from(optionsContainer.querySelectorAll('input')).map(
        (input) => ({ text: input.value })
      ),
    };

    try {
       const response = await api.postPoll(poll);

       if (response) {
        alert('Enquete cadastrada com sucesso!');
        
        parent.postMessage('reload', '*')
      } else {
        throw new Error('Erro ao cadastrar a enquete.');
      }
    } catch (error) {
      alert('Erro ao criar enquete. Por favor, tente novamente.');
      console.error(error.message);
    }
  });
}
