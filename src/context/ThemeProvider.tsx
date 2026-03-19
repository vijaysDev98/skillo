import React, { createContext, useEffect, useState } from 'react'

//ASSETS
import { LIGHT_THEME_COLOR, DARK_THEME_COLOR } from '../assets'

interface ThemeProviderProps {
    children: any
}

export enum ThemeName {
    Light = 'light',
    DARK = 'dark'
}

export type ThemeContextType = {
    currentTheme: ThemeName,
    theme: typeof LIGHT_THEME_COLOR,
    changeAppTheme?: (item: ThemeName) => void
};

const initalValues = {
    currentTheme: ThemeName.Light,
    theme: LIGHT_THEME_COLOR,
    changeAppTheme: undefined
}

export const ThemeContext = createContext<ThemeContextType>(initalValues);

export function ThemeProvider(props: ThemeProviderProps): any {

    const [currentTheme, setCurrentTheme] = useState<ThemeName>(ThemeName.Light)

    function getTheme() {
        if (currentTheme == 'dark') {
            return DARK_THEME_COLOR
        }
        else {
            return LIGHT_THEME_COLOR
        }
    }

    function changeAppTheme(item: ThemeName) {
        setCurrentTheme(item)
    }

    const theme: any = getTheme()

    const contextValue: ThemeContextType = {
        theme: theme,
        currentTheme: currentTheme,
        changeAppTheme: changeAppTheme
    };

    return (
        <ThemeContext.Provider
            value={contextValue}>
                { props.children }
        </ThemeContext.Provider >
    )
}
