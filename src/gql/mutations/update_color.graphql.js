import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_COLOR(
            $name: String,
            $color: String,
        ) {
            updateColor(
                input: {
                    name: $name
                    color: $color
                }
            ) @rest(
                method: "PATCH",
                path: "/colors/${id}",
                type: "UpdateColorRequest"
            ) {
                data @type(name: "UpdateColorData") {
                    token
                    color @type(name: "Color") {
                        id
                        name
                        color
                    }
                }
            }
        }
    `
}