import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_TEAM_MEMBER(
            $full_name: String,
            $position: String,
            $description: String,
        ) {
            updateTeamMember(
                input: {
                    full_name: $full_name
                    position: $position
                    description: $description
                }
            ) @rest(
                method: "PATCH",
                path: "/team_members/${id}",
                type: "UpdateTeamMemberRequest"
            ) {
                data @type(name: "UpdateTeamMemberData") {
                    token
                    team_member @type(name: "TeamMember") {
                        id
                        full_name
                        position
                        description
                    }
                }
            }
        }
    `
}