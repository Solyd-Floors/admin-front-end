import * as yup from "yup";

export default yup.object().shape({
    mil_type: yup.number().integer().positive().required(),
    FloorId: yup.number().integer().positive().required(),
    FloorTileSizeId: yup.number().integer().positive().required(),
})