import { useState } from "react";

import { initialState } from "../constants/initialState";

export const useFormValidation = (initialValues, validate) => {
  //definition of react hook.
  //ousiastika to hook mou gia na doulepsei perimenei kati gia initialValues(ta starting form values) kai kati gia validate (a validation function).
  //einai reusable opote den einai mono gia to places app mou.
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialState);

  console.log(initialValues);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target; //files gives me an array of selected files, type gives me the type of the input

    const newValues = { ...values, [name]: type === "file" ? files[0] : value };

    const validationErrors = validate(newValues); //kalw thn validation function mou kai ths kanw pass ta values pou exei dwsei o user ousiastika.
    //ginetai to validation kai mou epistrefei ena errors object me ta opoia error uparxoun

    setValues(newValues);

    setErrors((prevEr) => ({
      ...prevEr,
      [name]: validationErrors[name] || "", //allazei mono to field pou ekane blur o user dinontas tou to error message h tipota an den uparxei error
    }));
  };

  const handleReset = () => {
    setValues(initialValues); //reset inputs to their intial values
    setErrors(initialState); //clear error messages
  };

  const handleSubmit = (callback) => (e) => {
    //a function returning a function ,
    // callback -> einai to function pou 8a kanei handle ta submited data
    // e -> to event otan kanei click to submit tou form.
    e.preventDefault();

    const validationErrors = validate(values);
    //trexei pali ta validations me to submit (den arkei to blur giati mporei kapoia na einai untouched kai empty)
    setErrors(validationErrors);

    const noErrors = Object.values(validationErrors).every((error) => !error);
    // Object.values(validationErrors) -> mas dinei array me ola ta error messages
    //.every((error) => !error   -> tsekarei an every error einai empty (den exei error)
    //to noErrors 8a einai true an den uparxoun error.

    if (noErrors) {
      callback(values); //h callback function mou kouvalaei ta validated data (values)
      handleReset();
    }
  };

  const isFormValid = () => {
    return (
      Object.values(values).every((v) => {
        //creates an array with the form values the user typed,
        if (typeof v === "string") return v.trim() !== "";
        //if its string checks every one of them, removes the spaces and checks if theyre not empty. if they are -> false
        if (v instanceof File) return true; //incaseof checks what type of object something is, v the current value of form field
        return v != null; //makes sure that the input is not null or undefined
      }) && Object.values(errors).every((e) => !e) //creates array with the errors , if there is an error -> false

      //for the form to be valid both terms must be true
    );
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
    setValues,
    isFormValid,
  };
};
