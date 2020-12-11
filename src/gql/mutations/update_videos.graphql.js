import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_TEAM_MEMBER(
            $youtube_url: String,
            $title: String,
            $description: String,
        ) {
            updateVideo(
                input: {
                    youtube_url: $youtube_url
                    title: $title
                    description: $description
                }
            ) @rest(
                method: "PATCH",
                path: "/videos/${id}",
                type: "UpdateVideoRequest"
            ) {
                data @type(name: "UpdateVideoData") {
                    token
                    video @type(name: "Video") {
                        id
                        youtube_url
                        title
                        description
                    }
                }
            }
        }
    `
}