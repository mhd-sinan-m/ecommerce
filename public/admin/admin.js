
function showSection(sectionId) {
    // Hide all sections
    let sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
        section.classList.add('hidden');
    });

    // Show the selected section
    let activeSection = document.getElementById(sectionId);
    activeSection.classList.remove('hidden');
    return activeSection
}



function product(code, meth, data) {
    fetch(`product/${code}`, {
        method: meth, 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
    })
        .then(response => response.json())
        .then(data => alert(data.message)) 
        .catch(error => alert(`Error product : ${meth}`));
}
// document.getElementById('submit').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent the default form submission

//     const formData = new FormData(this);
    
//     fetch('/your-api-endpoint', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         // Handle the successful response, maybe update the UI
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });
