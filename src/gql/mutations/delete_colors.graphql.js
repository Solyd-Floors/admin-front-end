import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_COLOR {
            deleteColor(input: {}) @rest(
                method: "DELETE",
                path: "/colors/${id}",
                type: "DeleteColorRequest"
            ) {
                code
            }
        }
    `
}