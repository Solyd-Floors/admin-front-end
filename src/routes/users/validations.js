import * as yup from "yup";

export default yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    full_name: yup.string().required().min(5),
    isAdmin: yup.boolean().required(),
})