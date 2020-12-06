import React from "react";
import { Redirect } from "react-router-dom";
import { withApollo } from "react-apollo";

import { loader } from 'graphql.macro';
const GET_AUTH = loader("../../gql/queries/get_auth.graphql");

const _NotLoggedInProtected = props => {
    try {
        let cache = props.client.readQuery({
            query: GET_AUTH
        })        
        return <Redirect to={"/dashboard"}/>
    } catch (err) { 
        return props.children
        // alert(err.message)
    }
}

export default withApollo(_NotLoggedInProtected)
