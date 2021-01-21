import * as yup from "yup";

export default yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    phone_number: yup.string().required(),
    UserId: yup.number().positive().required(),
    IndustryId: yup.number().positive().required(),
})