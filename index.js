/** Importaciones */
import express from 'express'; // Importamos express
import morgan from 'morgan'; // Importamos morgan (middleware para pintar las peticiones HTTP que solicitan a nustra app)
import cors from 'cors'; // Importamos CORS (middleware que permite realizar peticiones desde servidores externos e impedir bloqueos por CORS)
import path from 'path'; // Importamos path (middleware que ayudará en la escritura de direcciones de directorios y archivos)
import mongoose from 'mongoose'; // Iimportamos moongose (paquete que nos ayuda a la creación de conexiones a bases de datos)


const app = express(); // Inicializamos express dentro de la constante app

/** Conexion a Base de datos */
// const uri = 'mongodb://localhost:27017/udemy'; Cadena de conexion a base de datos (local)


const uri = 'mongodb+srv://user_udemy:BV5cB1VbbiQokXtb@cluster0.knphn.mongodb.net/udemy?retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}; // Opciones de configuracion para la conexion
mongoose.connect(uri,options).then(
    () => { console.log("Connected to MongoDB"); },
    err => { err }
) //Funcion para realizar la conexion a base de datos, con respuesta correcta y error


/** Middlewares */
app.use(morgan('dev')); // Configuramos morgan (debe ir antes de las rutas)
app.use(cors()); // Configuramos cors
app.use(express.json()); // Configuración para que el servidor pueda leer archivos JSON
app.use(express.urlencoded({ extended: true })); // Para poder trabajar con solicitudes //application/x-www-form-urlencoded

/** Rutas */

// Configuramos la ruta raíz
// app.get('/', (req,res) => {
//     res.send('Hello world'); //Respuesta que dará el servidor cuando reciba peticion a la ruta raíz
// });
app.use('/api', require('./routes/Nota'));

/** Middleware para Vue js */
const history = require('connect-history-api-fallback'); // Middleware para Vue.js router modo history (debe ir debajo de las rutas)
app.use(history());
app.use(express.static(path.join(__dirname, 'public')))

/** Configuraciones del puerto */
app.set('port', process.env.PORT || 3000); // Establecemos el puerto de forma dinámica

// Configuramos el puerto donde se correrá el servidor
app.listen(app.get('port'), () => {
    console.log(`Server running on port: ${app.get('port')}`)
});