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

import Header from "../header";
import { withApollo, Query } from "react-apollo";

import { loader } from 'graphql.macro';
import getDeteleteUserGQL from "../../gql/mutations/delete_user.graphql";
import getUpdateUserGQL from "../../gql/mutations/update_user.graphql";

import usersSchema from "./validations";
import removeNullProperties from "../../helpers/removeNullProperties";
import { withRouter } from 'react-router-dom';
import { compose } from "recompose";
import qs from "qs";
import { Button } from '@material-ui/core';

const GET_USERS = loader("../../gql/queries/get_users.graphql") 
const POST_USERS = loader("../../gql/mutations/post_users.graphql")

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
    constructor(props){
        super(props);
        this.state = {
            data: [],
            iserror: false,
            errorMessages: []
        }
        this.columns = [
            { title: "ID" || "id", field: "id", hidden: false, editable: false },
            { title: "Email", field: "email" },
            { title: "Full Name", field: "full_name" },
            { title: "password", field: "password", render: () => <p>*********</p>, hidden: false },
            { title: "Admin" || "isAdmin", field: "isAdmin", lookup: { [true]: "Yes", [false]: "No" }},
            { title: "", field: "search_by_id", hidden: false, editable: false, render: () => <p></p> },
        ]
        
    }
    setIserror = val => this.setState({ error: val })
    setErrorMessages = val => this.setState({ errorMessages: val })
    setData = val => this.setState({ data: val })
    updateData = async () => {
        try {
            let cache = await this.props.client.readQuery({
                query: GET_USERS
            })
            this.setData(cache.getUsers.data.users)
        } catch (err) {}
    }
    handleRowAdd = async (newData, resolve, reject) => {
        let args = removeNullProperties(newData)
        try {
            let val = await usersSchema.validate(args, { abortEarly: false });
        } catch(err) {
            this.setErrorMessages(err.errors)
            return reject()
        }
        if (args.contract_id) args.contract_id = String(args.contract_id)
        if (args.birthday) args.birthday = new Date(args.birthday).toISOString() 
        if (typeof(args.isAdmin) === "string") args.isAdmin = args.isAdmin === "true" ? true : false
        try {
            await this.props.client.mutate({
                mutation: POST_USERS,
                variables: args,
                refetchQueries: [ { query: GET_USERS } ]
            })
        } catch(err) {
            console.log(JSON.parse(JSON.stringify(err)),919)
            if (err && err.networkError && err.networkError.result && err.networkError.result.code === 422){
                this.setErrorMessages(err.networkError.result.errors);
                return reject();
            }
        }
        return resolve();
    }
    handleRowUpdate = async (newData, oldData, resolve, reject) => {
        this.setErrorMessages([])
        let args = removeNullProperties(newData)
        try {
            let val = await usersSchema.validate(args, { abortEarly: false });
        } catch(err) {
            this.setErrorMessages(err.errors)
            return reject()
        }
        if (args.contract_id) args.contract_id = String(args.contract_id)
        if (args.birthday) args.birthday = new Date(args.birthday).toISOString()
        if (typeof(args.isAdmin) === "string") args.isAdmin = args.isAdmin === "true" ? true : false

        try {
            let res = await this.props.client.mutate({
                mutation: getUpdateUserGQL(oldData.id),
                variables: args 
            })
        } catch(err) {
            if (err && err.networkError && err.networkError.result && err.networkError.result.errors){
                this.setErrorMessages(err.networkError.result.errors);
                return reject();
            }
        }
        return resolve()
    }
    handleRowDelete = async (oldData, resolve) => {
        this.setErrorMessages([])
        let res = await this.props.client.mutate({
            mutation: getDeteleteUserGQL(oldData.id)
        })
        let cache = await this.props.client.readQuery({
            query: GET_USERS
        })
        cache.getUsers.data.users = cache.getUsers.data.users.filter(x => x.id != oldData.id)
        await this.props.client.writeQuery({
            query: GET_USERS,
            data: { ...cache }
        })
        console.log({res})
        await this.updateData()
        return resolve()
    }
    render(){     
        return (
            <React.Fragment>
                <Query query={GET_USERS} fetchPolicy={"cache-and-network"}>
                    {({loading,error,data,refetch}) => {
                        this.refetch = refetch;
                        if (error) return error.message;
                        let query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
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
                                        title={`Users ${loading && !data ? "( Loading... )" : ""}`}
                                        columns={this.columns}
                                        data={loading && !data ? [] : data.getUsers.data.users.map(user => ({
                                            search_by_id: `id:${user.id}`, ...user
                                        }))}
                                        icons={tableIcons}
                                        options={{
                                            searchText: query ? query.search_text : ""
                                        }}
                                        editable={{
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve, reject) => {
                                                    this.handleRowUpdate(newData, oldData, resolve, reject);
                                                }),
                                            onRowAdd: (newData) =>
                                                new Promise((resolve, reject) => {
                                                    this.handleRowAdd(newData, resolve, reject)
                                                }),
                                            onRowDelete: (oldData) =>
                                                new Promise((resolve, reject) => {
                                                    this.handleRowDelete(oldData, resolve, reject)
                                                }),
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

export default compose(withRouter,withApollo)(App);
