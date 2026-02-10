// AUDIO FILES
const hoverSound = new Audio('audio/hover.mp3');
const clickSound = new Audio('audio/click.mp3');
const staticSound = new Audio('audio/static.mp3');

document.addEventListener('DOMContentLoaded', function() {
    console.log("Map loaded!");
    
    // Get all elements
    const locations = document.querySelectorAll('.location');
    const defaultMsg = document.querySelector('.default-message');
    const allContent = document.querySelectorAll('.location-content');
    
    // FIRST: Show Cathedral by default (not the default message)
    showLocation('cathedral');
    
    // Set up location clicks
    locations.forEach(location => {
        location.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.3;
            hoverSound.play().catch(e => console.log("Audio error:", e));
        });
        
        location.addEventListener('click', function() {
            clickSound.currentTime = 0;
            clickSound.volume = 0.5;
            clickSound.play().catch(e => console.log("Audio error:", e));
            
            const locationId = this.id; // 'oasisBar', 'cathedral', etc
            console.log("Clicked:", locationId);
            showLocation(locationId);
        });
    });
    
    // Show selected location
    function showLocation(locationId) {
        console.log("Showing:", locationId);
        
        // Hide default message
        if (defaultMsg) defaultMsg.style.display = 'none';
        
        // Hide all content
        allContent.forEach(content => {
            content.style.display = 'none';
        });
        
        // Convert 'oasisBar' to 'oasisContent'
        let contentId = locationId;
        if (locationId === 'oasisBar') contentId = 'oasis';
        if (locationId === 'glitchRuins') contentId = 'glitch';
        
        contentId = contentId + 'Content';
        console.log("Looking for:", contentId);
        
        // Show selected content
        const selectedContent = document.getElementById(contentId);
        if (selectedContent) {
            selectedContent.style.display = 'block';
            console.log("Found and showing!");
        } else {
            console.log("ERROR: Could not find", contentId);
        }
        
        // Update tracker for Cathedral
        if (locationId === 'cathedral') {
            const tracker = document.querySelector('.tracker-info p:nth-child(2)');
            if (tracker) {
                tracker.innerHTML = `<strong>LAST SEEN:</strong> <span class='blink'>RIGHT NOW - IN CATHEDRAL</span>`;
            }
        }
    }
    
    // Test: Force show oasis bar for debugging
    // setTimeout(() => showLocation('oasisBar'), 1000);
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
        
        staticSound.currentTime = 0;
        staticSound.volume = 0.5;
        staticSound.play().catch(e => console.log("Audio error:", e));
    }
}

// ============ BARTENDER MINI-GAME ============ 
function serveCustomer(customer) {
    console.log("Serving:", customer);
    const dialogueBox = document.getElementById('dialogueBox');
    if (!dialogueBox) {
        console.error("ERROR: Could not find dialogueBox!");
        return;
    }
    
    let dialogue = '';
    
    if (customer === 'kevin') {
        dialogue = `
            <p><strong>KEVIN:</strong> "Just synth-whiskey. Neat. And keep 'em coming."</p>
            <p><em>After third drink:</em> "You ever look at someone and realize everythin' you believed was wrong? No? Lucky you."</p>
            <p class="whiskey-note">[He leaves a 50-credit tip and his M.I.B. badge on the counter]</p>
        `;
    } else if (customer === 'tracy') {
        dialogue = `
            <p><strong>TRACY:</strong> "Sparkling water, thanks. Can't risk shaky hands when I'm working on delicate systems."</p>
            <p><em>Leaning in, lowering her voice:</em> "His core... it's not like anything I've seen. It doesn't just process emotion. It generates it. Like a miniature star. Beautiful and terrifying."</p>
        `;
    } else if (customer === 'eli') {
        dialogue = `
            <p><strong>ELI:</strong> "Green tea. Calms the nerves for probability calculations."</p>
            <p><em>Checking his wrist device:</em> "Current probabilities: Kevin developing emotional attachment to target - 87%. Chance of him admitting it to himself - 3%. Chance of this ending well... 22%. But improving."</p>
        `;
    }
    
    dialogueBox.innerHTML = dialogue;
    dialogueBox.style.animation = 'fadeIn 0.5s';
    
    // Play a drink pouring sound
    clickSound.currentTime = 0;
    clickSound.volume = 0.3;
    clickSound.play();
}

