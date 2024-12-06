import React, { useState } from 'react';
import './FuelRate.css'
import axios from 'axios';
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { StationName } from "./FuelRateData";
import Autocomplete from "@mui/material/Autocomplete";
// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';
const FuelRate = () => {
    // API start
    const [selectedState, setSelectedState] = useState(StationName[0].optionvalue);
    const [fuelData, setFuelData] = useState({});
    const currentDate = new Date().toLocaleDateString();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});

    const handleStateChange = (event) => {
        const state = event.target.value;
        setSelectedState(state);
        if (state) {
            fetchFuelPrices(state);
        } else {
            setFuelData({});
        }
    };

    // const fetchFuelPrices = (state) => {
    //     const options = {
    //         method: 'GET',
    //         url: `https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/${state}`,
    //         headers: {
    //             'X-RapidAPI-Key': '35105408abmsh28530e641922d31p15534djsnae867e807eb8',
    //             'X-RapidAPI-Host': 'daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com'
    //         }
    //     };

    //     axios.request(options)
    //         .then(response => {
    //             const fuelData = response.data.fuel;
    //             const { petrol, diesel } = fuelData;
    //             setFuelData({ petrol, diesel });
    //             console.log(fuelData,'fuel data for grid ')
    //         })
    //         .catch();
    // };

    // const capitalizeFirstLetter = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // };

    const fetchFuelPrices = (state) => {
        setLoading(true); // Set loading to true at the start of the request
        const options = {
            method: 'GET',
            url: `https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/${state}`,
            headers: {
                'X-RapidAPI-Key': '35105408abmsh28530e641922d31p15534djsnae867e807eb8',
                'X-RapidAPI-Host': 'daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then(response => {
                const fuelData = response.data.fuel;
                const { petrol, diesel } = fuelData;
                setFuelData({ petrol, diesel });
                // console.log(fuelData, 'fuel data for grid');
            })
            .catch(error => {
                console.error("Error fetching fuel prices:", error);
                setLoading(false);
                if (error.message === 'Network Error') {
                    setErrorMessage("Check network connection.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // API END
    // Table Start
    const columns = [
        { field: "id", headerName: "Sno", width: 100 },
        { field: "Fuel_Type", headerName: "Fuel_Type", width: 200 },
        { field: "Date", headerName: "Date", width: 200 },
        { field: "State_Name", headerName: "State_Name", width: 200 },
        { field: "Price", headerName: "Price (INR)", width: 200 },
    ];

    const rows = Object.keys(fuelData).map((fuelType, index) => ({
        id: index + 1,
        Fuel_Type: capitalizeFirstLetter(fuelType),
        Date: currentDate,
        State_Name: selectedState === '' ? '' : StationName.find(station => station.optionvalue === selectedState)?.Option || '',
        Price: fuelData[fuelType]?.retailPrice ? fuelData[fuelType].retailPrice.toFixed(2) : 'N/A',
    }));

    // Table End
    return (
        <div className="FuelRate-form main-content-form">
            <form action="">
                <div className="FuelRate-header">
                    <div className="input-field">
                        <div className="input fuelrate-input">
                            <div className="icone" >
                                <FontAwesomeIcon icon={faGasPump} size="xl" />
                            </div>
                            <Autocomplete
                                // fullWidth
                                size="small"
                                id="Select_State"
                                freeSolo
                                value={selectedState}
                                options={StationName}
                                getOptionLabel={(option) => option.Option || ""}
                                onChange={(event, newValue) => {
                                    const state = newValue ? newValue.optionvalue : "";
                                    handleStateChange({ target: { value: state } });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select State"
                                        sx={{
                                            m: 1,
                                            width: "190px",
                                            "@media (min-width: 667px)": {
                                                width: "50ch",
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="FuelRate-table-container-info">
                    <div className="table-FuelRate">
                        {/* <DataGrid
                            rows={rows}
                            columns={columns}
                        /> */}


                        <Box
                            sx={{
                                height: 400,
                                width: '100%',
                                position: 'relative',
                                '& .MuiDataGrid-virtualScroller': {
                                    '&::-webkit-scrollbar': {
                                        width: '8px', // Adjust the scrollbar width here
                                        height: '8px', // Adjust the scrollbar width here
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: '#f1f1f1',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#457cdc',
                                        borderRadius: '20px',
                                        minHeight: '60px', // Minimum height of the scrollbar thumb (scroll indicator)

                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        backgroundColor: '#3367d6',
                                    },
                                },
                            }}
                        >
                            {loading ? (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                />
                            )}
                        </Box>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FuelRate