import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_FLOOR_TILE_SIZES {
            deletes(input: {}) @rest(
                method: "DELETE",
                path: "/floor_tile_sizes/${id}",
                type: "DeleteRequest"
            ) {
                code
            }
        }
    `
}