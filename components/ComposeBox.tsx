import React, { useState, useRef, useEffect } from 'react';
import { Image, Smile, Calendar, MapPin, Wand2, Loader2, X } from 'lucide-react';
import { AISuggestionType } from '../types';
import { generateTweetEnhancement } from '../services/geminiService';

interface ComposeBoxProps {
  onTweet: (content: string, image?: string) => void;
}

const ComposeBox: React.FC<ComposeBoxProps> = ({ onTweet }) => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiMenu, setShowAiMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setShowAiMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAiAction = async (type: AISuggestionType) => {
    if (!content.trim()) return;
    
    setIsGenerating(true);
    setShowAiMenu(false);
    try {
      const newText = await generateTweetEnhancement(content, type);
      setContent(newText);
    } catch (error) {
      console.error("AI enhancement failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && !selectedImage) return;
    onTweet(content, selectedImage || undefined);
    setContent('');
    setSelectedImage(null);
  };

  return (
    <div className="border-b border-gray-800 p-4 flex gap-4 w-full">
      <img
        src="https://picsum.photos/100/100"
        alt="Avatar"
        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 w-full">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What is happening?!"
          className="bg-transparent text-xl w-full focus:outline-none placeholder-gray-500 resize-none min-h-[60px]"
          rows={2}
        />
        
        {selectedImage && (
          <div className="relative mt-2 mb-4">
             <img src={selectedImage} alt="Selected" className="rounded-2xl max-h-80 w-auto object-cover border border-gray-800" />
             <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 left-2 bg-black/70 rounded-full p-1 hover:bg-black/90 transition"
             >
                <X size={16} className="text-white" />
             </button>
          </div>
        )}

        <div className="border-t border-gray-800/50 mt-2 pt-3 flex items-center justify-between">
          <div className="flex gap-1 text-blue-500 relative">
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full hover:bg-blue-500/10 transition"
            >
              <Image size={20} />
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageSelect} 
                className="hidden" 
                accept="image/*"
            />
            
            <button className="p-2 rounded-full hover:bg-blue-500/10 transition">
                <div className="border border-blue-500 rounded px-1 text-[10px] font-bold">GIF</div>
            </button>
            <button className="p-2 rounded-full hover:bg-blue-500/10 transition"><Smile size={20} /></button>
            <button className="p-2 rounded-full hover:bg-blue-500/10 transition hidden sm:block"><Calendar size={20} /></button>
            <button className="p-2 rounded-full hover:bg-blue-500/10 transition hidden sm:block"><MapPin size={20} /></button>
            
            <div className="relative" ref={aiMenuRef}>
              <button 
                className={`p-2 rounded-full transition flex items-center gap-2 ${isGenerating ? 'animate-pulse text-purple-400' : 'text-purple-500 hover:bg-purple-500/10'}`}
                onClick={() => setShowAiMenu(!showAiMenu)}
                disabled={isGenerating || !content.trim()}
              >
                {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
              </button>
              
              {showAiMenu && (
                <div className="absolute top-10 left-0 bg-black border border-gray-700 rounded-xl shadow-2xl w-48 z-20 overflow-hidden flex flex-col">
                    <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase bg-gray-900/50">AI Assist</div>
                    {Object.values(AISuggestionType).map((type) => (
                        <button
                            key={type}
                            onClick={() => handleAiAction(type)}
                            className="px-4 py-3 text-left text-sm hover:bg-gray-800 text-white transition border-b border-gray-800 last:border-none"
                        >
                            {type}
                        </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
             {content.length > 0 && (
                 <div className="text-xs text-gray-500 border-r border-gray-700 pr-3">
                     {content.length}/280
                 </div>
             )}
            <button 
                onClick={handleSubmit}
                disabled={!content.trim() && !selectedImage}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeBox;