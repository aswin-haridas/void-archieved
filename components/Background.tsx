<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halftone Pattern Generator</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }

        #canvas {
            display: block;
            background: linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%);
            cursor: crosshair;
        }

        .controls {
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            padding: 15px;
            border-radius: 10px;
            color: white;
            z-index: 100;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .control-group {
            margin-bottom: 10px;
        }

        .control-group label {
            display: block;
            font-size: 12px;
            margin-bottom: 5px;
            opacity: 0.8;
        }

        .control-group input[type="range"] {
            width: 150px;
            margin-right: 10px;
        }

        .control-group input[type="color"] {
            width: 40px;
            height: 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .toggle-btn {
            background: #333;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 11px;
            margin-left: 10px;
            transition: background 0.3s;
        }

        .toggle-btn:hover {
            background: #555;
        }

        .toggle-btn.active {
            background: #0066cc;
        }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    
    <div class="controls">
        <div class="control-group">
            <label>Dot Spacing: <span id="spacingValue">12</span>px</label>
            <input type="range" id="spacing" min="5" max="30" value="12">
        </div>
        
        <div class="control-group">
            <label>Max Dot Size: <span id="maxSizeValue">8</span>px</label>
            <input type="range" id="maxSize" min="2" max="15" value="8">
        </div>
        
        <div class="control-group">
            <label>Intensity: <span id="intensityValue">100</span>%</label>
            <input type="range" id="intensity" min="20" max="200" value="100">
        </div>
        
        <div class="control-group">
            <label>Color: </label>
            <input type="color" id="color" value="#ffffff">
            <button class="toggle-btn" id="animateBtn">Animate</button>
        </div>
    </div>

    <script>
        class HalftonePattern {
            constructor() {
                this.canvas = document.getElementById('canvas');
                this.ctx = this.canvas.getContext('2d');
                this.mouse = { x: 0, y: 0 };
                this.time = 0;
                this.isAnimating = false;
                
                // Default settings
                this.settings = {
                    spacing: 12,
                    maxSize: 8,
                    intensity: 100,
                    color: '#ffffff'
                };
                
                this.setupCanvas();
                this.setupControls();
                this.setupMouseTracking();
                this.animate();
            }
            
            setupCanvas() {
                const resize = () => {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                    this.draw();
                };
                
                resize();
                window.addEventListener('resize', resize);
            }
            
            setupControls() {
                const spacing = document.getElementById('spacing');
                const maxSize = document.getElementById('maxSize');
                const intensity = document.getElementById('intensity');
                const color = document.getElementById('color');
                const animateBtn = document.getElementById('animateBtn');
                
                spacing.addEventListener('input', (e) => {
                    this.settings.spacing = parseInt(e.target.value);
                    document.getElementById('spacingValue').textContent = e.target.value;
                });
                
                maxSize.addEventListener('input', (e) => {
                    this.settings.maxSize = parseInt(e.target.value);
                    document.getElementById('maxSizeValue').textContent = e.target.value;
                });
                
                intensity.addEventListener('input', (e) => {
                    this.settings.intensity = parseInt(e.target.value);
                    document.getElementById('intensityValue').textContent = e.target.value;
                });
                
                color.addEventListener('input', (e) => {
                    this.settings.color = e.target.value;
                });
                
                animateBtn.addEventListener('click', () => {
                    this.isAnimating = !this.isAnimating;
                    animateBtn.classList.toggle('active');
                    animateBtn.textContent = this.isAnimating ? 'Stop' : 'Animate';
                });
            }
            
            setupMouseTracking() {
                this.canvas.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });
            }
            
            calculateDotSize(x, y) {
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                
                // Distance from center
                const distFromCenter = Math.sqrt(
                    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
                );
                
                // Distance from mouse
                const distFromMouse = Math.sqrt(
                    Math.pow(x - this.mouse.x, 2) + Math.pow(y - this.mouse.y, 2)
                );
                
                // Create wave patterns
                const wave1 = Math.sin(distFromCenter * 0.02 + this.time * 0.01) * 0.5 + 0.5;
                const wave2 = Math.sin(distFromMouse * 0.015 + this.time * 0.02) * 0.3 + 0.7;
                const wave3 = Math.sin((x + y) * 0.01 + this.time * 0.005) * 0.2 + 0.8;
                
                // Combine all factors
                let size = wave1 * wave2 * wave3;
                
                // Add mouse interaction
                const mouseInfluence = Math.max(0, 1 - distFromMouse / 200);
                size += mouseInfluence * 0.5;
                
                // Apply intensity and max size
                size = size * (this.settings.intensity / 100) * this.settings.maxSize;
                
                return Math.max(0.5, Math.min(this.settings.maxSize, size));
            }
            
            draw() {
                // Clear canvas
                this.ctx.fillStyle = '#000';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Set dot color
                this.ctx.fillStyle = this.settings.color;
                
                // Draw dots
                const spacing = this.settings.spacing;
                
                for (let x = spacing / 2; x < this.canvas.width; x += spacing) {
                    for (let y = spacing / 2; y < this.canvas.height; y += spacing) {
                        const size = this.calculateDotSize(x, y);
                        
                        if (size > 0.5) {
                            this.ctx.beginPath();
                            this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                            this.ctx.fill();
                        }
                    }
                }
            }
            
            animate() {
                if (this.isAnimating) {
                    this.time += 1;
                }
                
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }
        
        // Initialize when page loads
        window.addEventListener('load', () => {
            new HalftonePattern();
        });
    </script>
</body>
</html>