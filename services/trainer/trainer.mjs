import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function TrainerService (res, query) {

    const { module, view, task } = query;

    const indexFile = path.resolve(__dirname + `/files/${task}/` , 'index.js');
    const indexString = fs.readFileSync(indexFile, "utf8");

    const packageFile = path.resolve(__dirname + `/files/${task}/` , 'package.json');
    const packageString = fs.readFileSync(packageFile, "utf8");


    const files = {
        'index.js': {
          file: {
            contents: indexString,
          },
        },
        'package.json': {
          file: {
            contents: packageString,
          },
        },
      };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.render(module, { layout: false, view, files: JSON.stringify(files) });
}

export { TrainerService as service };