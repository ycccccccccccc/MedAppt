import { Request, Response } from 'express';
const appointmentModel = require('../models/appointmentModel');
const patientModel = require('../models/patientModel');
const auth = require('../util/auth')

module.exports = {
    createAppointment: async (req: Request, res: Response) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const patient_id = parseInt(req.params.patient_id);

            const checkUserIdfromPatientId = await patientModel.getPatientById(patient_id);
            if(user_id !== checkUserIdfromPatientId[0].user_id){ return res.status(403).json({ message: "Insufficient permissions"})};

            const checkAppointmentAmount = await appointmentModel.countAppointments(user_id);
            let sum = 0;
            let reachLimit= false;
            for (const patient of checkAppointmentAmount) {
                if (parseInt(patient.appointment_count) >= 2 && patient_id === patient.patient_id) {
                    reachLimit = true;
                    break;
                }
                sum = sum + parseInt(patient.appointment_count);
            }
            if(reachLimit){return res.status(400).json({ message: "This patient has reached the maximum appointment time limit(2 periods)."})};
            if(sum >= 5){return res.status(400).json({ message: "This user has reached the maximum reservation time limit(5 periods)." })}

            const content = req.body.content;
            const datetime = req.body.datetime;
            if(!(content && datetime)){ return res.status(400).json({ message: "Incomplete patient data!"});}
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
            if (!dateTimeRegex.test(datetime)) { return res.status(400).json({ message: "Datetime format error" });}
            const datetimeFormat = new Date(datetime)
            if(datetimeFormat < new Date()){ return res.status(400).json({ message: "Cannot reserve time slots in the past" })}

            const startTime = new Date(datetimeFormat);
            startTime.setHours(startTime.getHours() - 1);
            const endTime = new Date(datetimeFormat);
            endTime.setHours(endTime.getHours() + 2);
            const checkIsBooked = await appointmentModel.checkIsBooked(startTime, endTime);
            if(checkIsBooked === false){ return res.status(500).json( {message: "Check booking time error"})};
            if(checkIsBooked.length !== 0){ return res.status(400).json({ message: "This time slot has been reserved"})};
            
            const appointmentId = await appointmentModel.createAppointment(user_id, patient_id, content, datetimeFormat);
            if(appointmentId === false){return res.status(400).json({ message: "Insert appointment error" })};
            if(!appointmentId.rows[0].id){return res.status(500).json({ message: 'Can not get patient ID'});}
            res.status(200).json({
                message: 'Create appointment',
                data: {
                    patient: {
                        id: appointmentId.rows[0].id
                    }
                },
            });
            
        } catch (err) {
            res.status(400).json({
                message: 'Create appointment error.'
            });
        }
    },
    getAppointments: async (req: Request, res: Response) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const appointmentsInfo = await appointmentModel.getAppointments(user_id);
            if(appointmentsInfo === false){ return res.status(500).json({ message: "Get appointments error"})};
            res.status(200).json({
                message: 'Get appointments',
                data: {
                    patients: appointmentsInfo
                },
            });

        } catch (err) {
            res.status(400).json({
                message: 'Get appointments erorr.'
            });
        }
    },
    deleteAppointment: async (req: Request, res: Response) => {
        try{
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const appointment_id = Number(req.params.appointment_id);

            const appointmentInfo = await appointmentModel.getAppointment(appointment_id);
            if(appointmentInfo === false){return res.status(500).json({ message: "Check appointment exist error." });}
            if(appointmentInfo.length === 0){return res.status(404).json({ message: 'Appointment not exist!'});}
            if(appointmentInfo[0].user_id !== user_id){return res.status(403).json({ message: 'You are not creator!'});}
            
            const result = await appointmentModel.deleteAppointment(appointment_id);
            if(result){
                return res.status(200).json({
                    message: 'Delete appointment',
                    data: {
                        tasks: {
                            id: appointment_id
                        }
                    },
                });
            }
            else{
                res.status(500).json({
                    message: 'Delete appointment erorr.'
                });
            }

        } catch(err){
            res.status(400).json({
                message: 'Delete appointment erorr.'
            });
        }
    }
}