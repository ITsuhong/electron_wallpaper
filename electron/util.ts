export const getSuffix = (filename: string) => {
  const pos = filename.lastIndexOf(".");
  let suffix = "";
  if (pos != -1) {
    suffix = filename.substring(pos);
  }

  return suffix.split("?")[0];
};

// 上传文件重命名
export const randomString = (len?: number) => {
  len = len || 32;
  var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  var maxPos = chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
