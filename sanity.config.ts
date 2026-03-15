"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool()],
});
