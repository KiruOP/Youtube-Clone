// timeUtils.js
export function isWithinAllowedTime() {
    const currentHour = new Date().getHours();
    return currentHour >= 18 || currentHour < 0; // 6 PM to 12 AM
}