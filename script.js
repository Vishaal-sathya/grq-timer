const digitPatterns = {
    0: [
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1
    ],
    1: [
        0,0,1,0,0,
        0,1,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
        0,1,1,1,0
    ],
    2: [
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1,
        1,0,0,0,0,
        1,0,0,0,0,
        1,1,1,1,1
    ],
    3: [
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1
    ],
    4: [
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        0,0,0,0,1
    ],
    5: [
        1,1,1,1,1,
        1,0,0,0,0,
        1,0,0,0,0,
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1
    ],
    6: [
        1,1,1,1,1,
        1,0,0,0,0,
        1,0,0,0,0,
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1
    ],
    7: [
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,1,0,
        0,0,1,0,0,
        0,1,0,0,0,
        0,1,0,0,0,
        0,1,0,0,0
    ],
    8: [
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1
    ],
    9: [
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1,
        0,0,0,0,1,
        0,0,0,0,1,
        1,1,1,1,1
    ]
};

function createBinaryDigit() {
    const digit = document.createElement('div');
    digit.className = 'binary-digit';
    
    // Create 5x7 grid of pixels
    for (let i = 0; i < 35; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'binary-pixel';
        pixel.style.left = `${(i % 5) * 12}px`;
        pixel.style.top = `${Math.floor(i / 5) * 12}px`;
        digit.appendChild(pixel);
    }
    
    return digit;
}

function updateDigit(digitElement, number) {
    const pattern = digitPatterns[number];
    const pixels = digitElement.getElementsByClassName('binary-pixel');
    
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].className = 'binary-pixel' + (pattern[i] ? ' active' : '');
    }
}

function createTimeSection(value, label) {
    const section = document.createElement('div');
    section.className = 'time-section';
    
    const digitsContainer = document.createElement('div');
    digitsContainer.className = 'time-digits';
    
    const valueStr = value.toString().padStart(2, '0');
    for (let i = 0; i < 2; i++) {
        const digit = createBinaryDigit();
        digitsContainer.appendChild(digit);
        updateDigit(digit, parseInt(valueStr[i]));
    }
    
    const labelElement = document.createElement('div');
    labelElement.className = 'time-label';
    labelElement.textContent = label;
    
    section.appendChild(digitsContainer);
    section.appendChild(labelElement);
    
    return section;
}

function updateTimer(days, hours, minutes, seconds) {
    const countdown = document.getElementById('countdown');
    countdown.innerHTML = '';
    
    countdown.appendChild(createTimeSection(days, 'Days'));
    countdown.appendChild(createTimeSection(hours, 'Hours'));
    countdown.appendChild(createTimeSection(minutes, 'Minutes'));
    countdown.appendChild(createTimeSection(seconds, 'Seconds'));
}

function startCountdown() {
    let days = 6;
    let hours = 23;
    let minutes = 59;
    let seconds = 59;
    
    updateTimer(days, hours, minutes, seconds);
    
    setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            if (minutes > 0) {
                minutes--;
            } else {
                minutes = 59;
                if (hours > 0) {
                    hours--;
                } else {
                    hours = 23;
                    if (days > 0) {
                        days--;
                    }
                }
            }
        }
        updateTimer(days, hours, minutes, seconds);
    }, 1000); // Update every second
}

// Original typing effect
const text = "Opensource Innovation.";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing").textContent += text[index];
        index++;
        setTimeout(typeEffect, 50);
    } else {
        document.getElementById("typing").style.borderRight = "none";
        setTimeout(() => {
            document.getElementById("shutter").style.height = "100%";
            setTimeout(() => {
                let scrollingText = document.getElementById("scrolling-text-container");
                scrollingText.style.display = "block";
            
                let timerContainer = document.getElementById("timer-container");
                timerContainer.style.display = "block";
                
                startCountdown();
            
                // Show the register button after countdown starts
                let registerButton = document.querySelector(".register-button");
                registerButton.style.display = "flex";
                registerButton.style.opacity = "0"; // Start hidden, then fade in
            
                setTimeout(() => {
                    registerButton.style.opacity = "1"; // Fade in effect
                }, 500);
            
            }, 1500);
            
        }, 1000);
    }
}

typeEffect();