import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_FLOOR(
            $name: String,
        ) {
            updateFloor(
                input: {
                    name: $name
                    description: $description
                    thumbnail_url: $thumbnail_url
                    price: $price
                    quantity: $quantity
                    FloorCategoryId: $FloorCategoryId
                    FloorTypeId: $FloorTypeId
                    BrandId: $BrandId
                    UserId: $UserId
                    ColorId: $ColorId
                }
            ) @rest(
                method: "PATCH",
                path: "/floors/${id}",
                type: "UpdateFloorRequest"
            ) {
                data @type(name: "UpdateFloorData") {
                    token
                    floor @type(name: "Floor") {
                        id
                        name
                        description
                        thumbnail_url
                        price
                        quantity
                        FloorCategoryId
                        FloorTypeId
                        BrandId
                        UserId                    
                        ColorId                    
                    }
                }
            }
        }
    `
}