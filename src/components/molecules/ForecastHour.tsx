import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { WeatherIcon } from '../atoms/WeatherIcon';

export const ForecastHour = ({ hour }: any) => {
    const formatHourTime = (isoString: string) => {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} - ${formattedHours}:${formattedMinutes}${ampm}`;
    };

    return (
        <ListItem key={hour.startTime} sx={{ position: 'relative', overflow: 'hidden', p: 0 }}>
            {/* background image is a stretched and blurred version of the NWS icon at low opacity to provide some visual theming to the forecast card */}
            <div aria-hidden="true" className="absolute top-0 left-0 w-full h-full bg-center bg-cover filter blur-lg opacity-30 z-0" style={{ backgroundImage: `url(${hour.icon})` }} />
            <ListItemButton className="flex flex-row items-justify-start gap-4">
                <ListItemIcon>
                    <WeatherIcon shortForecast={hour.shortForecast} size={60} />
                </ListItemIcon>
                <ListItemText className="flex flex-col m-y-2">
                    <Typography variant="h6">{formatHourTime(hour.startTime)} - {hour.shortForecast}, {hour.temperature}° {hour.temperatureUnit}</Typography>
                    <Typography variant="body1">Wind: {hour.windSpeed} {hour.windDirection}, {hour.probabilityOfPrecipitation.value}% chance of precipitation</Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
};

export default ForecastHour;
