import React from "react";
import { Redirect } from "react-router-dom";
import { withApollo } from "react-apollo";

import { loader } from 'graphql.macro';
const GET_AUTH = loader("../../gql/queries/get_auth.graphql");

const _AdminProtected = props => {
    try {
        let cache = props.client.readQuery({
            query: GET_AUTH
        })
        if (!cache.getAuth.data.user.isAdmin) {
            return <Redirect to={"/login"}/>    
        }
    } catch (err) {
        return <Redirect to={"/login"}/>
    }
    return props.children
}

export default withApollo(_AdminProtected)
