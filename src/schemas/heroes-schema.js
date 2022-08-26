import { object, string, number, array } from 'yup';

const heroesSchema = object({
  _id: string(),
  name: string().required(),
  size: string().required(),
  tags: array(
    object({
      label: string().required(),
      value: string().required(),
    }).required()
  ).required(),
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
        activation: number().required(),
        type: string().required(),
        dice1: string().required(),
        dice2: string(),
        damages: object({
          base: number().required(),
          critical: number().required(),
        }).required(),
        notes: array(number()),
      }).required()
    ).required(),
    notes: array(
      object({
        name: string(),
        rule: string().required(),
      })
    ).required(),
    abilities: array(
      object({
        name: string().required(),
        activation: number(),
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
        activation: number().required(),
        type: string().required(),
        dice1: string().required(),
        dice2: string(),
        damages: object({
          base: number().required(),
          critical: number().required(),
        }).required(),
        notes: array(number()),
      }).required()
    ).required(),
    notes: array(
      object({
        name: string(),
        rule: string().required(),
      })
    ).required(),
    abilities: array(
      object({
        name: string().required(),
        activation: number(),
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

async function sanitize(data) {
  data.normal.abilities.map((ability) => {
    console.log(ability.rule);
  });
  return data;
}

async function validate(data) {
  const result = await heroesSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  return result;
}

function generateErrors(errors) {
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

export { heroesSchema, validate, sanitize, generateErrors };
