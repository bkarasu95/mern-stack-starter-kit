import { AxiosResponse } from "axios";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { store } from ".";
import { IUser } from "../../../@types/common/user";
import ApiRequest from "./libraries/ApiRequest";
import Authenticated from "./pages/Authenticated";
import LoginPage from "./pages/LoginPage";
import { login } from "./store/authenticate/actions";

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      authorizing: true,
    };
  }
  componentDidMount() {
    const requester = new ApiRequest();
    requester
      .get("auth-token")
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          store.dispatch(login(res.data.data.user));
        }
      })
      .then(() => {
        this.setState({ authorizing: false });
      });
  }

  render() {
    return (
      <>
        {this.state.authorizing ? null : (
          <div className="min-vh-100 d-flex">
            {this.props.user == null ? <Redirect to="/" /> : null}
            <Switch>
              {this.props.user == null ? (
                <Route exact path="/" component={LoginPage} />
              ) : (
                  <>
                    <Route exact path="/*" component={Authenticated} />
                  </>
                )}
            </Switch>
          </div>
        )}
      </>
    );
  }
}

export interface IAppProps {
  user?: IUser;
}

export interface IAppState {
  authorizing: boolean;
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(App);
