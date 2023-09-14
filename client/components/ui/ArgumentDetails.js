import { AdjustmentsIcon } from "@heroicons/react/outline";
import { CodeIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  adjustActeur,
  adjustObject,
  adjustTrigger,
} from "../../redux/actions/forecast";
import Alert from "../Alert";
const ArgumentDetails = ({
  description,
  id,
  role,
  adjustObject,
  adjustTrigger,
  adjustActeur,
}) => {
  const [showDetails, toggleShowDetails] = useState(false);
  const [adjustToggle, setAdjustToggle] = useState(false);
  const [formData, setFormData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  //adjustActeur(description.acteur["name"], acteur_weight);

  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key of Object.keys(description)) {
      if (formData[`${key}_weight`] != undefined) {
        const value = formData[`${key}_weight`];

        if (key == "trigger_verb") {
          adjustTrigger(description[key]["name"], value);
        } else {
          adjustObject(description[key]["name"], value);
        }

        console.log(key + " : " + value);
      }
    }
  };

  return (
    <div className="single-history" key={id}>
      <Alert />
      <div className="flex items-center justify-center py-2">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            onClick={() => toggleShowDetails(!showDetails)}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-xl peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-black ">
            {showDetails ? "Hide details" : "Show details"}
          </span>
        </label>
      </div>
      {showDetails && (
        <div className="flex flex-row justify-between space-x-8">
          <div className="flex flex-row justify-between w-full  px-4 py-2 bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl rounded-lg shadow-md text-center">
            <form
              className="flex justify-between w-full form"
              onSubmit={handleSubmit}
            >
              {Object.keys(description).map((key, id) => {
                if (
                  !description[key]["weight"] &&
                  !description[key]["oil Production"]
                ) {
                  return null;
                }
                return (
                  <div key={id} className="space-y-3">
                    <p className="font-bold">{key}</p>
                    <p>{description[key].name}</p>
                    {description[key]["weight"] ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          disabled={isDisabled}
                          id={`${key}_weight`}
                          name={`${key}_weight`}
                          onChange={handleChange}
                          aria-label={`${key}_weight`}
                          className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                          defaultValue={`${description[key]["weight"]} `}
                          required
                        />{" "}
                        <p>%</p>
                      </div>
                    ) : (
                      <p className="p-2">
                        {description[key]["oil Production"]}
                      </p>
                    )}
                  </div>
                );
              })}
              {["superUser", "admin"].includes(role) ? (
                isDisabled ? (
                  <button
                    onClick={handleClick}
                    className="flex space-x-1 text-blue-500 cursor-pointer hover:underline hover:text-blue-700 h-fit w-40"
                  >
                    <AdjustmentsIcon className="h-6" />
                    <p className="">Make Adjustments </p>
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleClick}
                    className="flex space-x-1 text-blue-500 cursor-pointer hover:underline hover:text-blue-700 h-fit w-40"
                  >
                    <AdjustmentsIcon className="h-6" />
                    <p className="">Save Adjustments </p>
                  </button>
                )
              ) : (
                ""
              )}
            </form>
          </div>
          <div className="flex flex-row font-forum justify-between bg-gradient-to-b from-indigo-900 to-indigo-500  w-1/5 rounded-xl text-white px-4 py-2 ">
            <div className="flex flex-col space-y-2 ">
              <p className="text-xs"> {description.event}</p>
              <p className="underline">Detected Event:</p>
              {description.trigger_verb.event_type}
            </div>
            <CodeIcon className="h-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(null, { adjustObject, adjustTrigger, adjustActeur })(
  ArgumentDetails
);
