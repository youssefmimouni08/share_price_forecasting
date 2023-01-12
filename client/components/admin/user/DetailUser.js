import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getUserDetails } from "../../../redux/actions/user";
import UpdateUserForm from "./UpdateUserForm";
const DetailUser = ({ users: { userDetail, loading }, getUserDetails }) => {
  const router = useRouter();
  useEffect(() => {
    getUserDetails(router.query.id);
  }, [router.query.id]);

  return (
    <div className="bg-gray-200 w-full h-full rounded-2xl shadow-lg p-10 flex justify-center">
      {userDetail && <UpdateUserForm data={userDetail} />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUserDetails })(DetailUser);
