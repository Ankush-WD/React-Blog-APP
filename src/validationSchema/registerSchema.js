import * as Yup from "yup";

const FILE_SIZE = 50000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg"];

const registerSchema = Yup.object({
  name: Yup.string().label("Name").required().min(4).max(30),
  email: Yup.string().label("Email").email().required(),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6),
  password_confirmation: Yup.string()
    .label("Repeat Password")
    .required()
    .min(6)
    .test('passwords-match', 'Passwords must match', function(value){
      console.log(value);
      return this.parent.password === value
    }),
  media: Yup.mixed()
    .label("Media")
    .nullable()
    .notRequired()
    .test(
      "FILE_SIZE",
      "Uploaded file is too big.",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});

export default registerSchema;
