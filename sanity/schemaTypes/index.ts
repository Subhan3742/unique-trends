import { type SchemaTypeDefinition } from "sanity";
import section from "../schemas/section";
import category from "../schemas/category";
import product from "../schemas/product";
import order from "../schemas/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [section, category, product, order],
};
