import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();
const saltRounds = 10;

router.post('/', async(req,res) => {
    const body = req.body;
    try {
        const userDb = await User.findOne({email: body.email})

        if(!userDb) {
            return res.status(400).json({
                message: 'Wrong email'
            })
        }

        if(!bcrypt.compareSync(body.password, userDb.password)) {
            return res.status(400).json({
                message: 'Wrong password'
            })
        }

        // Generate tokens
        const token = jwt.sign({
            data: userDb
        }, 'elattrifa', {expiresIn: 60 * 60 * 24 * 30 })

        res.json({
            userDb,
            token
        })

    } catch (err) {
        return res.status(400).json({
            message: "An error ocurred",
            error: err
        })
    }
})


module.exports = router;