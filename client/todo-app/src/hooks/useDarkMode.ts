"use client"
import { useState, useEffect } from "react"

export default function useDarkMode() {
    const [ isDarkMode, setIsDarkMpde] = useState(false);
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedMode = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;

        if (savedMode === 'dark' || ( !savedMode && systemPrefersDark)){
            setIsDarkMpde(true);
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        };  
    }, []);

    const toggleDarkMode = () => {
        const notDarkMode = !isDarkMode;
        setIsDarkMpde(notDarkMode);
        if (notDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else{
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        };
    };

    // const toggleDarkMode = () => {
    //     return isDarkMode
    // };

    return { isDarkMode, toggleDarkMode, mounted };
};