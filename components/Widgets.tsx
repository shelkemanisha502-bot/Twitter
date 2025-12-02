import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

const Widgets: React.FC = () => {
  const trends = [
    { category: 'Technology · Trending', topic: 'Gemini 2.5', posts: '54.2K posts' },
    { category: 'Coding · Trending', topic: 'TypeScript', posts: '125K posts' },
    { category: 'Entertainment · Trending', topic: '#ReactJS', posts: '89.1K posts' },
    { category: 'News · Trending', topic: 'Web Development', posts: '22.4K posts' },
    { category: 'Technology · Trending', topic: 'AI Revolution', posts: '1.2M posts' },
  ];

  return (
    <div className="hidden lg:block w-[350px] pl-8 py-2 sticky top-0 h-screen border-l border-gray-800 bg-black shrink-0">
      <div className="sticky top-0 bg-black py-2 z-10">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900 border-none rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl mt-4 pt-4">
        <h2 className="text-xl font-bold px-4 mb-4">What's happening</h2>
        {trends.map((trend, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition duration-200"
          >
            <div className="flex justify-between text-gray-500 text-xs mb-1">
              <span>{trend.category}</span>
              <MoreHorizontal size={14} />
            </div>
            <p className="font-bold text-sm">{trend.topic}</p>
            <p className="text-gray-500 text-xs mt-1">{trend.posts}</p>
          </div>
        ))}
        <div className="p-4 text-blue-500 text-sm cursor-pointer hover:bg-gray-800 rounded-b-2xl">
          Show more
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl mt-4 pt-4">
        <h2 className="text-xl font-bold px-4 mb-4">Who to follow</h2>
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer transition">
            <div className="flex items-center gap-2">
              <img src={`https://picsum.photos/seed/${i + 50}/200`} className="w-10 h-10 rounded-full" alt="user" />
              <div className="leading-tight">
                <p className="font-bold hover:underline">User {i}</p>
                <p className="text-gray-500 text-sm">@user{i}</p>
              </div>
            </div>
            <button className="bg-white text-black font-bold px-4 py-1.5 rounded-full hover:bg-gray-200 text-sm">
              Follow
            </button>
          </div>
        ))}
        <div className="p-4 text-blue-500 text-sm cursor-pointer hover:bg-gray-800 rounded-b-2xl">
          Show more
        </div>
      </div>

      <div className="mt-4 px-4 text-xs text-gray-500 leading-normal">
        <span className="hover:underline cursor-pointer mr-2">Terms of Service</span>
        <span className="hover:underline cursor-pointer mr-2">Privacy Policy</span>
        <span className="hover:underline cursor-pointer mr-2">Cookie Policy</span>
        <span className="hover:underline cursor-pointer mr-2">Accessibility</span>
        <span className="hover:underline cursor-pointer mr-2">Ads info</span>
        <span>© 2024 Chirp Corp.</span>
      </div>
    </div>
  );
};

export default Widgets;