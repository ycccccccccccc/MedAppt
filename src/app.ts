const express = require('express');
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response<any, Record<string, any>>) => {
    res.send('Hello, Node.js!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const userController = require('./controllers/userController');
app.post('/user/signup', userController.signup);
app.post('/user/signin', userController.singin);

const patientController = require('./controllers/patientController');
app.post('/patient', patientController.createPatient);
app.get('/patients', patientController.getPatients);

const appointmentController = require('./controllers/appointmentController')
app.post('/appointment/:patient_id', appointmentController.createAppointment);
app.get('/appointments', appointmentController.getAppointments);
app.delete('/appointment/:appointment_id', appointmentController.deleteAppointment);