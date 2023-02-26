import React, { useState } from "react";
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
} from "../redux/actions/forecast";
import { connect } from "react-redux";
import SwitchButton from "./ui/switchButton";
import ArgumentDetails from "./ui/argumentDetails";
import Loading from "./ui/Loading";
import Button from "./ui/Button";
import Home from "./Home";
const Form = ({
  createPrediction,
  savePrediction,
  setLoading,
  forecast_result,
  user,
  forecast: { loading },
}) => {
  const [formData, setFormData] = useState({
    paragraph: "",
  });

  //const [result_loading, setLoading] = useState(false);
  const { paragraph } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    createPrediction(paragraph);
    setLoading(true);
  };
  const saveButton = (obj) => {
    savePrediction(obj);
    alert("Button was clicked");
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  return (
    <div className="font-mono flex flex-col w-full p-10">
      {!forecast_result && <div className=" self-center w-3/5"></div>}

      <form
        className=" px-16 sm:px-20 lg:px-56 xl:px-96 flex flex-col md:space-x-5 md:flex-row w-full form "
        onSubmit={(e) => onSubmit(e)}
      >
        <label
          htmlFor="Textarea1"
          className="w-fit py-3 form-label inline-block mb-2 text-gray-700 whitespace-nowrap font-bold"
        >
          Event :
        </label>
        <div className="flex flex-col w-full border-4 space-y-4 border-solid border-gray-300 hover:border-blue-300 px-3 py-3">
          <textarea
            className="w-full text-base 
           font-normal
          text-gray-700
          bg-white bg-clip-padding
          
          rounded
          transition
          ease-in-out
          m-0 focus:text-gray-700 focus:bg-white focus:border-none focus:outline-none"
            id="Textarea1"
            rows="5"
            placeholder=""
            name="paragraph"
            onChange={(e) => onChange(e)}
          ></textarea>
          <div className="flex w-full justify-end ">
            <div className="flex item-center space-x-2 justify-center">
              <button
                type="submit"
                value="save"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <br />

      {!loading ? (
        forecast_result &&
        forecast_result.map((obj, id) => {
          // Declare a state variable called "isButtonDisabled" and set it to false

          return (
            <div
              key={obj.context}
              className="bg-gray-100 mx-12 sm:mx-16 lg:mx-36 xl:mx-64 flex flex-col border-2  p-4 mb-8 rounded-xl space-y-4 shadow-xl"
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
                    <div className="p-1 bg-green-200 text-green-600 w-8 md:w-10">
                      <TrendingUpIcon className=" h-6 md:h-8 " />
                    </div>
                  ) : (
                    <div className="p-1 bg-red-200 text-red-600 w-8 md:w-10">
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
};
Form.propTypes = {
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
})(Form);
