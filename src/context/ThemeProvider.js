import React from 'react'

export const ThemeContext = React.createContext()

const ThemeProvider = (props) => {
    
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    
    return (
        <ThemeContext.Provider>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
