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
import getDeleteCountryGQL from "../../gql/mutations/delete_installers.graphql";
import getUpdateCampaignCategoryGQL from "../../gql/mutations/update_installer.graphql";

import campaignCategorySchema from "./validations";
import removeNullProperties from "../../helpers/removeNullProperties";
import { Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Axios from 'axios';

const GET_BRANDS = loader("../../gql/queries/get_installers.graphql")
const POST_BRANDS = loader("../../gql/mutations/post_installers.graphql")

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

function objectToFormData(obj, rootName, ignoreList) {
    var formData = new FormData();

    function appendFormData(data, root) {
        if (!ignore(root)) {
            root = root || '';
            if (data instanceof File) {
                formData.append(root, data);
            } else if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    appendFormData(data[i], root + '[' + i + ']');
                }
            } else if (typeof data === 'object' && data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (root === '') {
                            appendFormData(data[key], key);
                        } else {
                            appendFormData(data[key], root + '.' + key);
                        }
                    }
                }
            } else {
                if (data !== null && typeof data !== 'undefined') {
                    formData.append(root, data);
                }
            }
        }
    }

    function ignore(root) {
        return Array.isArray(ignoreList)
            && ignoreList.some(function (x) { return x === root; });
    }

    appendFormData(obj, rootName);

    return formData;
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            iserror: false,
            errorMessages: []
        }
        this.images = {}
        this.columns = [
            { title: "ID", field: "id", hidden: false, editable: false },
            { title: "Profile Picture", field: "profile_picture_url",
                render: data => <img 
                    width={50}
                    height={50}
                    src={data.profile_picture_url}
                />,
                editComponent: tableData => {
                    let rowData = tableData.rowData;
                    console.log(JSON.stringify(tableData))
                    return (
                        <React.Fragment>
                            <input onChange={(e) => {
                                let file = e.target.files[0]
                                var fr = new FileReader();
                                fr.onload = d => {
                                    console.log("ON_LOAD")
                                    let src = d.srcElement.result;
                                    if (!this.images[rowData.id]) this.images[rowData.id] = {}
                                    this.images[rowData.id].profile_picture = { src, file };
                                    this["profile_picture"].src = (
                                        this.images[rowData.id] && this.images[rowData.id].profile_picture &&
                                        this.images[rowData.id].profile_picture.src
                                    ) || rowData.thumbnail_url || "https://fomantic-ui.com/images/wireframe/image.png"   
                            }
                                fr.readAsDataURL(file);

                            }} type="file" hidden ref={ref => this["profile_picture_input"] = ref} />
                            <img 
                                ref={ref => this["profile_picture"] = ref}
                                src={
                                    (
                                        this.images[rowData.id] && this.images[rowData.id].profile_picture &&
                                        this.images[rowData.id].profile_picture.src
                                    ) || rowData.thumbnail_url || "https://fomantic-ui.com/images/wireframe/image.png"                                    }
                                width={50}
                                height={50}
                                onClick={() => this["profile_picture_input"].click()}
                            />
                        </React.Fragment>
                    )
                },
            },
            { title: "User ID", field: "UserId", type: "numeric", hidden: false },
            { title: "age", field: "age", type: "numeric", hidden: false },
            { title: "Hourly Rate", field: "hourly_rate", type: "numeric", hidden: false },
            { title: "Country ID", field: "CountryId", type: "numeric", hidden: false },
            { 
                title: "Job Status", field: "job_status", 
                lookup: { "EMPLOYED": "Employed", "UNEMPLOYED": "Unemployed" }, 
                hidden: false 
            },
            { 
                title: "status", field: "status", hidden: false,
                lookup: { "PENDING": "Pending", "APPROVED": "Approved", "DENIED": "Denied" } 
            },
        ]

    }
    setIserror = val => this.setState({ error: val })
    setErrorMessages = val => this.setState({ errorMessages: val })
    setData = val => this.setState({ data: val })
    updateData = async () => {
        try {
            let cache = await this.props.client.readQuery({
                query: GET_BRANDS
            })
            this.setData(cache.getInstallers.data.installers)
        } catch (err) { }
    }
    handleMutate = async mutate_function => {
        let res;
        try {
            res = await mutate_function();
            console.log(res,82828)
        } catch (err) { 
            console.log(JSON.stringify(err),"SADDDSAADS")
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
    handleAddUpdate = async (newData, resolve, reject, type, oldData) => {
        this.setErrorMessages([])
        this.onAction = undefined;
        let files = { }
        let args = removeNullProperties(newData)
        if (isNaN(args.points)) args.points = "null"
        else if (typeof(args.points) === "number") args.points = String(args.points)

        if (this.onAddEditAddressInputRef) args.address = this.onAddEditAddressInputRef.value
        if (args.CampaignCategoryId) args.CampaignCategoryId = Number(args.CampaignCategoryId)
        if (args.UserId) args.UserId = Number(args.UserId)
        let images = type === "post" ? this.images[undefined] : this.images[oldData.id]
        if (images){
            if (images.profile_picture) {
                files["profile_picture"] = images.profile_picture.file
                args["profile_picture"] = "pass-validation"
            }
        }
        try {
            let val = await campaignCategorySchema.validate(args, { abortEarly: false });
        } catch (err) {
            this.setErrorMessages(err.errors)
            return reject()
        }
        // switch from base64 to files
        let fixed_args = { ...args, ...files };
        console.log({ fixed_args})
        let formData = objectToFormData(fixed_args);
        console.log({formData})
        let res;
        let id = type.indexOf("patch") !== -1 ? `/${type.split("_")[1]}` : "" 
        type = type.indexOf("patch") !== -1 ? "patch" : "post"
        try {
            return await Axios[type](`${window.__API_ENDPOINT__}/installers${id}`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    "authorization": `Bearer ${localStorage.getItem("solyd_floors:token")}` 
                }
            })
        } catch (err) {
            this.setErrorMessages(err.response.data.errors)
            return reject()
        }
    }
    handleRowAdd = async (newData, resolve, reject) => {
        let res = await this.handleAddUpdate(newData, resolve, reject, "post")
        if (!res) return reject();
        let cache = this.props.client.readQuery({ query: GET_BRANDS });
        console.log({cache,res});
        cache.getInstallers.data.installers.push({
            __typename: "Installer",
            ...res.data.data.installer,
            profile_picture: res.data.data.installer.profile_picture_url
        })
        this.props.client.writeQuery({ query: GET_BRANDS, data: cache })
        return resolve();
    }
    handleRowUpdate = async (newData, oldData, resolve,reject) => {
        let res = await this.handleAddUpdate(newData, resolve, reject, `patch_${oldData.id}`,oldData)
        if (!res) return reject();
        let cache = this.props.client.readQuery({ query: GET_BRANDS });
        console.log({cache,res});
        cache.getInstallers.data.installers = cache.getInstallers.data.installers.filter(x => x.id !== res.data.data.installer.id)
        cache.getInstallers.data.installers.push({
            __typename: "Installer",
            ...res.data.data.installer,
            profile_picture: res.data.data.installer.profile_picture_url
        })
        this.props.client.writeQuery({ query: GET_BRANDS, data: cache })
        return resolve();
    }
    handleRowDelete = async (oldData, resolve, reject) => {
        this.setErrorMessages([])
        let success = await this.handleMutate(() => {
            return this.props.client.mutate({
                mutation: getDeleteCountryGQL(oldData.id)
            })
        })
        if (!success) return reject();

        let cache = await this.props.client.readQuery({
            query: GET_BRANDS
        })
        cache.getInstallers.data.installers = cache.getInstallers.data.installers.filter(x => x.id != oldData.id)
        await this.props.client.writeQuery({
            query: GET_BRANDS,
            data: { ...cache }
        })
        await this.updateData()
        return resolve()
    }
    render() {
        return (
            <React.Fragment>
                <Query query={GET_BRANDS} fetchPolicy={"cache-and-network"}>
                    {({ loading, error, data, refetch }) => {
                        this.refetch = refetch;
                        if (error) return error.message;
                        console.log({ data: loading && !data ? [] : data.getInstallers.data.installers})
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
                                        title={`Installers ${loading && !data ? "( loading )" : ""}`}
                                        columns={this.columns}
                                        data={loading && !data ? [] : data.getInstallers.data.installers}
                                        icons={tableIcons}
                                        editable={{
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve,reject) => {
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

export default withApollo(App);
