
import { getUserById, checkVanityUrl } from '../services/discord-api';

// Rate limiting configuration
const rateLimits: Record<string, { count: number, resetTime: number }> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

// Check if user is rate limited
const isRateLimited = (ipAddress: string): boolean => {
  const now = Date.now();
  
  // Reset rate limit if window has passed
  if (rateLimits[ipAddress] && now > rateLimits[ipAddress].resetTime) {
    delete rateLimits[ipAddress];
  }
  
  // Initialize rate limit for new IP
  if (!rateLimits[ipAddress]) {
    rateLimits[ipAddress] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW
    };
  }
  
  // Increment count and check limit
  rateLimits[ipAddress].count++;
  return rateLimits[ipAddress].count > MAX_REQUESTS;
};

// Handler for user search
export const handleUserSearch = async (userId: string, ipAddress: string): Promise<any> => {
  // Check rate limit
  if (isRateLimited(ipAddress)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  try {
    return await getUserById(userId);
  } catch (error) {
    console.error('Error in user search handler:', error);
    throw error;
  }
};

// Handler for vanity URL check
export const handleVanityCheck = async (vanityCode: string, ipAddress: string): Promise<any> => {
  // Check rate limit
  if (isRateLimited(ipAddress)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  try {
    return await checkVanityUrl(vanityCode);
  } catch (error) {
    console.error('Error in vanity check handler:', error);
    throw error;
  }
};
