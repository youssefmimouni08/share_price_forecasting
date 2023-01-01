import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getEventDetails } from "../../../../redux/actions/events";
import Loading from "../../../ui/Loading";
import UpdateForm from "./UpdateForm";
const DetailEvent = ({ events: { eventDetail, loading }, getEventDetails }) => {
  const router = useRouter();
  useEffect(() => {
    getEventDetails(router.query.id);
  }, [getEventDetails]);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10">
      {eventDetail && <UpdateForm data={eventDetail} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  events: state.events,
});
export default connect(mapStateToProps, { getEventDetails })(DetailEvent);
