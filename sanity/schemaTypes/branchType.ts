import { defineType, defineField } from "sanity";

export const branchType = defineType({
  name: "branch",
  title: "Branch",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({ name: "order", type: "number" }),
    defineField({
      name: "platform",
      type: "reference",
      to: [{ type: "platform" }],
    }),
  ],
});
