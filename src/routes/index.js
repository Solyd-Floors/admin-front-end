import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import RoutesList from "./routes";
import AdminProtected from "../components/AdminProtected";
import NotLoggedInProtected from "../components/NotLoggedInProtected";
import Header from "./header"
import { loader } from 'graphql.macro';
import { Query } from "react-apollo";
import Header2 from "./header2";

// const GET_CAMPAIGN_CATEGORIES = loader("../gql/queries/get_campaign_categories.graphql")

const Login = lazy(() => import('./login'));
const Users = lazy(() => import('./users'));
const Logout = lazy(() => import("./logout"))
const E404 = lazy(() => import('./E404'));

const Routes = props => {
    return (
        <div>
            <AdminProtected>
                <Header/><br/>
                <Header2/>
            </AdminProtected>
            <div className="">
                    <Suspense fallback={<div></div>}>
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
                        <Route exact path="/users" component={Users} />,
                        <AdminProtected>
                            <RoutesList/>
                        </AdminProtected>
                        <Route path="/" component={E404}/>
                    </Switch>
                </Suspense>
                </div>
        </div>
    )
}

export default Routes;