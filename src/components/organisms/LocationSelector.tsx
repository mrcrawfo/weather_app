import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, ButtonGroup, List, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Location from '../atoms/Location';
import useFavoriteLocations from '../../hooks/useFavoriteLocations';
import useGeocoding from '../../hooks/useGeocoding';

export const LocationSelector = ({ locationName }: { locationName: string | null }) => {
  const [usingGeolocation, setUsingGeolocation] = useState<boolean>(true);

  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocation } = useFavoriteLocations();
  const { USLocations } = useGeocoding();

  return (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {locationName ? (
          <Typography variant="h6">{locationName}</Typography>
        ) : (
          <Typography variant="h6" className="animate-pulse font-stretch-semi-expanded font-thin">Loading location...</Typography>
        )}
        </AccordionSummary>
        <AccordionDetails>
          <div className="prose">
              <div>
                <div className="flex items-center gap-2">
                  <ButtonGroup variant="outlined" aria-label="location source toggle">
                    <Button
                      variant={usingGeolocation ? 'contained' : 'outlined'}
                      onClick={() => setUsingGeolocation(true)}
                    >
                      Geolocation
                    </Button>
                    <Button
                      variant={!usingGeolocation ? 'contained' : 'outlined'}
                      onClick={() => setUsingGeolocation(false)}
                    >
                      Custom Location
                    </Button>
                  </ButtonGroup>
                </div>

                <div className="mt-3">
                  {usingGeolocation ? (
                    <Typography variant="body2">Using device geolocation...</Typography>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {/* Autocomplete for custom location input, using locations precompiled from country-state-city via useGecoding */}
                      <Autocomplete
                        options={USLocations.map((l) => l.name)}
                        onInputChange={(_, value) => {
                          // TODO: Handle input/location change
                          console.log('Custom location input changed to:', value);
                        }}
                        renderInput={(params) => <TextField {...params} label="Enter custom location" />}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                {favoriteLocations.map((location) => (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Saved Locations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <Location key={location.name} location={location} />
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
                {favoriteLocations.length === 0 && (
                  <Typography variant="h6">No saved locations.</Typography>
                )}
              </div>
          </div>
        </AccordionDetails>
    </Accordion>
  );
};

export default LocationSelector;
