import {createTheme} from "@mui/material";

const primary = '#1976d2';

export default createTheme({
    typography:{
        allVariants:{
            color: 'white',
            fontFamily: "Vazirmatn FD , sans-serif"
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    backgroundColor: "white",
                },
            },
        },
        MuiSvgIcon:{
            styleOverrides: {
                root: {
                    color: "white",
                },
            },
        },
        MuiButtonBase:{
            styleOverrides:{
                root:{
                    backgroundColor: primary
                }
            }
        },
        MuiFormLabel:{
            styleOverrides: {
                root: {
                    color: "black",
                },
            },
        }
    },
});