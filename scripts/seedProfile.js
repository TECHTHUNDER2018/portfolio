require('dotenv').config();
const db = require('../config/db');

const initialProfile = {
    bio: "I focus on building efficient, scalable backend systems with Java and crafting intuitive user interfaces. My passion lies in solving complex problems through clean code and modern architecture.",
    role: "Full Stack Developer",
    resume_url: "#",
    github_link: "https://github.com/TECHTHUNDER2018",
    linkedin_link: "#",
    twitter_link: "#",
    email: "contact@nishant.dev"
};

async function seedProfile() {
    try {
        const [rows] = await db.query('SELECT * FROM profile LIMIT 1');
        if (rows.length > 0) {
            console.log('Profile already exists. Skipping seed.');
            process.exit(0);
        }

        await db.query(`
            INSERT INTO profile (bio, role, resume_url, github_link, linkedin_link, twitter_link, email)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [initialProfile.bio, initialProfile.role, initialProfile.resume_url, initialProfile.github_link, initialProfile.linkedin_link, initialProfile.twitter_link, initialProfile.email]);

        console.log('Profile seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding profile:', error);
        process.exit(1);
    }
}

seedProfile();
