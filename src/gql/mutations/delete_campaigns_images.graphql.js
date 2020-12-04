import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_CAMPAIGNS_IMAGES {
            deleteCampaignsImages(input: {}) @rest(
                method: "DELETE",
                path: "/campaigns_images/${id}",
                type: "DeleteCampaignsImagesRequest"
            ) {
                code
            }
        }
    `
}