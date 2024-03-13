const { connection } = require('../util/db'); 
import { error } from "console";

module.exports = {
    createAppointment: async (user_id: number, patient_id: number, content: String, datetime: Date) => {
        try{
            const insertDataQuery = 'INSERT INTO appointments (user_id, patient_id, content, datetime) VALUES ($1, $2, $3, $4) RETURNING id';
            const result = await connection.query(insertDataQuery, [user_id, patient_id, content, datetime]);
            return result;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    getAppointment: async (appointment_id: number) => {
        try {
            const selectDataQuery = `
            SELECT 
                id, 
                user_id, 
                patient_id, 
                content, 
                TO_CHAR(datetime, 'YYYY-MM-DD HH24:MI:SS') AS datetime, 
                TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at 
            FROM appointments 
            WHERE id = $1

            `;
            const result = await connection.query(selectDataQuery, [appointment_id]);
            return result.rows;
        } catch (err) {
            console.error('Get appointment from appointment id error', err);
            return false;
        }
    },
    getAppointments: async (user_id: number) => {
        try {
            const selectDataQuery = `
            SELECT 
                id, 
                user_id, 
                patient_id, 
                content, 
                TO_CHAR(datetime, 'YYYY-MM-DD HH24:MI:SS') AS datetime, 
                TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at 
            FROM appointments 
            WHERE user_id = $1
            `;
            const result = await connection.query(selectDataQuery, [user_id]);
            return result.rows;
        } catch (err) {
            console.error('Get appointments from user id error', err);
            return false;
        }
    },
    countAppointments: async (user_id: number) => {
        try {
            const selectDataQuery = `
                SELECT 
                    patient_id, 
                    COUNT(*) AS appointment_count
                FROM appointments
                WHERE user_id = $1 AND datetime > CURRENT_DATE
                GROUP BY patient_id
            `;
            const result = await connection.query(selectDataQuery, [user_id]);
            return result.rows;
        } catch (err) {
            console.error('Get appointments count from user id error', err);
            return false;
        }
    },
    checkIsBooked: async (startTime: Date, endTime: Date) => {
        try {
            const selectDataQuery = 'SELECT id FROM appointments WHERE datetime > $1 AND datetime < $2;';
            const result = await connection.query(selectDataQuery, [startTime, endTime]);
            return result.rows;
        } catch (err) {
            console.error('Check booking time error', err);
            return false;
        }
    },
    deleteAppointment: async (id: number) => {
        try {
            const deleteDataQuery = 'DELETE FROM appointments WHERE id = $1';
            const result = await connection.query(deleteDataQuery, [id]);
            return result;
        } catch (err) {
            console.error('Check booking time error', err);
            return false;
        }
    }
}