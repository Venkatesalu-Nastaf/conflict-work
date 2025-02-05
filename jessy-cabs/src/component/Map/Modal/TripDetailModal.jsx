import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { VehicleMapData } from "../vehicleMapContext/vehcileMapContext";

const TripDetailModal = ({ position,  }) => {
    const {tripModalOpen,setTripModalOpen}= VehicleMapData()
    if (!position) return null;

    const handleClose = () => setTripModalOpen(false);

    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: position.pixelY, 
                    left: position.pixelX, 
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 3,
                    marginTop:"-90px"
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Trip Details
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Marker at Latitude: {position.lat}, Longitude: {position.lng}
                </Typography>
            </Box>
        </Modal>
    );
};

export default TripDetailModal;
