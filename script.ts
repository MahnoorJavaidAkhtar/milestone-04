// Access form and display elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLElement;
const generateResumeBtn = document.getElementById('generate-resume') as HTMLButtonElement;

// Helper function to create editable sections
function makeEditable(element: HTMLElement) {
    element.addEventListener('click', () => {
        const originalText = element.innerText;
        const input = document.createElement('textarea');
        input.value = originalText;
        input.className = 'edit-mode'; // Add styling for edit mode if needed
        element.replaceWith(input);
        input.focus();

        // Save the changes when clicking outside or pressing Enter
        input.addEventListener('blur', () => saveEdit(input, element));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            }
        });
    });
}

// Function to save edits
function saveEdit(input: HTMLTextAreaElement, originalElement: HTMLElement) {
    originalElement.innerText = input.value;
    input.replaceWith(originalElement);
}

// Function to generate the resume based on form data
function generateResume() {
    // Collect form input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.split(',');

    // Clear existing resume display
    resumeDisplay.innerHTML = '';

    // Create resume sections
    const nameElement = document.createElement('h2');
    nameElement.textContent = name;
    makeEditable(nameElement);

    const contactElement = document.createElement('p');
    contactElement.innerHTML = `<strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}`;
    makeEditable(contactElement);

    const educationElement = document.createElement('div');
    educationElement.innerHTML = `<h3>Education</h3><p>${education}</p>`;
    makeEditable(educationElement);

    const experienceElement = document.createElement('div');
    experienceElement.innerHTML = `<h3>Work Experience</h3><p>${experience}</p>`;
    makeEditable(experienceElement);

    const skillsElement = document.createElement('div');
    skillsElement.innerHTML = '<h3>Skills</h3>';
    const skillsList = document.createElement('ul');
    skills.forEach(skill => {
        const listItem = document.createElement('li');
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
