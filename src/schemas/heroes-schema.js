import { object, string, number } from 'yup';

let heroesSchema = object({
  name: string().required(),
  picture: object({
    url: string().url().required(),
    offsetY: number().required(),
    offsetX: number().required(),
    zoom: number().required(),
  }),
  size: string().required(),
  user: object({
    email: string().email().required(),
    username: string().required(),
  }),
  date: number().required().positive().integer(),
});

async function heroesValidation(data) {
  const result = await heroesSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  return result;
}

function heroesErrors(errors) {
  const validationErrors = [];
  errors.inner.forEach((e) => {
    validationErrors.push({
      path: e.path,
      message: e.message,
    });
  });
  return validationErrors;
}

export { heroesSchema, heroesValidation, heroesErrors };
