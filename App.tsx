import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import ComposeBox from './components/ComposeBox';
import TweetCard from './components/TweetCard';
import { Tweet } from './types';

const App: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: '1',
      content: 'Just deployed my first app using the new Gemini 2.5 API! The speed is incredible. 🚀 #AI #coding',
      user: {
        id: 'u1',
        name: 'Alex Developer',
        handle: 'alexdev',
        avatar: 'https://picsum.photos/seed/100/200'
      },
      createdAt: '2h',
      likes: 124,
      retweets: 12,
      replies: 5,
      isLiked: true,
      image: 'https://picsum.photos/seed/88/800/400'
    },
    {
      id: '2',
      content: 'Thinking about the future of web development. Components are great, but have you tried simpler HTML/CSS approaches lately? Sometimes less is more.',
      user: {
        id: 'u2',
        name: 'Sarah Design',
        handle: 'sarahdesign',
        avatar: 'https://picsum.photos/seed/200/200'
      },
      createdAt: '4h',
      likes: 856,
      retweets: 92,
      replies: 45,
      isLiked: false
    },
    {
      id: '3',
      content: 'Coffee is the most important meal of the day. Change my mind. ☕️',
      user: {
        id: 'u3',
        name: 'Daily Coffee',
        handle: 'coffee_lover',
        avatar: 'https://picsum.photos/seed/300/200'
      },
      createdAt: '5h',
      likes: 2400,
      retweets: 500,
      replies: 120,
      isLiked: false
    }
  ]);

  const handleAddTweet = (content: string, image?: string) => {
    const newTweet: Tweet = {
      id: Date.now().toString(),
      content,
      user: {
        id: 'current',
        name: 'CurrentUser',
        handle: 'currentuser',
        avatar: 'https://picsum.photos/100/100'
      },
      createdAt: 'Just now',
      likes: 0,
      retweets: 0,
      replies: 0,
      isLiked: false,
      image
    };

    setTweets([newTweet, ...tweets]);
  };

  return (
    <div className="flex justify-center min-h-screen bg-black text-white font-sans">
      <div className="flex w-full max-w-[1265px]">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Feed */}
        <main className="flex-grow border-x border-gray-800 min-h-screen max-w-[600px] w-full">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-gray-800">
             <h2 className="text-xl font-bold px-4 py-3 cursor-pointer">Home</h2>
             <div className="flex border-b border-gray-800">
                 <div className="flex-1 hover:bg-white/10 transition cursor-pointer py-3 text-center relative group">
                     <span className="font-bold text-[15px]">For you</span>
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full"></div>
                 </div>
                 <div className="flex-1 hover:bg-white/10 transition cursor-pointer py-3 text-center text-gray-500 font-medium relative group">
                     <span className="group-hover:text-gray-200 text-[15px]">Following</span>
                 </div>
             </div>
          </div>

          {/* Tweet Compose Box */}
          <ComposeBox onTweet={handleAddTweet} />

          {/* Tweet List */}
          <div>
            {tweets.map(tweet => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </main>

        {/* Right Widgets */}
        <Widgets />
      </div>
    </div>
  );
};

export default App;