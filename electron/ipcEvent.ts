import {ipcMain} from 'electron'

export default function () {
    ipcMain.on('hide-window', () => {
        global.mainWindow.minimize()
    })
}