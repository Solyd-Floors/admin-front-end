import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_INDUSTRY {
            deleteIndustry(input: {}) @rest(
                method: "DELETE",
                path: "/industries/${id}",
                type: "DeleteIndustryRequest"
            ) {
                code
            }
        }
    `
}