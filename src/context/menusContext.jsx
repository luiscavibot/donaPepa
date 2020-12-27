import React from 'react';

const MenuContext = React.createContext();

export function MenuProvider(props){
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true);

    const value = React.useMemo(()=>{
        return ({
            mobileOpen,
            open,
            setMobileOpen,
            setOpen
        })
    }, [mobileOpen, open])
    return <MenuContext.Provider value={value} {...props} />
} 

export function useUsuario(){
    const context = React.useContext(MenuContext);
    if(!context){
        throw new Error ('UseUsuario debe estar dentro del proveedor UsuarioContext')
    }
    return context;
}