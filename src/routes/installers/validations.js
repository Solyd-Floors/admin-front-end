import * as yup from "yup";

export default yup.object().shape({
    CountryId: yup.number().positive().required(),
    UserId: yup.number().positive().required(),
    age: yup.number().positive().required(),
    hourly_rate: yup.number().positive().required(), 
    job_status: yup.string().oneOf(["EMPLOYED","UNEMPLOYED"]).required(),
    profile_picture: yup.string(),
    status: yup.string().oneOf(["PENDING","APPROVED","DENIED"]).required(),
})