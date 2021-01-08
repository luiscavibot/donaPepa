import React, { useState } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import {db} from '../firebase';
import moment from 'moment'
import 'moment/locale/es'
registerLocale("es", es);


const estilo = {
    
    iconoCalendario:{
        background: '#E5E5E5' ,
        color: '#646464',
    },
    dateContainer:{
        padding: '2px',
    },
    dateContainerValue:{
        padding: '2px',
        width: '8vw',
        textAlign: 'center',
    },
    dateLabel:{
        lineHeight: 3.8,
    },
    desplegable:{
        width: '8vw',
        height: '4vh',
    },
    buscador:{
        width: '6vw',
        height: '4vh',
    },
    iconos:{
        width: 'auto',
        fontSize: '20px',
        height: 'auto'
    }
    
};

const ContenidosReportes = (props) => {

    //Hook de efecto, con ejecución solo al inicio
    const [rows, setRows] = React.useState([])
    // React.useEffect(() => {
    //     let DocumentoVentaRef = db.collection('Usuario').doc('bb23WWdq9Idmujt3p6K7').collection('DocumentoVenta');
    //     // let fechaEjemplo = new Date();
    //     // DocumentoVentaRef.doc('0tAAOZIaYzUNLw4oWtdT').update({
    //     //     fecha: fechaEjemplo.getTime(),
    //     // })

    //     DocumentoVentaRef = DocumentoVentaRef.limit(9);
    //     const obtenerDatos = async () => {
    //         try {
    //             const data = await DocumentoVentaRef.get();
    //             const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}));
    //             console.log(arrayData);  
    //             setRows(arrayData);        
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     } 
    //     obtenerDatos();
    // }, [])

    //Selects
    const [vendedor, setVendedor] = React.useState('Todos');
    const handleChangeVendedor = (event) => {
        setVendedor(event.target.value);
    };
    const [ventasMensual, setVentasMensual] = React.useState('Todos');
    const handleChangeVentasMensual = (event) => {
        setVentasMensual(event.target.value);
    };
    const [metodoPago, setMetodoPago] = React.useState('Todos');
    const handleChangeMetodoPago = (event) => {
        setMetodoPago(event.target.value);
    };
    const [locales, setLocales] = React.useState("Todos");
    const handleChangeLocales = (event) => {
        setLocales(event.target.value);
    };
    const [producto, setProducto] = React.useState("Todos");
    const handleChangeProducto = (event) => {
        setProducto(event.target.value);
    };
    const [ventasMedio, setVentasMedio] = React.useState([]);
    const [whatsapp, setWhatsapp] = React.useState(false);
    const [celular, setCelular] = React.useState(false);
    const [internet, setInternet] = React.useState(false);

    const handleInputVentasmedio = (event) =>{
        const value = event.target.checked;
        const name = event.target.name;
        switch (name) {
            case 'Whatsapp':
                setWhatsapp(value);
                break;
            case 'Celular':
                setCelular(value);
                break;
            case 'Internet':
                setInternet(value);
                break;
        }
        let arrayProv = ventasMedio;
        let indice = arrayProv.indexOf(name);
        value?(arrayProv.push(name)):(arrayProv.splice(indice, 1));
        setVentasMedio([...arrayProv])
    }

    // React.useEffect(()=>{
    //     console.log(whatsapp);
    //     let arrayProv = ventasMedio;
    //     let indice = arrayProv.indexOf('Whatsapp');
    //     whatsapp?(arrayProv.push('Whatsapp')):(arrayProv.splice(indice, 1));
    //     setVentasMedio([...arrayProv]);
    // },[whatsapp])
    
    const [dateInicio, setDateInicio] = useState(new Date());
    const [dateFin, setDateFin] = useState(new Date());

    React.useEffect(() => {
        let DocumentoVentaRef = db.collection('Usuario').doc('bb23WWdq9Idmujt3p6K7').collection('DocumentoVenta');
        DocumentoVentaRef = (vendedor !== 'Todos')?(DocumentoVentaRef.where('vendedor', '==', vendedor)):DocumentoVentaRef;
        DocumentoVentaRef = (ventasMensual !== 'Todos')?(DocumentoVentaRef.where('fecha', '==', ventasMensual)):DocumentoVentaRef;
        DocumentoVentaRef = ( metodoPago !== 'Todos')?(DocumentoVentaRef.where('metodoPago', '==', metodoPago)):DocumentoVentaRef;
        DocumentoVentaRef = ( locales!== 'Todos')?(DocumentoVentaRef.where('local', '==',locales )):DocumentoVentaRef;
        DocumentoVentaRef = ( producto!== 'Todos')?(DocumentoVentaRef.where('producto', '==', producto )):DocumentoVentaRef;
        // DocumentoVentaRef = ( whatsapp === true)?(DocumentoVentaRef.where('ventasMedio', '==', 'Whatsapp' )):DocumentoVentaRef;
        DocumentoVentaRef = DocumentoVentaRef.where('fecha', '>=', dateInicio.setHours(0,0,0,0));
        DocumentoVentaRef = DocumentoVentaRef.where('fecha', '<=', dateFin.setHours(23,59,59,0));

        DocumentoVentaRef = ( whatsapp || celular || internet )?(DocumentoVentaRef.where('ventasMedio', 'in', ventasMedio)):DocumentoVentaRef;

        // let matrizConsultaVentasMedio = [];
        // // ( whatsapp === true)?(matrizConsultaVentasMedio = [])

        // DocumentoVentaRef = ( whatsapp === true)?(DocumentoVentaRef.where('ventasMedio', 'in', ['Whatsapp', 'Celular','Internet'] )):DocumentoVentaRef;
        // DocumentoVentaRef = ( celular === true)?(DocumentoVentaRef.where('ventasMedio', 'in', ['Whatsapp', 'Celular','Internet'] )):DocumentoVentaRef;
        // DocumentoVentaRef = ( internet === true)?(DocumentoVentaRef.where('ventasMedio', 'in', ['Whatsapp', 'Celular','Internet'] )):DocumentoVentaRef;

        

        DocumentoVentaRef = DocumentoVentaRef.limit(9);
        
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
    }, [vendedor, ventasMensual, metodoPago, locales, producto, ventasMedio, dateInicio, dateFin])
    
    const ExampleCustomInput = ({ value, onClick }) => (
        <div className="d-flex border align-items-center justify-content-between mt-3" onClick={onClick}>
          <div style={estilo.dateContainerValue}>{value}</div>
          <div style={estilo.dateContainer}>
              <i className="far fa-calendar p-1 rounded-3 text-center" style={estilo.iconoCalendario}></i>
          </div>
        </div>
    );
    
    //Hooks necesarios para poder controlar los cambios de estados generados en los toggles de los botones de medios de venta

    // React.useEffect(()=>{
    //     console.log(celular);
    //     let arrayProv = ventasMedio;
    //     let indice = arrayProv.indexOf('Celular');
    //     celular?(arrayProv.push('Celular')):(arrayProv.splice(indice, 1));
    //     setCelular([...arrayProv]);
    // },[celular]) 

    // React.useEffect(()=>{
    //     console.log(internet);
    //     let arrayProv = ventasMedio;
    //     let indice = arrayProv.indexOf('Internet');
    //     internet?(arrayProv.push('Internet')):(arrayProv.splice(indice, 1));
    //     setInternet([...arrayProv]);
    // },[internet])  
    

    return (
        <>
            {/* Aquí hay informacion de {props.tab} */}
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <p className="m-0 me-1" style={estilo.dateLabel}>Fecha de inicio:</p>
                    {/* <input type="date" id="start" name="trip-start"
                            value={dateInicio}
                            onChange ={event => setDateInicio(Date(event.target.value))}
                    /> */}
                    <DatePicker 
                        selected={dateInicio} 
                        onChange={date => setDateInicio(date)} 
                        locale="es"
                        customInput={<ExampleCustomInput />} 
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="d-flex">
                    <p className="m-0 me-1" style={estilo.dateLabel}>Fin:</p>
                    <DatePicker 
                        selected={dateFin} 
                        onChange={date => setDateFin(date)} 
                        locale="es"
                        customInput={<ExampleCustomInput />} 
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="d-flex">
                    <p className="m-0 me-1" style={estilo.dateLabel}>Vendedores:</p>
                    <div className="dropdown mt-3">
                        <select value={vendedor} onChange={handleChangeVendedor} className="form-select py-1 lh-1" style={estilo.desplegable}>
                            {/* <option selected>Open this select menu</option> */}
                            <option value="Todos">Todos</option>
                            <option value="Luis">Luis</option>
                            <option value="Pamela">Pamela</option>
                            <option value="Renzo">Renzo</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <p className="m-0 me-2" style={estilo.dateLabel}>Venta mensual:</p>
                    <div className="dropdown mt-3">
                        <select value={ventasMensual} onChange={handleChangeVentasMensual} className="form-select py-1 lh-1" style={estilo.desplegable}>
                            {/* <option selected>Open this select menu</option> */}
                            <option value="Todos">Todos</option>
                            <option value="Enero">Enero</option>
                            <option value="Febrero">Febrero</option>
                            <option value="Marzo">Marzo</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <input className="form-control form-control-sm mt-3 w-100" type="text" placeholder="Búsqueda general" style={estilo.buscador}/>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <p className="m-0 me-2" style={estilo.dateLabel}>Métodos de pago:</p>
                    <div className="dropdown mt-3">
                        <select className="form-select py-1 lh-1" value={metodoPago} onChange={handleChangeMetodoPago} style={estilo.desplegable}>
                            {/* <option selected>Open this select menu</option> */}
                            <option value="Todos">Todos</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex align-content-center">
                    <p className="m-0 me-2" style={estilo.dateLabel}>Ventas por medio de:</p>
                    <div class="btn-group d-flex align-content-center " style={{marginTop:'10px'}} role="group">
                        <input type="checkbox" class="btn-check" checked={whatsapp} id="btncheck1" name="Whatsapp" onChange = {handleInputVentasmedio}/>
                        <label class="btn btn-outline-primary" for="btncheck1" style={estilo.iconos}><i class="fab fa-whatsapp" ></i></label>
                        
                        <input type="checkbox" class="btn-check" checked={celular} id="btncheck2" name="Celular"  onChange= {handleInputVentasmedio}/>
                        <label class="btn btn-outline-primary" for="btncheck2" style={estilo.iconos}><i class="fas fa-phone" ></i></label>
                        
                        <input type="checkbox" class="btn-check" checked={internet} id="btncheck3" name="Internet"  onChange= {handleInputVentasmedio}/>
                        <label class="btn btn-outline-primary" for="btncheck3" style={estilo.iconos}><i class="fas fa-globe" ></i></label>
                        
                        

                    </div>
                </div>
                <div className="d-flex">
                    <p className="m-0 me-2" style={estilo.dateLabel}>Locales:</p>
                    <div className="dropdown mt-3">
                        <select className="form-select py-1 lh-1" value={locales} onChange={handleChangeLocales} style={estilo.desplegable}>
                            {/* <option selected>Open this select menu</option> */}
                            <option selected value="Todos">Todos</option>
                            <option value="Pepa grande">Pepa grande</option>
                            <option value="Puntitos del sabor">Puntitos del sabor</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <p className="m-0 me-2" style={estilo.dateLabel}>Producto:</p>
                    <div className="dropdown mt-3">
                        <select className="form-select py-1 lh-1" value={producto} onChange={handleChangeProducto} style={estilo.desplegable}>
                            {/* <option selected>Open this select menu</option> */}
                            <option selected value="Todos">Todos</option>
                            <option selected value="Turron XL">Turron XL</option>
                            <option value="Don Pepon">Don Pepon</option>
                            <option value="Turron morado">Turron morado</option>
                        </select>
                    </div>
                </div>
            </div>
            <table class="table">
                <thead class="table-ligth">
                    <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Serie</th>
                        <th scope="col">Número</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cant.</th>
                        <th scope="col">Dscto.</th>
                        <th scope="col">P. Unit.</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Local</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                        {rows.map((row) => (
                            <tr>
                                <td >{row.tipoDocumento}</td>
                                <td >{row.serie}</td>
                                <td >{row.numero}</td>
                                <td >{row.cliente}</td>
                                <td >{row.categoria}</td>
                                <td >{row.producto}</td>
                                <td >{row.cantidad}</td>
                                <td >{row.descuento}</td>
                                <td >{row.precioUnitario}</td>
                                <td >{row.vendedor}</td>
                                <td >{row.monto}</td>
                                <td >{moment(row.fecha).format('L')}</td>
                                <td >{row.local}</td>
                                <td >{row.estado}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a class="page-link" href="#">1</a></li>
                        <li className="page-item"><a class="page-link" href="#">2</a></li>
                        <li className="page-item"><a class="page-link" href="#">3</a></li>
                        <li className="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default ContenidosReportes
