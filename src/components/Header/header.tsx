import { FC, useState } from "react";
import { IoIosSearch } from "react-icons/io";
// import ThemeSwitch from "../Theme/themeSwitch";
import logo from "../../assets/cent.png"
import React from "react";
import ThemeSwitch from "../Theme/themeSwitch";
import { WatchListCoin } from "../Watchlist/watchList";
import CustomDropdown from "../CustomDropdown/customDropdown";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    handleTheme:(props:string)=>void;
    currentTheme:string
    recentlyViewed:Array<WatchListCoin>

}

 const Header: FC<HeaderProps> = ({handleTheme,currentTheme,recentlyViewed}) => {
        const navigate = useNavigate()
        const [selectedOption, setSelectedOption] = useState<string>('apple');
      
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedOption(event.target.value);}

    return (
        <div className="h-[8%] flex justify-between items-center px-4">
            <div className="w-5 h-5 lg:w-10 lg:h-10 flex space-x-4 items-center"><img src={logo} alt="Logo" />
            <div onClick={()=>navigate('/dashboard')} className="text-xs lg:text-[15px] dark:text-white cursor-pointer hover:bg-[#86efac52] py-1 px-2 rounded-xl">Home</div>
            <div onClick={()=>navigate('/')} className="text-xs lg:text-[15px] dark:text-white cursor-pointer hover:bg-[#86efac52] py-1 px-2 rounded-xl">Explore</div>

            </div>
            <div className="flex space-x-1 items-center bg-white px-1 rounded w-2/3 lg:w-1/3 border-solid border-black border-[1px] dark:bg-black dark:border-white">
                <IoIosSearch className="text-black w-3 h-3 lg:w-5 lg:h-5 dark:text-white" />
              
                <CustomDropdown recentlyViewed={recentlyViewed} />
            </div>
            <div className=""> <ThemeSwitch handleTheme={handleTheme} theme={currentTheme}  />
            </div>
        </div>
    );
}
export default Header;