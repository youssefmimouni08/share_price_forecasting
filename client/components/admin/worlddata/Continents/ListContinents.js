import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllContinents } from "../../../../redux/actions/worlddata";
import Loading from "../../../ui/Loading";
import DataTable from "./DataTable";

const ListContinents = ({
  worlddata: { all_continents, loading },
  getAllContinents,
}) => {
  useEffect(() => {
    getAllContinents();
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex flex-col space-y-10 ">
      {all_continents && <DataTable data={all_continents} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  worlddata: state.worlddata,
});
export default connect(mapStateToProps, { getAllContinents })(ListContinents);
