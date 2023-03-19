import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { TypeObjectInput, TypeError, ErrorSubmit } from "../../types/index";
import "./ComponentsAdmin.css";
import CloseTab from "./IconGroupAction/CloseTab";
import userServices from "../../services/user";

const style = {
  position: "absolute" as "absolute",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
};

export default function ShowModalForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* Show pass */
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  /* mouseDown */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  /* VALIDATE FORM AND SUBMIT */
  const [inputs, setInputs] = useState<TypeObjectInput>({});
  const [errors, setErrors] = useState<TypeError>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  const options = [
    { value: "", label: "Role" },
    { value: 1, label: "Admin" },
    { value: 2, label: "Student" },
    { value: 3, label: "Teacher" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  /* select change */
  const handleSelectChange = (e: any) => {
    const nameInput = e.target.name;
    let valueInput = e.target.value;

    const optionValues = options.map((option) => option.value);
    if (optionValues.includes(valueInput)) {
      setSelectedOption(valueInput);
    } /* else {
      console.error(`Invalid valueInput ${valueInput} selected`);
    } */

    setInputs((state) => ({ ...state, [nameInput]: valueInput })); //
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let errorSubmit: ErrorSubmit = {};

    let check = false;

    /* validate name */
    if (inputs.name === undefined || inputs.name === "") {
      errorSubmit.name = "Please enter your name!";
      setErrors(errorSubmit);
      check = false;
    } else {
      setErrors(errorSubmit);
      check = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkEmail = emailRegex.test(`${inputs.email}`);

    /* validate email */
    if (inputs.email === undefined || inputs.email === "") {
      errorSubmit.email = "Please enter your email!";
      setErrors(errorSubmit);
      check = false;
    } else if (!checkEmail) {
      errorSubmit.email = "Email is not in the correct format!";
      setErrors(errorSubmit);
      check = false;
    } else {
      setErrors(errorSubmit);
      check = true;
    }

    /* validate password */
    if (inputs.password === undefined || inputs.password === "") {
      errorSubmit.password = "Please enter your password!";
      setErrors(errorSubmit);
      check = false;
    } else {
      setErrors(errorSubmit);
      check = true;
    }

    /* validate role */
    if (inputs.role === undefined || inputs.role === "") {
      errorSubmit.role = "Please enter the role!";
      setErrors(errorSubmit);
      check = false;
    } else {
      setErrors(errorSubmit);
      check = true;
    }

    /* validate comfirm password */
    if (inputs.confirmPass === undefined || inputs.confirmPass === "") {
      errorSubmit.confirmPass = "Please enter your confirm password!";
      setErrors(errorSubmit);
      check = false;
    } else if (inputs.confirmPass !== inputs.password) {
      alert("Passwords do not match!");
      check = false;
    } else {
      setErrors(errorSubmit);
      check = true;
    }

    /* submit  */
    if (check) {
      alert("Logged in successfully!");

      userServices.postCreateUserApi({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        role_id: inputs.role,
      });
    } else {
      alert("Login failed !");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add User</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal_show" sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>User Information</p>
            <CloseTab handleClose={handleClose} />
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="">Name</InputLabel>
              <Input
                // id=""
                name="name"
                onChange={handleInputChange}
                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
              {errors.name === "" || errors.name === undefined ? null : (
                <p
                  style={{
                    color: "#D93025",
                    textAlign: "start",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="">Email</InputLabel>
              <Input
                // id=""
                name="email"
                onChange={handleInputChange}
              />
              {errors.email === "" || errors.email === undefined ? null : (
                <p
                  style={{
                    color: "#D93025",
                    textAlign: "start",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="">Password</InputLabel>
              <Input
                // id=""
                name="password"
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password === "" ||
              errors.password === undefined ? null : (
                <p
                  style={{
                    color: "#D93025",
                    textAlign: "start",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors.password}
                </p>
              )}
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%", mb: 5 }} variant="standard">
              <InputLabel htmlFor="">Confirm Password</InputLabel>
              <Input
                name="confirmPass"
                onChange={handleInputChange}
                // id=""
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.confirmPass === "" ||
              errors.confirmPass === undefined ? null : (
                <p
                  style={{
                    color: "#D93025",
                    textAlign: "start",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors.confirmPass}
                </p>
              )}
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%", mt: 0 }} size="small">
              <InputLabel id="demo-select-small">Role</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={selectedOption}
                label="role"
                name="role"
                onChange={handleSelectChange}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.role === null || errors.role === undefined ? null : (
                <p
                  style={{
                    color: "#D93025",
                    textAlign: "start",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  {errors.role}
                </p>
              )}
            </FormControl>

            <div
              className="GroupBtn_Save-Cancel"
              style={{
                width: "100%",
                display: "flex",
                gap: "5px",
                marginTop: "20px",
              }}
            >
              <Button type="submit" variant="contained">
                Save
              </Button>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
