import { useState } from "react";

const UpdateForm = ({ data }) => {
  const [event, setEvent] = useState(data.event);
  const [questions, setQuestions] = useState(data.questionTemplate);

  const handleSubmit = (e) => {
    e.preventDefault();
    // send updated data to the server here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-fit bg-gray-800 p-7  text-white flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="event"
            >
              Event
            </label>
            <input
              className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="event"
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full space-y-5 px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="questions"
            >
              Questions Template
            </label>
            <div className="overflow-x-auto min-w-full flex flex-row flex-wrap  justify-around space-x-4 ">
              {questions.map((question, index) => (
                <div key={index} className="space-y-2 w-72 my-5 ">
                  <div className="flex whitespace-nowrap  space-x-5 justify-between items-center ">
                    <label
                      className="text-xs font-bold  "
                      htmlFor="argumentRole"
                    >
                      Argument
                    </label>
                    <input
                      className="appearance-none block w-2/3  bg-gray-400 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id={`argumentRole-${index}`}
                      type="text"
                      placeholder="Argument Role"
                      value={question.argumentRole}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].argumentRole = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                    />
                  </div>
                  <div className="flex whitespace-nowrap space-x-5 items-center justify-between">
                    <label className="  text-xs font-bold " htmlFor="question">
                      Question
                    </label>
                    <input
                      className="appearance-none block  w-2/3 bg-gray-400 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id={`question-${index}`}
                      type="text"
                      placeholder="Question"
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].question = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
