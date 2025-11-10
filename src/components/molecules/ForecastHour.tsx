import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

export const ForecastHour = ({ hour }: any) => {
    const formatHourTime = (isoString: string) => {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} - ${formattedHours}:${formattedMinutes}${ampm}`;
    };

    return (
        <ListItem key={hour.startTime}>
            <ListItemButton className="flex flex-row items-justify-start gap-4">
                <ListItemIcon>
                    <img src={hour.icon} alt={hour.shortForecast} />
                </ListItemIcon>
                <ListItemText className="flex flex-col m-y-2">
                    <Typography variant="h5">{formatHourTime(hour.startTime)}</Typography>
                    <Typography variant="h6">{hour.shortForecast} - {hour.temperature}° {hour.temperatureUnit}</Typography>
                    <Typography variant="body1">Wind: {hour.windSpeed} {hour.windDirection}, {hour.probabilityOfPrecipitation.value}% chance of precipitation</Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
};

export default ForecastHour;
