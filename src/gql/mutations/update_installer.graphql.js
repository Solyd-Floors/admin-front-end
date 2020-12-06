import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_INSTALLER(
            $name: String,
            $age: Integer
            $CountryId: Integer
            $UserId: Integer
            $job_status: String
            $hourly_rate: Integer
            $status: String
            $profile_picture: String
        ) {
            updateInstaller(
                input: {
                    name: $name
                    age: $age
                    CountryId: $CountryId
                    UserId: $UserId
                    job_status: $job_status
                    hourly_rate: $hourly_rate
                    status: $status
                    profile_picture: $profile_picture
                }
            ) @rest(
                method: "PATCH",
                path: "/installers/${id}",
                type: "UpdateInstallerRequest"
            ) {
                data @type(name: "UpdateInstallerData") {
                    token
                    installer @type(name: "Installer") {
                        id
                        age
                        job_status
                        hourly_rate
                        status
                        profile_picture_url
                        profile_picture
                        CountryId
                        UserId
                    }
                }
            }
        }
    `
}