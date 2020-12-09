import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_TEAM_MEMBER {
            deleteTeamMember(input: {}) @rest(
                method: "DELETE",
                path: "/team_members/${id}",
                type: "DeleteTeamMemberRequest"
            ) {
                code
            }
        }
    `
}