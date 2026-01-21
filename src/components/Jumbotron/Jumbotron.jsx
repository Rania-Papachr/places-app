import styles from "./Jumbotron.module.css";

const Jumbotron = ({ title, description, details }) => {
  return (
    <div className={styles["jumbotron"]}>
      <h1>{title} </h1>
      <p className={styles["jumbotron-description"]}>{description}</p>
      <hr />
      <p className={styles["jumbotron-details"]}>{details}</p>
    </div>
  );
};

export default Jumbotron;
