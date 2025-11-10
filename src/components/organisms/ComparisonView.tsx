import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useGeocoding from '../../hooks/useGeocoding';

type ComparisonViewProps = {
    forecast: any;
    forecastHourly: any;
    primaryLocationCity: string | null;
    primaryLocationState: string | null;
    secondaryForecast: any;
    secondaryForecastHourly: any;
    secondaryLocationForecastCity: string | null;
    secondaryLocationForecastState: string | null;
    setSecondaryLocation: (location: { lat: number, lng: number, city?: string, state?: string }) => void;
};

export const ComparisonView = ({ forecast, forecastHourly, primaryLocationCity, primaryLocationState, secondaryForecast, secondaryForecastHourly, secondaryLocationForecastCity, secondaryLocationForecastState, setSecondaryLocation }: ComparisonViewProps) => {
  const { USLocations } = useGeocoding();

  return (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Comparison View</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="prose">
              <div>
                <div className="mt-3">
                    <div className="flex flex-col gap-2">
                        {/* Autocomplete for custom location input, using locations precompiled from country-state-city via useGecoding */}
                        <Autocomplete
                            options={USLocations.map((l) => l.name)}
                            onInputChange={(_, value) => {
                                // TODO: Handle input/location change
                                console.log('Custom location input changed to:', value);
                                const selectedLocation = USLocations.find((l) => l.name === value);
                                if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
                                    setSecondaryLocation({ lat: parseFloat(selectedLocation.lat), lng: parseFloat(selectedLocation.lng), city: selectedLocation.city, state: selectedLocation.state });
                                    console.log('Selected location set to:', selectedLocation);
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Enter custom location" />}
                        />
                    </div>
                </div>
              </div>
          </div>
        </AccordionDetails>
    </Accordion>
  );
};

export default ComparisonView;
