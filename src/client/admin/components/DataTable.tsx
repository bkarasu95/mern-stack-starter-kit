import { Paper, Snackbar, Table, TableContainer } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import { IDataTableProps, IDataTableState } from "../../../../@types/client/admin/components";
import { IFilter } from "../../../../@types/client/admin/form";
import ApiRequest from "../libraries/ApiRequest";
import DataTableBody from "./DataTable/DataTableBody";
import DataTableFooter from './DataTable/DataTableFooter';
import DataTableHead from "./DataTable/DataTableHead";
import Filter from "./Filter";

class DataTable extends React.Component<IDataTableProps, IDataTableState>{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      fetching: true,
      requestParams: {
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
    if (prevProps.resourceURL !== this.props.resourceURL || prevProps.filters.fields !== this.props.filters.fields) {
      if (this.props.filters.fields !== null) {
        let search = "";
        this.props.filters.fields.map((filter: IFilter, index: number) => {
          // convert the server compatible query
          search += filter.name + "=" + filter.value;
          if (this.props.filters.fields.length !== 1 && index < this.props.filters.fields.length - 1) {
            search += ",";
          }
        })
        let newRequestParams = this.state.requestParams;
        newRequestParams.search = search;
        this.setState({ requestParams: newRequestParams, items: [], fetching: true })
      }
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
        {typeof this.props.filterFields !== "undefined" && this.props.filterFields.length !== 0 && (<Filter items={this.props.filterFields} />)}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <DataTableHead fetching={this.state.fetching} {...this.props} items={this.state.items} />
            <DataTableBody fetching={this.state.fetching} items={this.state.items} {...this.props} actionResult={this.actionResult.bind(this)} />
            <DataTableFooter fetching={this.state.fetching} dataCount={this.state.dataCount} {...this.props} />
            {/** TODO add paginator */}
          </Table>
        </TableContainer>
        {/** TODO make it app-wide snackbar */}
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={this.state.deleteResult != null} autoHideDuration={5000} onClose={() => { this.setState({ deleteResult: null }) }}>
          <Alert severity={"success"}>Record Deleted</Alert>
        </Snackbar>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(DataTable);