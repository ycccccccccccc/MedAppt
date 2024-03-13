import { Request, Response } from 'express';
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    signup: async (req: Request, res: Response) => {
        try {
            const phone = req.body.phone;
            const password = req.body.password;
            if (!(phone && password)) { return res.status(400).json({message: 'Incomplete user information'}) };

            const checkUserExistResult = await userModel.getUserfromPhone(phone);
            if(checkUserExistResult === false){
                return res.status(500).json({message: 'Check phone number exists error'});
            }
            else if(checkUserExistResult.rows.length !== 0){
                return res.status(403).json({message: 'Phone number already exists'});
            }

            const hashedPassword = bcrypt.hashSync(password, salt);
            const insertUserResult = await userModel.createUser(phone, hashedPassword);
            if(insertUserResult === false){ return res.status(500).json({message: 'Insert user error'}) }
            else{
                const token = jwt.sign(
                    {
                        id: insertUserResult.id,
                        phone: phone
                    },
                    process.env.SECRET,
                    { expiresIn: '1 day' }
                );
                return res.status(200).json({
                    message: 'Create user',
                    data: {
                        access_token: token,
                        user: {
                            id: insertUserResult.id,
                            phone: phone
                        }
                    },
                })                
            }
        } catch (err) {
            res.status(400).json({message: 'Sign up erorr.'});
        }
    },
    singin: async (req: Request, res: Response) => {
        try{
            const phone = req.body.phone;
            const password = req.body.password;
            if(!(phone && password)){ return res.status(400).json({ message: "Incomplete user's information!"})};
            
            const user_info = await userModel.getUserfromPhone(req.body.phone);
            if(user_info === false){ return res.status(500).json({ message: "Get user info error"})};
            if(user_info.rows.length === 0){ return res.status(403).json({ message: 'User do not exist'})};
            
            const check = await bcrypt.compare(password, user_info.rows[0].password);
            if (check) {
                const token = jwt.sign(
                    { 
                        id: user_info.rows[0].id,          
                        name: user_info.rows[0].name, 
                        phone: user_info.rows[0].phone
                    }, process.env.SECRET, { expiresIn: '1 day' });
        
                res.status(200).json({
                    message: "sign in success!",
                    data: {
                        access_token: token,
                        user:{
                            id: user_info.rows[0].id,
                            name: user_info.rows[0].name,
                            phone: user_info.rows[0].phone
                        }
                    }
                });
                }
            else{ return res.status(403).json({message: "Wrong password.",})}
                 
        } catch (err) {
            console.error(err)
            return res.status(400).json({ message: 'Sign in error.'});
        }
    }
}