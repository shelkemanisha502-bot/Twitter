import React, { useState } from 'react';
import { MessageCircle, Repeat2, Heart, Share, BarChart2, MoreHorizontal } from 'lucide-react';
import { Tweet } from '../types';

interface TweetCardProps {
  tweet: Tweet;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const [likes, setLikes] = useState(tweet.likes);
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [retweets, setRetweets] = useState(tweet.retweets);
  const [isRetweeted, setIsRetweeted] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes(l => l - 1);
      setIsLiked(false);
    } else {
      setLikes(l => l + 1);
      setIsLiked(true);
    }
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRetweeted) {
      setRetweets(r => r - 1);
      setIsRetweeted(false);
    } else {
      setRetweets(r => r + 1);
      setIsRetweeted(true);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-white/[0.03] transition duration-200 cursor-pointer">
      <div className="flex gap-4">
        <img
          src={tweet.user.avatar}
          alt={tweet.user.name}
          className="h-10 w-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 truncate text-[15px]">
              <span className="font-bold text-white truncate">{tweet.user.name}</span>
              <span className="text-gray-500 truncate">@{tweet.user.handle}</span>
              <span className="text-gray-500 px-1">·</span>
              <span className="text-gray-500 hover:underline">{tweet.createdAt}</span>
            </div>
            <button className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-blue-500/10 transition group">
              <MoreHorizontal size={18} className="group-hover:text-blue-500" />
            </button>
          </div>
          
          <p className="text-white mt-1 whitespace-pre-wrap leading-normal text-[15px]">
            {tweet.content}
          </p>

          {tweet.image && (
            <div className="mt-3">
              <img 
                src={tweet.image} 
                alt="Tweet attachment" 
                className="rounded-2xl border border-gray-800 w-full object-cover max-h-[500px]"
              />
            </div>
          )}

          <div className="flex justify-between mt-3 text-gray-500 max-w-[425px]">
            {/* Reply */}
            <div className="flex items-center group cursor-pointer hover:text-blue-500">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs ml-1 group-hover:text-blue-500">{formatNumber(tweet.replies)}</span>
            </div>

            {/* Retweet */}
            <div className={`flex items-center group cursor-pointer ${isRetweeted ? 'text-green-500' : 'hover:text-green-500'}`} onClick={handleRetweet}>
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition">
                <Repeat2 size={18} />
              </div>
              <span className="text-xs ml-1">{formatNumber(retweets)}</span>
            </div>

            {/* Like */}
            <div className={`flex items-center group cursor-pointer ${isLiked ? 'text-pink-600' : 'hover:text-pink-600'}`} onClick={handleLike}>
              <div className="p-2 rounded-full group-hover:bg-pink-600/10 transition">
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </div>
              <span className="text-xs ml-1">{formatNumber(likes)}</span>
            </div>

            {/* Views */}
            <div className="flex items-center group cursor-pointer hover:text-blue-500">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition">
                <BarChart2 size={18} />
              </div>
              <span className="text-xs ml-1">{formatNumber(Math.floor(Math.random() * 10000) + 1000)}</span>
            </div>

            {/* Share */}
            <div className="flex items-center group cursor-pointer hover:text-blue-500">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition">
                <Share size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;