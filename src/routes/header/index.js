import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';
import TabPanel from "../../components/TabPanel"

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function TabsWrappedLabel(props) {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        props.history.push(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={props.location.pathname} onChange={handleChange} aria-label="wrapped label tabs example">
                    <Tab value="/dashboard" label="Dashboard" wrapped {...a11yProps('one')} />
                    <Tab value="/users" label="Users" wrapped {...a11yProps('one')} />
                    <Tab value="/contacts" label="Contacts" wrapped {...a11yProps('one')} />
                    <Tab value="/installers" label="Installers" wrapped {...a11yProps('one')} />
                    <Tab value="/countries" label="Countries" wrapped {...a11yProps('one')} />
                    <Tab value="/floors" label="Floors" wrapped {...a11yProps('one')} />
                    <Tab value="/floor_types" label="FloorTypes" wrapped {...a11yProps('one')} />
                    <Tab value="/floor_categories" label="FloorCategories" wrapped {...a11yProps('one')} />
                    <Tab value="/general" label="General" wrapped {...a11yProps('one')} />
                    <Tab style={{backgroundColor: "red"}} value="/logout" label="Logout" {...a11yProps('three')} />
                </Tabs>
            </AppBar>
        </div>
    );
}

export default withRouter(TabsWrappedLabel)
