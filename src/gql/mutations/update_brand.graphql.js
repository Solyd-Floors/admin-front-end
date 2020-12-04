import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_BRAND(
            $name: String,
        ) {
            updateBrand(
                input: {
                    name: $name
                }
            ) @rest(
                method: "PATCH",
                path: "/brands/${id}",
                type: "UpdateBrandRequest"
            ) {
                data @type(name: "UpdateBrandData") {
                    token
                    brand @type(name: "Brand") {
                        id
                        name
                    }
                }
            }
        }
    `
}