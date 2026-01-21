import { useEffect, useState } from "react";

import NavItem from "../NavItem/NavItem";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 290);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles["navbar"]} ${
        scrolled ? styles["navbar-scrolled"] : ""
      }`}
    >
      <h3>
        <i className="fa-solid fa-camera-retro"></i>
        My Travel Album
      </h3>

      <button
        className={styles["burger-button"]}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <ul className={`${styles["routes"]} ${menuOpen ? styles.open : ""}`}>
        {/* aply class routes, if menuOpen true add class open , else add nothiing */}
        <NavItem to="/" title="Home" onClick={() => setMenuOpen(false)} />
        <NavItem
          to="/add-place"
          title="Add Place"
          onClick={() => setMenuOpen(false)}
        />
      </ul>
    </nav>
  );
};

export default NavBar;
