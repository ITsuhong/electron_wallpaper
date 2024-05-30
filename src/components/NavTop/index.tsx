import React, { useState } from "react";
import Logo from "@/assets/logo.png";

const NavTop: React.FC = () => {
  const routers = [
    {
      name: "动态壁纸",
    },
    {
      name: "静态壁纸",
    },
    {
      name: "桌面组件",
    },
    {
      name: "我的",
    },
  ];
  const [activeNav, setActiveNav] = useState<string>("动态壁纸");
  const handleOptionHide = () => {
    console.log(window);
    window.ipcRenderer.send("hide-window");
  };
  const handleOptionNav = (record: any) => {
    setActiveNav(record.name);
  };
  return (
    <div className="flex px-4 py-2  justify-between items-center w-screen drag">
      <div className="flex items-center ">
        <img className="w-28 " src={Logo} alt="" />
        <div className="flex items-center">
          {routers.map((item) => {
            return (
              <div
                onClick={() => handleOptionNav(item)}
                className={`px-3 ${activeNav == item.name ? "bg-primary text-white" : "bg-white"} rounded-xl ml-20 font-black cusFont text-black text-xl not-drag `}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center">
        <i
          onClick={() => handleOptionHide()}
          className="iconfont icon-zuixiaohua2 text-xl text-black mr-2 hover:text-primary not-drag"
        ></i>
        <i className="iconfont icon-guanbi1 text-2xl text-black hover:text-primary not-drag"></i>
      </div>
    </div>
  );
};
export default NavTop;
