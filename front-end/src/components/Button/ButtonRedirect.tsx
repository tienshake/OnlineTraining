import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import themeStyle from "../ThemeStyle/themeStyle";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStylesBtnLoad = makeStyles({
    wrapper: {
        width: "300px",
        marginBottom: "20px",
    },
    btnLoading: {
        width: "100%",
        background: "#fff !important",
        border: "1px solid #f7c0c4 !important",
        color: "#F66962",
        padding: "0px 0px 0px 15px",
    },
});

interface MyButtonRedirectProps {
    path: string;
}

export default function ButtonRedirect(props: MyButtonRedirectProps) {
    const classes = useStylesBtnLoad();

    return (
        <ThemeProvider theme={themeStyle}>
            <Link to={props.path}>
                <Box className={classes.wrapper}>

                    <Box className={classes.wrapper} sx={{ "& > button": { m: 0 } }}>
                        <LoadingButton
                            className={classes.btnLoading}
                            size="small"
                            variant="outlined"
                        >
                            <span>Show More</span>
                        </LoadingButton>
                    </Box>
                </Box>
            </Link>
        </ThemeProvider>
    );
}
