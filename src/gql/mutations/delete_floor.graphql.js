import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_FLOOR {
            deleteFloor(input: {}) @rest(
                method: "DELETE",
                path: "/floor/${id}",
                type: "DeleteFloorRequest"
            ) {
                code
            }
        }
    `
}