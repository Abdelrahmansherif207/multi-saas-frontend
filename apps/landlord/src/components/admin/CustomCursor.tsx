"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the outer ring
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer");
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Hide default cursor */}
            <style>{`
                * { cursor: none !important; }
            `}</style>

            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="rounded-full bg-white"
                    animate={{
                        width: isHovering ? 32 : isClicking ? 4 : 8,
                        height: isHovering ? 32 : isClicking ? 4 : 8,
                        x: isHovering ? -16 : isClicking ? -2 : -4,
                        y: isHovering ? -16 : isClicking ? -2 : -4,
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 400 }}
                />
            </motion.div>

            {/* Trailing ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="rounded-full border-2 border-brand-orange"
                    animate={{
                        width: isHovering ? 40 : 24,
                        height: isHovering ? 40 : 24,
                        x: isHovering ? -20 : -12,
                        y: isHovering ? -20 : -12,
                        opacity: isClicking ? 0.5 : 1,
                        scale: isClicking ? 0.8 : 1,
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                />
            </motion.div>
        </>
    );
}
