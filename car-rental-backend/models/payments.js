const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const Payment = {
    id: 0,
    reservationId: 0,
    amount: 0,
    paymentMethod: '',
    transactionId: '',
    date: '',

    add(data) {
        return pool.query('INSERT INTO payments SET ?', data);
    },
};

module.exports = Payment;
