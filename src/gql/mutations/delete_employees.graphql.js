import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_EMPLOYEES {
            deleteEmployees(input: {}) @rest(
                method: "DELETE",
                path: "/employees/${id}",
                type: "DeleteEmployeesRequest"
            ) {
                code
            }
        }
    `
}