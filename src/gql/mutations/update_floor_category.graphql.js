import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_FLOOR_CATEGORIES(
            $name: String,
        ) {
            updateFloorCategory(
                input: {
                    name: $name
                }
            ) @rest(
                method: "PATCH",
                path: "/floor_categories/${id}",
                type: "UpdateFloorCategoryRequest"
            ) {
                data @type(name: "UpdateFloorCategoryData") {
                    token
                    floor_category @type(name: "FloorCategory") {
                        id
                        name
                    }
                }
            }
        }
    `
}