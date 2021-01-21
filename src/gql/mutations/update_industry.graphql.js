import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_INDUSTRY(
            $name: String,
        ) {
            updateIndustry(
                input: {
                    name: $name
                }
            ) @rest(
                method: "PATCH",
                path: "/industries/${id}",
                type: "UpdateIndustryRequest"
            ) {
                data @type(name: "UpdateIndustryData") {
                    token
                    industry @type(name: "Industry") {
                        id
                        name
                    }
                }
            }
        }
    `
}