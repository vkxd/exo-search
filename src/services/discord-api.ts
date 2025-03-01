
import axios from 'axios';

// Cache for storing results to avoid hitting rate limits
const cache: Record<string, { data: any, timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to check if cache is valid
const isCacheValid = (key: string): boolean => {
  if (!cache[key]) return false;
  const now = Date.now();
  return now - cache[key].timestamp < CACHE_DURATION;
};

// Get user info by ID
export const getUserById = async (userId: string): Promise<any> => {
  const cacheKey = `user_${userId}`;
  
  // Check cache first
  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }
  
  try {
    // Make request to Discord API
    const response = await axios.get(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        'User-Agent': 'ExoV1 Discord Searcher (https://exov1.com, v1.0.0)'
      }
    });
    
    // Format user data
    const userData = {
      username: response.data.username,
      id: response.data.id,
      avatar: response.data.avatar ? 
        `https://cdn.discordapp.com/avatars/${userId}/${response.data.avatar}.png?size=512` : 
        null,
      banner: response.data.banner ? 
        `https://cdn.discordapp.com/banners/${userId}/${response.data.banner}.png?size=1024` : 
        null,
      bio: response.data.bio || null,
      badges: parseBadges(response.data.public_flags),
      createdAt: calculateCreationDate(userId),
    };
    
    // Update cache
    cache[cacheKey] = {
      data: userData,
      timestamp: Date.now()
    };
    
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Check vanity URL availability
export const checkVanityUrl = async (vanityCode: string): Promise<any> => {
  const cacheKey = `vanity_${vanityCode}`;
  
  // Check cache first
  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }
  
  try {
    // Make request to Discord API
    const response = await axios.get(`https://discord.com/api/v10/invites/${vanityCode}`, {
      headers: {
        'User-Agent': 'ExoV1 Discord Searcher (https://exov1.com, v1.0.0)'
      }
    });
    
    // Format server data
    const serverData = {
      isAvailable: false,
      serverInfo: {
        name: response.data.guild.name,
        icon: response.data.guild.icon ? 
          `https://cdn.discordapp.com/icons/${response.data.guild.id}/${response.data.guild.icon}.png?size=256` : 
          null,
        memberCount: response.data.approximate_member_count || 0,
      }
    };
    
    // Update cache
    cache[cacheKey] = {
      data: serverData,
      timestamp: Date.now()
    };
    
    return serverData;
  } catch (error) {
    // If 404, the vanity is available
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      const result = { isAvailable: true, serverInfo: null };
      
      // Update cache
      cache[cacheKey] = {
        data: result,
        timestamp: Date.now()
      };
      
      return result;
    }
    
    console.error('Error checking vanity URL:', error);
    throw error;
  }
};

// Helper function to parse Discord public flags to badges
function parseBadges(publicFlags: number): Array<{ id: string; name: string; icon: string }> {
  const badges = [];
  
  // Discord badge flags
  const DISCORD_EMPLOYEE = 1 << 0;
  const DISCORD_PARTNER = 1 << 1;
  const HYPESQUAD_EVENTS = 1 << 2;
  const BUG_HUNTER_LEVEL_1 = 1 << 3;
  const HOUSE_BRAVERY = 1 << 6;
  const HOUSE_BRILLIANCE = 1 << 7;
  const HOUSE_BALANCE = 1 << 8;
  const EARLY_SUPPORTER = 1 << 9;
  const BUG_HUNTER_LEVEL_2 = 1 << 14;
  const VERIFIED_BOT_DEVELOPER = 1 << 17;
  const ACTIVE_DEVELOPER = 1 << 22;
  
  if (publicFlags & DISCORD_EMPLOYEE) {
    badges.push({ id: '1', name: 'Discord Staff', icon: 'https://cdn.discordapp.com/emojis/314003252830011395.png' });
  }
  
  if (publicFlags & DISCORD_PARTNER) {
    badges.push({ id: '2', name: 'Discord Partner', icon: 'https://cdn.discordapp.com/emojis/314003752484511746.png' });
  }
  
  if (publicFlags & HYPESQUAD_EVENTS) {
    badges.push({ id: '3', name: 'HypeSquad Events', icon: 'https://cdn.discordapp.com/emojis/314006263571079168.png' });
  }
  
  if (publicFlags & BUG_HUNTER_LEVEL_1) {
    badges.push({ id: '4', name: 'Bug Hunter', icon: 'https://cdn.discordapp.com/emojis/585765889162518539.png' });
  }
  
  if (publicFlags & HOUSE_BRAVERY) {
    badges.push({ id: '5', name: 'HypeSquad Bravery', icon: 'https://cdn.discordapp.com/emojis/314003252389535754.png' });
  }
  
  if (publicFlags & HOUSE_BRILLIANCE) {
    badges.push({ id: '6', name: 'HypeSquad Brilliance', icon: 'https://cdn.discordapp.com/emojis/314003252047536138.png' });
  }
  
  if (publicFlags & HOUSE_BALANCE) {
    badges.push({ id: '7', name: 'HypeSquad Balance', icon: 'https://cdn.discordapp.com/emojis/314003252828528640.png' });
  }
  
  if (publicFlags & EARLY_SUPPORTER) {
    badges.push({ id: '8', name: 'Early Supporter', icon: 'https://cdn.discordapp.com/emojis/585828293445500936.png' });
  }
  
  if (publicFlags & BUG_HUNTER_LEVEL_2) {
    badges.push({ id: '9', name: 'Bug Hunter Level 2', icon: 'https://cdn.discordapp.com/emojis/657238493949280257.png' });
  }
  
  if (publicFlags & VERIFIED_BOT_DEVELOPER) {
    badges.push({ id: '10', name: 'Verified Bot Developer', icon: 'https://cdn.discordapp.com/emojis/780794138227146812.png' });
  }
  
  if (publicFlags & ACTIVE_DEVELOPER) {
    badges.push({ id: '11', name: 'Active Developer', icon: 'https://cdn.discordapp.com/emojis/1095735327399006218.png' });
  }
  
  return badges;
}

// Helper function to calculate the account creation date from a Discord snowflake ID
function calculateCreationDate(userId: string): string {
  // Discord's epoch (January 1, 2015)
  const DISCORD_EPOCH = 1420070400000;
  
  // Convert to a BigInt since Discord IDs are 64-bit integers
  const id = BigInt(userId);
  
  // Shift right by 22 bits to get the timestamp
  const timestamp = Number((id >> 22n) + BigInt(DISCORD_EPOCH));
  
  // Convert to Date
  const date = new Date(timestamp);
  
  return date.toISOString();
}
