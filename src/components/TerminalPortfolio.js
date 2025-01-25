"use client"
import React, { useState, useRef, useEffect } from 'react';

const BBSPortfolio = () => {
 const containerRef = useRef(null);
 const [selectedContent, setSelectedContent] = useState(null);
 const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
 const [isBlinking, setIsBlinking] = useState(false);
 const [selectedPost, setSelectedPost] = useState(null);
 const [blogPosts, setBlogPosts] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const moveTimerRef = useRef(null);

 const menuStyles = `
   mb-2 p-1 transition-all duration-200 cursor-none
   [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]
   [background-size:4px_4px]
   hover:[background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)]
 `;

 useEffect(() => {
   document.body.style.cursor = 'none';
   return () => document.body.style.cursor = 'default';
 }, []);

 useEffect(() => {
   const loadBlogPosts = async () => {
     setIsLoading(true);
     try {
       const res = await fetch('/api/posts');
       if (!res.ok) throw new Error('Failed to fetch posts');
       const posts = await res.json();
       setBlogPosts(posts);
     } catch (error) {
       console.error('Error loading blog posts:', error);
     } finally {
       setIsLoading(false);
     }
   };

   if (selectedContent === 'blog') {
     loadBlogPosts();
   }
 }, [selectedContent]);

 const menuItems = {
   '000': {
     name: 'About Me',
     content: `About Me:
     I'm a software developer focused on systems programming. I have experience with xyz`
   },
   '100': {
     name: 'Skills',
     content: `Skills:
     - Operation Systems: FreeBSD, OpenBSD, & Linux
     - Tools: Git, Docker, AWS, Kubernetes`
   },
   '200': {
     name: 'Projects',
     content: `Projects:
     1. bfc.rs - A BrainFuck lang compiler written in rust 
     2. TurtleShell - A comically slow python system shell I wrote on a lunch break`
   },
   '300': {
     name: 'Blog',
     isBlog: true,
     content: null
   },
   '400': {
     name: 'Contact',
     content: `Contact:
     Email: jacobmetz@proton.me
     GitHub: github.com/knobby-tires
     LinkedIn: linkedin.com/in/jacobmetzw`
   }
 };

 const AsciiLogo = () => (
  <pre
    className="whitespace-pre font-mono leading-none text-white"
    style={{ transform: 'translateX(-55%)' }}
  >
    {`
       ░▒▓█▓▒░░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓███████▓▒░       ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░  ░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░  
       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░        ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░        ░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░`}
  </pre>
);

 const BlogList = () => {
  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      {blogPosts.length === 0 ? (
        <div>No posts found</div>
      ) : (
        blogPosts.map((post, i) => (
          <div key={i} className={menuStyles} onClick={() => setSelectedPost(post)}>
            {post.coverImage && (
              <div className="mb-2">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="max-w-full h-auto"
                />
              </div>
            )}
            <div className="mb-1">{post.title}</div>
            <div className="opacity-50 text-sm">
              {new Date(post.date).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
      <div className={`mt-4 ${menuStyles}`} onClick={() => setSelectedContent(null)}>
        Press * to return to menu
      </div>
    </div>
  );
};

const BlogPost = ({ post }) => (
  <div className="flex justify-center">
    <div 
      className={`max-w-2xl w-full p-6 mt-8
        [background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]
        [background-size:4px_4px]`}
    >
      <div className="whitespace-pre-wrap text-center">
        <div className="text-xl mb-2">{post.title}</div>
        {post.coverImage && (
          <div className="mb-4">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="max-w-full h-auto"
            />
          </div>
        )}
        <div className="text-sm opacity-50 mb-8">{new Date(post.date).toLocaleDateString()}</div>
        <div 
          className="text-left"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className={`mt-8 ${menuStyles}`} onClick={() => setSelectedPost(null)}>
          Press * to return to posts
        </div>
      </div>
    </div>
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

 const handleKeyPress = (e) => {
   if (e.key === '*') {
     if (selectedPost) {
       setSelectedPost(null);
     } else {
       setSelectedContent(null);
     }
   }
 };

 useEffect(() => {
   window.addEventListener('keypress', handleKeyPress);
   return () => window.removeEventListener('keypress', handleKeyPress);
 }, [selectedPost]);

 return (
  <div 
    className="min-h-screen bg-black text-white font-mono relative cursor-none"
    ref={containerRef}
    onMouseMove={handleMouseMove}
    tabIndex={0}
  >
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-2xl">
        <AsciiLogo />
        
        <div className="mt-16">
          {!selectedContent ? (
            <>
              <div className="mb-8 text-xl text-center">Please select a service: *...#</div>
              {Object.entries(menuItems)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([code, item], index) => (
                  <div 
                    key={code} 
                    className={menuStyles}
                    onClick={() => {
                      if (item.isBlog) {
                        setSelectedContent('blog');
                      } else {
                        setSelectedContent(item.content);
                      }
                    }}
                  >
                    <span className="mr-4">{code}</span>
                    <span>- {item.name}</span>
                  </div>
                ))}
            </>
          ) : selectedContent === 'blog' ? (
            isLoading ? (
              <div>Loading...</div>
            ) : selectedPost ? (
              <BlogPost post={selectedPost} />
            ) : (
              <BlogList />
            )
          ) : (
            <div className="whitespace-pre-wrap">
              {selectedContent}
              <div className={`mt-4 ${menuStyles}`} onClick={() => setSelectedContent(null)}>
                Press * to return to menu
              </div>
            </div>
          )}
        </div>
      </div>
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
  </div>
);
};

export default BBSPortfolio;