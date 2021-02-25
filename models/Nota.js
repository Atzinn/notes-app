import mongoose from 'mongoose'; // Importamos moongoose
const schema = mongoose.Schema;

// Creamos un nuevo esquema y establecemos los tipos de datos que se necesitarán
const notaSchema = new schema({
    name: {
        type: String,
        required: [true, 'This required']
    },
    description: String,
    userId: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Nota = mongoose.model('Nota', notaSchema); // Creamos el Modelo
export default Nota // Exportamos el modelo


