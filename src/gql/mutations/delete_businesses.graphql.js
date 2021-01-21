import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_BUSINESS {
            deleteBusiness(input: {}) @rest(
                method: "DELETE",
                path: "/businesses/${id}",
                type: "DeleteBusinessRequest"
            ) {
                code
            }
        }
    `
}