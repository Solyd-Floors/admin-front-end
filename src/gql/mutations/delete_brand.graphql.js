import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_BRAND {
            deleteScan(input: {}) @rest(
                method: "DELETE",
                path: "/brands/${id}",
                type: "DeleteBrandRequest"
            ) {
                code
            }
        }
    `
}