import React, { lazy } from "react";
import { Route, Redirect } from "react-router-dom";

const Dashboard = lazy(() => import('./dashboard'));
const Countries = lazy(() => import('./countries'));
const Brands = lazy(() => import('./brands'));
const Floors = lazy(() => import('./floors'));
const FloorTypes = lazy(() => import('./floor_types'));

export default () => {
    return [
        <Route exact path="/dashboard" component={Dashboard} />,
        <Route exact path="/countries" component={Countries} />,
        <Route exact path="/brands" component={Brands} />,
        <Route exact path="/floors" component={Floors} />,
        <Route exact path="/floor_types" component={FloorTypes} />,
    ]
}