import React from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'

const Admin = (props) => {

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if(auth.currentUser){
            setUser(auth.currentUser)
        }else{
            props.history.push('/login')
        }
    }, [props.history])


    return (
        <div className="mt-5">
            <h3 className="text-center">Ruta protegida</h3>
            {
                user && (
                    <p>{user.email}</p>
                )
            }
        </div>
    )
}

export default withRouter(Admin)