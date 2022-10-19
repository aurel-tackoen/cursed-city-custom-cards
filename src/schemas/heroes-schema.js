import { object, string, number, array } from 'yup';

const schema = object({
  _id: string(),
  name: string().required(),
  language: string().required(),
  size: string().required(),
  tags: array(
    object({
      label: string().required(),
      value: string().required(),
    }).required()
  ).required(),
  picture: object({
    url: string().url(),
    offsetY: number(),
    offsetX: number(),
    zoom: number(),
    small_offsetY: number(),
    small_offsetX: number(),
    small_zoom: number(),
  }),
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

async function validate(data) {
  const result = await schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  return result;
}

function getErrors(errors) {
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

export { schema, validate, getErrors };
