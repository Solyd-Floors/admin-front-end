import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_VIDEO {
            deleteVideo(input: {}) @rest(
                method: "DELETE",
                path: "/videos/${id}",
                type: "DeleteVideoRequest"
            ) {
                code
            }
        }
    `
}