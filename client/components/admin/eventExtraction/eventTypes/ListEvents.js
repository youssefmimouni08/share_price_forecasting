import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllEvents } from "../../../../redux/actions/events";
import Loading from "../../../ui/Loading";
import Table from "./Table";

const ListEvents = ({ events: { all_events, loading }, getAllEvents }) => {
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex flex-col space-y-10 ">
      {all_events && <Table data={all_events} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  events: state.events,
});
export default connect(mapStateToProps, { getAllEvents })(ListEvents);
