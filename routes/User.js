import { Router as expressRouter } from "express";
import User from '../models/User';
import { verifyAuth,verifyAdmin } from '../middlewares/Auth'

// Password hash
import bcrypt from 'bcrypt'
const saltRounds = 10;

// Filter puts fields
const _ = require('underscore')

const router = expressRouter();

//POST
router.post('/addUser', async(req,res) => {
    const body = {
        nombre: req.body.nombre,
        email: req.body.email,
        rol: req.body.rol,

    };

    body.password = bcrypt.hashSync(req.body.password, saltRounds); //This line is for hash the password

    try {
        const userDb = await User.create(body);
        res.json(userDb);
    } catch(err) {
        return res.status(500).json({
            message: "An error ocurred",
            error: err
        })
    }
})

// PUT
router.put('/user/:id', [verifyAuth, verifyAdmin], async(req,res) => {
    
    const _id = req.params.id;
    const body = _.pick(req.body, ['nombre','email','password','activo']);

    if(body.password) {
        body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }

    try {

        const userDb = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});

        return res.json(userDb);
        
    } catch (error) {
        return res.status(400).json({
            message: 'An error ocurred',
            error
        })
    }
})

module.exports = router;