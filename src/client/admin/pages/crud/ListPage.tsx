import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Helmet } from "react-helmet";
import { trans } from "../../../../common/resources/lang/translate";
import { adminApiURL } from "../../../resources/strings/apiURL";
import ApiRequest from "../../libraries/ApiRequest";
import { ICrudPageProps } from "./types";
class ListPage extends React.Component<
  ICrudPageProps & IListPageProps,
  IListPageState
> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    const requester = new ApiRequest();
    requester.get(this.props.apiURL).then((res: any) => {
      this.setState({ items: res.data.data });
    });
  }
  render() {
    const rowStyle: Array<CSSProperties> = [
      {},
      {
        background: "#9c27b0",
      },
    ];
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
                this.state.items.length > 0
                  ? Object.keys(this.state.items[0]).map((key: string) =>
                      this.props.fields.includes(key) ? (
                        <TableCell key={key} align="center">
                          {trans("db." + key) != ""
                            ? trans("db." + key)
                            : key.toUpperCase()}
                        </TableCell>
                      ) : null
                    )
                  : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {typeof this.state.items !== "undefined" &&
              this.state.items.length > 0
                ? this.state.items.map((item, key) => (
                    <TableRow key={key} style={rowStyle[key % 2]}>
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

interface IListPageProps {
  fields: Array<string>; // for showing data fields
}

interface IListPageState {
  items: Array<any>; // data from server
}

export default ListPage;
