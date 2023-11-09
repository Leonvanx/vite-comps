import { compPackage } from "./paths";

// packages/vlib-ui/scripts/build/utils/rollup.ts
export const getCompPackage = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version, dependencies, peerDependencies } = require(compPackage);
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
};

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getCompPackage();

  const packages: string[] = peerDependencies;

  if (options.full) {
    packages.push(...dependencies);
  }

  return (id: string) => {
    return packages.some(
      (pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`))
    );
  };
};

// packages/vlib-ui/scripts/build/utils/rollup.ts
export const generatePaths = () => {
  const paths = [["lodash-es", "lodash"]];

  return (id: string) => {
    for (const [oldPath, newPath] of paths) {
      if (id.startsWith(oldPath)) {
        return id.replace(oldPath, newPath);
      }
    }

    return "";
  };
};

export const target = "es6";
