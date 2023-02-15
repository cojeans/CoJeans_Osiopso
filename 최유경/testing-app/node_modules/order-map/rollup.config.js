
import builder from "@daybrush/builder";

export default builder([
    {
        name: "OrderMap",
        input: "src/OrderMap.ts",
        output: "./dist/order-map.js",
        resolve: true,
    },
    {
        name: "OrderMap",
        input: "src/OrderMap.ts",
        output: "./dist/order-map.min.js",
        resolve: true,
        uglify: true,

    },
    {
        input: "src/OrderMap.ts",
        output: "./dist/order-map.esm.js",
        exports: "default",
        format: "es",
    },
    {
        input: "src/OrderMap.ts",
        output: "./dist/order-map.cjs.js",
        exports: "default",
        format: "cjs",
    },
]);
