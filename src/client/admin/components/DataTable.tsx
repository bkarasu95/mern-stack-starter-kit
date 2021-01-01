import { Paper, Snackbar, Table, TableContainer } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { IDataTableProps, IDataTableState } from "../../../../@types/client/admin/components";
import ApiRequest from "../libraries/ApiRequest";
import DataTableBody from "./DataTable/DataTableBody";
import DataTableFooter from './DataTable/DataTableFooter';
import DataTableHead from "./DataTable/DataTableHead";

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
      dataCount: null,
      deleteResult: null
    };
  }
  actionResult(result: boolean): void {
    this.getData();
    this.setState({ deleteResult: result ? "success" : "error" });
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.resourceURL !== this.props.resourceURL) {
      this.getData();
    }
  }
  getData() {
    const requester = new ApiRequest();
    requester.get(this.props.resourceURL, this.state.requestParams).then((res: any) => {
      this.setState({ items: res.data.data.items, dataCount: res.data.data.total, fetching: false });
    });
  }
  render() {
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <DataTableHead fetching={this.state.fetching} {...this.props} items={this.state.items} />
            <DataTableBody fetching={this.state.fetching} items={this.state.items} {...this.props} actionResult={this.actionResult.bind(this)} />
            <DataTableFooter fetching={this.state.fetching} dataCount={this.state.dataCount} {...this.props} />
          </Table>
        </TableContainer>
        {/** TODO make it  */}
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={this.state.deleteResult != null} autoHideDuration={5000} onClose={() => { this.setState({ deleteResult: null }) }}>
          <Alert severity={"success"}>Record Deleted</Alert>
        </Snackbar>
      </>
    );
  }
}

export default DataTable;