import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useGeocoding from '../../hooks/useGeocoding';
import LocationView from '../molecules/LocationView';
import { ComparisonGraph } from '../molecules/ComparisonGraph';

type ComparisonViewProps = {
    primaryForecast: any;
    primaryForecastHourly: any;
    primaryLocationCity: string | null;
    primaryLocationState: string | null;
    primaryLoading: boolean;
    secondaryForecast: any;
    secondaryForecastHourly: any;
    secondaryLocationForecastCity: string | null;
    secondaryLocationForecastState: string | null;
    secondaryLoading: boolean;
    setSecondaryLocation: (location: { lat: number, lng: number, city?: string, state?: string }) => void;
};

export const ComparisonView = ({ primaryForecast, primaryForecastHourly, primaryLocationCity, primaryLocationState, primaryLoading, secondaryForecast, secondaryForecastHourly, secondaryLocationForecastCity, secondaryLocationForecastState, secondaryLoading, setSecondaryLocation }: ComparisonViewProps) => {
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
                            sx={{ margin: '8px' }}
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
                            renderInput={(params) => <TextField {...params} label="Enter comparison location" />}
                        />
                    </div>
                </div>
              </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly">
            <LocationView
              forecast={primaryForecast}
              forecastHourly={primaryForecastHourly}
              locationCity={primaryLocationCity}
              locationState={primaryLocationState}
              loading={primaryLoading}
            />
            <LocationView
              forecast={secondaryForecast}
              forecastHourly={secondaryForecastHourly}
              locationCity={secondaryLocationForecastCity}
              locationState={secondaryLocationForecastState}
              loading={secondaryLoading}
            />
          </div>
          {(primaryForecastHourly && secondaryForecastHourly && primaryForecastHourly.properties.periods.length > 0 && secondaryForecastHourly.properties.periods.length > 0 && primaryLocationCity && primaryLocationState && secondaryLocationForecastCity && secondaryLocationForecastState) ? (
            <ComparisonGraph primaryForecastHourly={primaryForecastHourly} secondaryForecastHourly={secondaryForecastHourly} primaryForecastCity={primaryLocationCity} primaryForecastState={primaryLocationState} secondaryForecastCity={secondaryLocationForecastCity} secondaryForecastState={secondaryLocationForecastState} />
          ): (
            <div className="w-full h-80 bg-gray-200 rounded-md items-center justify-center flex mt-4">
              <Typography variant="body1" align="center">Enter a comparison location to see the comparison graph.</Typography>
            </div>
          )}
        </AccordionDetails>
    </Accordion>
  );
};

export default ComparisonView;
