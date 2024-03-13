const { connection } = require('../util/db'); 
require('dotenv').config();

module.exports = {
    createUser: async (phone: String, password: String) => {
        try {
            const insertDataQuery = 'INSERT INTO users (phone, password) VALUES ($1, $2);';
            await connection.query(insertDataQuery, [phone, password]);
            
            const getUserId = `SELECT id FROM users WHERE phone = $1`;
            const result = await connection.query(getUserId, [phone]);
            return result.rows[0];
        } catch (err) {
            return false;
        }
    },
    
    getUserfromPhone: async (phone: String) => {
        const getUserInfo = `SELECT id, name, phone, password FROM users WHERE phone = $1`
        try {
            const result = await connection.query(getUserInfo, [phone]);
            return result;
        } catch (err) {
            return false;
        }
    }
}

