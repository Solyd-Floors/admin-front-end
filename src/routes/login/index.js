import React from "react";
import { compose } from "recompose";
import { Container, FormControl, InputLabel, Input, FormHelperText, Grid, Button } from '@material-ui/core';
import Image from "../../components/Image";
import Form from "../../components/Form";

import { Mutation, withApollo } from 'react-apollo'; 
import { loader } from 'graphql.macro';
import getRequestErrors from "../../helpers/getRequestErrors";
import { withRouter } from "react-router-dom";

const POST_AUTH = loader("../../gql/mutations/post_auth.graphql");
const GET_AUTH = loader("../../gql/queries/get_auth.graphql");

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            onTab: "ADMIN",
            data: {
                "email": "",
                "password": ""
            }
        }
    }
    onSubmit = (e, { postAuth, loading }) => {
        e.preventDefault();
        if (loading) return;
        postAuth({
            variables: {
                email: this.state.data.email,
                password: this.state.data.password,
            }
        })
            .catch(() => {})
            .then(async data => {
                if (!data) return;
                let { onTab } = this.state;
                let payload = data.data.postAuth.data
                let to;
                if (onTab === "ADMIN" && payload.user.isAdmin){
                    localStorage.setItem("solyd_floors:token", payload.token)
                    localStorage.setItem("user:role", "isAdmin")
                    to = "/admin/dashboard"
                } else if (onTab === "ADVERTISER" && payload.user.isAdvertiser){
                    localStorage.setItem("solyd_floors:token", payload.token)
                    localStorage.setItem("user:role", "isAdvertiser")
                    to = "/advertiser/dashboard"
                } else {
                    return alert("You do not have access.")
                }
                // Update previous GET_AUTH result in cache 
                await this.props.client.query({
                    query: GET_AUTH
                })
                this.props.history.push(to)
            })
    }
    getTabColor = val => this.state.onTab === val ? "primary" : "default"
    setTab = onTab => () => this.setState({ onTab, data: { email: "", password: "" } })
    onChange = key => e => {
        let { value } = e.target;
        this.setState(prevState => {
            prevState.data[key] = value;
            return prevState;
        })
    }
    render(){
        return (
            <Mutation mutation={POST_AUTH}>
                {(postAuth, { data, loading, error }) => {
                    // if (error) alert(error.networkError.result.errors)
                    return (
                        <Form onSubmit={e => this.onSubmit(e,{ postAuth, data, loading, error })}>
                            <Container style={{ textAlign: "center" }}>
                                <Grid style={{ marginLeft: "-8%" }}>
                                    <Grid style={{ marginTop: 200 }}>
                                        <Image style={{ width: "10%", borderRadius: 50 }} src="/img/logo.png"/>
                                    </Grid>
                                    <Grid style={{ display: "inline-flex" }}>
                                        <h1>Administration</h1>
                                    </Grid>
                                    {/* {getRequestErrors(error).map(x => <p style={{"color": "red"}}>{x}</p>)} */}
                                    {error && <p style={{ "color": "red" }}>Email or password is incorrect. Please try again.</p>}
                                    <Grid>
                                        <FormControl style={{ width: "50%" }}>
                                            <InputLabel htmlFor="email-input">Email</InputLabel>
                                            <Input onChange={this.onChange("email")} value={this.state.data.email} id="email-input" aria-describedby="email-helper-text" />
                                            {/* <FormHelperText id="email-helper-text">Must be least 6 characters.</FormHelperText> */}
                                        </FormControl>
                                    </Grid>
                                    <Grid>
                                        <FormControl style={{ width: "50%" }}>
                                            <InputLabel htmlFor="password-input">Password</InputLabel>
                                            <Input type="password" onChange={this.onChange("password")} value={this.state.data.password} id="password-input" aria-describedby="password-helper-text" />
                                            {/* <FormHelperText id="password-helper-text">Must be least 6 characters.</FormHelperText> */}
                                        </FormControl>
                                    </Grid>
                                    <Grid>
                                        <Button style={{ marginTop: 35 }} variant="contained" color="primary" type="submit">{loading ? "Loading.." : "Login"}</Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Form>

                    )
                }}
            </Mutation>
        )
    }
}

export default compose(withRouter,withApollo)(Login);