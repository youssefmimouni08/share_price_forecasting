import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllRegions } from "../../../../redux/actions/worlddata";

import DataTable from "./DataTable";

const ListRegions = ({
  worlddata: { all_regions, loading },
  getAllRegions,
}) => {
  useEffect(() => {
    getAllRegions();
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex flex-col space-y-10 ">
      {all_regions && <DataTable data={all_regions} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  worlddata: state.worlddata,
});
export default connect(mapStateToProps, { getAllRegions })(ListRegions);
