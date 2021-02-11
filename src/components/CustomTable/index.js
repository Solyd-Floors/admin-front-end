import React from "react";
import { withRouter } from "react-router-dom";
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import queryString from "query-string";

class CustomTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
         
        }
    }
    isEditHidden = rowData => (this.props.isEditHidden ? this.props.isEditHidden(rowData) : false)
    render(){
        let { search } = this.props.history.location;
        let params = queryString.parse(search);
        if (params.create !== undefined) return <CreateItem/>
        return (
            <React.Fragment>
                <ItemList 
                    title={this.props.title} 
                    columns={this.props.columns} 
                    items={this.props.data}
                    editable={this.props.editable}
                />
            </React.Fragment>
        )
    }
}

export default withRouter(CustomTable);
