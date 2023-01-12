import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllProvinces } from "../../../../redux/actions/worlddata";
import DataTable from "./DataTable";

const ListProvinces = ({
  worlddata: { all_Provinces, loading },
  getAllProvinces,
}) => {
  useEffect(() => {
    getAllProvinces();
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex flex-col space-y-10 ">
      {all_Provinces && <DataTable data={all_Provinces} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  worlddata: state.worlddata,
});
export default connect(mapStateToProps, { getAllProvinces })(ListProvinces);
