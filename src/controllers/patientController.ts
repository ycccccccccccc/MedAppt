import { Request, Response } from 'express';
const patientModel = require('../models/patientModel');
const auth = require('../util/auth')

module.exports = {
    createPatient: async (req: Request, res: Response) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const name = req.body.name;
            const identification = req.body.identification;
            const birthday = req.body.birthday;
            const address = req.body.address;
            if(!(user_id && name && identification && birthday && address)){ return res.status(400).json({ message: "Incomplete patient data!"});}

            const checkPatientExist = await patientModel.getPatientByIdentification(identification);
            if(checkPatientExist === false){return res.status(500).json({ message: "Check patient error"})};
            if(checkPatientExist.length !== 0){return res.status(400).json({ massage: "Identification exists"})}

            const patientID = await patientModel.createPatient(user_id, name, identification, birthday, address);
            if(patientID === false){return res.status(400).json({ message: "Insert patient error" })};
            if(!patientID.id){return res.status(500).json({ message: 'Can not get patient ID'});}
            res.status(200).json({
                message: 'Create patient',
                data: {
                    patient: {
                        id: patientID.id
                    }
                },
            });
            
        } catch (err) {
            res.status(400).json({
                message: 'Create patient error.'
            });
        }
    },
    getPatients: async (req: Request, res: Response) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;

            const patientsInfo = await patientModel.getPatients(user_id);
            if(patientsInfo === false){ return res.status(500).json({ message: "Get patients error"})};
            res.status(200).json({
                message: 'Get patients',
                data: {
                    patients: patientsInfo
                },
            });

        } catch (err) {
            res.status(400).json({
                message: 'Get patients erorr.'
            });
        }
    }
}