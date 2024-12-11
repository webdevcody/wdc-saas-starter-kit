import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { docs, meta } from "../../../.source";

export const { getPage, getPages, pageTree } = loader({
  baseUrl: "/docs",
  rootDir: "docs",
  source: createMDXSource(docs, meta),
});
