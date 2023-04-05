import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ThemeProvider } from "@mui/material";
import themeStyle from "../ThemeStyle/themeStyle";
import { makeStyles } from "@material-ui/core/styles";

const useStylesBtnLoad = makeStyles({
  wrapper: {
    width: "300px",
    marginBottom: "20px",
  },
  btnLoading: {
    width: "100%",
    background: "#fff !important",
    border: "1px solid #f7c0c4 !important",
    color: "white",
    padding: "0px 0px 0px 15px",
  },
});

export default function ButtonLoadMore() {
  const classes = useStylesBtnLoad();

  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(true);
  }

  return (
    <ThemeProvider theme={themeStyle}>
      <Box className={classes.wrapper}>
        <FormControlLabel
          sx={{
            display: "block",
          }}
          control={
            <Switch
              checked={loading}
              onChange={() => setLoading(!loading)}
              name="loading"
              color="primary"
            />
          }
          label="Loading"
        />

        <Box className={classes.wrapper} sx={{ "& > button": { m: 0 } }}>
          <LoadingButton
            className={classes.btnLoading}
            size="small"
            onClick={handleClick}
            loading={loading}
            variant="outlined"
            // disabled
          >
            {!loading ? (
              <span style={{ color: "#F66962" }}>Load More</span>
            ) : (
              <span>Load More</span>
            )}
          </LoadingButton>
        </Box>

        {/* <Box sx={{ '& > button': { m: 1 } }}>
                <LoadingButton
                    onClick={handleClick}
                    loading={loading}
                    variant="outlined"
                    disabled
                >
                    <span>disabled</span>
                </LoadingButton>
                <LoadingButton
                    onClick={handleClick}
                    loading={loading}
                    loadingIndicator="Loading…"
                    variant="outlined"
                >
                    <span>Fetch data</span>
                </LoadingButton>
                <LoadingButton
                    onClick={handleClick}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    <span>Send</span>
                </LoadingButton>
                <LoadingButton
                    color="secondary"
                    onClick={handleClick}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Box> */}
      </Box>
    </ThemeProvider>
  );
}
