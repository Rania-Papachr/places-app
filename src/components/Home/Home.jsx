import { useState } from "react";

import Card from "../Card/Card";
import GoToTopButton from "../GoToTopButton/GoToTopButton";
import Jumbotron from "../Jumbotron/Jumbotron";
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";

import styles from "./Home.module.css";

const Home = ({ setPlaces, places }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleDelete = (id) => {
    setSelectedPlace(places.find((place) => place.id === id));
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPlace) {
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== selectedPlace.id)
      );
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (id) => {
    setSelectedPlace(places.find((place) => place.id === id));
    setShowEditModal(true);
  };

  const handleSaveChange = async (updatedPlace) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === updatedPlace.id ? updatedPlace : place
      )
    );

    setShowEditModal(false);
  };

  return (
    <>
      {showEditModal && (
        <EditModal
          place={selectedPlace}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveChange}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      <GoToTopButton />
      <Jumbotron
        title="Around The World"
        description="CRUD Photo Album!"
        details="Browse, add, edit, and delete photos of your favorite destinations."
      />
      <div className={styles["all-cards"]}>
        {places?.map((place) => (
          <Card
            key={place.id}
            title={place.title}
            location={place.location}
            image={place.image}
            description={place.description}
            onDelete={handleDelete}
            onEdit={handleEdit}
            id={place.id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
