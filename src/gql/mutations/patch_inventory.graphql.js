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
                        FloorId: ${before.FloorId}
                        price_per_square_foot: ${before.price_per_square_foot}
                        amount: ${before.amount}
                    }
                    after: {
                        mil_type: ${after.mil_type}
                        price_per_square_foot: ${after.price_per_square_foot}
                        FloorId: ${after.FloorId}
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
                        FloorId
                        price_per_square_foot
                        status
                    }
                }
            }
        }
    `
}
