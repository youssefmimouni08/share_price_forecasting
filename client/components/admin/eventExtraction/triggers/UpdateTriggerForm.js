import { useState } from "react";

const UpdateTriggerForm = ({ data }) => {
  // Initialize state variables with the data prop passed to the component
  const [trigger, setTrigger] = useState(data.trigger);
  const [weight, setWeight] = useState(data.weight);
  const [eventType, setEventType] = useState(data.event_type.event);
  const [formChanged, setFormChanged] = useState(false);

  const handleTriggerChange = (e) => {
    setTrigger(e);
    setFormChanged(true);
  };

  const handleWeightChange = (e) => {
    setWeight(e);
    setFormChanged(true);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e);
    setFormChanged(true);
  };
  // Options for the role select dropdown
  //fetch list event types
  const eventTypesOptions = [
    data.event_type.event,
    "superUser",
    "user",
    "admin",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(trigger, weight, eventType);
    // send updated data to the server here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 h-fit bg-gray-800 p-7  text-white flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="trigger"
            >
              Trigger
            </label>
            <input
              className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="trigger"
              type="text"
              value={trigger}
              onChange={(e) => handleTriggerChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="weight"
            >
              Weight
            </label>
            <input
              className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="weight"
              type="text"
              value={weight}
              onChange={(e) => handleWeightChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="eventType"
            >
              Event Type
            </label>
            <div className="relative">
              <select
                className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="eventType"
                value={eventType}
                onChange={(e) => handleEventTypeChange(e.target.value)}
              >
                {eventTypesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          disabled={!formChanged}
          className={`w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-70 disabled:cursor-not-allowed `}
          type="submit"
        >
          Update Trigger
        </button>
      </div>
    </form>
  );
};

export default UpdateTriggerForm;
