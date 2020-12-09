import * as yup from "yup";

export default yup.object().shape({
    full_name: yup.string().required(),
    reason: yup.string().required(),
    email: yup.string().required(),
})