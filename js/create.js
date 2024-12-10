if (!token) {
  alert('Para criar uma enquete vc precisa estar logado!');
  parent.postMessage('blocked', '*')
}

const form = document.getElementById('create-poll-form');
const optionsContainer = document.getElementById('poll-options-container');
const addOptionButton = document.getElementById('add-option-button');
const removeOptionButton = document.getElementById('remove-option-button');

let optionCount = 0; // Controla o número de opções
const maxOptions = 4;
const minOptions = 1;

function addOption() {
  if (optionCount < maxOptions) {
    optionCount++;
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.innerHTML = `
      <label for="option${optionCount}">Opção ${optionCount}</label>
      <input
        type="text"
        id="option${optionCount}"
        name="option${optionCount}"
        placeholder="Digite a opção ${optionCount}"
        required
      />
    `;
    optionsContainer.appendChild(optionDiv);
  }
}

function removeOption() {
  if (optionCount > minOptions) {
    optionsContainer.removeChild(optionsContainer.lastChild);
    optionCount--;
  }
}

addOptionButton.addEventListener('click', addOption);
removeOptionButton.addEventListener('click', removeOption);

addOption();

if (form && token) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const pollOptions = [];
    for (let i = 1; i <= optionCount; i++) {
      const optionValue = document.getElementById(`option${i}`).value;
      if (optionValue.trim()) {
        pollOptions.push({ text: optionValue });
      }
    }

    const poll = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      expires_at: document.getElementById('expires_at').value,
      poll_options: pollOptions,
    };

    try {
       const response = await api.postPoll(poll);

       if (response) {
        alert('Enquete cadastrada com sucesso!');
        form.reset();
        optionsContainer.innerHTML = '';
        optionCount = 0;
        addOption(); // Adiciona a primeira opção novamente
      } else {
        throw new Error('Erro ao cadastrar a enquete.');
      }
    } catch (error) {
      alert('Erro ao criar enquete. Por favor, tente novamente.');
      console.error(error.message);
    }
  });
}
