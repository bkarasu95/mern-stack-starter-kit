import React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { IListActions } from "../../../../../../@types/client/admin/form";
import ListPage from "../../ListPage";

class ListLogsPage extends React.Component<RouteConfigComponentProps> {
    render() {
        const fields = ["url", "message", "type", "createdAt"];
        const actions: IListActions = ["show"];
        return (
            <ListPage
                actions={actions}
                resource={"logs?where=type=" + this.props.match.params.type}
                name="Kayıtlar" /** add the  multiple language support */
                fields={fields}
                disableAdd
            />
        );
    }
}

export default ListLogsPage;
