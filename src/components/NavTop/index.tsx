import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

const NavTop: React.FC = () => {
  const routers = [
    {
      name: "动态壁纸",
      path: "/dynamic",
    },
    {
      name: "静态壁纸",
      path: "/",
    },
    {
      name: "桌面组件",
      path: "/dynamic",
    },
    {
      name: "我的",
      path: "/dynamic",
    },
  ];
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<string>("动态壁纸");
  const handleOptionHide = () => {
    console.log(window);
    window.ipcRenderer.send("hide-window");
  };
  const handleOptionNav = (record: any) => {
    setActiveNav(record.name);
    navigate(record.path);
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
