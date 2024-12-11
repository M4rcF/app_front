function openDeleteModal(pollId, deleteCallback) {
  const modal = document.getElementById('confirmDeleteModal');
  const closeBtn = modal.querySelector('.close-btn');
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  const cancelBtn = document.getElementById('cancelDeleteBtn');

  modal.style.display = 'block';

  const closeModal = () => {
    modal.style.display = 'none';
  };

  closeBtn.onclick = closeModal;
  cancelBtn.onclick = closeModal;
  window.onclick = (event) => {
    if (event.target === modal) closeModal();
  };

  confirmBtn.onclick = async () => {
    try {
      await deleteCallback(pollId);
      closeModal();
    } catch (error) {
      console.error('Erro ao excluir a enquete:', error);
    }
  };
}


container.addEventListener('click', async (event) => {  
  if (event.target.classList.contains('delete-icon')) {
    const pollId = event.target.dataset.pollId;
    openDeleteModal(pollId, async (poll_id) => {
      await api.deletePoll(poll_id);
      parent.postMessage('logged', '*');
    });
  }
})
