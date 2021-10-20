import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
    palette: {
        primary: {
            main: "#8d191d"
        }
    }
});
const divStyle = {
    width: "100%",
    "text-align": "center",
    margin: "0 auto"
}

const Loader: FC<{}> = () => {
    return (
        <div style={divStyle}>
            <ThemeProvider theme={theme}>
                <CircularProgress color="primary" />
            </ThemeProvider>
        </div>)
}

export default Loader;