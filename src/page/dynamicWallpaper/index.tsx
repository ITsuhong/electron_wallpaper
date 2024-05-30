import React, { useState } from "react";

const DynamicWallpaper: React.FC = () => {
  const [tabList, setTabList] = useState<
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
    </div>
  );
};

export default DynamicWallpaper;
