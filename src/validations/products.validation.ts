import Joi from "joi";

const imageSchema = Joi.object({
  url: Joi.string().uri().required(),
  public_id: Joi.string().required(),
});

const productsSchema = Joi.object({
  title: Joi.string().required(),
  caption: Joi.string().required(),
  price: Joi.number().required(),
  image: imageSchema.required(),
  category: Joi.string().required(),
}).unknown(false);

const updateProductSchema = productsSchema.fork(
  ["title", "caption", "price", "image", "category"],
  (schema) => schema.optional()
);

export { productsSchema, updateProductSchema };
