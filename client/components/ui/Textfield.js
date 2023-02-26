import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import {
  LinkIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import {
  createPrediction,
  setLoading,
  savePrediction,
} from "../../redux/actions/forecast";
import { connect } from "react-redux";
import ArgumentDetails from "./argumentDetails";
import Loading from "./Loading";
import Button from "./Button";

import { PaperAirplaneIcon } from "@heroicons/react/outline";
import Home from "../Home";
function TextArea({
  createPrediction,
  savePrediction,
  setLoading,
  forecast_result,
  user,
  forecast: { loading },
}) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const textarea = document.getElementById("textarea");
    textarea.style.height = "32px";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [content]);

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(content);
    createPrediction(content);
    setLoading(true);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setContent(content + "\n");
    }
  };
  const saveButton = (obj) => {
    savePrediction(obj);
    alert("Button was clicked");
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  return (
    <div className="flex flex-col space-y-5 items-center w-full ">
      {!forecast_result && (
        <div className="w-full flex items-center justify-center   ">
          <Home />
        </div>
      )}
      <form
        className="flex flex-row space-x-2 border w-2/5 rounded-md p-2 bg-white shadow-lg"
        onSubmit={(e) => onSubmit(e)}
      >
        <textarea
          id="textarea"
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="min-h-6 resize-none w-full focus-visible:outline-none"
        />
        <button type="submit" value="save" className="self-end pb-2">
          <PaperAirplaneIcon className="h-6  text-gray-600 transform rotate-45" />
        </button>
      </form>
      {!loading ? (
        forecast_result &&
        forecast_result.map((obj, id) => {
          // Declare a state variable called "isButtonDisabled" and set it to false

          return (
            <div
              key={obj.context}
              className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl  mx-12 w-3/4  sm:mx-16 lg:mx-36 xl:mx-64 flex flex-col border-2  p-4 mb-8 rounded-xl space-y-4 shadow-xl"
            >
              <div className="flex flex-col md:flex-row space-x-2 justify-between items-start">
                <div className="space-y-2 w-3/4">
                  <p>This event "{obj.event}" is going to have an impact of</p>
                  <Button
                    // Pass the state variable and the function to disable the button as props

                    obj={obj}
                  />
                </div>
                <div className="flex space-x-2 justify-between items-center w-2/4 md:w-1/4 xl:w-1/5 bg-white p-5 rounded-md font-bold shadow-md">
                  {obj.event_impact > 0 ? (
                    <div className="p-1 bg-red-200 text-red-600  w-8 md:w-10">
                      <TrendingUpIcon className=" h-6 md:h-8 " />
                    </div>
                  ) : (
                    <div className="p-1 bg-green-200 text-green-600 w-8 md:w-10">
                      <TrendingDownIcon className=" h-6 md:h-8" />
                    </div>
                  )}
                  <p className=" text-black  ">{obj.event_impact} %</p>
                </div>
              </div>

              <ArgumentDetails id={id} description={obj} role={user.role} />
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}

TextArea.propTypes = {
  createPrediction: PropTypes.func.isRequired,
  setLoading: PropTypes.func,
  forecast_result: PropTypes.array,
};

const mapStateToProps = (state) => ({
  forecast_result: state.forecast.forecast_result,
  user: state.auth.user,
  forecast: state.forecast,
});

export default connect(mapStateToProps, {
  createPrediction,
  setLoading,
  savePrediction,
})(TextArea);
