import * as yup from "yup";

export default yup.object().shape({
    youtube_url: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
})