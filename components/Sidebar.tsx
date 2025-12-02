import React from 'react';
import { Home, Hash, Bell, Mail, User, MoreHorizontal, Bookmark, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <Home size={28} />, label: 'Home', active: true },
    { icon: <Hash size={28} />, label: 'Explore' },
    { icon: <Bell size={28} />, label: 'Notifications' },
    { icon: <Mail size={28} />, label: 'Messages' },
    { icon: <Bookmark size={28} />, label: 'Bookmarks' },
    { icon: <User size={28} />, label: 'Profile' },
    { icon: <Settings size={28} />, label: 'Settings' },
  ];

  return (
    <div className="hidden sm:flex flex-col h-screen sticky top-0 p-2 xl:w-[275px] w-[80px] border-r border-gray-800 bg-black z-50 shrink-0">
      <div className="p-3 mb-2 hover:bg-gray-900 rounded-full w-fit cursor-pointer transition">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-white fill-current">
          <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
        </svg>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 p-3 rounded-full cursor-pointer transition duration-200 w-fit xl:w-full ${
              item.active ? 'font-bold' : 'hover:bg-gray-900'
            }`}
          >
            {item.icon}
            <span className={`hidden xl:block text-xl ${item.active ? 'font-bold' : 'font-normal'}`}>
              {item.label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-4 p-3 rounded-full cursor-pointer hover:bg-gray-900 w-fit xl:w-full">
          <MoreHorizontal size={28} />
          <span className="hidden xl:block text-xl">More</span>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 w-full font-bold text-lg mt-4 hidden xl:block shadow-lg transition transform hover:scale-105">
          Post
        </button>
        <div className="xl:hidden bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 mt-4 w-fit flex items-center justify-center cursor-pointer shadow-lg">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current"><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g></svg>
        </div>
      </nav>

      <div className="mt-auto mb-4 flex items-center gap-3 p-3 rounded-full hover:bg-gray-900 cursor-pointer w-full">
        <img
          src="https://picsum.photos/100/100"
          alt="User Avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="hidden xl:block leading-tight">
          <p className="font-bold">CurrentUser</p>
          <p className="text-gray-500">@currentuser</p>
        </div>
        <MoreHorizontal size={16} className="ml-auto hidden xl:block" />
      </div>
    </div>
  );
};

export default Sidebar;