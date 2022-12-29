import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      key={alert.id}
      className={`w-3/4 bg-${alert.alertType}-100 border-l-4 border-${alert.alertType}-500 text-${alert.alertType}-700 p-4 self-center`}
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>{alert.msg}</p>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
