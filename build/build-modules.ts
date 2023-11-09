// packages/vlib-ui/scripts/build/task/build-modules.ts
import path from 'path'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
// import vue from 'rollup-plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDefineOptions from 'unplugin-vue-define-options/rollup'
// import esbuild from "rollup-plugin-esbuild";
import { compRoot, outputEsm, outputCjs } from './paths'
import { target, generateExternal, generatePaths } from './rollup'

export const buildModules = async () => {
  // 入口
  const input = [path.resolve(compRoot, 'index.ts')]

  // 编译解析
  const bundle = await rollup({
    input,
    output: [
      {
        //打包格式
        format: 'es',
        //打包后文件名
        entryFileNames: '[name].mjs',
        //让打包目录和我们目录对应
        preserveModules: true,
        exports: 'named',
        //配置打包根目录
        dir: '../es'
      },
      {
        //打包格式
        format: 'cjs',
        //打包后文件名
        entryFileNames: '[name].js',
        //让打包目录和我们目录对应
        preserveModules: true,
        exports: 'named',
        //配置打包根目录
        dir: '../lib'
      }
    ],
    plugins: [
      // vueDefineOptions(),
      vue(),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      })
      // commonjs()
      // esbuild({
      //   target,
      //   sourceMap: true,
      // }),
    ],
    treeshake: false,
    external: generateExternal({ full: true }) // 外部模块，所有依赖都设置为外部模块
  })

  // 输出文件
  await Promise.all([
    bundle.write({
      format: 'esm', // 模块格式
      dir: outputEsm, // 输出目录
      exports: undefined, // 导出模式
      preserveModules: true, // 与原始模块创建相同的文件
      preserveModulesRoot: 'src',
      sourcemap: true, // 生成 sourcemap
      entryFileNames: `[name].mjs` // 生成文件名
    }),
    bundle.write({
      format: 'cjs',
      // paths: generatePaths(),
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`
    })
  ])
}
