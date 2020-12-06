import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_INSTALLER {
            deleteInstaller(input: {}) @rest(
                method: "DELETE",
                path: "/installers/${id}",
                type: "DeleteInstallerRequest"
            ) {
                code
            }
        }
    `
}