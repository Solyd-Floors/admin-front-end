import React from 'react';
import Routes from "./routes";
import { ApolloProvider, Query } from 'react-apollo';
import client from "./apolloClient"
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loader } from 'graphql.macro';
import { withRouter } from 'react-router-dom';
const GET_AUTH = loader("./gql/queries/get_auth.graphql");

toast.configure({
  autoClose: 5000,
  draggable: true,
});

class _App extends React.Component {
  render(){
    let { pathname } = this.props.location;
    // if (pathname.indexOf("business")) {
    //   return (
    //     <BusinessApp/>
    //   )
    // }
    return (
        <ApolloProvider client={client}>
          <Query query={GET_AUTH}>
            {({loading,error,data}) => {
              if (loading) return null;
              return (
                <React.Fragment>
                  <Routes/>
                </React.Fragment>
              )
            }}
          </Query>
        </ApolloProvider>
    );
  }
}

_App = withRouter(_App);

export default props => <Router><_App/></Router>

