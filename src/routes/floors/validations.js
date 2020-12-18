import * as yup from "yup";

export default yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().positive().required(),
    quantity: yup.number().positive().required(),
    FloorCategoryId: yup.number().positive().required(),
    FloorTypeId: yup.number().positive().required(),
    BrandId: yup.number().positive().required(),
    UserId: yup.number().positive().required(),
    ColorId: yup.number().positive().required(),
})