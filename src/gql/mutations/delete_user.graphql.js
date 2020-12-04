import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_USER {
            deleteUser(input: {}) @rest(
                method: "DELETE",
                path: "/users/${id}",
                type: "AuthPayload"
            ) {
                code
            }
        }
    `
}