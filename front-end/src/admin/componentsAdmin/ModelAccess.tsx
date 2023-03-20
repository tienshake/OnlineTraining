import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

interface MyPropsModeAccess {
  openModal: any,
  nameUser: String,
  handleCloseModalAccess:  () => void,
  handleDeleteAndClose: () => void
}

export default function ModelAccess(props: MyPropsModeAccess) {

  return (
    <div>
      <Dialog
        open={props.openModal}
        onClose={props.handleCloseModalAccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this user?`}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, all data information about this user named <b>{props.nameUser}</b> will disappear!
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleCloseModalAccess}>Disagree</Button>

          <Link to="/admin/teacher">
            <Button onClick={props.handleDeleteAndClose} autoFocus>
              Agree
            </Button>
          </Link>

        </DialogActions>
      </Dialog>
    </div>
  );
}
