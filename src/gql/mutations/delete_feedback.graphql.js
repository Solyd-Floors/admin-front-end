import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_FEEDBACK {
            deleteFeedback(input: {}) @rest(
                method: "DELETE",
                path: "/feedback/${id}",
                type: "DeleteFeedbackRequest"
            ) {
                code
            }
        }
    `
}