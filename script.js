// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...'); // Debug log
    
    // Set current date
    updateCurrentDate();
    
    // Add event listeners
    setupEventListeners();
    
    // Update preview on form changes
    updatePreview();
    
    // Mobile optimizations
    setupMobileOptimizations();
    
    console.log('App initialization complete'); // Debug log
});

// Mobile optimizations
function setupMobileOptimizations() {
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            }
        });
        
        input.addEventListener('blur', function() {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            }
        });
    });
    
    // Add touch-friendly button styles
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.minHeight = '48px'; // iOS recommended touch target
        button.style.minWidth = '48px';
        
        // Add haptic feedback for supported devices
        button.addEventListener('touchstart', function() {
            if (navigator.vibrate) {
                navigator.vibrate(10); // Short vibration
            }
        });
    });
    
    // Optimize for mobile viewport
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-view');
        
        // Reduce animation complexity on mobile
        const animatedElements = document.querySelectorAll('.result-number, .icon');
        animatedElements.forEach(el => {
            el.style.animationDuration = '2s'; // Slower animations for better performance
        });
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layout after orientation change
            const previewElement = document.getElementById('resultPreview');
            if (previewElement) {
                previewElement.style.height = 'auto';
            }
        }, 100);
    });
    
    // Optimize scroll performance
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    // Prevent context menu on long press
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Add mobile-specific keyboard handling
    const numberInput = document.getElementById('number');
    if (numberInput) {
        numberInput.addEventListener('input', function() {
            // Ensure numeric input
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 3) {
                this.value = this.value.slice(0, 3);
            }
            
            // Validate range 1-100
            const num = parseInt(this.value);
            if (this.value && (num < 1 || num > 100)) {
                this.setCustomValidity('Please enter a number between 1 and 100');
            } else {
                this.setCustomValidity('');
            }
        });
        
        // Show numeric keypad on mobile
        numberInput.setAttribute('inputmode', 'numeric');
        numberInput.setAttribute('pattern', '[0-9]*');
    }
}

// Update current date display
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const dayElement = document.getElementById('currentDay');
    const now = new Date();
    
    // Date format
    const dateOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    
    // Day format
    const dayOptions = { 
        weekday: 'long'
    };
    
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    if (dayElement) {
        dayElement.textContent = now.toLocaleDateString('en-US', dayOptions);
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...'); // Debug log
    
    // Form input listeners for real-time preview
    const numberInput = document.getElementById('number');
    const khelSelect = document.getElementById('khelType');
    const customGameInput = document.getElementById('customGame');
    
    console.log('Number input found:', !!numberInput); // Debug log
    console.log('Khel select found:', !!khelSelect); // Debug log
    console.log('Custom game input found:', !!customGameInput); // Debug log
    
    
    // Automatic updates on input change
    if (numberInput) {
        numberInput.addEventListener('input', function() {
            console.log('Number input changed:', this.value); // Debug log
            updatePreview();
        });
    }
    
    if (khelSelect) {
        khelSelect.addEventListener('change', function() {
            console.log('Khel select changed:', this.value); // Debug log
            updatePreview();
        });
    }
    
    if (customGameInput) {
        customGameInput.addEventListener('input', function() {
            console.log('Custom game input changed:', this.value); // Debug log
            updatePreview();
        });
    }
    
}

