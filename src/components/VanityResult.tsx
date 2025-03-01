
import React from 'react';
import { Check, X } from 'lucide-react';

interface ServerInfo {
  name: string;
  icon: string;
  memberCount: number;
}

interface VanityResultProps {
  vanity: string;
  isAvailable: boolean;
  serverInfo?: ServerInfo;
}

const VanityResult: React.FC<VanityResultProps> = ({ vanity, isAvailable, serverInfo }) => {
  return (
    <div className="panel max-w-lg w-full mx-auto mt-8 animate-scale-in">
      {isAvailable ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-500/20">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-xl font-bold">Vanity is Open!</h3>
          <p className="text-gray-300">The vanity URL <span className="font-semibold">"{vanity}"</span> is available for use.</p>
        </div>
      ) : serverInfo ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            {serverInfo.icon ? (
              <img src={serverInfo.icon} alt={serverInfo.name} className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-xl font-bold">{serverInfo.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold">{serverInfo.name}</h3>
              <p className="text-gray-300">{serverInfo.memberCount.toLocaleString()} members</p>
            </div>
          </div>
          <p className="text-gray-300 mt-2">This vanity URL is already taken by the server above.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-red-500/20">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-bold">Vanity is Taken</h3>
          <p className="text-gray-300">The vanity URL <span className="font-semibold">"{vanity}"</span> is already in use.</p>
        </div>
      )}
    </div>
  );
};

export default VanityResult;
