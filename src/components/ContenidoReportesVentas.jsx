import React from 'react'
import ConstruccionTablas from './ConstruccionTablas'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CallIcon from '@material-ui/icons/Call';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles((theme) => ({
  formControlUno: {
    margin: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    minWidth: "20%",
  },
  formControlDos: {
    margin: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    minWidth: "15%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  calendario: {
    width: "12%",
  },
  iconButton: {
    padding: 0,
    marginRight:theme.spacing(1),
  },
  
  formBuscador: {
    marginTop: theme.spacing(2),
    width:"25%",
    marginRight: 0,
  },
  buscador:{
    width: "100%",
  },
  botonesMedio:{
    height: 4,
    // marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  textoBotonesMedio:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    lineHeight: 2.2,
    // marginTop: theme.spacing(5),
   
  },
  cajaMedio:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const ContenidoReportesVentas = () => {
  
  const classes = useStyles();
  
  //Hooks de estado para inputs
  //***************************
  //Listas
  const [vendedor, setVendedor] = React.useState('');
  const handleChangeVendedor = (event) => {
    setVendedor(event.target.value);
  };
  const [ventasMensual, setVentasMensual] = React.useState('');
  const handleChangeVentasMensual = (event) => {
    setVentasMensual(event.target.value);
  };
  const [metodoPago, setMetodoPago] = React.useState('');
  const handleChangeMetodoPago = (event) => {
    setMetodoPago(event.target.value);
  };
  const [locales, setLocales] = React.useState(null);
  const handleChangeLocales = (event) => {
    setLocales(event.target.value);
  };
  const [producto, setProducto] = React.useState(null);
  const handleChangeProducto = (event) => {
    setProducto(event.target.value);
  };
  //Fechas
  const [selectedDateUno, setSelectedDateUno] = React.useState(new Date('2020-12-18T21:11:54'));
  const handleDateChangeUno = (date) => {
    setSelectedDateUno(date);
  };
  const [selectedDateDos, setSelectedDateDos] = React.useState(new Date('2020-12-18T21:11:54'));
  const handleDateChangeDos = (date) => {
    setSelectedDateDos(date);
  };
  //Toggles
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='space-between'>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Fecha de inicio"
            value={selectedDateUno}
            onChange={handleDateChangeUno}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={classes.calendario}
          />

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Fecha final"
            value={selectedDateDos}
            onChange={handleDateChangeDos}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={classes.calendario}
          />

          <FormControl className={classes.formControlUno}>
            <InputLabel id="demo-simple-select-label">Vendedor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vendedor}
              onChange={handleChangeVendedor}
            >
              <MenuItem value={"LuisCastillo"}>Luis Castillo</MenuItem>
              <MenuItem value={"PamelaPalomino"}>Pamela Palomino</MenuItem>
              <MenuItem value={"RobertoPerez"}>Roberto Pérez</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControlDos}>
            <InputLabel id="demo-simple-select-label">Ventas Mensual</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ventasMensual}
              onChange={handleChangeVentasMensual}
            >
              <MenuItem value={"Enero"}>Enero</MenuItem>
              <MenuItem value={"Febrero"}>Febrero</MenuItem>
              <MenuItem value={"Marzo"}>Marzo</MenuItem>
              <MenuItem value={"Abril"}>Abril</MenuItem>
              <MenuItem value={"Mayo"}>Mayo</MenuItem>
              <MenuItem value={"Junio"}>Junio</MenuItem>
              <MenuItem value={"Julio"}>Julio</MenuItem>
              <MenuItem value={"Agosto"}>Agosto</MenuItem>
              <MenuItem value={"Septiembre"}>Septiembre</MenuItem>
              <MenuItem value={"Octubre"}>Octubre</MenuItem>
              <MenuItem value={"Noviembre"}>Noviembre</MenuItem>
              <MenuItem value={"Diciembre"}>Diciembre</MenuItem>
            </Select>
          </FormControl>
          
          <form className={classes.formBuscador} noValidate autoComplete="off">
            <TextField className={classes.buscador} id="standard-basic" label="Buscador General"
              placeholder="Introduzca una o más palabras"
              InputProps={{
                startAdornment: (
                  <IconButton
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }} 
            />
          </form>
        </Grid>

        <Grid container justify='space-between'>
          <FormControl className={classes.formControlUno}>
            <InputLabel id="demo-simple-select-label">Método de pago</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={metodoPago}
              onChange={handleChangeMetodoPago}
            >
              <MenuItem value={"Transferencia"}>Transferencia</MenuItem>
              <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="center" justify='center' className={classes.cajaMedio}>
            <Typography variant="body" color="initial" className={classes.textoBotonesMedio}>
              Ventas por medio de:
            </Typography>
            
            <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting" className={classes.cajaMedio}>
              <ToggleButton value="bold" aria-label="bold" className={classes.botonesMedio}>
                <WhatsAppIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic" className={classes.botonesMedio}>
                <CallIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined" className={classes.botonesMedio}>
                <LanguageIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <FormControl className={classes.formControlDos}>
            <InputLabel id="demo-simple-select-label">Locales</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={locales}
              onChange={handleChangeLocales}
            >
              <MenuItem value={"Pepa Grande1"}>Pepa Grande1</MenuItem>
              <MenuItem value={"Pepa Grande2"}>Pepa Grande2</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControlDos}>
            <InputLabel id="demo-simple-select-label">Producto</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={producto}
              onChange={handleChangeProducto}
            >
              <MenuItem value={"producto1"}>Producto1</MenuItem>
              <MenuItem value={"Producto2"}>Producto2</MenuItem>
            </Select>
          </FormControl>

        </Grid>
      </MuiPickersUtilsProvider>
      
      <ConstruccionTablas />
    </>
  )
}

export default ContenidoReportesVentas
