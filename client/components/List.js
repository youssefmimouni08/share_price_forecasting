import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "../styles/Home.module.css";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { getMyPredictions } from "../redux/actions/forecast";
const List = ({ getMyPredictions, auth, myPredictions, loading }) => {
  useEffect(() => {
    getMyPredictions();
  }, []);
  return (
    <div className="font-mono container flex justify-center mx-auto my-20">
      <div
        className="
          overflow-x-auto relative shadow-md rounded-lg"
      >
        <table className=" text-sm text-left text-gray-500  " id="dataTable">
          <thead className="text-sm  uppercase bg-gray-50  text-gray-700">
            <tr className="bg-gray-100 ">
              <th scope="col" className="py-3 px-6">
                Created_at
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
              ? myPredictions.map((prediction) => (
                  <>
                    <tr className="bg-white border-b   whitespace-nowrap">
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium  whitespace-nowrap text-gray-900"
                      >
                        {prediction.createdAt}
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
                        <input
                          className="px-4 py-1 text-sm text-black
                         bg-blue-200 rounded-full focus:border-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href="#"
                          className="flex items-center px-4 py-1 text-sm text-black bg-gray-100 rounded-full shadow-md"
                        >
                          <AdjustmentsIcon className="h-6" />
                        </a>
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
  auth: PropTypes.object.isRequired,
  myPredictions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  myPredictions: state.forecast.myPredictions,
  loading: state.forecast.loading,
});
export default connect(mapStateToProps, { getMyPredictions })(List);
