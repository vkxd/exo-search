
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

// Mock data for development since Discord API requires auth
const generateMockUserData = (userId: string) => {
  // Create deterministic but seemingly random data based on userId
  const hashCode = (s: string) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0);
  const hash = Math.abs(hashCode(userId));
  
  // Select avatar based on hash
  const avatarNum = hash % 5; // 5 different default avatars
  
  // Generate badges based on userId
  const badgeCount = hash % 4;
  const possibleBadges = [
    { id: '1', name: 'Discord Staff', icon: 'https://cdn.discordapp.com/emojis/314003252830011395.png' },
    { id: '2', name: 'Discord Partner', icon: 'https://cdn.discordapp.com/emojis/314003752484511746.png' },
    { id: '3', name: 'HypeSquad Events', icon: 'https://cdn.discordapp.com/emojis/314006263571079168.png' },
    { id: '4', name: 'Bug Hunter', icon: 'https://cdn.discordapp.com/emojis/585765889162518539.png' },
    { id: '5', name: 'HypeSquad Bravery', icon: 'https://cdn.discordapp.com/emojis/314003252389535754.png' },
    { id: '6', name: 'HypeSquad Brilliance', icon: 'https://cdn.discordapp.com/emojis/314003252047536138.png' },
  ];
  
  const badges = [];
  for (let i = 0; i < badgeCount; i++) {
    badges.push(possibleBadges[hash % possibleBadges.length]);
  }
  
  // Generate creation date (between 2016 and 2023)
  const year = 2016 + (hash % 8); // 2016-2023
  const month = 1 + (hash % 12); // 1-12
  const day = 1 + (hash % 28); // 1-28
  const creationDate = new Date(year, month - 1, day).toISOString();
  
  // Generate username (deterministic but seems random)
  const usernamePrefixes = ['Cosmic', 'Shadow', 'Pixel', 'Neon', 'Glitch', 'Echo', 'Cyber', 'Quantum'];
  const usernameSuffixes = ['Wizard', 'Knight', 'Hunter', 'Master', 'Ninja', 'Warrior', 'Coder', 'Phoenix'];
  const usernamePrefix = usernamePrefixes[hash % usernamePrefixes.length];
  const usernameSuffix = usernameSuffixes[(hash >> 4) % usernameSuffixes.length];
  const usernameNumber = hash % 10000;
  
  return {
    username: `${usernamePrefix}${usernameSuffix}${usernameNumber}`,
    id: userId,
    avatar: `https://cdn.discordapp.com/embed/avatars/${avatarNum}.png`,
    banner: hash % 3 === 0 ? `https://picsum.photos/seed/${userId}/1024/300` : null,
    bio: hash % 5 === 0 ? "No bio available" : `Hi, I'm a Discord user with ID ${userId.substring(0, 4)}...`,
    badges: badges,
    createdAt: creationDate,
  };
};

// Get user info by ID
export const getUserById = async (userId: string): Promise<any> => {
  const cacheKey = `user_${userId}`;
  
  // Check cache first
  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }
  
  try {
    // Instead of making real API calls (which will fail with 401), 
    // generate mock data for development purposes
    const userData = generateMockUserData(userId);
    
    // Update cache
    cache[cacheKey] = {
      data: userData,
      timestamp: Date.now()
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Mock data for vanity URL checking
const generateMockVanityData = (vanityCode: string) => {
  // Create deterministic but seemingly random result based on vanityCode
  const hashCode = (s: string) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0);
  const hash = Math.abs(hashCode(vanityCode));
  
  // Decide if vanity is available (30% chance it's available)
  const isAvailable = hash % 10 < 3;
  
  if (isAvailable) {
    return { isAvailable: true, serverInfo: null };
  } else {
    // Generate server info
    const serverNames = ['Cosmic Coders', 'Gaming Hub', 'Developer Den', 'Chill Zone', 'Art Gallery', 'Music Lounge'];
    const serverName = serverNames[hash % serverNames.length];
    
    return {
      isAvailable: false,
      serverInfo: {
        name: `${serverName} #${hash % 1000}`,
        icon: `https://picsum.photos/seed/${vanityCode}/256/256`,
        memberCount: 1000 + (hash % 50000),
      }
    };
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
    // Instead of real API calls, use mock data
    const serverData = generateMockVanityData(vanityCode);
    
    // Update cache
    cache[cacheKey] = {
      data: serverData,
      timestamp: Date.now()
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return serverData;
  } catch (error) {
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
