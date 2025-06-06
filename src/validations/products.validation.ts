import Joi from "joi";

const productsSchema = Joi.object({
  title: Joi.string().required(),
  caption: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
}).unknown(false);

const updateProductSchema = productsSchema.fork(
  ["title", "caption", "price", "image", "category"],
  (schema) => schema.optional()
);

export { productsSchema, updateProductSchema };
