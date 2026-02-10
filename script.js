// AUDIO FILES - YOU NEED TO CREATE THESE OR FIND FREE ONES
// 1. hover.mp3 - short subtle tech sound
// 2. click.mp3 - interface click
// 3. static.mp3 - radio static
// 4. cathedral_echo.mp3 - ambient sound

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    const locations = document.querySelectorAll('.location');
    const defaultMsg = document.querySelector('.default-message');
    const allContent = document.querySelectorAll('.location-content');
    
    // Click sounds
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    const staticSound = document.getElementById('staticSound');
    
    // Set up location clicks
    locations.forEach(location => {
        location.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => console.log("Audio autoplay prevented"));
        });
        
        location.addEventListener('click', function() {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log("Audio autoplay prevented"));
            
            const locationId = this.id;
            showLocation(locationId);
        });
    });
    
    // Show selected location
    function showLocation(locationId) {
        // Hide all content and default message
        defaultMsg.style.display = 'none';
        allContent.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected content
        const contentId = locationId + 'Content';
        const selectedContent = document.getElementById(contentId);
        if (selectedContent) {
            selectedContent.style.display = 'block';
        }
        
        // Update tracker for Cathedral
        if (locationId === 'cathedral') {
            document.querySelector('.tracker-info p:nth-child(2)').innerHTML = 
                "<strong>LAST SEEN:</strong> <span class='blink'>RIGHT NOW - IN CATHEDRAL</span>";
        }
    }
    
    // Initialize with Cathedral selected
    showLocation('cathedral');
});

// DECRYPT FRAGMENT
function decryptFragment(location) {
    const hiddenData = document.getElementById(location + 'Hidden');
    const button = document.querySelector(`[onclick="decryptFragment('${location}')"]`);
    
    if (hiddenData.style.display === 'block') {
        hiddenData.style.display = 'none';
        button.innerHTML = '<i class="fas fa-unlock"></i> DECRYPT ADDITIONAL DATA';
    } else {
        hiddenData.style.display = 'block';
        button.innerHTML = '<i class="fas fa-lock"></i> ENCRYPT DATA';
        
        // Play static sound
        const staticSound = document.getElementById('staticSound');
        staticSound.currentTime = 0;
        staticSound.play().catch(e => console.log("Audio autoplay prevented"));
    }
}

// BARTENDER SIMULATION
function serveCustomer(customer) {
    const dialogueBox = document.getElementById('dialogueBox');
    let dialogue = '';
    
    switch(customer) {
        case 'kevin':
            dialogue = `
                <p><strong>KEVIN:</strong> "Just synth-whiskey. Neat. And keep 'em coming."</p>
                <p><em>After third drink:</em> "You ever look at someone and realize everythin' you believed was wrong? No? Lucky you."</p>
            `;
            break;
        case 'tracy':
            dialogue = `
                <p><strong>TRACY:</strong> "Sparkling water, thanks. Can't risk shaky hands."</p>
                <p><em>Leaning in:</em> "His core... it's not like anything I've seen. It doesn't just process emotion. It generates it. Like a star."</p>
            `;
            break;
        case 'eli':
            dialogue = `
                <p><strong>ELI:</strong> "Green tea. Calms the nerves for probability calculations."</p>
                <p><em>Checking his device:</em> "Chance of Kevin developing emotional attachment to target: 87%. Chance of him admitting it: 3%."</p>
            `;
            break;
    }
    
    dialogueBox.innerHTML = dialogue;
}

// SAFEHOUSE CODE
function checkCode() {
    const codeInput = document.getElementById('safehouseCode');
    const unlockedContent = document.getElementById('unlockedSafehouse');
    
    // Correct code from story: 0420 (Kevin's favorite drink reference)
    if (codeInput.value === '0420') {
        unlockedContent.innerHTML = `
            <h4><i class="fas fa-folder-open"></i> SAFEHOUSE CONTENTS:</h4>
            <div class="file">
                <p><i class="fas fa-file-pdf"></i> <strong>Case File #447:</strong> José Baden Psychological Profile</p>
                <p><i class="fas fa-photo-video"></i> <strong>Photos:</strong> Kevin's pre-war family (blurred)</p>
                <p><i class="fas fa-prescription-bottle"></i> <strong>Medication:</strong> Synth-opioid tabs (3 remaining)</p>
                <p><i class="fas fa-flask"></i> <strong>Personal:</strong> Half-empty bottle of "Old Smokey" synth-whiskey</p>
                <p><i class="fas fa-sticky-note"></i> <strong>Note:</strong> "Don't trust Vance. The numbers don't add up. -Eli"</p>
            </div>
            <audio controls autoplay loop>
                <source src="audio/safehouse_ambient.mp3" type="audio/mpeg">
            </audio>
        `;
        unlockedContent.style.display = 'block';
        unlockedContent.style.animation = 'fadeIn 1s';
        
        // Add to comms log
        addCommsMessage("SYSTEM: Safehouse accessed. Welcome back, Captain.");
    } else {
        alert("ACCESS DENIED. Code incorrect.");
        codeInput.value = '';
        codeInput.focus();
    }
}

// COMMS SYSTEM
function sendComms() {
    const input = document.getElementById('commsInput');
    const log = document.getElementById('commsLog');
    
    if (input.value.trim() !== '') {
        const time = new Date();
        const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
        
        const message = `<p><span class="time">${timeString}</span> <strong>USER:</strong> ${input.value}</p>`;
        log.innerHTML += message;
        input.value = '';
        
        // Auto-scroll to bottom
        log.scrollTop = log.scrollHeight;
        
        // Simulate response
        setTimeout(simulateResponse, 1000);
    }
}

function simulateResponse() {
    const log = document.getElementById('commsLog');
    const responses = [
        "SYSTEM: Command not recognized in current context.",
        "ELI: Whiplash, is that you? Stop playing with the interface.",
        "TRACY: If you're hacking this, please don't break anything.",
        "AESOP: ...unusual activity detected.",
        "S.R.S. INTERCEPT: This channel is being monitored. Cease transmission."
    ];
    
    const time = new Date();
    const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const sender = randomResponse.split(':')[0];
    const message = randomResponse.split(':').slice(1).join(':');
    
    log.innerHTML += `<p><span class="time">${timeString}</span> <strong>${sender}:</strong> ${message}</p>`;
    log.scrollTop = log.scrollHeight;
}

function addCommsMessage(text) {
    const log = document.getElementById('commsLog');
    const time = new Date();
    const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    
    log.innerHTML += `<p><span class="time">${timeString}</span> ${text}</p>`;
    log.scrollTop = log.scrollHeight;
}

// Add some CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .hidden-data {
        display: none;
        margin-top: 15px;
        padding: 10px;
        background: rgba(255, 100, 0, 0.1);
        border-left: 3px solid #ff5500;
        animation: fadeIn 0.5s;
    }
    
    .file {
        background: rgba(0, 30, 60, 0.5);
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
    }
    
    .file p {
        margin: 8px 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);
