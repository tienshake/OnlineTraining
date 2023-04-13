import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material';
import themeStyle from '../ThemeStyle/themeStyle';
import "./ListFilters.css";
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import categoryServices from '../../services/category';
import { useEffect, useState } from 'react';


const useStyles = makeStyles({
  accordion: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0px 0px 0px 15px',
  },
  rectangle: {
    width: "80%",
    height: 200,
    backgroundColor: "blue",
    marginTop: 20
  },
  checkList: {
    padding: "0px !important",
  },
  titleCheckList: {
    color: '#fff',
    fontSize: '17px !important',
    fontWeight: 500
  },
  iconCheck: {
    color: '#FF7C71 !important'
  }
});

interface MyCheckboxListProps {
  getApiCaye?: () => void
}

export default function CheckboxListCate(props: MyCheckboxListProps) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [dataCate, setDataCate] = useState([]);

  useEffect(() => {
    categoryServices.getCategoryApi().then((data) => setDataCate(data.data.data))
  }, []);



  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <ThemeProvider theme={themeStyle}>
      <Accordion className={classes.checkList}>
        <AccordionSummary
          className={classes.accordion}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.titleCheckList}>Instructors</Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.checkList}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
              dataCate ? <>
                {dataCate.map((value: any) => {
                  const labelId = `checkbox-list-label-${value.id}`;

                  return (
                    <ListItem
                      key={value.id}
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                          {'(20)'}
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox
                            className={classes.iconCheck}
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>

                        <ListItemText id={labelId} primary={`Backend ${value.name_category}`} />

                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </> : <>
                ko có
              </>
            }
          </List>
        </AccordionDetails>
      </Accordion>

      {/*  */}
      {/* <Accordion sx={{ mt: 2 }} className={classes.checkList}>
        <AccordionSummary
          className={classes.accordion}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.titleCheckList}>Instructors</Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.checkList}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      {'(20)'}
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                    <ListItemIcon>
                      <Checkbox
                        className={classes.iconCheck}
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>

                    <ListItemText id={labelId} primary={`Backend ${value + 1}`} />

                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion> */}
    </ThemeProvider>
  );
}
