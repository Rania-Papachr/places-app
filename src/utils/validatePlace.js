import { titleRegex } from "../constants/regex";
import { locationRegex } from "../constants/regex";
import { initialState } from "../constants/initialState";

export const validatePlace = (values) => {
  const errors = { ...initialState }; //kanw spread kai ousiastika dimiourgw copy tou initialState, wste na min peira3w to arxiko

  if (!values.title.trim()) {
    //trim gia na fugoun tuxon kena kai na meinei eite le3h eite keno , to keno-> true
    errors.title = "Title is required";
  } else if (!titleRegex.test(values.title)) {
    //tsekarei an to patern tou regex tairiazei me to value tou user , nai-> false , oxi-> true
    errors.title = "Title can only contain letters, numbers, basic punctuation";
  } else if (values.title.length < 3 || values.title.length > 50) {
    errors.title = "Title must be between 3 and 50 characters ";
  }

  if (!values.image) {
    errors.image = "Image is required";
  } else if (values.image instanceof File) {
    // only check type if it’s a File
    if (!values.image.type.startsWith("image/")) {
      errors.image = "Only images are allowed (jpg, png, webp)";
    }
  }

  if (!values.location.trim()) {
    errors.location = "Location is required";
  } else if (!locationRegex.test(values.location)) {
    errors.location =
      "Location can only include letters, numbers, and basic punctuation";
  } else if (values.location.length < 2 || values.location.length > 60) {
    errors.location = "Location must be between 2 and 60 characters";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  } else if (values.description.trim().length < 5) {
    errors.description = "Description must be at least 5 characters";
  } else if (values.description.trim().length > 250) {
    errors.description = "Description cannot be more than 250 charecters";
  }

  return errors;
};
