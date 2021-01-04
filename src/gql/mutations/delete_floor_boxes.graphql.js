import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_FLOOR_BOXES {
            deleteFloorBoxes(input: {}) @rest(
                method: "DELETE",
                path: "/floor_boxes/${id}",
                type: "DeleteFloorBoxesRequest"
            ) {
                code
            }
        }
    `
}