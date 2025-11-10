import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LocationPinIcon from '@mui/icons-material/LocationPin';

import type { USLocation } from '../../types/forecast';

export const Location = ({ location }: { location: USLocation }) => {
  return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <LocationPinIcon />
                </ListItemIcon>
                <ListItemText primary={location.name} />
            </ListItemButton>
        </ListItem>
    );
};

export default Location;
