const {
    contextBridge,
    shell
} = require('electron');

contextBridge.exposeInMainWorld(
    'bridge',
    {
        hello: () => 'hello world',
        shellOpenItem: (fullPath) => shell.openItem(fullPath)
    }
)