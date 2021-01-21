import gql from "graphql-tag";

export default id => {
    return gql`
        mutation UPDATE_BUSINESS(
            $name: String,
            $address: String,
            $phone_number: String,
            $UserId: Integer,
            $EmployeeId: Integer,
            $IndustryId: Integer
        ) {
            updateBusiness(
                input: {
                    name: $name
                    address: $address
                    phone_number: $phone_number
                    UserId: $UserId
                    EmployeeId: $EmployeeId
                    IndustryId: $IndustryId
                }
            ) @rest(
                method: "PATCH",
                path: "/businesses/${id}",
                type: "UpdateBusinessRequest"
            ) {
                data @type(name: "UpdateBusinessData") {
                    token
                    business @type(name: "Business") {
                        id
                        name
                        address
                        phone_number
                        UserId
                        EmployeeId
                        IndustryId
                    }
                }
            }
        }
    `
}