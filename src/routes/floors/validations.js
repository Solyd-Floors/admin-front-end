import * as yup from "yup";

export default yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    FloorCategoryId: yup.number().positive().required(),
    FloorTypeId: yup.number().positive().required(),
    ColorId: yup.number().positive().required(),
    plank_dimension_width: yup.number().positive().required(),
    plank_dimension_height: yup.number().positive().required(),
})