// Update preview based on form inputs
function updatePreview() {
    console.log('updatePreview called'); // Debug log
    
    const number = document.getElementById('number').value;
    const khelType = document.getElementById('khelType').value;
    
    console.log('Number:', number, 'KhelType:', khelType); // Debug log
    
    // Update preview elements
    const numberText = number ? formatTwoDigitNumber(number) : '--';
    
    // Update all preview elements safely
    const previewNumber = document.getElementById('previewNumber');
    const previewKhel = document.getElementById('previewKhel');
    const previewKhelHindi = document.getElementById('previewKhelHindi');
    const previewResultDate = document.getElementById('previewResultDate');
    const currentDate = document.getElementById('currentDate');
    const currentDay = document.getElementById('currentDay');
    const resultPreview = document.getElementById('resultPreview');
    
    console.log('Elements found:', {
        previewNumber: !!previewNumber,
        previewKhel: !!previewKhel,
        previewKhelHindi: !!previewKhelHindi
    }); // Debug log
    
    // Apply khel-specific color scheme and image
    if (resultPreview) {
        // Remove all existing khel classes
        resultPreview.classList.remove('khel-s', 'khel-m', 'khel-e', 'khel-f', 'khel-h', 'khel-n', 'khel-t', 'khel-g', 'khel-l', 'khel-k');
        
        // Add the appropriate khel class based on selected type
        if (khelType) {
            resultPreview.classList.add(`khel-${khelType.toLowerCase()}`);
            console.log('Applied khel class:', `khel-${khelType.toLowerCase()}`);
        }
    }
    
    // Switch images based on khel type
    const mainImage = document.getElementById('mainImage');
    const shriImage1 = document.getElementById('shriImage1');
    const shriImage2 = document.getElementById('shriImage2');
    const shriImage3 = document.getElementById('shriImage3');
    const shriImage4 = document.getElementById('shriImage4');
    const shriImage8 = document.getElementById('shriImage8');
    const gaziabadImage = document.getElementById('gaziabadImage');
    const kingImage = document.getElementById('kingImage');
    const galiImage = document.getElementById('galiImage');
    const newGaliImage = document.getElementById('newGaliImage');
    const faridabadMoonImage = document.getElementById('faridabadMoonImage');
    const delhiBazarImage = document.getElementById('delhiBazarImage');
    const muslimSymbol = document.getElementById('muslimSymbol');
    
    if (mainImage && shriImage1 && shriImage2 && shriImage3 && shriImage4 && shriImage8 && gaziabadImage && kingImage && galiImage && newGaliImage && faridabadMoonImage && delhiBazarImage && muslimSymbol) {
        // Hide all images first
        mainImage.style.display = 'none';
        shriImage1.style.display = 'none';
        shriImage2.style.display = 'none';
        shriImage3.style.display = 'none';
        shriImage4.style.display = 'none';
        shriImage8.style.display = 'none';
        gaziabadImage.style.display = 'none';
        kingImage.style.display = 'none';
        galiImage.style.display = 'none';
        newGaliImage.style.display = 'none';
        faridabadMoonImage.style.display = 'none';
        delhiBazarImage.style.display = 'none';
        muslimSymbol.style.display = 'none';
        
        // Show appropriate image based on khel type
        if (khelType === 'S') {
            // Show random Shri Ganesh image for S khel
            const randomShriId = getRandomShriImage();
            document.getElementById(randomShriId).style.display = 'block';
            console.log('Switched to random Shri Ganesh image:', randomShriId);
        } else if (khelType === 'F') {
            // Show Faridabad Moon image for F (Faridabad) khel
            faridabadMoonImage.style.display = 'block';
            console.log('Switched to Faridabad Moon image');
        } else if (khelType === 'H') {
            // Show Delhi Bazar image for H (Delhi Bazar) khel
            delhiBazarImage.style.display = 'block';
            console.log('Switched to Delhi Bazar image');
        } else if (khelType === 'G') {
            // Show Gaziabad image for G khel
            gaziabadImage.style.display = 'block';
            console.log('Switched to Gaziabad image');
        } else if (khelType === 'M') {
            // Show King image for M (Deshawer) khel
            kingImage.style.display = 'block';
            console.log('Switched to King image');
        } else if (khelType === 'E') {
            // Show Gali image for E (Gali) khel
            galiImage.style.display = 'block';
            console.log('Switched to Gali image');
        } else if (khelType === 'N') {
            // Show New Gali image for N (New Gali) khel
            newGaliImage.style.display = 'block';
            console.log('Switched to New Gali image');
        } else {
            // Show default Ganesh image for all other khels
            mainImage.style.display = 'block';
            console.log('Switched to Ganesh image');
        }
    }
    
    if (previewNumber) {
        previewNumber.textContent = numberText;
        console.log('Updated previewNumber to:', numberText);
    }
    if (previewKhel) {
        const customGame = document.getElementById('customGame').value;
        let khelName = getKhelTypeName(khelType) || '--';
        
        // Use custom game name if provided, otherwise use default khel name
        if (customGame && customGame.trim() !== '') {
            khelName = customGame.trim();
        }
        
        previewKhel.textContent = khelName;
        console.log('Updated previewKhel to:', khelName);
    }
    if (previewKhelHindi) {
        const customGame = document.getElementById('customGame').value;
        let khelHindi = '--';
        
        // If custom game is provided, use it for both English and Hindi
        if (customGame && customGame.trim() !== '') {
            khelHindi = customGame.trim();
        } else {
            // Use predefined Hindi translation for selected khel
            khelHindi = getKhelTypeNameHindi(khelType) || '--';
        }
        
        previewKhelHindi.textContent = khelHindi;
        console.log('Updated previewKhelHindi to:', khelHindi);
    }
    
    // Update result date with day
    const now = new Date();
    const currentDateStr = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
    const currentDayStr = now.toLocaleDateString('en-US', { 
        weekday: 'long'
    });
    
    if (previewResultDate) previewResultDate.textContent = `${currentDayStr}, ${currentDateStr}`;
    if (currentDate) currentDate.textContent = currentDateStr;
    if (currentDay) currentDay.textContent = currentDayStr;
}

