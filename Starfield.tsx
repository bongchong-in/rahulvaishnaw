import React, { useEffect, useRef } from 'react';
import { SITE_CONFIG } from './constants';

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;

        const config = SITE_CONFIG.visuals.starfield;
        const STAR_COUNT = width < 768 ? config.starCount.mobile : config.starCount.desktop;
        const stars: Star[] = [];

        class Star {
            x: number = 0;
            y: number = 0;
            size: number = 0;
            color: string = '';
            speed: number = 0;
            opacity: number = 0;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5;
                // Use colors from config
                this.color = Math.random() > 0.8 ? config.colors[0] : config.colors[1];
                this.speed = Math.random() * (config.speed.max - config.speed.min) + config.speed.min;
                this.opacity = Math.random();
            }

            update() {
                this.y += this.speed;
                if (this.y > height) {
                    this.y = 0;
                    this.x = Math.random() * width;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const init = () => {
            resize();
            stars.length = 0; // Clear existing stars
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(s => {
                s.update();
                s.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="starfield" className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default Starfield;