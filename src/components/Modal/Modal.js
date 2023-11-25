import "./Modal.scss";

export default function Modal({
  setOpenModal,
  handleModalCancel,
  selectedJournalId,
  handleDelete,
  openModal,
}) {
  console.log(
    "Modal opened with:",
    openModal,
    "for Journal ID:",
    selectedJournalId
  );

  return (
    <div className="modal">
      <div className="modal__container">
        <button onClick={() => setOpenModal(false)}>X</button>
        {/* <button onClick={handleModalCancel}>X</button> */}
        <div className="title">
          <h5>Are you sure you want to delete this?</h5>
        </div>
        <div className="footer">
          <button onClick={() => setOpenModal(false)}>Cancel</button>
          {/* <button onClick={handleModalCancel}>Cancel</button> */}
          <button
            onClick={() => {
              handleDelete(selectedJournalId);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// import useState
// const [openModal, setOpenModal] = useState(false);
// Pass openModal to delete button. So <button className = "openModalBtn" onClick= { () => {setOpenModal(true)})>Open</button>
