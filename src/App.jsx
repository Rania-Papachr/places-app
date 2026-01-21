import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Form from "./components/Form/Form";
import RootLayout from "./Root";
import Home from "./components/Home/Home";
import { placesData } from "./places";

function App() {
  const [places, setPlaces] = useState(placesData);

  const handleAddPlace = (newPlace) => {
    setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home setPlaces={setPlaces} places={places} />,
        },
        {
          path: "/add-place",
          element: <Form onSave={handleAddPlace} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
