import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {db} from '../firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable() {

  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    let DocumentoVentaRef = db.collection('Usuario').doc('bb23WWdq9Idmujt3p6K7').collection('DocumentoVenta');
    DocumentoVentaRef = DocumentoVentaRef.limit(5);
    const obtenerDatos = async () => {
        try {
            const data = await DocumentoVentaRef.get();
            const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
            console.log(arrayData);
            setRows(arrayData);        
        } catch (error) {
            console.log(error)
        }
    } 
    obtenerDatos();
  }, [])
  
  
  const classes = useStyles();

  return (

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Serie</TableCell>
            <TableCell align="left">Número</TableCell>
            <TableCell align="left">Cliente</TableCell>
            <TableCell align="left">Categoría</TableCell>
            <TableCell align="left">Producto</TableCell>
            <TableCell align="left">Cant.</TableCell>
            <TableCell align="left">Dscto.</TableCell>
            <TableCell align="left">P. Unit.</TableCell>
            <TableCell align="left">Vendedor</TableCell>
            <TableCell align="left">Monto</TableCell>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Local</TableCell>
            <TableCell align="left">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.tipoDocumento}</TableCell>
              <TableCell align="left">{row.serie}</TableCell>
              <TableCell align="left">{row.numero}</TableCell>
              <TableCell align="left">{row.cliente}</TableCell>
              <TableCell align="left">{row.categoria}</TableCell>
              <TableCell align="left">{row.producto}</TableCell>
              <TableCell align="left">{row.cantidad}</TableCell>
              <TableCell align="left">{row.descuento}</TableCell>
              <TableCell align="left">{row.precioUnitario}</TableCell>
              <TableCell align="left">{row.vendedor}</TableCell>
              <TableCell align="left">{row.monto}</TableCell>
              <TableCell align="left">{row.fecha}</TableCell>
              <TableCell align="left">{row.local}</TableCell>
              <TableCell align="left">{row.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
