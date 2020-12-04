import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import RoutesList from "./routes";
import AdminProtected from "../components/AdminProtected";
import NotLoggedInProtected from "../components/NotLoggedInProtected";
import Header from "./header"
import { loader } from 'graphql.macro';
import { Query } from "react-apollo";

// const GET_CAMPAIGN_CATEGORIES = loader("../gql/queries/get_campaign_categories.graphql")

const Login = lazy(() => import('./login'));
const Logout = lazy(() => import("./logout"))
const E404 = lazy(() => import('./E404'));

const Routes = props => {
    return (
        <Router>
            <div className="row">
                <div className="column">
                <AdminProtected>
                    <Header/>
                </AdminProtected>
                </div>
                <div style={{width: "100%", height: "100%"}} className="column">
                    <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/">
                            <Redirect to="/login"/>
                        </Route>
                        <Route exact path="/login" component={() => (
                            <NotLoggedInProtected>
                                <Login/>
                            </NotLoggedInProtected>
                        )}/>

                        <AdminProtected>
                            <RoutesList/>
                        </AdminProtected>
                        <Route path="/" component={E404}/>
                    </Switch>
                </Suspense>
                </div>
            </div>
        </Router>
    )
}

export default Routes;