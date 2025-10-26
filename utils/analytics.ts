import type { AnalyticsData } from '../types';

const ANALYTICS_KEY = 'terminalPortfolioAnalytics';

// Helper to get today's date in YYYY-MM-DD format
const getTodayDateString = (): string => new Date().toISOString().split('T')[0];

// Helper to safely get and parse data from localStorage
const getAnalyticsData = (): AnalyticsData | null => {
    try {
        const data = localStorage.getItem(ANALYTICS_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Failed to parse analytics data from localStorage", error);
        return null;
    }
};

// Helper to save data to localStorage
const setAnalyticsData = (data: AnalyticsData): void => {
    try {
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save analytics data to localStorage", error);
    }
};

export const initAnalytics = (): void => {
    let data = getAnalyticsData();
    const today = getTodayDateString();

    if (!data) {
        // First visit ever
        data = {
            totalVisitors: 1,
            todayVisitors: 1,
            lastVisitDate: today,
            commandCounts: {},
            sessionStartTime: Date.now(),
            totalSessionDuration: 0,
            sessionCount: 1,
        };
    } else {
        // Returning visitor
        if (data.lastVisitDate !== today) {
            data.totalVisitors += 1;
            data.todayVisitors = 1;
            data.lastVisitDate = today;
        } else {
            data.todayVisitors += 1;
        }
        data.sessionCount += 1;
        data.sessionStartTime = Date.now();
    }
    setAnalyticsData(data);
};

export const trackCommand = (command: string): void => {
    const data = getAnalyticsData();
    if (!data) return;

    const cmd = command.toLowerCase().split(' ')[0];
    data.commandCounts[cmd] = (data.commandCounts[cmd] || 0) + 1;
    setAnalyticsData(data);
};

export const trackSessionEnd = (): void => {
    const data = getAnalyticsData();
    if (!data || !data.sessionStartTime) return;

    const sessionDuration = Date.now() - data.sessionStartTime;
    data.totalSessionDuration += sessionDuration;
    // Reset session start time to prevent double counting on refresh
    data.sessionStartTime = 0; 
    setAnalyticsData(data);
};

// Helper to format milliseconds to a readable string
const formatDuration = (ms: number): string => {
    if (isNaN(ms) || ms < 0) return '0s';
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
};

export const getStats = () => {
    const data = getAnalyticsData();
    if (!data) return null;

    const popularCommands = Object.entries(data.commandCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5); // Get top 5

    const avgSessionTime = data.sessionCount > 0 
        ? formatDuration(data.totalSessionDuration / data.sessionCount)
        : '0s';

    return {
        totalVisitors: data.totalVisitors,
        todayVisitors: data.todayVisitors,
        popularCommands,
        avgSessionTime,
    };
};
