import express from 'express';
import indexRoutes from './routes/indexRoutes'
import mongoose from 'mongoose';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

class Server {

    public app: express.Application;


    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

//-------------------------Configuraciones-----------------------------------------
    private configDataBase() {
        const MONGO_URI = 'mongodb://localhost/restapits';    
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI).then(db => console.log('db is Connected'));
    }

    private midelwares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        
    }

    private config() {
        this.app.set('port', process.env.PORT || 3000);
        this.configDataBase();
        this.midelwares();
    }
//------------------------------Rutas------------------------------------

    private routes() {
        //Establece las rutas
        this.app.use(indexRoutes);
    }

//---------------------------------------------------------------------

    public start() {
        //Inicializa el servidor
        this.app.listen(
            this.app.get('port'),
            () => {
                console.log('Server on port ', this.app.get('port'));
            });
    }


}


//Inicializa el servidor
const server = new Server();
server.start();