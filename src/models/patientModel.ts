const { connection } = require('../util/db'); 
import { error } from "console";

module.exports = {
    createPatient: async (user_id: number, name: String, identification: String, birthday: String, address: String) => {
        try{
            const insertDataQuery = 'INSERT INTO patients (user_id, name, identification, birthday, address) VALUES ($1, $2, $3, $4, $5);';
            await connection.query(insertDataQuery, [user_id, name, identification, birthday, address]);

            const getPatientId = `SELECT id FROM patients WHERE identification = $1`;
            const result = await connection.query(getPatientId, [identification]);
            return result.rows[0];
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    getPatientByIdentification: async (identification: String) => {
        try {
            const selectDataQuery = 'SELECT id, user_id, name, identification, birthday, address FROM patients WHERE identification = $1';
            const result = await connection.query(selectDataQuery, [identification]);
            return result.rows;
        } catch (err) {
            console.error('Get patient from identification error', err);
            return false;
        }
    },
    getPatientById: async (id: number) => {
        try {
            const selectDataQuery = 'SELECT id, user_id, name, identification, birthday, address FROM patients WHERE id = $1';
            const result = await connection.query(selectDataQuery, [id]);
            return result.rows;
        } catch (err) {
            console.error('Get patient from identification error', err);
            return false;
        }
    },
    getPatients: async (user_id: number) => {
        try {
            const selectDataQuery = 'SELECT id, user_id, name, identification, birthday, address FROM patients WHERE user_id = $1';
            const result = await connection.query(selectDataQuery, [user_id]);
            return result.rows;
        } catch (err) {
            console.error('Get patients from user id error', err);
            return false;
        }
    }  
}