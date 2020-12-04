import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_FLOOR_TYPE {
            deleteFloorType(input: {}) @rest(
                method: "DELETE",
                path: "/floor_types/${id}",
                type: "DeleteFloorTypeRequest"
            ) {
                code
            }
        }
    `
}