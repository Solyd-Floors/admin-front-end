import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_COUNTRY {
            deleteScan(input: {}) @rest(
                method: "DELETE",
                path: "/countries/${id}",
                type: "DeleteCountryRequest"
            ) {
                code
            }
        }
    `
}