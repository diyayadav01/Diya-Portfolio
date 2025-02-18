const links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('section');

let activeLink = 0;

links.forEach((link, i) => {
    link.addEventListener('click', () => {
        if(activeLink != i){
            links[activeLink].classList.remove('active');
            link.classList.add('active');
            sections[activeLink].classList.remove('active');

            setTimeout(() => {
                activeLink = i;
                sections[i].classList.add('active');
            }, 1000);
        }
    })
})

const firebaseConfig = {
    apiKey: "AIzaSyAyYJierK8A6REwQOOCzHBRv7dquOgINnM",
    authDomain: "portfolio-tutorial-ee6e7.firebaseapp.com",
    projectId: "portfolio-tutorial-ee6e7",
    storageBucket: "portfolio-tutorial-ee6e7.firebasestorage.app",
    messagingSenderId: "845742522208",
    appId: "1:845742522208:web:9f85c5e6a84b6094e92805",
    measurementId: "G-7XSH8P7BBZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Ensure Firebase is loaded before initializing
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();  // ✅ Now `db` is properly defined

// Handle Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {  // Ensure the form exists
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('msg').value;

            if(!message || !email || !name) {
                alert("All the fields are mandatory to fill.");
                return;
            }

            // Store data in Firestore
            db.collection('contacts').add({
                name: name,
                email: email,
                message: message
            })
            .then(() => {
                console.log('Contact form submitted successfully!');
                alert('Contact form submitted successfully!');
            })
            .catch((error) => {
                console.error('Error submitting contact form:', error);
                alert('Error submitting contact form');
            });
        });
    } else {
        console.error("Contact form not found in the document.");
    }
});
