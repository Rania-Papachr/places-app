import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validatePlace } from "../../utils/validatePlace";

import styles from "./EditModal.module.css";

const EditModal = ({ onSave, onClose, place }) => {
  const [preview, setPreview] = useState(place.image);
  const { values, errors, handleChange, handleSubmit, isFormValid } =
    useFormValidation(place, validatePlace);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

    handleChange(e);
  };

  const onSubmit = (formValues) => {
    let imageUrl = place.image;

    if (formValues.image instanceof File) {
      imageUrl = URL.createObjectURL(formValues.image);
    }
    const updatedPlace = {
      ...place,
      ...formValues,
      image: imageUrl,
    };

    onSave(updatedPlace);
    onClose();
  };

  return (
    <>
      <div className={styles["modal-background"]}>
        <div className={styles["modal-container"]}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles["modal-form"]}
          >
            <button
              type="button"
              className={styles["x-button"]}
              onClick={onClose}
            >
              ✕
            </button>
            <h2>Edit Place</h2>
            <h3>Fill in the details below. </h3>
            <div className={styles["input-container"]}>
              <div className={styles["top-inputs-container"]}>
                <div className={styles["input-control"]}>
                  <label htmlFor="title"> Title </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                  />
                  <div className={styles["control-error"]}>{errors.title}</div>
                </div>
                <div className={styles["input-control"]}>
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={values.location}
                    onChange={handleChange}
                  />
                  <div className={styles["control-error"]}>
                    {errors.location}
                  </div>
                </div>
              </div>
              <div className={styles["input-control"]}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                <div className={styles["control-error"]}>
                  {errors.description}
                </div>
              </div>
              <div className={styles["input-control"]}>
                <label htmlFor="image" className={styles["file-upload"]}>
                  <i className="fa-solid fa-camera-retro"> </i> Upload New Image
                </label>{" "}
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles["hidden-file-input"]}
                />
                {preview && (
                  <div className={styles["preview-container"]}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "160px",
                        height: "100px",
                        marginTop: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
                <div className={styles["control-error"]}>{errors.image}</div>
              </div>
            </div>

            <div className={styles["form-buttons"]}>
              <button
                type="submit"
                className={styles["save-button"]}
                disabled={!isFormValid()}
              >
                Save
              </button>
              <button
                type="button"
                className={styles["close-button"]}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