// ============ SAFEHOUSE CODE ============
function checkCode() {
    const codeInput = document.getElementById('safehouseCode');
    const unlockedContent = document.getElementById('unlockedSafehouse');
    
    if (!codeInput || !unlockedContent) {
        console.error("Missing safehouse elements!");
        return;
    }
    
    // Correct code: 0420 (whiskey reference)
    if (codeInput.value === '0420' || codeInput.value === '1337') { // 1337 is backup/test code
        unlockedContent.innerHTML = `
            <div class="unlocked-data">
                <h4><i class="fas fa-folder-open"></i> SAFEHOUSE CONTENTS UNLOCKED:</h4>
                <div class="file">
                    <p><i class="fas fa-file-pdf"></i> <strong>Case File #447:</strong> "José Baden - Psychological Profile"</p>
                    <p><i class="fas fa-heart"></i> <strong>Annotation:</strong> "Subject exhibits genuine emotional development. Not mimicry."</p>
                    <hr>
                    <p><i class="fas fa-photo-video"></i> <strong>Personal Photos:</strong> Kevin's pre-war family (faces blurred by damage)</p>
                    <p><i class="fas fa-prescription-bottle"></i> <strong>Medication:</strong> Synth-opioid tabs (3 remaining) - "For the ghosts"</p>
                    <p><i class="fas fa-flask"></i> <strong>Personal:</strong> Half-empty bottle of "Old Smokey" synth-whiskey</p>
                    <hr>
                    <p><i class="fas fa-sticky-note"></i> <strong>Handwritten Note:</strong> "Don't trust Vance. The war numbers don't add up. S.R.S. was at U.A.C. labs BEFORE the Fracture. -Eli"</p>
                </div>
                <div class="audio-note">
                    <i class="fas fa-headphones"></i> Ambient safehouse sounds enabled...
                </div>
            </div>
        `;
        unlockedContent.style.display = 'block';
        unlockedContent.style.opacity = '0';
        unlockedContent.style.animation = 'fadeIn 1s forwards';
        
        // Add to comms log
        addCommsMessage("SYSTEM: Safehouse Alpha accessed. Welcome back, Captain Ayuso.");
        
        // Play success sound
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.5;
        hoverSound.play();
    } else {
        alert("ACCESS DENIED. Invalid code.");
        codeInput.value = '';
        codeInput.focus();
        
        // Play error sound
        staticSound.currentTime = 0;
        staticSound.volume = 0.7;
        staticSound.play();
    }
}

// ============ COMMS SYSTEM ============
function sendComms() {
    const input = document.getElementById('commsInput');
    const log = document.getElementById('commsLog');
    
    if (!input || !log) return;
    
    if (input.value.trim() !== '') {
        const time = new Date();
        const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
        
        const message = `<p><span class="time">${timeString}</span> <strong>USER:</strong> ${input.value}</p>`;
        log.innerHTML += message;
        input.value = '';
        
        log.scrollTop = log.scrollHeight;
        
        setTimeout(simulateResponse, 1000);
    }
}

function simulateResponse() {
    const log = document.getElementById('commsLog');
    if (!log) return;
    
    const responses = [
        "SYSTEM: Command not recognized in current context.",
        "ELI: Whiplash, is that you? Stop playing with the interface and focus on the mission.",
        "TRACY: If you're hacking this channel, please don't break anything. My bots are expensive.",
        "AESOP: ...unusual activity detected. Pattern suggests recreational use of official channels.",
        "S.R.S. INTERCEPT: This channel is being monitored. Cease unauthorized transmission.",
        "AUTOMATED: Please file form 447-B for interface feedback. Estimated response time: 6-8 weeks."
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
    if (!log) return;
    
    const time = new Date();
    const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    
    log.innerHTML += `<p><span class="time">${timeString}</span> ${text}</p>`;
    log.scrollTop = log.scrollHeight;
}

// Add CSS animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .hidden-data {
        display: none;
        margin-top: 15px;
        padding: 15px;
        background: rgba(255, 100, 0, 0.1);
        border-left: 3px solid #ff5500;
        border-radius: 3px;
        animation: fadeIn 0.5s;
    }
    
    .file {
        background: rgba(0, 30, 60, 0.7);
        padding: 20px;
        border-radius: 5px;
        margin: 20px 0;
        border: 1px solid #004477;
    }
    
    .file p {
        margin: 10px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #aaddff;
    }
    
    .file hr {
        border: none;
        height: 1px;
        background: #004477;
        margin: 15px 0;
    }
    
    .whiskey-note {
        color: #ffaa00;
        font-style: italic;
        margin-top: 10px;
    }
    
    .audio-note {
        color: #88ff88;
        text-align: center;
        margin-top: 15px;
        font-size: 0.9rem;
    }
    
    .unlocked-data {
        animation: fadeIn 1s;
    }
</style>
`);
