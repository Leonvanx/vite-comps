// packages/vlib-ui/scripts/build/index.ts
import { parallel } from "gulp";
import { buildModules } from "./build-modules";

export default parallel(buildModules);
