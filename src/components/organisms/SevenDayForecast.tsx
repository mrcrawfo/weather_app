import { useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, List, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ForecastDay from '../molecules/ForecastDay';

export const SevenDayForecast = ({ forecast }: any ) => {
    const days = useMemo(() => {
        console.log('SevenDayForecast received forecast:', forecast?.properties?.periods);
        const periods = forecast?.properties?.periods || [];
        const sevenDays = periods.reduce((acc: any[], period: any) => {
            if (acc.length >= 7) return acc;
            if (period?.isDaytime || period?.name === 'Overnight') {
                acc.push(period);
            }
            return acc;
        }, []);
        return sevenDays;
    }, [forecast]);

    return (
        <Accordion expanded={forecast != null}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">7-Day Forecast</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="prose">
                    {days.length > 0 && (
                        <List>
                        {days.map((day: any) => (
                            <ForecastDay key={day.startTime} day={day} />
                        ))}
                        </List>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    )
};

export default SevenDayForecast;
