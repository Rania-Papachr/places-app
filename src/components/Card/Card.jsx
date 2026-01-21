import styles from "./Card.module.css";

const Card = ({
  title,
  location,
  image,
  description,
  onDelete,
  onEdit,
  id,
}) => {
  return (
    <div className={styles["card-container"]}>
      <img className={styles["card-img"]} src={image} alt="male avatar" />
      <div className={styles["card-info"]}>
        <h2 className={styles["card-title"]}>{title}</h2>
        <p className={styles["location"]}>{location}</p>
        <p className={styles["description"]}>{description}</p>
        <div className={styles["card-buttons"]}>
          <button className={styles["edit-button"]} onClick={() => onEdit(id)}>
            Edit
          </button>
          <button
            className={styles["delete-button"]}
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
