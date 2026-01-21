import Jumbotron from "../Jumbotron/Jumbotron";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidation";
import { initialState } from "../../constants/initialState";
import { validatePlace } from "../../utils/validatePlace";

import styles from "./Form.module.css";

const Form = ({ onSave }) => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
    isFormValid,
  } = useFormValidation(initialState, validatePlace);

  const removePreview = () => {
    setPreview(null);
    fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //e.target for the input, files[0] we chose only the first one just in case the user selects more.
    if (file) setPreview(URL.createObjectURL(file)); //if a file is selected the browser creates a temporary url for it. it doesnt upload just gives us a local preview
    handleChange(e); //calls my hooks handleChange to update values. my hook hanldes validation and stores the actual file on values.image
  };

  const onSubmit = (formValues) => {
    let imageUrl = formValues.image;

    if (imageUrl instanceof File) {
      imageUrl = URL.createObjectURL(imageUrl);
    }
    const newPlace = {
      ...formValues,
      id: crypto.randomUUID(), // generate unique id for the key thats needed in home to create the card
      image: imageUrl,
    };

    onSave(newPlace);
    handleReset();
    navigate("/");
  };

  const isFormEmpty = () => {
    const valuesEmpty = Object.keys(values).every((key) => {
      //this line turns the values object to an array of its keys like ["title", "location",...]
      //.every() runs on my array of keys and each time it takes one of them as key.
      //its like it asks if the key it empty so that it can return true or false and define the final boolean for the values empty.

      const current = values[key]; //current value of the selected key
      const initial = initialState[key]; //initial value of the selected key

      if (typeof current === "string") {
        return current.trim() === initial;
      } //this is where the actual ckeck happens. if the current trimed value equals the initial value it returns true. otherwise false.

      if (current instanceof File) {
        return false; // if a file exists the form is not empty so return false
      }

      return current === initial; //this covers the check for null or undefined
    });

    return valuesEmpty && !preview; //also checks the preview
  };

  return (
    <>
      <Jumbotron
        title="Add a New Place"
        description="Tell us about your favorite destination!"
        details="Fill in the details below to add it to your photo album."
      />
      <div className={styles["add-container"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* edw den kalw thn on submit, tin dinw sto hook mou kai thn kalei afou ginoun ta validation*/}
          <div className={styles["inputs-container"]}>
            <div className={styles["top-inputs-container"]}>
              <div className={styles["input-control"]}>
                <label htmlFor="title">Title</label>
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
                <div className={styles["control-error"]}>{errors.location}</div>
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
                <i className="fa-solid fa-camera-retro"> </i> Upload Image
              </label>
              <input
                id="image"
                ref={fileInputRef}
                name="image"
                type="file"
                // im only accepting images
                accept="image/*"
                onChange={handleImageChange}
                className={styles["hidden-file-input"]}
              />
              {preview && !errors.image && (
                <div className={styles["preview-container"]}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "200px",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                  />
                  <button
                    className={styles["remove-preview-button"]}
                    onClick={removePreview}
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className={styles["control-error"]}>{errors.image}</div>
            </div>
          </div>
          <div className={styles["form-buttons"]}>
            <button
              type="submit"
              className={styles["create-button"]}
              disabled={!isFormValid()}
            >
              Create
            </button>
            <button
              type="reset"
              className={styles["reset-button"]}
              onClick={() => {
                handleReset();
                removePreview();
              }}
              disabled={isFormEmpty()}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
