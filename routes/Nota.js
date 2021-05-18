import express from 'express'; // Importamos el Router desde express
import Nota from '../models/Nota'; // Importamos el modelo
import { verifyAuth,verifyAdmin } from '../middlewares/Auth'

const router = express.Router();

// Creacion de la ruta tipo post para agregar
router.post('/new-note', verifyAuth ,async (req,res) =>{
    const noteBody = req.body;

    noteBody.userId = req.user._id

    try {
        const notaDb = await Nota.create(noteBody);
        res.status(200).json(notaDb);
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error
        });
    }
});

router.get('/notes', verifyAuth, async (req,res) => {
    const userId = req.user._id
    try {
        const result = await Nota.find({userId});
        res.json(result);
    } catch (error) {
        return res.status(404).json({
            message: "There's no notes yet",
            error
        });
    }
});

/** Rutas con parametros */
// Traer
router.get('/note/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const result = await Nota.findOne({_id});
        res.json(result);
    } catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error
        })
    }
});
// Eliminar
router.delete('/note/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const noteDb = await Nota.findByIdAndDelete({_id});

        if(!noteDb) {
            return res.status(400).json({
                message: `An error occurred`,
                error
            })
        }

        res.json(noteDb)
    } catch(error) {
        return res.status(400).json({
            message: "An error occurred",
            error
        });
    }
})
// Actualizar
router.put('/note/:id', async (req,res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        const noteDb = await Nota.findByIdAndUpdate(_id,body,{new: true});
        res.json(noteDb);
    } catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error
        });
    }
})

module.exports = router; // Exportamos el router

