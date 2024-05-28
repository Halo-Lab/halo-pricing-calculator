import { defineType, defineField } from "sanity";

export const questionType = defineType({
  name: "question",
  title: "Question",
  type: "document",
  fields: [
    defineField({ name: "text", type: "string" }),
    defineField({
      name: "platform",
      type: "reference",
      to: [{ type: "platform" }],
    }),
    defineField({
      name: "branch",
      type: "reference",
      to: [{ type: "branch" }],
    }),
  ],
});
