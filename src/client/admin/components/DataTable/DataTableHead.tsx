import { TableHead, TableRow, TableCell } from "@material-ui/core";
import React from "react";
import { IDataTableHeadProps } from "../../../../../@types/client/admin/components";
import { trans } from "../../../../common/resources/lang/translate";

class DataTableHead extends React.Component<IDataTableHeadProps>{
    render() {
        return (
            <TableHead>
                {/* <TableRow>
                    {this.props.items.length > 0 && (
                        <>
                            {Object.keys(this.props.items[0]).map(
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
                                {trans("form.actions")}
                            </TableCell>
                        </>
                    )}
                </TableRow> */}
                <TableRow>
                    {this.props.items.length > 0 && (
                        <>
                            {this.props.fields.map((field: string) => {
                                return Object.keys(this.props.items[0]).includes(field) && (
                                    <TableCell key={field} align="center">
                                        <strong>
                                            {trans("db." + field) != ""
                                                ? trans("db." + field)
                                                : field.toUpperCase()}
                                        </strong>
                                    </TableCell>
                                )
                            })}
                            <TableCell align="center" size="small" padding="none">
                                <strong>{"Aksiyonlar"}</strong>
                                {/* {trans("form.actions")} */}
                            </TableCell>
                        </>
                    )}
                </TableRow>
            </TableHead>

        );
    }
}

export default DataTableHead;