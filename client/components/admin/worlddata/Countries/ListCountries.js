import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllCountries } from "../../../../redux/actions/worlddata";

import DataTable from "./DataTable";

const ListCountries = ({
  worlddata: { all_countries, loading },
  getAllCountries,
}) => {
  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex flex-col space-y-10 ">
      {all_countries && <DataTable data={all_countries} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  worlddata: state.worlddata,
});
export default connect(mapStateToProps, { getAllCountries })(ListCountries);
