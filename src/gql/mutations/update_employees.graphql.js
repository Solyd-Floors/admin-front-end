import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_EMPLOYEES(
            $email: String,
            $password: String,
            $full_name: String,
            $BusinessId: Integer,
        ) {
            updateEmployees(
                input: {
                    email: $email
                    password: $password
                    full_name: $full_name
                    BusinessId: $BusinessId
                }
            ) @rest(
                method: "PATCH",
                path: "/employees/${id}",
                type: "UpdateEmployeesRequest"
            ) {
                data @type(name: "UpdateEmployeesData") {
                    token
                    employee @type(name: "Employee") {
                        id
                        email
                        password
                        full_name
                        BusinessId
                    }
                }
            }
        }
    `
}