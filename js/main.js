document.addEventListener('DOMContentLoaded', () => {
    
    // Init scroll animations
    AOS.init({ once: true, offset: 50, duration: 800 });

    // Decryption Text Effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
    document.querySelectorAll('.decrypt-text').forEach(element => {
        let iterations = 0;
        const targetText = element.getAttribute('data-target');
        const interval = setInterval(() => {
            element.innerText = targetText.split("")
                .map((letter, index) => {
                    if(index < iterations) return targetText[index];
                    return letters[Math.floor(Math.random() * 42)];
                }).join("");
            if(iterations >= targetText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    });

    // Matrix Rain Canvas Effect
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "01".split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;

        function draw() {
            ctx.fillStyle = "rgba(2, 4, 10, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00ff88"; 
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(draw, 33);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});