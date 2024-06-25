import UserModel from '../Models/UserModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if(!user){
            return res.status(404).json({
                message: 'User not found!'
            })
        }

        const isAvailable = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isAvailable){
            return res.status(403).json({
                message: 'Invalid login or password!'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'user-secret-code', {
            expiresIn: '1h'
        });

        const {passwordHash, ...userData} = user._doc
        
        res.status(200).json({
            ...userData, 
            token
        })

    } catch (error) {
        res.status(500).json({
            success: 'Server error'
        })
    }
}