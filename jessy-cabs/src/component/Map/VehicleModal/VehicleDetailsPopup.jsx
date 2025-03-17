import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { VehicleMapData } from "../vehicleMapContext/vehcileMapContext"

const VehicleDetailsPopup = ({ position,officeDistance }) => {
    const { vehiclePoint, setVehiclePoint,jessyCabsDistance } = VehicleMapData()
    if (!position) return null;

    const handleClose = () => setVehiclePoint(false);
    console.log(position, "positionnnnnnnnnnnnnnnnn");

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
                    width: 370,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 3,
                    marginTop: "-90px"
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {position?.vehno}
                </Typography>

                <div style={{ display: 'flex', gap: "15px" }}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Group :
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Driver :
                    </Typography>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                    <Typography sx={{ color: "gray", paddingRight: "4px" ,fontSize:12 }}>
                        Location:
                    </Typography>
                    <Typography sx={{ color: "black",fontSize:12,padding:1 }}>
                        {position?.address}
                    </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                    <Typography sx={{ color: "gray", paddingRight: "4px" ,fontSize:12 }}>
                        Nearset Address:
                    </Typography>
                    <Typography sx={{ color: "black",fontSize:12,padding:1 }}>
                       {officeDistance} KM  from JESSY CABS ( Office )
                    </Typography>
                </div>
            </Box>

        </Modal>
    );
};

export default VehicleDetailsPopup;
