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
      overlayClassName="modal-overlay"
      appElement={appElement}
    >
      <div className="modal-overlay-content">
        <h2>Do you want to delete this journal?</h2>
        <p>ID: {selectedJournal?.id}</p>
        <div className="modal-buttons">
          <button onClick={onRequestClose}>Cancel</button>
          <button onClick={handleJournalDelete}>Delete</button>
        </div>
      </div>
      <button onClick={onRequestClose}>Close</button>
    </ReactModal>
  );
}
