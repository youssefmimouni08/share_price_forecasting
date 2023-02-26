import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import { getEventDetails } from "../../../../redux/actions/events";
import Loading from "../../../ui/Loading";
import UpdateForm from "./UpdateForm";
const DetailEvent = ({ events: { eventDetail, loading }, getEventDetails }) => {
  const router = useRouter();
  useEffect(() => {
    getEventDetails(router.query.id);
  }, [router.query.id]);

  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-xlbg-white bg-opacity-30 backdrop-filter backdrop-blur-xl w-full h-full rounded-2xl shadow-lg p-10 flex justify-center">
      {eventDetail && <UpdateForm data={eventDetail} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  events: state.events,
});
export default connect(mapStateToProps, { getEventDetails })(DetailEvent);
