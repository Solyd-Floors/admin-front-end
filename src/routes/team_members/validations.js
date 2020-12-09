import * as yup from "yup";

export default yup.object().shape({
    full_name: yup.string().required(),
    position: yup.string().required(),
    description: yup.string().required(),
})