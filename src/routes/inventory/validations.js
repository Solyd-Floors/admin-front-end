import * as yup from "yup";

export default yup.object().shape({
    mil_type: yup.number().integer().positive().required(),
    price_per_square_foot: yup.number().positive().required(),
    FloorId: yup.number().integer().positive().required(),
    amount: yup.number().integer().positive().required(),
})