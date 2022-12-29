import { AdjustmentsIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  adjustActeur,
  adjustObject,
  adjustVerb,
} from "../../redux/actions/forecast";
import Alert from "../Alert";
const SwitchButton = ({
  description,
  id,
  role,
  adjustObject,
  adjustVerb,
  adjustActeur,
}) => {
  const [showDetails, toggleShowDetails] = useState(false);
  const [adjustToggle, setAdjustToggle] = useState(false);
  const [suggestedData, setSuggestedData] = useState({
    acteur_weight: description.acteur["weight"],
    verb_weight: description.trigger_verb["weight"],
    obj_weight: description.object["weight"],
  });

  const onChange = (e) => {
    setSuggestedData({ ...suggestedData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    const { acteur_weight, verb_weight, obj_weight } = suggestedData;
    e.preventDefault();

    if (
      acteur_weight != undefined &&
      acteur_weight != null &&
      acteur_weight != description.acteur["weight"]
    ) {
      console.log(acteur_weight);
      adjustActeur(description.acteur["name"], acteur_weight);
      description.acteur["weight"] = acteur_weight;
    }
    if (
      verb_weight != undefined &&
      verb_weight != null &&
      verb_weight != description.trigger_verb["weight"]
    ) {
      console.log(verb_weight);
      adjustVerb(description.trigger_verb["verb"], verb_weight);
      description.trigger_verb["weight"] = verb_weight;
    }
    if (
      obj_weight != undefined &&
      obj_weight != null &&
      obj_weight != description.object["weight"]
    ) {
      console.log(obj_weight);
      adjustObject(description.object["name"], obj_weight);
      description.object["weight"] = obj_weight;
    }

    setAdjustToggle(!adjustToggle);
  };
  const [nullData, fixNullData] = useState({
    error_acteur_name: description.acteur["name"],
    error_acteur_weight: description.acteur["weight"],
    error_trigger_verb: description.trigger_verb["verb"],
    error_verb_weight: description.trigger_verb["weight"],
    error_obj_name: description.object["name"],
    error_obj_weight: description.object["weight"],
  });

  const onChange_FixNull = (e) => {
    fixNullData({ ...nullData, [e.target.name]: e.target.value });
  };
  const onSubmit_FixNull = async (e) => {
    e.preventDefault();
    setAdjustToggle(!adjustToggle);
    console.log(nullData);
  };
  return (
    <div className="single-history" key={id}>
      <Alert />
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          onClick={() => toggleShowDetails(!showDetails)}
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-black ">
          {showDetails ? "Open details" : "close details"}
        </span>
      </label>
      {description.trigger_verb["verb"] != "Error"
        ? showDetails && (
            <div className="flex flex-row justify-between  px-4 py-2 bg-white rounded-lg shadow-md text-center">
              {adjustToggle ? (
                <form
                  className="flex justify-between w-full form"
                  onSubmit={(e) => onSubmit(e)}
                >
                  <div className="space-y-3">
                    <p className="font-bold">Acteur</p>
                    <p>{description.acteur.name}</p>
                    {description.acteur["weight"] ? (
                      <input
                        type="text"
                        id="acteur_weight"
                        name="acteur_weight"
                        onChange={(e) => onChange(e)}
                        aria-label="acteur_weight"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                        defaultValue={description.acteur["weight"]}
                        required
                      />
                    ) : (
                      <p className="p-2">
                        {description.acteur["oil Production"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Verb</p>
                    <p>{description.trigger_verb.verb}</p>

                    <input
                      type="text"
                      id="verb_weight"
                      name="verb_weight"
                      onChange={(e) => onChange(e)}
                      aria-label="verb_weight"
                      defaultValue={description.trigger_verb.weight}
                      required
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Object</p>

                    <p>{description.object.name}</p>
                    {description.object["weight"] ? (
                      <input
                        type="text"
                        id="obj_weight"
                        name="obj_weight"
                        onChange={(e) => onChange(e)}
                        aria-label="obj_weight"
                        required
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                        defaultValue={description.object["weight"]}
                      />
                    ) : (
                      <p className="p-2">
                        {description.object["oil Production"]}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="flex space-x-1 text-blue-500 cursor-pointer hover:underline hover:text-blue-700 h-fit w-40"
                  >
                    <AdjustmentsIcon className="h-6" />
                    <p className="">Save Adjustments </p>
                  </button>
                </form>
              ) : role != "user" ? (
                <>
                  <div className="space-y-3">
                    <p className="font-bold">Acteur</p>
                    <p>{description.acteur.name}</p>
                    {description.acteur["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.acteur["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.acteur["oil Production"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Verb</p>
                    <p>{description.trigger_verb.verb}</p>

                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                      value={description.trigger_verb["weight"]}
                      disabled
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Object</p>

                    <p>{description.object.name}</p>
                    {description.object["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.object["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.object["oil Production"]}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(auth) => setAdjustToggle(!adjustToggle)}
                    className="flex space-x-1 text-blue-500 cursor-pointer hover:underline hover:text-blue-700 h-fit w-40 "
                  >
                    <AdjustmentsIcon className="h-6 " />
                    <p className="">Make Adjustments</p>
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="font-bold">Acteur</p>
                    <p>{description.acteur.name}</p>
                    {description.acteur["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.acteur["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.acteur["oil Production"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Verb</p>
                    <p>{description.trigger_verb.verb}</p>

                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                      value={description.trigger_verb["weight"]}
                      disabled
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Object</p>

                    <p>{description.object.name}</p>
                    {description.object["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.object["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.object["oil Production"]}
                      </p>
                    )}
                  </div>
                  <button className="flex space-x-1 text-blue-500 hover:underline hover:text-blue-700 h-fit w-40 cursor-not-allowed ">
                    <AdjustmentsIcon className="h-6 " />
                    <p className="">Make Adjustments</p>
                  </button>
                </>
              )}
            </div>
          )
        : showDetails && (
            <div className="flex flex-row justify-between  px-4 py-2 bg-white rounded-lg shadow-md text-center">
              {adjustToggle ? (
                <form
                  className="flex justify-between w-full form"
                  onSubmit={(e) => onSubmit_FixNull(e)}
                >
                  <div className="space-y-3">
                    <p className="font-bold">Acteur</p>
                    <input
                      type="text"
                      id="acteur_name"
                      name="acteur_name"
                      onChange={(e) => onChange_FixNull(e)}
                      aria-label="acteur_name"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                      defaultValue={description.acteur["name"]}
                      required
                    />

                    {description.acteur["weight"] ? (
                      <input
                        type="text"
                        id="acteur_weight"
                        name="acteur_weight"
                        onChange={(e) => onChange_FixNull(e)}
                        aria-label="acteur_weight"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                        defaultValue={description.acteur["weight"]}
                        required
                      />
                    ) : (
                      <p className="p-2">
                        {description.acteur["oil Production"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Verb</p>

                    <input
                      type="text"
                      id="trigger_verb"
                      name="trigger_verb"
                      onChange={(e) => onChange_FixNull(e)}
                      aria-label="trigger_verb"
                      defaultValue={description.trigger_verb.verb}
                      required
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                    />
                    <input
                      type="text"
                      id="verb_weight"
                      name="verb_weight"
                      onChange={(e) => onChange_FixNull(e)}
                      aria-label="verb_weight"
                      defaultValue={description.trigger_verb.weight}
                      required
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Object</p>

                    <input
                      type="text"
                      id="obj_name"
                      name="obj_name"
                      onChange={(e) => onChange_FixNull(e)}
                      aria-label="obj_name"
                      required
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                      defaultValue={description.object["name"]}
                    />
                    {description.object["weight"] ? (
                      <input
                        type="text"
                        id="obj_weight"
                        name="obj_weight"
                        onChange={(e) => onChange_FixNull(e)}
                        aria-label="obj_weight"
                        required
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2  "
                        defaultValue={description.object["weight"]}
                      />
                    ) : (
                      <p className="p-2">
                        {description.object["oil Production"]}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="flex space-x-1 text-blue-500 cursor-pointer hover:underline hover:text-blue-700 h-fit w-40"
                  >
                    <AdjustmentsIcon className="h-6" />
                    <p className="">Save Adjustments </p>
                  </button>
                </form>
              ) : role != "user" ? (
                <>
                  <div className="space-y-3">
                    <p className="font-bold">Acteur</p>
                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                      value={description.acteur["name"]}
                      disabled
                    />
                    {description.acteur["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.acteur["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.acteur["oil Production"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Verb</p>
                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                      value={description.trigger_verb["verb"]}
                      disabled
                    />

                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                      value={description.trigger_verb["weight"]}
                      disabled
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Object</p>

                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                      value={description.object["name"]}
                      disabled
                    />
                    {description.object["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.object["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.object["oil Production"]}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(auth) => setAdjustToggle(!adjustToggle)}
                    className="flex space-x-1 text-blue-500 cursor-pointer hover:underline hover:text-blue-700 h-fit w-40 "
                  >
                    <AdjustmentsIcon className="h-6 " />
                    <p className="">Make Adjustments</p>
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="font-bold">Acteur</p>
                    <p>{description.acteur.name}</p>
                    {description.acteur["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.acteur["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.acteur["oil Production"]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Verb</p>
                    <p>{description.trigger_verb.verb}</p>

                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                      value={description.trigger_verb["weight"]}
                      disabled
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="font-bold">Object</p>

                    <p>{description.object.name}</p>
                    {description.object["weight"] ? (
                      <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="text-center self-center border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2 cursor-not-allowed  "
                        value={description.object["weight"]}
                        disabled
                      />
                    ) : (
                      <p className="p-2">
                        {description.object["oil Production"]}
                      </p>
                    )}
                  </div>
                  <button className="flex space-x-1 text-blue-500 hover:underline hover:text-blue-700 h-fit w-40 cursor-not-allowed ">
                    <AdjustmentsIcon className="h-6 " />
                    <p className="">Make Adjustments</p>
                  </button>
                </>
              )}
            </div>
          )}
    </div>
  );
};

export default connect(null, { adjustObject, adjustVerb, adjustActeur })(
  SwitchButton
);
