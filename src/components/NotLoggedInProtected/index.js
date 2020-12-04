import React from "react";
import { Redirect } from "react-router-dom";
import { withApollo } from "react-apollo";

import { loader } from 'graphql.macro';
const GET_AUTH = loader("../../gql/queries/get_auth.graphql");

const _NotLoggedInProtected = props => {
    try {
        props.client.readQuery({
            query: GET_AUTH
        })
        let role = localStorage.getItem("user:role");
        let to = "/login"
        if (role === "isAdmin")  to="/admin/dashboard"
        else if (role === "isAdvertiser") to="/advertiser/dashboard"
        return <Redirect to={to}/>
    } catch (err) { 
        // alert(err.message)
    }
    return props.children
}

export default withApollo(_NotLoggedInProtected)
