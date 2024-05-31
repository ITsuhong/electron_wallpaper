import React, { useState } from "react";
import { imageList } from "./static.ts";

const DynamicWallpaper: React.FC = () => {
  const [tabList] = useState<
    {
      name: string;
    }[]
  >([
    {
      name: "全部",
    },
    {
      name: "推荐",
    },
    {
      name: "动漫",
    },
  ]);
  const [activeTab, setActiveTab] = useState(tabList[0].name);
  const handleOptionImg = (path: string) => {
    window.ipcRenderer.send("set-wallpaper", path);
  };
  return (
    <div className="px-6 py-5">
      <div className="flex items-center">
        {tabList.map((item) => {
          return (
            <div
              onClick={() => {
                setActiveTab(item.name);
              }}
              className={`not-drag mr-6 ${item.name == activeTab ? "border-primary  text-primary" : "text-black border-transparent"} border-2 px-3 py-0.5 rounded-full `}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {imageList.map((item) => {
          return (
            <img
              onClick={() => handleOptionImg(item)}
              src={item}
              className="h-56 w-full rounded-xl not-drag"
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
};

export default DynamicWallpaper;
