import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { IUser } from "../../common/resources/types/user";
import Authenticated from "./pages/Authenticated";
import LoginPage from "./pages/LoginPage";
import { login } from "./store/authenticate/actions";
import { store } from ".";

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      authorizing: true,
    };
  }
  async componentDidMount() {
    if (localStorage.getItem("admin:accessToken")) {
      await store.dispatch(login(localStorage.getItem("admin:accessToken")));
    }
    this.setState({ authorizing: false });
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
                  <Route exact path="/" component={Authenticated} />
                  <Route
                    exact
                    path="/:model/:action"
                    component={Authenticated}
                  />
                  <Route exact path="/:path" component={Authenticated} />
                  
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
