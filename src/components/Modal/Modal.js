import "./Modal.scss";

export default function Modal({
  setOpenModal,
  handleModalCancel,
  selectedJournalId,
  handleDelete,
  openModal,
}) {
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__confirm-container">
          <p className="modal__confirm">
            Are you sure you want to delete this?
          </p>
        </div>
        <div className="modal__options">
          <button
            onClick={() => setOpenModal(false)}
            className="modal__button modal__cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete(selectedJournalId);
            }}
            className="modal__button modal__delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
