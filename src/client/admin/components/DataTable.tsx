import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { IDataTableProps, IDataTableState } from "../../../../@types/client/admin/components";
import { trans } from "../../../common/resources/lang/translate";
import ApiRequest from "../libraries/ApiRequest";
import ActionMenu from "./form/ActionMenu";

class DataTable extends React.Component<IDataTableProps, IDataTableState>{
  constructor(props) {
    super(props);
    this.state = {
      items: [], // data rows
      fetching: true, // is fetching from server
      requestParams: { // get query params
        limit: 30,
        start: 0,
        orderBy: null
      },
      refreshDate: null
    };
  }
  forceRefresh(refresh: boolean): void {
    if (refresh) {
      this.setState({ refreshDate: Date.now().toString() });
    }
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    if (this.state.refreshDate) {
      this.getData();
    }
  }
  getData() {
    const requester = new ApiRequest();
    requester.get(this.props.resourceURL, this.state.requestParams).then((res: any) => {
      this.setState({ items: res.data.data.items });
    });
  }
  render() {

    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {this.state.items.length > 0 && (
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
                  <TableCell align="center" size="small" padding="none">
                    <strong>{"Aksiyonlar"}</strong>
                    {/* {trans("form.actions")} */}
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.length > 0
              ? this.state.items.map((item, key) => (
                <TableRow
                  key={key}
                  className={key % 2 === 0 ? this.props.themeClass : null} // better coloring
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
                    <TableCell align="center" size="small" padding="none">
                      <ActionMenu
                        url={this.props.resourceURL + "/" + item._id}
                        actions={this.props.actions}
                        forceRefresh={this.forceRefresh.bind(this)}
                      />
                    </TableCell>
                  </>
                </TableRow>

              ))
              : (
                <TableRow>
                  <TableCell>
                    {/** TODO add lang support */}
                    <strong>Veri Bulunamadı</strong>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
          {this.state.items.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Grid container direction="row">
                    <Grid item md={4}>
                      {/** TODO add lang support */}
                      <p>Veri Bulunamadı</p>
                      <p>{this.state.refreshDate}</p>

                    </Grid>
                    <Grid item md={7}>

                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

    );
  }
}

export default DataTable;