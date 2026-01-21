import styles from "./DeleteModal.module.css";

const DeleteModal = ({ onClose, onConfirm }) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-container"]}>
        <button className={styles["x-button"]} onClick={handleClose}>
          ✕
        </button>
        <h2 className={styles["modal-title"]}>Delete Place</h2>
        <p className={styles["modal-message"]}>
          Are you sure you want to delete this place?
        </p>
        <div className={styles["modal-buttons"]}>
          <button className={styles["cancel-button"]} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles["confirm-button"]} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
