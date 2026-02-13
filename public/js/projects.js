const projects = [
    {
        title: "Car Rental System",
        description: "A comprehensive car rental platform featuring user authentication, vehicle management, and secure bookings. Built with a scalable Node.js backend and a lightweight Vanilla JS frontend.",
        image: "assets/images/car-rental.png", // You will need to add this image
        stack: ["Node.js", "Express", "MySQL2", "Vanilla JS", "HTML5", "CSS3"],
        github: "https://github.com/TECHTHUNDER2018/car-rental-system", // Update with specific repo if available
        live: "#"
    }
];

// If using ES6 modules in browser without build step, output to global scope or export
// For simplicity in this static setup, we'll attach to window or just let main.js read it if loaded sequentially
window.projectData = projects;
