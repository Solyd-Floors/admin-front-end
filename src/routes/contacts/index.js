import React from 'react';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';

import { withApollo, Query } from "react-apollo";

import { loader } from 'graphql.macro';
import getDeleteCountryGQL from "../../gql/mutations/delete_country.graphql";
import getUpdateCampaignCategoryGQL from "../../gql/mutations/update_country.graphql";

import campaignCategorySchema from "./validations";
import removeNullProperties from "../../helpers/removeNullProperties";
import { Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const GET_CONTACTS = loader("../../gql/queries/get_contacts.graphql")

const tableIcons = {
    Add: forwardRef((props, ref) => <Button style={{ backgroundColor: "#3f51b5", width: "100px" }} size="large" color="primary" {...props} ref={ref}><div style={{ color: "white" }}>New</div></Button>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            iserror: false,
            errorMessages: []
        }
        this.columns = [
            { title: "ID", field: "id", hidden: false, editable: false },
            { title: "full_name", field: "full_name", hidden: false },
            { title: "reason", field: "reason", hidden: false },
            { title: "email", field: "email", hidden: false },
        ]
    }
    setIserror = val => this.setState({ error: val })
    setErrorMessages = val => this.setState({ errorMessages: val })
    setData = val => this.setState({ data: val })
    updateData = async () => {
        try {
            let cache = await this.props.client.readQuery({
                query: GET_CONTACTS
            })
            this.setData(cache.getContacts.data.contacts)
        } catch (err) { }
    }
    handleMutate = async mutate_function => {
        let res;
        try {
            res = await mutate_function();
            console.log(res)
        } catch (err) { 
            console.log(err.message,err,JSON.stringify(err))
            if (
                err.networkError &&
                err.networkError.result
            ) {
                if (err.networkError.result.errors){
                    this.setErrorMessages(err.networkError.result.errors)
                } else if(err.networkError.result.code !== 500 && err.networkError.result.message) {
                    this.setErrorMessages([err.networkError.result.message])
                } else {
                    this.setErrorMessages(["Something unexpected happened, please try again!"])
                }
            } 
            return false
         }
         return res;
    }
    render() {
        return (
            <React.Fragment>
                <Query query={GET_CONTACTS} fetchPolicy={"cache-and-network"}>
                    {({ loading, error, data, refetch }) => {
                        this.refetch = refetch;
                        if (error) return error.message;
                        console.log({ data: loading && !data ? [] : data.getContacts.data.contacts})
                        return (
                            <Grid spacing={1}>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={12}>
                                    <div>
                                        {this.state.errorMessages && this.state.errorMessages.length ?
                                            <Alert severity="error">
                                                {this.state.errorMessages.map((msg, i) => {
                                                    return <div key={i}>{msg}</div>
                                                })}
                                            </Alert>
                                            : null
                                        }
                                    </div>
                                    <MaterialTable
                                        isEditHidden={rowData => ["id"].indexOf(rowData.name) !== -1}
                                        title={`Contacts ${loading && !data ? "( loading )" : ""}`}
                                        columns={this.columns}
                                        data={loading && !data ? [] : data.getContacts.data.contacts}
                                        icons={tableIcons}
                                        editable={{
                                            onRowUpdate: false,
                                            onRowAdd: false,
                                            onRowDelete: false
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>
                        )
                    }}
                </Query>
            </React.Fragment>
        );
    }
}

export default withApollo(App);
