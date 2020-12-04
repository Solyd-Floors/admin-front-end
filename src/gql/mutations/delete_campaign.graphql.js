import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_CAMPAIGN {
            deleteCampaign(input: {}) @rest(
                method: "DELETE",
                path: "/campaigns/${id}",
                type: "DeleteCampaignRequest"
            ) {
                code
            }
        }
    `
}