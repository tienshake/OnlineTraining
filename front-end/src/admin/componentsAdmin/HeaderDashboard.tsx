import { Box, Grid, Button, Stack, Typography } from "@mui/material";
import { AiFillBell } from "react-icons/ai";
import { BsFillInfoSquareFill } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDataSearch } from "../../redux/features/search/searchSlice";
import { useLocation } from "react-router-dom";

export default function HeaderDashboard() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const categoryTitle = pathParts[pathParts.length - 1];

  const [textSearch, setTextSearch] = useState<string>("");
  const [errMessSearch, setErrMessSearch] = useState<string>("");

  const dispatch = useDispatch();

  const handleChangeInputSearch = (e: any) => {
    setTextSearch(e.target.value);
    if (e.target.value) {
      setErrMessSearch("");
    }
  };

  const handleClickSearch = () => {
    if (textSearch) {
      dispatch(
        getDataSearch({
          text: textSearch,
          path: categoryTitle,
        })
      ).then((res: any) => {
        if (res.payload && res.payload.data && res.payload.data.length === 0) {
          setErrMessSearch("Not found");
        }
      });
    } else {
      setErrMessSearch("You have not entered information");
    }
  };

  return (
    <div style={{ width: "99%" }}>
      <Box mb={7} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4} xl={4}>
            <Stack direction={"row"} gap={2}>
              <input
                onChange={handleChangeInputSearch}
                value={textSearch}
                placeholder="Search"
                style={{
                  paddingRight: 0,
                  padding: "8px",
                  width: "98%",
                  height: "30px",
                  border: "none",
                  background: "#EEEEEE",
                }}
              />
              <Button onClick={handleClickSearch} variant="contained">
                <SearchIcon />
              </Button>
            </Stack>
            <Typography style={{ color: "red", fontSize: "12px" }} padding={1}>
              {errMessSearch}
            </Typography>
          </Grid>

          <Grid m={"auto"} mr={0} item xs={6} md={6}>
            <div className="" style={{ marginLeft: "10px", display: "flex" }}>
              <p
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  width: "10%",
                  padding: "10px",
                }}
              >
                <BsFillInfoSquareFill />
              </p>

              <div
                style={{
                  display: "flex",
                  position: "relative",
                  width: "40%",
                  padding: "4px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "2px solid rgb(211, 207, 207)",
                    borderRadius: "50%",
                    position: "absolute",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="complex"
                    src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg"
                  />
                </div>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "2px solid rgb(211, 207, 207)",
                    borderRadius: "50%",
                    position: "absolute",
                    marginLeft: "17px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="complex"
                    src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/xs/avatar4.jpg"
                  />
                </div>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "2px solid rgb(211, 207, 207)",
                    borderRadius: "50%",
                    position: "absolute",
                    marginLeft: "34px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="complex"
                    src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/xs/avatar2.jpg"
                  />
                </div>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "2px solid rgb(211, 207, 207)",
                    borderRadius: "50%",
                    position: "absolute",
                    marginLeft: "50px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="complex"
                    src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg"
                  />
                </div>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "2px solid rgb(211, 207, 207)",
                    borderRadius: "50%",
                    position: "absolute",
                    marginLeft: "65px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="complex"
                    src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg"
                  />
                </div>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "2px solid rgb(211, 207, 207)",
                    borderRadius: "50%",
                    position: "absolute",
                    marginLeft: "80px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="complex"
                    src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg"
                  />
                </div>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "2px solid rgb(211, 207, 207)",
                    borderRadius: "50%",
                    position: "absolute",
                    marginLeft: "95px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="complex"
                    src="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg"
                  />
                </div>
              </div>

              <p
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  fontSize: "22px",
                  padding: "7px",
                }}
              >
                <AiFillBell />
              </p>
              <p>s</p>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
