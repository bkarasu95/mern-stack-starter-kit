import * as React from "react";
import { Helmet } from "react-helmet";
class AboutUsPage extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Hakkımızda</title>
          <meta property="og:title" content="Hakkımızda" />
        </Helmet>
        <strong>Burak Eren Karasu çok kral bir insan</strong>
      </>
    );
  }
}

export default AboutUsPage;
