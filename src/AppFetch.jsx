import { useEffect, useState } from "react";

import Card from "./components/Card/Card";
import Jumbotron from "./components/Jumbotron/Jumbotron";
import Form from "./components/Form/Form";
import EditModal from "./components/EditModal/EditModal";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          setError("Fail to fetch data.");
        }

        const resData = await response.json();
        setPlaces(resData);
      } catch (error) {
        setError(error || "Fail to fetch data.");
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete place");
      }

      setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
    } catch (error) {
      console.error("Error deleting place", error);
    }
  };

  const handleEdit = (id) => {
    //console.log("ok");

    setSelectedPlace(places.find((place) => place.id === id));
    setShowModal(true);
    return;
  };

  const handleSaveChange = async (updatedPlace) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedPlace.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", //leei ston server oti stelnw json
          },
          body: JSON.stringify(updatedPlace), // ta data tou kainouriou user se json form
        }
      );

      if (!response.ok) {
        throw new Error("failed to update place"); //an to response den einai ok to throw stamataei to function kai dimiourgei ena exception to opoio petaei sto catch
      }
      const data = await response.json(); //??metatrepei to response se json?

      setPlaces((prevPlaces) =>
        prevPlaces.map(
          (place) => (place.id === data.id ? data : place) //ean kanoun match ta id(true), tote o user einai o updatedUser
        )
      );
    } catch (error) {
      console.error("Error updating place", error); // an iparxei error
    }
    setShowModal(false);
  };

  const handleAddPlace = async (newPlace) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlace),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add Place!");
      }

      const createdPlace = await response.json();
      setPlaces((prevPlaces) => [...prevPlaces, createdPlace]);
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  return (
    <div>
      <NavBar />
      <Jumbotron />
      <div className="all-cards">
        {places?.map((place) => (
          <Card
            key={place.id}
            onDelete={handleDelete}
            onEdit={handleEdit}
            identifier={place.id}
            {...place}
          />
        ))}
      </div>
      <hr />
      <Form onSubmit={handleAddPlace} />
      {showModal && (
        <EditModal
          user={selectedPlace}
          onClose={() => setShowModal(false)}
          onSave={handleSaveChange}
        />
      )}
    </div>
  );
}

export default App;
