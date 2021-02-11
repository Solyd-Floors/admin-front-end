import gql from "graphql-tag";

export default ({before,after}) => {
    return gql`
        mutation PATCH_INVENTORY(
            $int: Integer!
        ){
            patchInventory(
                input: {
                    before: {
                        mil_type: ${before.mil_type}
                        price: ${before.price}
                        FloorId: ${before.FloorId}
                        FloorTileSizeId: ${before.FloorTileSizeId}
                        amount: ${before.amount}
                    }
                    after: {
                        mil_type: ${after.mil_type}
                        price: ${after.price}
                        FloorId: ${after.FloorId}
                        FloorTileSizeId: ${after.FloorTileSizeId}
                        amount: ${after.amount}
                    }
                }
            ) @rest(
                method: "PATCH",
                path: "/inventory",
                type: "PatchInventoryRequest"
            ) {
                data @type(name: "Inventories") {
                    inventory @type(name: "Inventory") {
                        id
                        amount
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
