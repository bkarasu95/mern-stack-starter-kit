import {
  Button
} from "@material-ui/core";
import withStyles, {
  StyledComponentProps
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  IListPageProps,
  IListPageState
} from "../../../../../@types/client/admin/pages";
import { trans } from "../../../../common/resources/lang/translate";
import DataTable from "../../components/DataTable";
import ResultMessageBox from "../../components/form/ResultMessageBox";
class ListPage extends React.Component<IListPageProps & StyledComponentProps> {
  render() {
    const buttonContainerStyle: React.CSSProperties = {
      margin: "10px 0px",
      float: "right"
    }
    return (
      <>
        <Helmet>
          <title>{trans("resource.list", { item: this.props.name })}</title>
        </Helmet>
        <ResultMessageBox />
        <div className="button-container" style={buttonContainerStyle}>
          <Button component={Link} className={this.props.classes.row} to={this.props.resource + "/create"}>
            {trans("resource.add", { item: '' })}
          </Button>
        </div>

        <DataTable resourceURL={this.props.resource} themeClass={this.props.classes.row} fields={this.props.fields} actions={this.props.actions} />
      </>
    );
  }
}

const styles = (theme) => ({
  row: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
});

export default withStyles(styles)(ListPage);
