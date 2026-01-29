import { NavLink } from "react-router-dom"; //im using NavLink istead of Link cause Link just navigates while NavLink navigates and also tells you "im active"
import styles from "./NavItem.module.css";

const NavItem = ({ to, title, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
        onClick={onClick}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;
