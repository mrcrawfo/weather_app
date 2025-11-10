import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

export const ForecastDay = ({ day }: any) => {
    return (
        <ListItem key={day.startTime}>
            <ListItemButton className="flex flex-row items-justify-start gap-4">
                <ListItemIcon>
                    <img src={day.icon} alt={day.shortForecast} />
                </ListItemIcon>
                <ListItemText className="flex flex-col m-y-2">
                    <Typography variant="h4">{day.name}</Typography>
                    <Typography variant="body1">{day.shortForecast} - {day.temperature}° {day.temperatureUnit}</Typography>
                    <Typography variant="subtitle1">Wind: {day.windSpeed} {day.windDirection}</Typography>
                    <Typography variant="subtitle1">{day.detailedForecast}</Typography>
                    <Typography variant="subtitle1">{day.probabilityOfPrecipitation.value}% chance of precipitation</Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
};

export default ForecastDay;
