import { FC } from "react";
import { IoIosSearch } from "react-icons/io";
// import ThemeSwitch from "../Theme/themeSwitch";
import logo from "../../assets/cent.png"
import React from "react";
import ThemeSwitch from "../Theme/themeSwitch";

interface HeaderProps {
    handleTheme:(props:string)=>void;
    currentTheme:string

}

 const Header: FC<HeaderProps> = ({handleTheme,currentTheme}) => {
    return (
        <div className="h-[8%] flex justify-between items-center px-4">
            <div className="w-10 h-10"><img src={logo} alt="Logo" /></div>
            <div className="flex space-x-1 items-center bg-white px-1 rounded w-1/3 border-solid border-black border-[1px] dark:bg-black dark:border-white">
                <IoIosSearch className="text-black w-5 h-5 dark:text-white" />
                <input type="text" placeholder="Search..." className="text-black p-1 roboto-light flex-1 bg-white dark:text-white dark:bg-black"  />
            </div>
            <div className=""> <ThemeSwitch handleTheme={handleTheme} theme={currentTheme}  />
            </div>
        </div>
    );
}
export default Header;