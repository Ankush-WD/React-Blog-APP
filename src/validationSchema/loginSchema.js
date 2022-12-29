import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string().label('Email').email().required(),
  password: Yup.string().label('Password').min(6).required(),
});

export default loginSchema;