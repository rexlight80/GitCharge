import React,{ createContext, useState } from "react";



export const SettingsContext = createContext(null);
export const  SettingsProvider = ({children}) => {
const[showSettings, setShowSettings] = useState(false);
const[setting, setSetting] = useState({
    accessToken: '', 
    sideBarHover: true,
    hotKeys: '',
    showInSelect: 'All',
    fontFamily: '',
    fontSizeSelect: '13px',
    iconSelect: 'gitlab'
});

const[fontFamily, setFontFamily] = useState("Open Sans");

    return(
        <SettingsContext.Provider 
        value={{
            showSettings,
            setting,
            fontFamily,
            setShowSettings,
            setSetting,
            setFontFamily

            }}>
        {children}
        </SettingsContext.Provider>
    )

}