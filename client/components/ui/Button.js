import React, { useState } from "react";
import { savePrediction } from "../../redux/actions/forecast";
import { connect } from "react-redux";
const Button = ({ savePrediction, obj }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Declare a function that sets "isButtonDisabled" to true
  const disableButton = () => {
    setIsButtonDisabled(true);
  };

  return (
    <button
      onClick={() => {
        savePrediction(obj);
        alert(`the prediction for this event ${obj.event} was saved`);
        // Set "isButtonDisabled" to true when the button is clicked
        disableButton();
      }}
      disabled={isButtonDisabled || obj.event_impact === "null"}
      className={`justify-between
      
       rounded-md shadow-md  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase 
        hover:bg-blue-700 hover:shadow-lg 
        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50 ${
          !isButtonDisabled && obj.event_impact !== "null"
            ? ""
            : "cursor-not-allowed"
        }`}
    >
      Save prediction
    </button>
  );
};

export default connect(null, {
  savePrediction,
})(Button);
