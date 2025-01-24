"use client"
import React, { useState, useRef, useEffect } from 'react';

const BBSPortfolio = () => {
 const containerRef = useRef(null);
 const [selectedContent, setSelectedContent] = useState(null);
 const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
 const [isBlinking, setIsBlinking] = useState(false);
 const moveTimerRef = useRef(null);

 useEffect(() => {
   document.body.style.cursor = 'none';
   return () => document.body.style.cursor = 'default';
 }, []);

 const menuItems = {
   '100': {
     name: 'About Me',
     content: `About Me:
     I'm a software developer passionate about creating innovative solutions.
     With experience in web development and system architecture.`
   },
   '200': {
     name: 'Projects',
     content: `Projects:
     1. Portfolio Website - A retro BBS-style portfolio
     2. E-commerce Platform - Full-stack application
     3. Chat Interface - Real-time messaging system`
   },
   '300': {
     name: 'Skills',
     content: `Skills:
     - Languages: JavaScript, Python, TypeScript
     - Frameworks: React, Next.js, Node.js
     - Tools: Git, Docker, AWS`
   },
   '400': {
     name: 'Contact',
     content: `Contact:
     Email: your.email@example.com
     GitHub: github.com/yourusername
     LinkedIn: linkedin.com/in/yourusername`
   }
 };


const AsciiLogo = () => (
  <div className="bg-black p-10">
    <pre className="text-center whitespace-pre font-mono leading-none text-white">
{`       ░▒▓█▓▒░░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓███████▓▒░       ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░  
       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░       ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░        ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░`}
    </pre>
  </div>
);



  const handleMouseMove = (e) => {
   if (!containerRef.current) return;
   
   const rect = containerRef.current.getBoundingClientRect();
   const charWidth = 10;
   const charHeight = 20;
   const x = Math.floor((e.clientX - rect.left) / charWidth) * charWidth;
   const y = Math.floor((e.clientY - rect.top) / charHeight) * charHeight;
   setCursorPos({ x, y });
   
   setIsBlinking(false);
   if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
   moveTimerRef.current = setTimeout(() => setIsBlinking(true), 1000);
 };

 useEffect(() => {
   return () => {
     if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
   };
 }, []);

 const handleKeyPress = (e) => {
   if (e.key === '*') {
     setSelectedContent(null);
   }
 };

 useEffect(() => {
   window.addEventListener('keypress', handleKeyPress);
   return () => window.removeEventListener('keypress', handleKeyPress);
 }, []);

 return (
   <div 
     className="min-h-screen bg-black text-white p-8 font-mono relative cursor-none"
     ref={containerRef}
     onMouseMove={handleMouseMove}
   >
     <div className="mb-12">
       <AsciiLogo />
     </div>

     <div 
       className={`absolute bg-white pointer-events-none z-50 ${isBlinking ? 'animate-blink' : ''}`}
       style={{
         left: cursorPos.x,
         top: cursorPos.y,
         width: '10px',
         height: '20px',
         transition: 'all 0.05s'
       }}
     />

     <div className="max-w-2xl mx-auto">
       {!selectedContent ? (
         <>
           <div className="mb-4 text-xl">Please select a service: *...#</div>
           {Object.entries(menuItems).map(([code, item]) => (
             <div 
               key={code} 
               className="mb-2 hover:bg-white hover:text-black p-1"
               onClick={() => setSelectedContent(item.content)}
             >
               <span className="mr-4">{code}</span>
               <span>- {item.name}</span>
             </div>
           ))}
         </>
       ) : (
         <pre className="whitespace-pre-wrap">
           {selectedContent}
           <div className="mt-4">Press * to return to menu</div>
         </pre>
       )}
     </div>
   </div>
 );
};

export default BBSPortfolio;
