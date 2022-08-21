import { object, string, number, array } from 'yup';

// TODO: add validation for each field

const heroesSchema = object({
  name: string().required(),
  size: string().required(),
  picture: object({
    url: string().url().required(),
    offsetY: number().required(),
    offsetX: number().required(),
    zoom: number().required(),
  }),
  tags: array(),
  normal: object({
    stats: object({
      move: number(),
      run: number(),
    }),
    weapons: array(
      object({
        name: string().required(),
        dice1: number().required(),
        dice2: number(),
        damages: object({
          base: number().required(),
          critical: number().required(),
        }),
      })
    ),
    notes: array(
      object({
        name: string().required(),
        rule: string().required(),
      })
    ),
    abilities: array(
      object({
        name: string().required(),
        rule: string().required(),
      })
    ),
    path: object({
      name: string().required(),
      rule: string().required(),
    }),
  }),
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
  errors?.inner?.forEach((e) => {
    validationErrors.push({
      name: e.path.split('.').join(' '),
      path: e.path,
      message: e.message,
    });
  });
  return validationErrors;
}

export { heroesSchema, heroesValidation, heroesErrors };
