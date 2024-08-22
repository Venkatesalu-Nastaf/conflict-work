import React, { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import DialogContentText from '@mui/material/DialogContentText';
import Button from "@mui/material/Button";
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Slide } from '@mui/material';
import { MenuItem } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { Checkbox, ListItemText } from '@mui/material';
import { PermissionContext } from '../../../../context/permissionContext';
import "./AddTags.css"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddTags = () => {
  const { openAddTag, setOpenAddTag } = useContext(PermissionContext);
  const handleCloseAddTag = () => {
    setOpenAddTag(false);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChangeAddTag = (event) => {
    const { target: { value } } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          open={openAddTag}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAddTag}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '.MuiDialog-container': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ m: 0, p: 2 }}>
            {"Add tag to vehicle: TN09DF1102 "}
            <IconButton
              aria-label="close"
              onClick={handleCloseAddTag}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControl sx={{ m: 1, width: 400 }}>
                <Select
                  id="multi-select"
                  multiple
                  value={selectedOptions}
                  onChange={handleChangeAddTag}
                  input={<OutlinedInput />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <p>Existing Tags:</p>
              <i>No Tags</i>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className='addtag-cancel-btn' onClick={handleCloseAddTag}>Cancel</Button>
            <Button className='addtag-add-btn' onClick={handleCloseAddTag} autoFocus >
              Add Tag
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}


export default AddTags;