const db = require('../config/db');

exports.trackVisit = async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'] || 'Unknown';

        // Simple check to avoid counting same IP multiple times within a short period is out of scope for "simple" but could be added.
        // For now, we log every hit.

        await db.query('INSERT INTO visits (ip_address, user_agent) VALUES (?, ?)', [ip, userAgent]);
        res.status(200).json({ message: 'Visit tracked' });
    } catch (error) {
        console.error('Error tracking visit:', error);
        res.status(500).json({ message: 'Error tracking visit' });
    }
};

exports.getStats = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as total_visits FROM visits');
        const [uniqueRows] = await db.query('SELECT COUNT(DISTINCT ip_address) as unique_visitors FROM visits');

        res.json({
            total_visits: rows[0].total_visits,
            unique_visitors: uniqueRows[0].unique_visitors // Approximate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
