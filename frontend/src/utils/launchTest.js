// Test utility for launch date functionality
import { isLaunched, getLaunchBadge, getLaunchStatus, APP_CONSTANTS } from '../constants';

export const testLaunchLogic = () => {
  const currentDate = new Date();
  const launchDate = new Date(APP_CONSTANTS.LAUNCH_DATE);
  
  console.log('=== Launch Date Test ===');
  console.log('Current Date:', currentDate.toDateString());
  console.log('Launch Date:', launchDate.toDateString());
  console.log('Is Launched:', isLaunched());
  console.log('Launch Badge:', getLaunchBadge());
  console.log('Launch Status:', getLaunchStatus());
  console.log('Days until launch:', Math.ceil((launchDate - currentDate) / (1000 * 60 * 60 * 24)));
  console.log('=======================');
  
  return {
    currentDate: currentDate.toDateString(),
    launchDate: launchDate.toDateString(),
    isLaunched: isLaunched(),
    launchBadge: getLaunchBadge(),
    launchStatus: getLaunchStatus(),
    daysUntilLaunch: Math.ceil((launchDate - currentDate) / (1000 * 60 * 60 * 24))
  };
};

// Test with different dates
export const testWithDate = (testDate) => {
  const originalDate = Date;
  global.Date = class extends Date {
    constructor(...args) {
      if (args.length === 0) {
        return new originalDate(testDate);
      }
      return new originalDate(...args);
    }
  };
  
  const result = testLaunchLogic();
  
  // Restore original Date
  global.Date = originalDate;
  
  return result;
}; 