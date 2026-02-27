import path from "path"

export default {
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index.min.js",
    library: "Calcmachine",
    libraryTarget: "var"
  },
  mode: "production",
  optimization: {
    minimize: true
  }
}