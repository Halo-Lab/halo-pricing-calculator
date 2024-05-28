import { defineType, defineField } from "sanity";

export const platformType = defineType({
  name: "platform",
  title: "Platform",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
  ],
});
