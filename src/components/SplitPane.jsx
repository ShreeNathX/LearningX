import React, { useState, useRef, useEffect } from 'react';

export function SplitPane({ 
  left, 
  right, 
  direction = 'horizontal', // 'horizontal' | 'vertical'
  defaultSplit = 50,
  minSplit = 20,
  maxSplit = 80
}) {
  const [split, setSplit] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      let newPercentage;
      if (direction === 'horizontal') {
        newPercentage = ((e.clientX - rect.left) / rect.width) * 100;
      } else {
        newPercentage = ((e.clientY - rect.top) / rect.height) * 100;
      }

      if (newPercentage >= minSplit && newPercentage <= maxSplit) {
        setSplit(newPercentage);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }
    };

    if (isDragging) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, minSplit, maxSplit]);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} overflow-hidden`}
    >
      {/* Primary Pane */}
      <div 
        style={{ 
          [direction === 'horizontal' ? 'width' : 'height']: `${split}%` 
        }} 
        className="overflow-hidden flex flex-col"
      >
        {left}
      </div>

      {/* Resizer Divider Bar */}
      <div
        onMouseDown={() => setIsDragging(true)}
        className={`relative flex items-center justify-center bg-slate-900 hover:bg-cyan-500/50 transition-colors z-20 select-none ${
          direction === 'horizontal'
            ? 'w-1.5 cursor-col-resize hover:w-1.5 border-x border-slate-800'
            : 'h-1.5 cursor-row-resize hover:h-1.5 border-y border-slate-800'
        } ${isDragging ? 'bg-cyan-500 !w-1.5 !h-1.5' : ''}`}
      >
        <div className={`rounded-full bg-slate-600 ${
          direction === 'horizontal' ? 'w-0.5 h-6' : 'h-0.5 w-6'
        }`} />
      </div>

      {/* Secondary Pane */}
      <div 
        style={{ 
          [direction === 'horizontal' ? 'width' : 'height']: `${100 - split}%` 
        }} 
        className="overflow-hidden flex flex-col"
      >
        {right}
      </div>
    </div>
  );
}
