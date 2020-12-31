import * as yup from "yup";

export default yup.object().shape({
    width: yup.number().integer().positive().required(),
    height: yup.number().integer().positive().required(),
})