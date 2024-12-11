try {
  // Função principal para abrir o modal de edição
  function openEditModal(poll) {
    // Seletores de elementos do modal
    const modal = document.getElementById('editPollModal');
    const titleInput = document.getElementById('pollTitle');
    const descriptionInput = document.getElementById('pollDescription');
    const expiresAtDate = document.getElementById('expires_at');
    const optionsContainer = document.getElementById('pollOptionsContainer');
    const addOptionBtn = document.getElementById('addOptionBtn');

    // Preenche os campos do modal com os dados da enquete
    titleInput.value = poll.title;
    descriptionInput.value = poll.description;
    expiresAtDate.value = poll.expires_at;

    // Limpa as opções existentes e adiciona as novas
    optionsContainer.innerHTML = '';
    poll.poll_options.forEach((option, index) => {
      createOptionField(option.text, index);
    });

    // Configura o botão para adicionar uma nova opção
    addOptionBtn.onclick = () => {
      const newIndex = optionsContainer.children.length;
      createOptionField('', newIndex);
      updateRemoveButtonsState();
    };

    // Exibe o modal
    modal.style.display = 'block';

    // Fecha o modal ao clicar no botão de fechar
    setupCloseModalHandlers(modal);

    // Configura o envio do formulário
    setupFormSubmission(modal, poll, {
      titleInput,
      descriptionInput,
      expiresAtDate,
      optionsContainer,
    });

    // Atualiza o estado dos botões de remoção das opções
    updateRemoveButtonsState();
  }

  // Configura os handlers para fechar o modal
  function setupCloseModalHandlers(modal) {
    document.querySelector('.close-btn-edit').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Configura o envio do formulário de edição
  function setupFormSubmission(modal, poll, elements) {
    const form = document.getElementById('editPollForm');

    form.onsubmit = async (e) => {
      e.preventDefault();

      const updatedPoll = {
        title: elements.titleInput.value,
        description: elements.descriptionInput.value,
        expires_at: elements.expiresAtDate.value,
        poll_options: Array.from(
          elements.optionsContainer.querySelectorAll('input')
        ).map((input) => ({ text: input.value })),
      };

      try {
        await api.putPoll(poll.id, updatedPoll);
        modal.style.display = 'none';
        location.reload(); // Atualiza a página após salvar
      } catch (error) {
        console.error('Erro ao salvar alterações:', error);
      }
    };
  }

  // Cria um campo para uma opção no formulário
  function createOptionField(optionText, index) {
    const optionsContainer = document.getElementById('pollOptionsContainer');
    const maxOptions = 4;

    // Limita a criação de opções ao máximo permitido
    if (optionsContainer.children.length >= maxOptions) return;

    const optionElement = document.createElement('div');
    optionElement.className = 'option-field';
    optionElement.innerHTML = `
      <input type="text" id="option-${index}" name="option-${index}" value="${optionText}" required />
      <button type="button" class="remove-option-btn">Remover</button>
    `;
    optionsContainer.appendChild(optionElement);

    // Configura o botão de remover a opção
    optionElement
      .querySelector('.remove-option-btn')
      .addEventListener('click', () => {
        optionsContainer.removeChild(optionElement);
        updateRemoveButtonsState();
      });
  }

  // Atualiza o estado dos botões de remoção das opções
  function updateRemoveButtonsState() {
    const optionsContainer = document.getElementById('pollOptionsContainer');
    const removeButtons = optionsContainer.querySelectorAll('.remove-option-btn');
    const isRemovable = removeButtons.length > 1;

    removeButtons.forEach((button) => {
      button.disabled = !isRemovable;
    });
  }

  // Listener para abrir o modal ao clicar no ícone de edição
  container.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-icon')) {
      const pollId = event.target.dataset.pollId;
      const poll = polls.find((p) => p.id === parseInt(pollId));
      openEditModal(poll);
    }
  });
} catch (error) {
  console.error(`Error: ${error}`)
}