// @ts-nocheck
import { WebContainer } from '@webcontainer/api';
// import files from 'files';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';


/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

document.querySelector('#app').innerHTML = `
          <div class="container">
          <div class="editor">
              <textarea autocomplete="off" id="textareaCode" wrap="logical" spellcheck="false">I am a textarea</textarea>
          </div>
          <div class="preview">
            <iframe anonymous  src="http://localhost:3000/public/loading.html"></iframe>
          </div>
          </div>
          <div class="terminal"></div>  
`;

/** @type {HTMLTextAreaElement | null} */
const terminalEl = document.querySelector('.terminal');

/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector('iframe');

/** @type {HTMLTextAreaElement | null} */
const textareaEl = document.querySelector('textarea');


/**
 * @param {Terminal} terminal
 */
async function startDevServer(terminal) {
  // Run `npm run start` to start the Express app
  // await webcontainerInstance.spawn('npm', ['run', 'start']);
  const serverProcess = await webcontainerInstance.spawn('npm', [
    'run',
    'start',
  ]);

  serverProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    })
  );

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });
}

/**
 * @param {Terminal} terminal
 */
async function installDependencies(terminal) {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);

  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      terminal.write(data);
    }
  }));
  // Wait for install command to exit
  return installProcess.exit;
}


/** @param {string} content*/

async function writeIndexJS(content) {
  await webcontainerInstance.fs.writeFile('/index.js', content);
};


htmx.onLoad(() => {
    console.log('loaded');

});
document.body.addEventListener('htmx:afterSwap', async () => {
    console.log('loaded');
});

/** @return {Promise} */
window.addEventListener('load', async () => {
//   textareaEl.value = files['index.js'].file.contents;

textareaEl.value = `
    import express from 'express';

    const app = express();
    const port = 3111;

    app.get('/', (req, res) => {
    res.send('Welcome to a WebContainers app! 🥳');
    });

    app.listen(port, () => {
    console.log('App is live');
    });

`;
  textareaEl.addEventListener('input', (e) => {
    writeIndexJS(e.currentTarget.value);
  });

//--------------
CodeMirror.fromTextArea(textareaEl, {
  lineNumbers: true,
  matchBrackets: true,
  mode: "javascript",
  theme: "rails-envy"
}).on('update', (changeObj) => {
  writeIndexJS(changeObj.doc.getValue());
});
//--------------
 
  const terminal = new Terminal({
    convertEol: true,
  });
  terminal.open(terminalEl);

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  const files = {
    "index.js": {
        "file": {
            "contents": "\n  import express from 'express';\n  const app = express();\n  const port = 3111;\n  \n  app.get('/', (req, res) => {\n    res.send('Welcome to a WebContainers app! 🥳');\n  });\n  \n  app.listen(port, () => {\n    console.log(`App is live at http://localhost:${port}`);\n  });"
        }
    },
    "package.json": {
        "file": {
            "contents": "\n  {\n    \"name\": \"example-app\",\n    \"type\": \"module\",\n    \"dependencies\": {\n      \"express\": \"latest\",\n      \"nodemon\": \"latest\"\n    },\n    \"scripts\": {\n      \"start\": \"nodemon --watch './' index.js\"\n    }\n  }"
        }
    }
    };
  await webcontainerInstance.mount(files);

  const exitCode = await installDependencies(terminal);
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  };

  startDevServer(terminal);
  
});