// Get full khel type name
function getKhelTypeName(khelType) {
    const khelTypes = {
        'S': 'SHRI GANESH',
        'M': 'DESHAWER',
        'E': 'GALI',
        'F': 'FARIDABAD',
        'H': 'DELHI BAZAR',
        'N': 'NEWGALI',
        'T': 'TAJ',
        'G': 'GAZIABAD',
        'L': 'PUNJAB DAY',
        'K': 'KASHIPUR'
    };
    return khelTypes[khelType] || '';
}

// Get Hindi khel type name
function getKhelTypeNameHindi(khelType) {
    const khelTypesHindi = {
        'S': 'श्री गणेश',
        'M': 'देशावर',
        'E': 'गली',
        'F': 'फरीदाबाद',
        'H': 'दिल्ली बाजार',
        'N': 'नई गली',
        'T': 'ताज',
        'G': 'गाजियाबाद',
        'L': 'पंजाब दिवस',
        'K': 'काशीपुर'
    };
    return khelTypesHindi[khelType] || '';
}

// Get random Shri Ganesh image path for PNG generation
function getRandomShriImagePath() {
    const shriImagePaths = ['img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg', 'img8.jpeg'];
    const randomIndex = Math.floor(Math.random() * shriImagePaths.length);
    return shriImagePaths[randomIndex];
}

// Get random Shri Ganesh image
function getRandomShriImage() {
    const shriImages = ['shriImage1', 'shriImage2', 'shriImage3', 'shriImage4', 'shriImage8'];
    const randomIndex = Math.floor(Math.random() * shriImages.length);
    return shriImages[randomIndex];
}

// Get primary color for khel type
function getKhelPrimaryColor(khelType) {
    const khelColors = {
        'S': '#ff6b35', // Orange
        'M': '#3498db', // Blue
        'E': '#27ae60', // Green
        'F': '#27ae60', // Green (Faridabad)
        'H': '#e74c3c', // Red
        'N': '#16a085', // Teal
        'T': '#f39c12', // Gold
        'G': '#6c5ce7', // Indigo
        'L': '#e84393', // Pink
        'K': '#8b4513'  // Brown
    };
    return khelColors[khelType] || '#ff6b35'; // Default to orange
}


