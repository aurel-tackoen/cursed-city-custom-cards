import { object, string, number, array } from 'yup';

const heroesSchema = object({
  name: string().required(),
  size: string().required(),
  tags: array(string().required()).required(),
  picture: object({
    url: string().url().required(),
    offsetY: number().required(),
    offsetX: number().required(),
    zoom: number().required(),
  }).required(),
  normal: object({
    stats: object({
      move: number().required(),
      run: number().required(),
      agility: string().required(),
      vitality: string().required(),
      defence: string().required(),
    }).required(),
    weapons: array(
      object({
        name: string().required(),
        dice1: number().required(),
        dice2: number(),
        damages: object({
          base: number().required(),
          critical: number().required(),
        }).required(),
      }).required()
    ).required(),
    notes: array(
      object({
        name: string().required(),
        rule: string().required(),
      })
    ).required(),
    abilities: array(
      object({
        name: string().required(),
        activation: number().required(),
        rule: string().required(),
      })
    ).required(),
    path: object({
      name: string(),
      rule: string(),
    }).required(),
  }),
  inspired: object({
    stats: object({
      move: number(),
      run: number(),
      agility: string(),
      vitality: string(),
      defence: string(),
    }).required(),
    weapons: array(
      object({
        name: string().required(),
        dice1: number().required(),
        dice2: number(),
        damages: object({
          base: number().required(),
          critical: number().required(),
        }).required(),
      }).required()
    ).required(),
    notes: array(
      object({
        name: string().required(),
        rule: string().required(),
      })
    ).required(),
    abilities: array(
      object({
        name: string().required(),
        activation: number().required(),
        rule: string().required(),
      })
    ).required(),
  }),
  user: object({
    email: string().email().required(),
    username: string().required(),
  }).required(),
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
