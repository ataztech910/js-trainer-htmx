import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

class TrainerComponent extends HTMLElement {
    globalEditor = null;
    constructor() {
        super();
        this.initTrainter();
    }
    initTrainter() {

      const files = JSON.parse(this.getAttribute('files'));

      /** @type {import('@webcontainer/api').WebContainer}  */
      let webcontainerInstance;
      
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



      /** @return {Promise} */
      window.addEventListener('load', async () => {
      console.log(JSON.parse(this.getAttribute('files')));
      textareaEl.value = files['index.js'].file.contents;
        textareaEl.addEventListener('input', (e) => {
          writeIndexJS(e.currentTarget.value);
        });

      //--------------
      this.globalEditor = CodeMirror.fromTextArea(textareaEl, {
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
       
        await webcontainerInstance.mount(files);

        const exitCode = await installDependencies(terminal);
        if (exitCode !== 0) {
          throw new Error('Installation failed');
        };

        startDevServer(terminal);
        
      });

    }
}


customElements.define('trainer-component', TrainerComponent);
