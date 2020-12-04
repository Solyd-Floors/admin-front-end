import React from 'react';
import Routes from "./routes";
import { ApolloProvider, Query } from 'react-apollo';
import client from "./apolloClient"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loader } from 'graphql.macro';
const GET_AUTH = loader("./gql/queries/get_auth.graphql");

toast.configure({
  autoClose: 5000,
  draggable: true,
});

class App extends React.Component {
  render(){
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

export default App;
