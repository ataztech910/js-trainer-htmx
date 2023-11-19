const path = require("path");

// We can move service name to the environment variables
SERVICE_NAME = "trainer";
ENTRY_PATH = path.resolve(__dirname, `services/public/main.js`)
DIST_PATH = path.resolve(__dirname, `services/public/dist`)

module.exports = {
   entry: {
      main: ENTRY_PATH,
   },
   output: {
      path: DIST_PATH,
      // For the advanced configuration and caching use this line
      // filename: "[name].[contenthash].js",
      filename: "bundle.js",
      clean: true,
   },
   module: {
    rules: [
        { 
            test: /\.css$/, 
            use: ["style-loader", "css-loader"]
        }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: "inline-source-map",
}