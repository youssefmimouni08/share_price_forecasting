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

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  let sortedData = [];
  if (all_events.length > 0) {
    sortedData = all_events.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
  }

  const startIndex = (page - 1) * perPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + perPage);

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
