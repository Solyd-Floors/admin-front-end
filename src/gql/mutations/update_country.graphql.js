import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_COUNTRY(
            $name: String,
        ) {
            updateCountry(
                input: {
                    name: $name
                }
            ) @rest(
                method: "PATCH",
                path: "/countries/${id}",
                type: "UpdateCountryRequest"
            ) {
                data @type(name: "UpdateCountryData") {
                    token
                    country @type(name: "Country") {
                        id
                        name
                    }
                }
            }
        }
    `
}