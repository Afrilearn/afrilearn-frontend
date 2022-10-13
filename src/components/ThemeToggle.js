import React from 'react'
import Switch from "react-switch";
import { useContext } from 'react';
import { ThemeContext } from '../App';

const ThemeToggle = () => {
    const { theme, setTheme} = useContext(ThemeContext)
    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
  return (
    <div>
        <Switch
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={handleThemeToggle}
            checked={theme === 'dark'}
        />
    </div>
  )
}

export default ThemeToggle