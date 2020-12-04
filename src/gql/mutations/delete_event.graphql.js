import gql from "graphql-tag";

export default id => {
    return gql`
        mutation DELETE_EVENT {
            deleteEvent(input: {}) @rest(
                method: "DELETE",
                path: "/events/${id}",
                type: "DeleteEventRequest"
            ) {
                code
            }
        }
    `
}