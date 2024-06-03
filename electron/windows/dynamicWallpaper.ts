import { join } from "path";
import { BrowserWindow, screen } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const createWindow = (browserWindow: any) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const obj = {
    width: width,
    height: height,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: false, // 确保窗口不在最上层
    fullscreen: true, // 全屏
    title: "Wallpaper Window",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  };
  console.log(process.env["VITE_DEV_SERVER_URL"] + "/wallpaperWindow");
  let wallpaperWindow: BrowserWindow = new browserWindow(obj);
  wallpaperWindow.loadURL(
    process.env["VITE_DEV_SERVER_URL"] + "wallpaperWindow",
  );
  wallpaperWindow.on("move", () => {
    console.log("变化");
    const [x, y] = wallpaperWindow.getPosition();
    // 在窗口位置变化时重新设置窗口的位置
    // 这里可以根据你的需求重新设置窗口的位置
    wallpaperWindow.setPosition(x, y, true); // x 和 y 是新的窗口位置
  });

  function checkWindowFocus() {
    // console.log("只想");
    const [x, y] = wallpaperWindow.getPosition();
    wallpaperWindow.setPosition(x, y, true);
    // 下一次检查
    setTimeout(checkWindowFocus, 1000);
  }

  checkWindowFocus();
  // 在创建窗口后开始检查窗口位置
  // checkWindowPosition();

  return wallpaperWindow;
};
