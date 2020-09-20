import React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component<
  RouteConfigComponentProps<{}> & IScrollToTopProps
> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}
interface IScrollToTopProps {
  location: string;
}

export default withRouter(ScrollToTop);
