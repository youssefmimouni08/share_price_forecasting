import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "../styles/Home.module.css";
import { AdjustmentsIcon, CheckCircleIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { getMyPredictions, submitRealImpact } from "../redux/actions/forecast";
const List = ({
  getMyPredictions,
  submitRealImpact,
  auth,
  myPredictions,
  loading,
}) => {
  useEffect(() => {
    getMyPredictions();
  }, []);
  const [enableInput, setEnableInput] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [formData, setFormData] = useState("");

  const handleRowClick = (index) => {
    setEnableInput(!enableInput);
    setSelectedRowIndex(index);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(value);
  };
  const submit_RealImpact = (event, id) => {
    event.preventDefault();
    console.log(formData);
    submitRealImpact(id, formData);
  };

  const formatDate = (mongoDate) => {
    const date = new Date(mongoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="font-mono container flex justify-center mx-auto my-20">
      <div
        className="
          overflow-x-auto relative shadow-md rounded-lg"
      >
        <table className=" text-sm text-left text-gray-500  " id="dataTable">
          <thead className="text-sm  uppercase  bg-opacity-30 backdrop-filter backdrop-blur-xl  text-gray-700">
            <tr className=" ">
              <th scope="col" className="py-3 px-6">
                Updated_at
              </th>
              <th scope="col" className="py-3 px-6">
                Event
              </th>
              <th scope="col" className="py-3 px-6">
                Forcasted Impact
              </th>
              <th scope="col" className="py-3 px-6">
                Real Impact
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="">
            {!loading && myPredictions.length > 0
              ? myPredictions.map((prediction, index) => (
                  <>
                    <tr
                      key={prediction._id}
                      className="bg-opacity-30 backdrop-filter backdrop-blur-xl border-b   whitespace-nowrap"
                    >
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium  whitespace-nowrap text-gray-900"
                      >
                        {formatDate(prediction.updatedAt)}
                      </th>

                      <td className="px-6 py-4 ">
                        <div className="text-sm ">
                          {prediction.forecast_object.event}
                        </div>
                      </td>
                      <td className="px-6 py-4 ">
                        <div className="text-sm ">
                          {prediction.forecast_object.event_impact} %
                        </div>
                      </td>
                      <td className=" px-6 py-4 text-sm text-center ">
                        {enableInput && selectedRowIndex === index ? (
                          <input
                            onChange={handleChange}
                            className="px-4 py-1 text-sm text-black
                       bg-blue-200 rounded-full focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-sm ">
                            {prediction.real_impact
                              ? `${prediction.real_impact}  %`
                              : "#######"}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {enableInput && selectedRowIndex === index ? (
                          <a
                            onClick={(e) => {
                              handleRowClick(index);
                              submit_RealImpact(e, prediction._id);
                            }}
                            className="cursor-pointer flex items-center hover:animate-bounce px-4 py-1 text-sm text-black bg-gray-100 rounded-full shadow-md"
                          >
                            <CheckCircleIcon className="h-6" />
                          </a>
                        ) : (
                          <a
                            onClick={() => handleRowClick(index)}
                            className="cursor-pointer flex items-center hover:animate-bounce px-4 py-1 text-sm text-black bg-gray-100 rounded-full shadow-md"
                          >
                            <AdjustmentsIcon className="h-6" />
                          </a>
                        )}
                      </td>
                    </tr>
                  </>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};
List.propTypes = {
  getMyPredictions: PropTypes.func.isRequired,
  submitRealImpact: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  myPredictions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  myPredictions: state.forecast.myPredictions,
  loading: state.forecast.loading,
});
export default connect(mapStateToProps, { getMyPredictions, submitRealImpact })(
  List
);
