import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_FLOOR_TYPE(
            $mil_type: Integer,
            $price: Integer,
            $FloorId: Integer,
            $name: Integer,
        ) {
            updateFloorType(
                input: {
                    mil_type: $mil_type
                    price: $price
                    FloorId: $FloorId
                    FloorTileSizeId: $FloorTileSizeId
                }
            ) @rest(
                method: "PATCH",
                path: "/floor_boxes/${id}",
                type: "UpdateFloorBoxRequest"
            ) {
                data @type(name: "UpdateFloorBoxData") {
                    token
                    floor_box @type(name: "FloorBox") {
                        id
                        SKU
                        mil_type
                        price
                        FloorId
                        FloorTileSizeId
                        status
                    }
                }
            }
        }
    `
}