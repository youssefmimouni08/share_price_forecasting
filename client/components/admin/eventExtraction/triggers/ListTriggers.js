import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllTriggers } from "../../../../redux/actions/trigger";

import Table from "./Table";

const ListTriggers = ({
  triggers: { all_triggers, loading },
  getAllTriggers,
}) => {
  useEffect(() => {
    getAllTriggers();
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex flex-col space-y-10 ">
      {all_triggers && <Table data={all_triggers} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  triggers: state.triggers,
});
export default connect(mapStateToProps, { getAllTriggers })(ListTriggers);
