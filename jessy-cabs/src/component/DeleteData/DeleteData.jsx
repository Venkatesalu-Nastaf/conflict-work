import { Dialog, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
  // console.log("DeleteConfirmationDialog", open, onClose, onConfirm);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <div>
          <h3>Are you sure you want to delete?</h3>
          <div>
            <Button onClick={(event) => onConfirm(event, "Delete")}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
