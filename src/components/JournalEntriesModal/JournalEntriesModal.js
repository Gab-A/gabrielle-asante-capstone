import ReactModal from "react-modal";
import "./JournalEntriesModal.scss";

export default function JournalEntriesModal({
  isOpen,
  onRequestClose,
  selectedJournal,
  appElement,
  onDelete,
}) {
  const handleJournalDelete = () => {
    onDelete(selectedJournal);
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Journal Modal"
      className="modal"
      overlayClassName="modal__overlay"
      appElement={appElement}
    >
      <button onClick={onRequestClose} className="modal__exit">
        X
      </button>
      <div className="modal__content-container">
        <h2 className="modal__confirmation-heading">You Sure About This?</h2>
        <p className="modal__journal-title">
          Journal Title: {selectedJournal?.title}
        </p>
        <p className="modal__confirmation-subheading">
          You will not be able to undo this action.
        </p>
        <button onClick={handleJournalDelete} className="modal__delete-button">
          Delete this entry
        </button>
        <button onClick={onRequestClose} className="modal__cancel-button">
          No, I change my mind
        </button>
      </div>
    </ReactModal>
  );
}
