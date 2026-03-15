import { defineType, defineField } from "sanity";

export default defineType({
  name: "section",
  title: "Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      options: { list: ["Men", "Women"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
});
