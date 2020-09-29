import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import withStyles, {
  StyledComponentProps,
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Helmet } from "react-helmet";
import {
  IListPageProps,
  IListPageState,
} from "../../../../../@types/client/admin/pages";
import { trans } from "../../../../common/resources/lang/translate";
import ActionMenu from "../../components/form/ActionMenu";
import ApiRequest from "../../libraries/ApiRequest";
class ListPage extends React.Component<
  IListPageProps & StyledComponentProps,
  IListPageState
> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      fetching: true,
    };
  }
  componentDidMount() {
    const requester = new ApiRequest();
    requester.get(this.props.apiURL).then((res: any) => {
      this.setState({ items: res.data.data });
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{trans("resource.list", { item: this.props.name })}</title>
        </Helmet>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {typeof this.state.items !== "undefined" &&
                  this.state.items.length > 0 && (
                    <>
                      {Object.keys(this.state.items[0]).map(
                        (key: string) =>
                          this.props.fields.includes(key) && (
                            <TableCell key={key} align="center">
                              <strong>
                                {trans("db." + key) != ""
                                  ? trans("db." + key)
                                  : key.toUpperCase()}
                              </strong>
                            </TableCell>
                          )
                      )}
                      <TableCell align="center">
                        <strong>{"Aksiyonlar"}</strong>
                        {/* {trans("form.actions")} */}
                      </TableCell>
                    </>
                  )}
              </TableRow>
            </TableHead>
            <TableBody>
              {typeof this.state.items !== "undefined" &&
              this.state.items.length > 0
                ? this.state.items.map((item, key) => (
                    <TableRow
                      key={key}
                      className={key % 2 === 0 ? this.props.classes.row : null}
                    >
                      <>
                        {this.props.fields.map((field, index) => {
                          return (
                            <TableCell key={index} align="center">
                              {item[field] != null &&
                              !Array.isArray(item[field]) &&
                              typeof item[field] !== "object"
                                ? item[field]
                                : ""}
                            </TableCell>
                          );
                        })}
                        <TableCell align="center">
                          <ActionMenu
                            url={this.props.apiURL + "/" + item._id}
                            actions={this.props.actions}
                          />
                        </TableCell>
                      </>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
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
