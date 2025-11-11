import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, ButtonGroup, List, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FavoriteLocation from '../atoms/FavoriteLocation';
import useFavoriteLocations from '../../hooks/useFavoriteLocations';
import useGeocoding from '../../hooks/useGeocoding';
import type { USLocation } from '../../types/forecast';

export const LocationSelector = ({ locationName, setPrimaryLocation }: { locationName: string | null, setPrimaryLocation: (location: { lat: number, lng: number, city?: string, state?: string }) => void }) => {
  const [usingGeolocation, setUsingGeolocation] = useState<boolean>(true);

  const { favoriteLocations, addFavoriteLocation, removeFavoriteLocation } = useFavoriteLocations();
  const { USLocations } = useGeocoding();

  const [selectedLocation, setSelectedLocation] = useState<USLocation | null>(null);

  const handleLocationClick = (newLocation: USLocation) => {
    if (newLocation.lat && newLocation.lng && newLocation.city && newLocation.state && (`${newLocation.city}, ${newLocation.state}` !== locationName)) {
      setUsingGeolocation(false);
      setPrimaryLocation({ lat: parseFloat(newLocation.lat), lng: parseFloat(newLocation.lng), city: newLocation.city, state: newLocation.state });
    }
  };

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
                          const newLocation = USLocations.find((loc) => loc.name === value);
                          setSelectedLocation(newLocation || null);
                          if (newLocation && newLocation.lat && newLocation.lng && newLocation.city && newLocation.state && (`${newLocation.city}, ${newLocation.state}` !== locationName)) {
                            setPrimaryLocation({ lat: parseFloat(newLocation.lat), lng: parseFloat(newLocation.lng), city: newLocation.city, state: newLocation.state });
                          }
                          console.log('Selected location set to:', selectedLocation);
                        }}
                        renderInput={(params) => <TextField {...params} label="Enter custom location" />}
                      />
                      {selectedLocation && (!favoriteLocations.find((loc) => loc.name === selectedLocation.name) && (
                        <FavoriteLocation key={selectedLocation.name} onClick={() => handleLocationClick(selectedLocation)} location={selectedLocation} favoriteLocations={favoriteLocations} addFavoriteLocation={addFavoriteLocation} removeFavoriteLocation={removeFavoriteLocation} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                {favoriteLocations.length > 0 && (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Saved Locations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {favoriteLocations.map((location) => (
                          <FavoriteLocation key={location.name} onClick={() => handleLocationClick(location)} location={location} favoriteLocations={favoriteLocations} addFavoriteLocation={addFavoriteLocation} removeFavoriteLocation={removeFavoriteLocation} />
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                )}
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
