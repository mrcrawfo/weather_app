import { useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ForecastHour from '../molecules/ForecastHour';

export const HourlyForecast = ({ forecast }: any ) => {
    const hours = useMemo(() => {
        console.log('HourlyForecast received forecast:', forecast?.properties?.periods);
        const periods = forecast?.properties?.periods || [];
        const seventyTwoHours = periods.reduce((acc: any[], period: any) => {
            if (acc.length >= 72) return acc;
            acc.push(period);
            return acc;
        }, []);
        return seventyTwoHours;
    }, [forecast]);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Hourly Forecast</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="prose max-h-[40vh] overflow-y-auto">
                    {hours.length > 0 && (
                        <List>
                        {hours.map((hour: any) => (
                            <ForecastHour key={hour.startTime} hour={hour} />
                        ))}
                        </List>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    )
};

export default HourlyForecast;
