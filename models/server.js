const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const PaqueteController = require('../controllers/paquetes.controller.js');
const TourController = require('../controllers/tours.controller.js');
const GuiaController = require('../controllers/guia.controller.js'); 
const ClienteController = require('../controllers/cliente.controller.js'); 
const ServicioController = require('../controllers/servicios.controller.js');
const CalendarioController = require('../controllers/calendario.controller.js');

class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.pathPaquetes = '/api/paquetes';
        this.pathTours = '/api/tours';
        this.pathGuias = '/api/guias';
        this.pathClientes = '/api/clientes';
        this.pathServicios = '/api/servicios';
        this.pathCalendario = '/api/calendario';
        this.route();
    }

    listen() {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    }

    route() {
        this.app.use(express.json());
        this.app.use(cors());

        // Rutas para paquetes
        this.app.get(this.pathPaquetes, PaqueteController.getAllPaquetes);
        this.app.get(this.pathPaquetes + '/:id', PaqueteController.getPaqueteById);
        this.app.post(this.pathPaquetes, PaqueteController.createPaquete);
        this.app.put(this.pathPaquetes + '/:id', PaqueteController.updatePaquete);
        this.app.delete(this.pathPaquetes + '/:id', PaqueteController.deletePaquete);

        // Rutas para tours
        this.app.get(this.pathTours, TourController.getAllTours);
        this.app.get(this.pathTours + '/:id', TourController.getTourById);
        this.app.post(this.pathTours, TourController.createTour);
        this.app.put(this.pathTours + '/:id', TourController.updateTour);
        this.app.delete(this.pathTours + '/:id', TourController.deleteTour);

        // Rutas para guías
        this.app.get(this.pathGuias, GuiaController.getAllGuias); 
        this.app.get(this.pathGuias + '/:id_guia', GuiaController.getGuiaById);
        this.app.post(this.pathGuias, GuiaController.createGuia);
        this.app.put(this.pathGuias + '/:id_guia', GuiaController.updateGuia);
        this.app.delete(this.pathGuias + '/:id_guia', GuiaController.deleteGuia);

        // Rutas para clientes
         this.app.get(this.pathClientes, ClienteController.getAllClientes); 
         this.app.get(this.pathClientes + '/:id_cliente', ClienteController.getClienteById);
         this.app.post(this.pathClientes, ClienteController.createCliente);
         this.app.put(this.pathClientes + '/:id_cliente', ClienteController.updateCliente);
         this.app.delete(this.pathClientes + '/:id_cliente', ClienteController. deleteCliente);

         // Rutas para servicios
         this.app.get(this.pathServicios, ServicioController.getAllServicios); 
         this.app.get(this.pathServicios + '/:id_servicio', ServicioController.getServicioById);
         this.app.post(this.pathServicios, ServicioController.createServicio);
         this.app.put(this.pathServicios + '/:id_servicio', ServicioController.updateServicio);
         this.app.delete(this.pathServicios + '/:id_servicio', ServicioController.deleteServicio);

         // Rutas para calendario
         this.app.get(this.pathCalendario, CalendarioController.getAllCalendarios);
         this.app.get(this.pathCalendario + '/:id', CalendarioController.getCalendarioById);
         this.app.post(this.pathCalendario, CalendarioController.createCalendario);
         this.app.put(this.pathCalendario + '/:id', CalendarioController.updateCalendario);
         this.app.delete(this.pathCalendario + '/:id', CalendarioController.deleteCalendario);
    }
}

module.exports = Server;
