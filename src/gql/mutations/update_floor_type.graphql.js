import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_FLOOR_TYPE(
            $name: String,
        ) {
            updateFloorType(
                input: {
                    name: $name
                }
            ) @rest(
                method: "PATCH",
                path: "/floor_types/${id}",
                type: "UpdateFloorTypeRequest"
            ) {
                data @type(name: "UpdateFloorTypeData") {
                    token
                    floor_type @type(name: "FloorType") {
                        id
                        name
                    }
                }
            }
        }
    `
}