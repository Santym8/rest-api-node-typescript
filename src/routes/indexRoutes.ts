import { Request, Response, Router } from 'express';

class IndexRoutes{

    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', (req, res) => res.send('Hello World'))
    }
}

const indexRoutes = new IndexRoutes();

//Exporta las rutas
export default indexRoutes.router;