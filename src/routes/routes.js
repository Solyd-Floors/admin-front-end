import React, { lazy } from "react";
import { Route, Redirect } from "react-router-dom";

const Dashboard = lazy(() => import('./dashboard'));
const Countries = lazy(() => import('./countries'));
const Contacts = lazy(() => import('./contacts'));
const TeamMembers = lazy(() => import('./team_members'));
const Brands = lazy(() => import('./brands'));
const Videos = lazy(() => import('./videos'));
const Colors = lazy(() => import('./colors'));
const Floors = lazy(() => import('./floors'));
const FloorTypes = lazy(() => import('./floor_types'));
const FloorTileSizes = lazy(() => import('./floor_tile_sizes'));
const FloorCategories = lazy(() => import('./floor_categories'));
const Installers = lazy(() => import('./installers'));
const FloorBoxes = lazy(() => import('./floor_boxes'));

export default () => {
    return [
        <Route exact path="/dashboard" component={Dashboard} />,
        <Route exact path="/countries" component={Countries} />,
        <Route exact path="/colors" component={Colors} />,
        <Route exact path="/videos" component={Videos} />,
        <Route exact path="/team_members" component={TeamMembers} />,
        <Route exact path="/contacts" component={Contacts} />,
        <Route exact path="/brands" component={Brands} />,
        <Route exact path="/floors" component={Floors} />,
        <Route exact path="/floor_types" component={FloorTypes} />,
        <Route exact path="/floor_tile_sizes" component={FloorTileSizes} />,
        <Route exact path="/floor_categories" component={FloorCategories} />,
        <Route exact path="/floor_boxes" component={FloorBoxes} />,
        <Route exact path="/installers" component={Installers} />,
    ]
}