import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LocationPinIcon from '@mui/icons-material/LocationPin';

import type { USLocation } from '../../types/forecast';

export const FavoriteLocation = ({ onClick, location, favoriteLocations, addFavoriteLocation, removeFavoriteLocation }: { onClick: () => void, location: USLocation, favoriteLocations: USLocation[], addFavoriteLocation: (location: USLocation) => void, removeFavoriteLocation: (location: USLocation) => void }) => {
  return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClick}>
                <ListItemIcon>
                    <LocationPinIcon />
                </ListItemIcon>
                <ListItemText primary={location.name} />
                <Button variant="contained" size="small" color={favoriteLocations.find((loc) => loc.name === location.name) ? 'warning' : 'primary'}
                  onClick={() => {
                    if (favoriteLocations.find((loc) => loc.name === location.name)) {
                      removeFavoriteLocation(location);
                    } else {
                      addFavoriteLocation(location);
                    }
                  }}
                >
                  {favoriteLocations.find((loc) => loc.name === location.name) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </ListItemButton>
        </ListItem>
    );
};

export default FavoriteLocation;
