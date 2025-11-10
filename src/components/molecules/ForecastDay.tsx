import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { WeatherIcon } from '../atoms/WeatherIcon';

export const ForecastDay = ({ day }: any) => {
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    };

    return (
        <ListItem key={day.startTime} sx={{ position: 'relative', overflow: 'hidden', p: 0 }}>
            {/* background image is a stretched and blurred version of the NWS icon at low opacity to provide some visual theming to the forecast card */}
            <div aria-hidden="true" className="absolute top-0 left-0 w-full h-full bg-center bg-cover filter blur-lg opacity-30 z-0" style={{ backgroundImage: `url(${day.icon})` }} />
            <ListItemButton className="flex flex-row items-justify-start gap-4" sx={{ position: 'relative', zIndex: 1 }}>
                <ListItemIcon>
                    <WeatherIcon shortForecast={day.shortForecast} size={80} />
                </ListItemIcon>
                <ListItemText className="flex flex-col m-y-2">
                    <Typography variant="h6" className="font-bold">{day.name}, {formatDate(day.startTime)} - {day.shortForecast}, {day.temperature}° {day.temperatureUnit}</Typography>
                    <Typography variant="body1">Wind: {day.windSpeed} {day.windDirection}, {day.probabilityOfPrecipitation.value}% chance of precipitation</Typography>
                    <Typography variant="body2">{day.detailedForecast}</Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
};

export default ForecastDay;
