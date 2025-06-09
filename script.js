document.getElementById('biodataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const gender = document.getElementById('gender').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const height = document.getElementById('height').value;
    const complexion = document.getElementById('complexion').value;
    const qualification = document.getElementById('qualification').value;
    const job = document.getElementById('job').value;
    const fatherName = document.getElementById('fatherName').value;
    const motherName = document.getElementById('motherName').value;
    const brothers = document.getElementById('brothers').value;
    const sisters = document.getElementById('sisters').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const requirements = document.getElementById('requirements').value;
    const notes = document.getElementById('notes').value;

    // Create WhatsApp message template
    const message = `
🌸 بسم الله الرحمن الرحيم 🌸

🌺🌺 Profile 🌺🌺
Gender: ${gender}
Name: ${name}
Age: ${age}
Marital Status: ${maritalStatus}
Height: ${height}
Complexion: ${complexion}
Qualification: ${qualification}
Work/Job: ${job}
Family Details:
- Father's Name: ${fatherName}
- Mother's Name: ${motherName}
- Brothers: ${brothers}
- Sisters: ${sisters}
Address: ${address}
Contact Number: ${contact}
Requirements: ${requirements}
${notes ? 'Other Notes: ' + notes : ''}
    `.trim();

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp with the message
    window.open(whatsappURL, '_blank');
});