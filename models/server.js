const express = require('express');
const cors = require('cors');
const PaqueteController = require('../controllers/paquetes.controller.js');
const TourController = require('../controllers/tours.controller.js');

class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.pathPaquetes = '/api/paquetes';
        this.pathTours = '/api/tours';
        this.route();
    }

    listen() {
        this.app.listen(3000, () => {
            console.log(`Server is running`);
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
    }
}

module.exports = Server;
