import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_CAMPAIGN_CATEGORY {
            deleteCampaignCategory(input: {}) @rest(
                method: "DELETE",
                path: "/campaign_categories/${id}",
                type: "DeleteCampaignCategoryRequest"
            ) {
                code
            }
        }
    `
}