import { createTheme } from '@mui/material';

const Theme = createTheme(
    {
        typography: {
            fontFamily: 'Roboto, Arial, sans-serif',
            h1: {
                fontSize: '2.5rem',
            },
        },
        colorSchemes: {
            dark: true,
        },
    }
);

export default Theme;
