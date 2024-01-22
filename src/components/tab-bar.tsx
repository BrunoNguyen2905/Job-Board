import React from "react";

export interface ITab {
  label: React.ReactNode | string;
  disabled?: boolean;
}

export interface ITabBarProps {
  tabs: ITab[];
  selectedIndex: number;
  onTabClick: (index: number) => void;
}

const TabBar: React.FC<ITabBarProps> = ({
  tabs,
  selectedIndex,
  onTabClick,
}) => (
  <div className="text-base font-normal text-center leading-tight w-full">
    <ul className="flex flex-wrap items-center">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={
            tab.disabled
              ? "cursor-not-allowed pt-2"
              : "cursor-pointer mr-0 pt-2"
          }
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              if (!tab.disabled) {
                onTabClick(index);
              }
            }}
            className={`inline-block text-strong text-sm xs:text-md px-4 xs:px-6 pb-1 border-b-[3px] ${
              index === selectedIndex ? "border-pink-700" : "border-white"
            }`}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default TabBar;
