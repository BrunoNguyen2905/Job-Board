import React from "react";

type TButtonProps = {
  title: string;
  onBtnClick?: () => void;
};

const Button: React.FC<TButtonProps> = ({ title, onBtnClick }) => (
  <button
    className="w-fit mr-2 flex py-2 rounded-lg text-sm font-medium focus:outline-none border border-pink-700 tracking-normal md:tracking-wide text-gray-300 px-3 h-10"
    onClick={onBtnClick}
  >
    {title}
  </button>
);

export default Button;
