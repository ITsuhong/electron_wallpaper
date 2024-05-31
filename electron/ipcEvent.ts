import { ipcMain } from "electron";
import { exec } from "child_process";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "https";
import { getSuffix, randomString } from "./util.ts";

export default function () {
  ipcMain.on("hide-window", () => {
    global.mainWindow.minimize();
  });
  ipcMain.on("set-wallpaper", async (_, args) => {
    const path = await downloadImage(args);
    setWallpaper(path);
  });
}

function downloadImage(url: string): Promise<string> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const defaultPath = path.join(__dirname, "download");
  if (!fs.existsSync(defaultPath)) {
    fs.mkdirSync(defaultPath);
  }
  const filePath = path.join(defaultPath, randomString() + getSuffix(url));

  // const destPath= path.join(defaultPath, destPath);
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close(() => resolve(filePath));
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {
          reject(err.message);
        });
      });
  });
}

function setWallpaper(imagePath: string) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const script = `
  [System.Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null

Write-Output "Loading image from ${imagePath}"
$img = [System.Drawing.Image]::FromFile("${imagePath}")

$bmp = New-Object System.Drawing.Bitmap $img

$path = [System.IO.Path]::Combine($env:TEMP, 'wallpaper.bmp')
Write-Output "Saving BMP to $path"

$bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Bmp)

$img.Dispose()
$bmp.Dispose()

$null = Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class Wallpaper {
    [DllImport("user32.dll", CharSet=CharSet.Auto)]
    public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
}
"@

[Wallpaper]::SystemParametersInfo(0x0014, 0, $path, 0x0001)

  `;
  const tempFilePath = path.join(__dirname, "set-wallpaper.ps1");
  fs.writeFileSync(tempFilePath, script);

  exec(
    `powershell.exe -ExecutionPolicy Bypass -File "${tempFilePath}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("Error changing wallpaper:", error);
        console.error(stderr);
      } else {
        console.log("Wallpaper changed successfully!");
        console.log(stdout);
      }

      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);
    },
  );
}
