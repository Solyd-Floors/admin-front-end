import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_USER(
            $email: String,
            $password: String,
            $first_name: String,
            $last_name: String,
            $birthday: String,
            $contract_id: String,
            $points: Number,
            $isAdmin: Boolean,
            $isPremium: Boolean,
            $isAdvertiser: Boolean
        ) {
            updateUser(
                input: {
                    email: $email
                    password: $password
                    first_name: $first_name
                    last_name: $last_name
                    birthday: $birthday
                    contract_id: $contract_id
                    points: $points
                    isAdmin: $isAdmin
                    isPremium: $isPremium
                    isAdvertiser: $isAdvertiser
                }
            ) @rest(
                method: "PATCH",
                path: "/users/${id}",
                type: "PatchUserRequest"
            ) {
                data @type(name: "UpdateUserData") {
                    token
                    user @type(name: "User") {
                        id
                        first_name
                        last_name
                        email
                        birthday
                        contract_id
                        points
                        isPremium
                        isAdmin
                        isAdvertiser
                    }
                }
            }
        }
    `
}