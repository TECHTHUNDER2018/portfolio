const bcrypt = require('bcryptjs');
const db = require('../config/db');

async function createAdmin() {
    const username = 'admin';
    const password = 'adminpassword123'; // Change this in production!

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length > 0) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        await db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);
        console.log(`Admin user created.\nUsername: ${username}\nPassword: ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
