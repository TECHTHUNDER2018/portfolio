require('dotenv').config();
const db = require('../config/db');

const initialSkills = [
    { name: "Java", category: "Backend", icon_class: "fab fa-java", level: 90 },
    { name: "Spring Boot", category: "Backend", icon_class: "fas fa-leaf", level: 85 },
    { name: "Microservices", category: "Backend", icon_class: "fas fa-network-wired", level: 80 },
    { name: "Hibernate", category: "Backend", icon_class: "fas fa-database", level: 75 },
    { name: "REST APIs", category: "Backend", icon_class: "fas fa-exchange-alt", level: 85 },
    { name: "MySQL", category: "Database", icon_class: "fas fa-database", level: 80 },
    { name: "MongoDB", category: "Database", icon_class: "fas fa-leaf", level: 75 },
    { name: "React", category: "Frontend", icon_class: "fab fa-react", level: 70 },
    { name: "Javascript", category: "Frontend", icon_class: "fab fa-js", level: 80 },
    { name: "HTML/CSS", category: "Frontend", icon_class: "fab fa-html5", level: 85 },
    { name: "Git", category: "Tools", icon_class: "fab fa-git-alt", level: 85 },
    { name: "Docker", category: "Tools", icon_class: "fab fa-docker", level: 70 }
];

async function seedSkills() {
    try {
        for (const skill of initialSkills) {
            const [rows] = await db.query('SELECT * FROM skills WHERE name = ?', [skill.name]);
            if (rows.length > 0) continue;

            await db.query(`
                INSERT INTO skills (name, category, icon_class, level)
                VALUES (?, ?, ?, ?)
            `, [skill.name, skill.category, skill.icon_class, skill.level]);
            console.log(`Inserted skill: ${skill.name}`);
        }
        console.log('Skills seeding complete.');
        // process.exit(0);
    } catch (error) {
        console.error('Error seeding skills:', error);
        throw error;
        // process.exit(1);
    }
}

if (require.main === module) {
    seedSkills().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = seedSkills;