// Generate PNG
async function generatePNG() {
    const form = document.getElementById('resultForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const button = document.getElementById('generatePng');
    const originalText = button.textContent;
    
    try {
        button.textContent = 'Generating PNG...';
        button.classList.add('loading');
        button.disabled = true;
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 1400;
        canvas.height = 1000;
        
        // Fill background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add border
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
        
        // Load and add logo
        const logoImg = await loadImage('Corner_ganesh_logo.png');
        if (logoImg) {
            ctx.drawImage(logoImg, 40, 40, 150, 150);
        } else {
            // Fallback placeholder
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(40, 40, 150, 150);
            ctx.fillStyle = '#8b4513';
            ctx.font = 'bold 90px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🕉️', 115, 130);
        }
        
        // Add company name with khel-specific color
        const khelType = document.getElementById('khelType').value;
        const primaryColor = getKhelPrimaryColor(khelType);
        ctx.fillStyle = primaryColor;
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Shri Ganesh Company', canvas.width / 2, 120);
        
        // Add date
        // Add kundli box in top-right corner
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
        
        // Draw kundli box
        const kundliX = canvas.width - 140;
        const kundliY = 20;
        const kundliSize = 120;
        
        // Outer border (brown)
        ctx.strokeStyle = '#8b4513';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(kundliX + kundliSize/2, kundliY + kundliSize/2, kundliSize/2 + 6, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Middle border (gold)
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(kundliX + kundliSize/2, kundliY + kundliSize/2, kundliSize/2 + 3, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Inner border (khel-specific color)
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(kundliX + kundliSize/2, kundliY + kundliSize/2, kundliSize/2, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Fill background
        ctx.fillStyle = '#fff5f5';
        ctx.beginPath();
        ctx.arc(kundliX + kundliSize/2, kundliY + kundliSize/2, kundliSize/2 - 2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add number in kundli
        const kundliNumber = document.getElementById('number').value;
        const kundliNumberText = formatTwoDigitNumber(kundliNumber);
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(kundliNumberText, kundliX + kundliSize/2, kundliY + kundliSize/2 - 5);
        
        // Add date in kundli
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(currentDate, kundliX + kundliSize/2, kundliY + kundliSize/2 + 15);
        
        // Load and add appropriate image based on khel type
        let imagePath = 'daruseth_image1.jpg'; // Default Ganesh image
        let useCustomSymbol = false;
        
        if (khelType === 'S') {
            // Use random Shri Ganesh image for S khel
            imagePath = getRandomShriImagePath();
        } else if (khelType === 'F') {
            // Use Faridabad Moon image for F khel
            imagePath = 'faridabad_moon.jpg';
        } else if (khelType === 'H') {
            // Use Delhi Bazar image for H khel
            imagePath = 'DELHI_BAZAR.jpg';
        } else if (khelType === 'G') {
            imagePath = 'gaziabad.jpeg';
        } else if (khelType === 'M') {
            imagePath = 'king_image.jpeg';
        } else if (khelType === 'E') {
            imagePath = 'gali_image.jpeg';
        } else if (khelType === 'N') {
            imagePath = 'new_gali_image.jpeg';
        }
        
        // Load and draw image
        const godImg = await loadImage(imagePath);
        if (godImg) {
            ctx.drawImage(godImg, 50, canvas.height/2 - 150, 300, 200);
        } else {
            // Fallback placeholder
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(50, canvas.height/2 - 150, 300, 200);
            ctx.fillStyle = '#666';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            let fallbackText = 'God Image';
            if (khelType === 'S') fallbackText = 'Random Shri Ganesh Image';
            else if (khelType === 'F') fallbackText = 'Faridabad Moon Image';
            else if (khelType === 'H') fallbackText = 'Delhi Bazar Image';
            else if (khelType === 'G') fallbackText = 'Gaziabad Image';
            else if (khelType === 'M') fallbackText = 'King Image';
            else if (khelType === 'E') fallbackText = 'Gali Image';
            else if (khelType === 'N') fallbackText = 'New Gali Image';
            ctx.fillText(fallbackText, 200, canvas.height/2 - 50);
        }
        
        // Add right side content
        const pngNumber = document.getElementById('number').value;
        const pngNumberText = formatTwoDigitNumber(pngNumber);
        const customGame = document.getElementById('customGame').value;
        let khelText = getKhelTypeName(khelType);
        let khelTextHindi = getKhelTypeNameHindi(khelType);
        
        // Use custom game name if provided for both English and Hindi
        if (customGame && customGame.trim() !== '') {
            khelText = customGame.trim();
            khelTextHindi = customGame.trim();
        }
        
        // Result date
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Result Date: ${currentDate}`, canvas.width - 200, canvas.height/2 - 100);
        
        // Khel English
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(khelText, canvas.width - 200, canvas.height/2 - 50);
        
        // Khel Hindi - increased size with khel-specific color
        ctx.fillStyle = primaryColor;
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(khelTextHindi, canvas.width - 200, canvas.height/2 - 10);
        
        // Result number - extra large and blinking effect with khel-specific color
        ctx.fillStyle = primaryColor;
        ctx.font = 'bold 120px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 8;
        ctx.fillText(pngNumberText, canvas.width - 200, canvas.height/2 + 50);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Add worship icons at bottom
        const icons = ['🌸', '💎', '🕉️', '🔔', '🪔', '🌺', '⭐', '🏺'];
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i < icons.length; i++) {
            ctx.fillText(icons[i], 100 + (i * 150), canvas.height - 100);
        }
        
        // Convert to PNG and download
        const link = document.createElement('a');
        link.download = `Sri_Ganesh_Result_${pngNumberText}_${khelType}_${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
    } catch (error) {
        console.error('Error generating PNG:', error);
        alert('Error generating PNG. Please try again.');
    } finally {
        button.textContent = originalText;
        button.classList.remove('loading');
        button.disabled = false;
    }
}


// Format number as two digits (01-99, 100)
function formatTwoDigitNumber(num) {
    const number = parseInt(num);
    if (number === 100) {
        return '100';
    } else if (number >= 1 && number <= 99) {
        return number.toString().padStart(2, '0');
    } else {
        return number.toString();
    }
}

// Utility function to format number with leading zeros
function formatNumber(num) {
    return num.toString().padStart(3, '0');
}

// Add some visual feedback for form validation
document.addEventListener('input', function(e) {
    if (e.target.matches('input, select, textarea')) {
        if (e.target.checkValidity()) {
            e.target.style.borderColor = '#28a745';
        } else {
            e.target.style.borderColor = '#dc3545';
        }
    }
});

// Load image helper function
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            resolve(null);
        };
        img.src = src;
    });
}

// Generate Video of preview screen
async function generateVideo() {
    const form = document.getElementById('resultForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const button = document.getElementById('generateVideo');
    const originalText = button.textContent;
    
    try {
        button.textContent = 'Recording Video...';
        button.classList.add('loading');
        button.disabled = true;
        
        const previewElement = document.getElementById('resultPreview');
        
        // Check if MediaRecorder is supported
        if (!window.MediaRecorder) {
            throw new Error('MediaRecorder not supported in this browser');
        }
        
        // Get supported MIME types
        const mimeTypes = [
            'video/mp4;codecs=h264',
            'video/webm;codecs=vp9',
            'video/webm;codecs=vp8',
            'video/webm'
        ];
        
        let selectedMimeType = '';
        for (const mimeType of mimeTypes) {
            if (MediaRecorder.isTypeSupported(mimeType)) {
                selectedMimeType = mimeType;
                break;
            }
        }
        
        if (!selectedMimeType) {
            throw new Error('No supported video format found');
        }
        
        console.log('Using MIME type:', selectedMimeType);
        
        // Create canvas for video frames
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to preview size (optimized for mobile)
        const isMobile = window.innerWidth <= 768;
        const scale = isMobile ? 0.8 : 1;
        
        canvas.width = previewElement.offsetWidth * scale;
        canvas.height = previewElement.offsetHeight * scale;
        
        // Create video stream from canvas
        const stream = canvas.captureStream(30); // 30 FPS
        
        // Create MediaRecorder with best available format
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: selectedMimeType,
            videoBitsPerSecond: 2500000 // 2.5 Mbps for good quality
        });
        
        const chunks = [];
        
        mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = function() {
            const blob = new Blob(chunks, { type: selectedMimeType });
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Set filename based on format
            const extension = selectedMimeType.includes('mp4') ? 'mp4' : 'webm';
            link.download = `Sri_Ganesh_Result_Video_${new Date().toISOString().split('T')[0]}.${extension}`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            URL.revokeObjectURL(url);
            
            // Show success message
            alert(`Video generated successfully! Format: ${extension.toUpperCase()}`);
        };
        
        mediaRecorder.onerror = function(event) {
            console.error('MediaRecorder error:', event.error);
            alert('Error recording video: ' + event.error.message);
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Record for 10 seconds
        const startTime = Date.now();
        const duration = 10000; // 10 seconds
        
        // Animation loop for capturing frames
        function animate() {
            const elapsed = Date.now() - startTime;
            
            if (elapsed < duration) {
                // Capture current frame of preview only (mobile optimized)
                html2canvas(previewElement, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    scale: scale,
                    logging: false,
                    width: previewElement.offsetWidth,
                    height: previewElement.offsetHeight,
                    useCORS: true,
                    foreignObjectRendering: false // Better mobile compatibility
                }).then(canvasFrame => {
                    // Draw frame to video canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(canvasFrame, 0, 0, canvas.width, canvas.height);
                    
                    // Continue animation
                    requestAnimationFrame(animate);
                }).catch(error => {
                    console.warn('Frame capture failed:', error);
                    requestAnimationFrame(animate);
                });
            } else {
                // Stop recording
                mediaRecorder.stop();
                button.textContent = originalText;
                button.classList.remove('loading');
                button.disabled = false;
            }
        }
        
        // Start animation
        animate();
        
    } catch (error) {
        console.error('Error generating video:', error);
        alert('Error generating video: ' + error.message);
        button.textContent = originalText;
        button.classList.remove('loading');
        button.disabled = false;
    }
}
