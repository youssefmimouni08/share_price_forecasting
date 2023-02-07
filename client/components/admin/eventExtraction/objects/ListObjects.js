import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllArguments } from "../../../../redux/actions/arguments";

import Table from "./Table";

const ListObjects = ({ objects: { all_arguments }, getAllArguments }) => {
  useEffect(() => {
    getAllArguments();
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex flex-col space-y-10 ">
      {all_arguments && <Table data={all_arguments} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  objects: state.objects,
});
export default connect(mapStateToProps, { getAllArguments })(ListObjects);
