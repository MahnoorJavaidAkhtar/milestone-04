// Access form and display elements
var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
var generateResumeBtn = document.getElementById('generate-resume');
// Helper function to create editable sections
function makeEditable(element) {
    element.addEventListener('click', function () {
        var originalText = element.innerText;
        var input = document.createElement('textarea');
        input.value = originalText;
        input.className = 'edit-mode'; // Add styling for edit mode if needed
        element.replaceWith(input);
        input.focus();
        // Save the changes when clicking outside or pressing Enter
        input.addEventListener('blur', function () { return saveEdit(input, element); });
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            }
        });
    });
}
// Function to save edits
function saveEdit(input, originalElement) {
    originalElement.innerText = input.value;
    input.replaceWith(originalElement);
}
// Function to generate the resume based on form data
function generateResume() {
    // Collect form input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value.split(',');
    // Clear existing resume display
    resumeDisplay.innerHTML = '';
    // Create resume sections
    var nameElement = document.createElement('h2');
    nameElement.textContent = name;
    makeEditable(nameElement);
    var contactElement = document.createElement('p');
    contactElement.innerHTML = "<strong>Email:</strong> ".concat(email, " | <strong>Phone:</strong> ").concat(phone);
    makeEditable(contactElement);
    var educationElement = document.createElement('div');
    educationElement.innerHTML = "<h3>Education</h3><p>".concat(education, "</p>");
    makeEditable(educationElement);
    var experienceElement = document.createElement('div');
    experienceElement.innerHTML = "<h3>Work Experience</h3><p>".concat(experience, "</p>");
    makeEditable(experienceElement);
    var skillsElement = document.createElement('div');
    skillsElement.innerHTML = '<h3>Skills</h3>';
    var skillsList = document.createElement('ul');
    skills.forEach(function (skill) {
        var listItem = document.createElement('li');
        listItem.textContent = skill.trim();
        makeEditable(listItem);
        skillsList.appendChild(listItem);
    });
    skillsElement.appendChild(skillsList);
    // Append sections to resume display
    resumeDisplay.appendChild(nameElement);
    resumeDisplay.appendChild(contactElement);
    resumeDisplay.appendChild(educationElement);
    resumeDisplay.appendChild(experienceElement);
    resumeDisplay.appendChild(skillsElement);
}
// Event listener for the generate resume button
generateResumeBtn.addEventListener('click', generateResume);
