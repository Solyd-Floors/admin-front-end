import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_FLOOR_CATEGORY {
            deleteFloorCategory(input: {}) @rest(
                method: "DELETE",
                path: "/floor_categories/${id}",
                type: "DeleteFloorCategoryRequest"
            ) {
                code
            }
        }
    `
}