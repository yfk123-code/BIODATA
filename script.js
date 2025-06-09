let generatedBioData = '';
let uploadedPhoto = null;

function showForm() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
}

function showWelcome() {
    document.getElementById('welcomeSection').style.display = 'block';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('previewSection').style.display = 'none';
}

function showPreview() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('previewSection').style.display = 'block';
}

// Photo Upload Functionality
document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhoto = e.target.result;
            displayUploadedPhoto(uploadedPhoto);
        };
        reader.readAsDataURL(file);
    }
});

function displayUploadedPhoto(photoData) {
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = `<img src="${photoData}" alt="Profile Photo" class="uploaded-photo">`;
    document.getElementById('removePhoto').style.display = 'inline-block';
}

function removePhoto() {
    uploadedPhoto = null;
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = `
        <div class="photo-placeholder">
            <span>📷</span>
            <p>Click to upload photo</p>
        </div>
    `;
    document.getElementById('removePhoto').style.display = 'none';
    document.getElementById('photoInput').value = '';
}

// Click on photo preview to upload
document.getElementById('photoPreview').addEventListener('click', function() {
    document.getElementById('photoInput').click();
});

// Form Submission
document.getElementById('biodataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value.trim();
    }
    
    // Validate required fields
    if (!data.name || !data.age || !data.gender || !data.maritalStatus || !data.contact) {
        alert('Please fill all required fields marked with *');
        return;
    }
    
    console.log('Form data:', data); // Debug log
    generateBioData(data);
});

function generateBioData(data) {
    const arabicBismillah = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم";
    
    let bioData = `${arabicBismillah}

🌸 PROFILE 🌸

`;

    // Add photo if uploaded
    if (uploadedPhoto) {
        bioData += `[PHOTO WILL BE DISPLAYED HERE]

`;
    }

    bioData += `Gender: ${data.gender}

• Name: ${data.name}
• Age: ${data.age} years
• Marital Status: ${data.maritalStatus}`;

    if (data.height) {
        bioData += `\n• Height: ${data.height}`;
    }
    
    if (data.complexion) {
        bioData += `\n• Complexion: ${data.complexion}`;
    }
    
    if (data.qualification) {
        bioData += `\n• Qualification: ${data.qualification}`;
    }
    
    if (data.work) {
        bioData += `\n• Work/Job: ${data.work}`;
    }

    if (data.fatherName || data.motherName || data.brothers || data.sisters) {
        bioData += `\n\n🏠 FAMILY DETAILS:`;
        
        if (data.fatherName) {
            bioData += `\n• Father's Name: ${data.fatherName}`;
        }
        
        if (data.motherName) {
            bioData += `\n• Mother's Name: ${data.motherName}`;
        }
        
        if (data.brothers) {
            bioData += `\n• Brothers: ${data.brothers}`;
        }
        
        if (data.sisters) {
            bioData += `\n• Sisters: ${data.sisters}`;
        }
    }

    if (data.address) {
        bioData += `\n\n📍 Address: ${data.address}`;
    }
    
    bioData += `\n\n📞 Contact: ${data.contact}`;
    
    if (data.requirement) {
        bioData += `\n\n💫 REQUIREMENTS:\n${data.requirement}`;
    }
    
    if (data.otherNotes) {
        bioData += `\n\n📝 OTHER NOTES:\n${data.otherNotes}`;
    }

    generatedBioData = bioData;
    displayPreview(bioData);
    showPreview();
}

function displayPreview(bioData) {
    const previewContent = document.getElementById('previewContent');
    
    // Create preview with photo if available
    let previewHTML = '';
    
    if (uploadedPhoto) {
        const photoSection = `<img src="${uploadedPhoto}" alt="Profile Photo" class="preview-photo">`;
        const bioDataWithPhoto = bioData.replace('[PHOTO WILL BE DISPLAYED HERE]', '');
        previewHTML = bioDataWithPhoto.split('\n\n🌸 PROFILE 🌸\n\n')[0] + 
                     '\n\n🌸 PROFILE 🌸\n\n' + photoSection + '\n\n' +
                     bioDataWithPhoto.split('\n\n🌸 PROFILE 🌸\n\n')[1];
    } else {
        previewHTML = bioData;
    }
    
    // Convert text to HTML for better display
    const htmlContent = previewHTML.split('\n').map(line => {
        if (line.trim() === '') return '<br>';
        if (line.includes('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم')) {
            return `<div style="font-size: 1.5em; font-weight: bold; margin: 10px 0; color: #27ae60;">${line}</div>`;
        }
        if (line.includes('🌸 PROFILE 🌸')) {
            return `<div style="font-size: 1.3em; font-weight: bold; margin: 15px 0; color: #3498db;">${line}</div>`;
        }
        if (line.includes('🏠 FAMILY DETAILS:') || line.includes('💫 REQUIREMENTS:') || line.includes('📝 OTHER NOTES:')) {
            return `<div style="font-weight: bold; margin: 15px 0 10px 0; color: #2c3e50;">${line}</div>`;
        }
        return `<div style="margin: 5px 0;">${line}</div>`;
    }).join('');
    
    if (uploadedPhoto) {
        const photoIndex = htmlContent.indexOf('PROFILE 🌸') + 'PROFILE 🌸</div>'.length;
        const beforePhoto = htmlContent.substring(0, photoIndex);
        const afterPhoto = htmlContent.substring(photoIndex);
        previewContent.innerHTML = beforePhoto + `<img src="${uploadedPhoto}" alt="Profile Photo" class="preview-photo">` + afterPhoto;
    } else {
        previewContent.innerHTML = htmlContent;
    }
}

function shareToWhatsApp() {
    let textToShare = generatedBioData;
    
    // Remove photo placeholder text for WhatsApp
    textToShare = textToShare.replace('[PHOTO WILL BE DISPLAYED HERE]\n\n', '');
    
    if (uploadedPhoto) {
        // Note: WhatsApp Web doesn't support direct image sharing via URL
        // User will need to manually attach the photo
        alert('📷 Note: Please manually attach the photo to your WhatsApp message after clicking OK.');
    }
    
    const encodedText = encodeURIComponent(textToShare);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
}