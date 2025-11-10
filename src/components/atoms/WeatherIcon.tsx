import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CircularProgress } from '@mui/material';

export const WeatherIcon = ({ shortForecast, size = 100 }: { shortForecast: string, size?: number }) => {
    // Map common shortForecast values to LottieFiles icons (note that it will take the first match found, so order matters for higher specificity)
    const iconMap: { [key: string]: string } = {
        'mostly sunny': 'weather_icons/sunny.lottie',
        'partly sunny': 'weather_icons/partly_cloudy.lottie',
        'sunny': 'weather_icons/sunny.lottie',
        'mostly cloudy': 'weather_icons/partly_cloudy.lottie',
        'partly cloudy': 'weather_icons/partly_cloudy.lottie',
        'cloudy': 'weather_icons/partly_cloudy.lottie',
        'thunder': 'weather_icons/thunder.lottie',
        'rain': 'weather_icons/storm.lottie',
        'storm': 'weather_icons/storm.lottie',
        'snow': 'weather_icons/snow.lottie',
        'frost': 'weather_icons/snow.lottie',
        'fog': 'weather_icons/foggy.lottie',
        'wind': 'weather_icons/windy.lottie',
        'clear': 'weather_icons/sunny.lottie',
        // Add more mappings as needed
    };

    // Post an error to the console if no exact match is found so that the unmatched cases can be logged during development and suitable mappings found
    if (!Object.keys(iconMap).some(key => new RegExp(key, 'i').test(shortForecast))) {
        console.error(`No matching icon for shortForecast: "${shortForecast}"`);
    }

    // Find the first matching icon based on regex
    const matchedIcon = Object.entries(iconMap).find(([key]) => new RegExp(key, 'i').test(shortForecast));

    const iconUrl = matchedIcon ? matchedIcon[1] : null;

    return (
        <div style={{ width: size, height: size, zIndex: 100 }}>
            {!iconUrl && (
                <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', borderRadius: '8px' }}>
                    {/* Using a CircularProgress spinner as a fallback when no appropriate icon is found */}
                    <CircularProgress size={Math.max(12, Math.round(size * 0.6))} />
                </div>
            )}
            {iconUrl && (
                <DotLottieReact
                    src={iconUrl}
                    style={{ width: '100%', height: '100%', zIndex: 100 }}
                    loop
                    autoplay
                />
            )}
        </div>
    );
};

export default WeatherIcon;
