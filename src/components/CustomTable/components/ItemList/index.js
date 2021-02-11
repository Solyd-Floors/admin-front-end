import React from "react";
import List from "./List";
import { Link } from "react-router-dom";

export default props => {
    let { onRowUpdate, onRowAdd, onRowDelete } = props.editable || {}
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-sm-flex align-items-start justify-content-between mb-4">
                    <div>
                    <h4 className="card-title mb-1">{props.title}</h4>
                </div>
                {
                    onRowAdd &&
                    <Link to="?create">
                        <button className="btn btn-light mt-3 mt-lg-0">
                            {props.create_button_title || "Create"}
                        </button>
                    </Link>
                }
            </div>
            <div className="table-responsive">
                <List 
                    columns={props.columns} 
                    items={props.items}
                    onRowDelete={onRowDelete}
                />
            </div>
            </div>
        </div>
    )
}