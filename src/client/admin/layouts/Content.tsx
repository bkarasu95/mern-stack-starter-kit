import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { IReduxUserProps } from "../../../../@types/client/admin/pages";
import ResourceRoute from "../components/ResourceRoute";
import HomePage from "../pages/HomePage";

class Content extends React.Component<IReduxUserProps> {
  render() {
    const styles: CSSProperties = {
      padding: "0px 15px",
      minHeight: "90vh",
    };
    return (
      <>
        <Row style={styles}>
          <ResourceRoute link="products" />
          <ResourceRoute link="logs" />
          <Switch>
            <Route path="/dashboard" component={HomePage} />
            {/* {this.props.user.role === "admin" && (
              <Route path="/logs" component={ListLogsPage} />
            )} */}
          </Switch>
        </Row>
      </>
    );
  }
}


const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(Content);