require('dotenv').config();
const db = require('../config/db');

const initialProjects = [
    {
        title: "Car Rental System",
        description: "A comprehensive car rental platform featuring user authentication, vehicle management, and secure bookings. Built with a scalable Node.js backend and a lightweight Vanilla JS frontend.",
        image_url: "assets/images/car-rental.png",
        tech_stack: JSON.stringify(["Node.js", "Express", "MySQL2", "Vanilla JS", "HTML5", "CSS3"]),
        github_link: "https://github.com/TECHTHUNDER2018/car-rental-system",
        live_link: "#"
    }
];

async function seedProjects() {
    console.log('Using DB Host:', process.env.DB_HOST);
    try {
        for (const project of initialProjects) {
            // Check if exists
            const [rows] = await db.query('SELECT * FROM projects WHERE title = ?', [project.title]);
            if (rows.length > 0) {
                console.log(`Skipping: ${project.title} (Already exists)`);
                continue;
            }

            // Insert
            await db.query(`
                INSERT INTO projects (title, description, image_url, tech_stack, github_link, live_link)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [project.title, project.description, project.image_url, project.tech_stack, project.github_link, project.live_link]);

            console.log(`Inserted: ${project.title}`);
        }
        console.log('Project seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding projects:', error);
        process.exit(1);
    }
}

seedProjects();
