import styles from "./GoToTopButton.module.css";

const GoToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={styles["home-button"]} onClick={handleScrollToTop}>
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default GoToTopButton;
