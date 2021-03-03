import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from "formik";
import * as yup from "yup";

const Local = () => {

    const [listaLocales, setListaLocales] = useState([])
    const [buscador, setBuscador] = useState(false)
    const [metodoPago, setMetodoPago] = useState('todos')
    const [tipoCliente, setTipoCliente] = useState('todos')
    const [totalLiquidacion, setTotalLiquidacion] = useState([0,0,0,0])
    const [listaLiquidacion, setListaLiquidacion] = useState([])
    const [contador, setContador] = useState(1)
    const [desactivar, setDesactivar] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: initialValues(),
        // validationSchema:
        onSubmit: (formData) => {
            console.log(formData);
        }
    })


    const buscadorGeneral = (event) => {
        // console.log(event.target.value);
        // setBuscador(event.target.value);
        if (event.target.value==="") {
            setBuscador(true);
        }else{
            consultaBuscador(event.target.value);
        }
    }

    const consultaBuscador = () => {

    }

    const anterior = () => {

    }

    const siguiente = () => {
        
    }

    useEffect(() => {
        const getLocales = async () =>{
            try {
                console.log("activaremos el axios para obtener datos del cliente");
                let res = await axios.get(`http://localhost:1337/locals`);
                console.log("datos obtenidos de los locales",res.data);
                setListaLocales(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getLocales();
    }, [])

    return (
        <>
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3 mb-3 border-bottom">
                    <h1 className="fw-bold h5">Mantenimiento / Local</h1>
                    {/* <div>
                        <button type="button" className="btn btn-secondary btn-sm me-1">Copiar</button>
                        <button type="button" className="btn btn-secondary btn-sm me-1" >Imprimir</button>
                        <button type="button" className="btn btn-secondary btn-sm">Excel</button>
                    </div> */}
                </div>

                <div>
                    <div className="row">
                        {/* <div className="col-8">
                            <div className="d-flex justify-content-between"> */}

                                <div className="col-4 mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Buscar:</label>
                                        </div>
                                        <div className="col">
                                            <input className="form-control fa" type="text" placeholder="&#xF002;" onChange={buscadorGeneral}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col mb-3">
                                    <div className="row">
                                        <div className="col-auto">
                                            <label className="col-form-label">Local:</label>
                                        </div>
                                        <div className="col-auto">
                                            <select className="form-select" value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                                                <option value="todos" selected>--</option>
                                                <option value="tarjeta">Pepa Grande</option>
                                                <option value="contado">Pepa Chica</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col mb-3">
                                    <Button variant="primary" onClick={handleShow}>+ AGREGAR LOCAL</Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="px-5">
                                            <div className="text-center h4 mb-4">Agregar local</div>
                                            <div>
                                            <Form onSubmit={formik.handleSubmit}>
                                                <Form.Group controlId="nombre">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control onChange={formik.handleChange} name="nombre" type="text" placeholder="" />
                                                </Form.Group>

                                                <Row>
                                                    <Col>
                                                    <Form.Group controlId="razon_social">
                                                        <Form.Label>Razón social</Form.Label>
                                                        <Form.Control onChange={formik.handleChange} name="razon_social" as="select">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="RUC">
                                                            <Form.Label>RUC</Form.Label>
                                                            <Form.Control onChange={formik.handleChange} name="RUC" type="text" placeholder="" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                    <Form.Group controlId="departamento">
                                                        <Form.Label>Departamento</Form.Label>
                                                        <Form.Control onChange={formik.handleChange} name="departamento" as="select">
                                                            <option>Seleccionar</option>
                                                            <option>Arequipa</option>
                                                            <option>Moquegua</option>
                                                            <option>Tacna</option>
                                                            <option>Piura</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="distrito">
                                                            <Form.Label>Distrito</Form.Label>
                                                            <Form.Control onChange={formik.handleChange} name="distrito" as="select">
                                                                <option>Seleccionar</option>
                                                                <option>Lince</option>
                                                                <option>Ate</option>
                                                                <option>Comas</option>
                                                                <option>Los Olivos</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Form.Group controlId="direccion">
                                                    <Form.Label>Dirección</Form.Label>
                                                    <Form.Control onChange={formik.handleChange} name="direccion" type="text" placeholder="" />
                                                </Form.Group>

                                                <Row>
                                                    <Col>
                                                    <Form.Group controlId="telefono">
                                                        <Form.Label>Numero de contacto</Form.Label>
                                                        <Form.Control onChange={formik.handleChange} name="telefono" type="text" placeholder="" />
                                                    </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="aforo">
                                                            <Form.Label>Aforo</Form.Label>
                                                            <Form.Control onChange={formik.handleChange} name="aforo" type="number" min="0" placeholder="" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                
                                                <div key="custom-radio" className="mb-3">
                                                <Form.Group controlId="regalos">
                                                    <div>
                                                        <Form.Label>Regalos</Form.Label>
                                                    </div>
                                                    <Form.Check
                                                        inline
                                                        onChange={formik.handleChange}
                                                        type="radio"
                                                        id="custom-radio-1"
                                                        name="regalos"
                                                        label="Sí"
                                                    />

                                                    <Form.Check
                                                        inline
                                                        onChange={formik.handleChange}
                                                        type="radio"
                                                        id="custom-radio-2"
                                                        name="regalos"
                                                        label="No"
                                                    />
                                                </Form.Group>
                                                    
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <Button variant="danger" type="submit">
                                                        AGREGAR
                                                    </Button>
                                                </div>

                                            </Form>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                    {/* <button className="btn btn-primary">+ AGREGAR LOCAL</button> */}
                                </div>
                                
                            {/* </div>
                        </div> */}
                    </div>
                    
                    
                    <table className="table" id="tblData">
                        <thead className="table-ligth">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Acciones</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaLocales.map((row, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{row.nombre}</td>
                                        <td >{row.direccion}</td>
                                        <td>
                                            <div>
                                                <button className="btn btn-sm btn-primary mx-1">EDITAR</button>
                                                <button className="btn btn-sm btn-danger mx-1">ELIMINAR</button>
                                                <button className="btn btn-sm btn-secondary mx-1">DESACTIVAR</button>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="#" onClick>Ver más {'>'}</a>
                                        </td>
                                    </tr>        
                                ))
                            }
                            {/* <tr>
                                <td>1</td>
                                <td>Emancipación</td>
                                <td>Av. Lorem Ipsum</td>
                                <td>
                                    <div>
                                        <button className="btn btn-sm btn-primary mx-1">EDITAR</button>
                                        <button className="btn btn-sm btn-danger mx-1">ELIMINAR</button>
                                        <button className="btn btn-sm btn-secondary mx-1">ELIMINAR</button>
                                    </div>
                                </td>
                                <td><a href="#" onClick>Ver más {'>'}</a></td>
                            </tr> */}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => anterior()}>Anterior</button>
                                </li>
                                <li className="page-item"><input type="text" className="page-link btnPagina" value={contador}/></li>
                                <li className="page-item">
                                    <button className="page-link" onClick={() => siguiente()} disabled={desactivar}>Siguiente</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            
            </div>
        </>
    )
}

export default Local

const initialValues = () => {
    return {
        nombre: "",
        razon_social: "",
        RUC: "",
        departamento: "",
        distrito: "",
        direccion: "",
        telefono: "",
        aforo: "",
        regalos: null
    }
}

const validationSchema = () => {
    return {}
}