import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_USER(
            $email: String,
            $password: String,
            $full_name: String,
            $isAdmin: Boolean,
        ) {
            updateUser(
                input: {
                    email: $email
                    password: $password
                    full_name: $full_name
                    isAdmin: $isAdmin
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
                        full_name
                        email
                        password
                        isAdmin
                    }
                }
            }
        }
    `
}