import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ScrollToTop from "./components/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
