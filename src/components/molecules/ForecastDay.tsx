import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

export const ForecastDay = ({ day }: any) => {
    return (
        <ListItem key={day.startTime}>
            <ListItemButton className="flex flex-row items-justify-start gap-4">
                <ListItemIcon>
                    <img src={day.icon} alt={day.shortForecast} />
                </ListItemIcon>
                <ListItemText className="flex flex-col m-y-2">
                    <Typography variant="h5">{day.name}</Typography>
                    <Typography variant="h6">{day.shortForecast} - {day.temperature}° {day.temperatureUnit}</Typography>
                    <Typography variant="body1">Wind: {day.windSpeed} {day.windDirection}, {day.probabilityOfPrecipitation.value}% chance of precipitation</Typography>
                    <Typography variant="body2">{day.detailedForecast}</Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
};

export default ForecastDay;
