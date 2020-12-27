  
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth} from '../firebase'
import { withRouter } from "react-router-dom";
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    
    alerta: {
        marginTop: theme.spacing(1),      
    },
    paper: {
        marginTop: '35%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',       
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            setError('Debe ingresar un email.')
            return
        }
        if(!pass.trim()){
            setError('Debe ingresar un password.')
            return
        }
        if(pass.length < 6){
            setError('La contraseña deber ser igual o mayor a 6 caracteres.')
            return
        }
        setError(null)
        login()
    }
    const login = React.useCallback(async() => {
        try {
            await auth.signInWithEmailAndPassword(email, pass)  
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin') 
        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                setError('Usuario o contraseña incorrecto')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Usuario o contraseña incorrecto')
            }
        }
    }, [email, pass, props.history])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography color= "primary">
                    Logo de Doña Pepa pendiente
                </Typography>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                
                <form className={classes.form} onSubmit={procesarDatos} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Usuario"
                                name="email"
                                autoComplete="email"
                                onChange={ e => setEmail(e.target.value) }
                                value={email}
                                type="email" 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={ e => setPass(e.target.value) }
                                value={pass}
                            />
                        </Grid>
                    </Grid>
                    {
                        error ? (

                                <Alert className={classes.alerta} 
                                    severity="error" 
                                    fullwidth
                                    m={2}>
                                <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            
                        ) : null
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        INGRESAR
                    </Button>
                        
                </form>
                <Grid container justify="center">
                    <Grid item>
                        <Link href="#" variant="body2">
                            ¿Olvidaste tu contraseña? Click aquí
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default withRouter (Login)
