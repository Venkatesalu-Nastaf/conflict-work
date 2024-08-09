import React, { useState } from 'react'
import { TextField } from "@mui/material";
import "./RealTime.css"
import { styled } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import { ToggleButton, ToggleButtonGroup, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FiUpload } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsFillShareFill } from "react-icons/bs";
import { BiSolidMessageRounded } from "react-icons/bi";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { TextareaAutosize } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { Drawer } from '@mui/material';
import { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { GoHistory } from "react-icons/go";
import { MdChangeHistory } from "react-icons/md";
import { FaCarOn } from "react-icons/fa6";
import Tabs from '@mui/material/Tabs';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FaShare } from "react-icons/fa";
import { AppBar, Toolbar, Slide } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DialogContentText from '@mui/material/DialogContentText';
import { Checkbox, ListItemText } from '@mui/material';
import { IoBook } from "react-icons/io5";
import { format } from 'date-fns';
import { TbReportSearch } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaList } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoStop } from "react-icons/io5";
import { IoSpeedometerSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';


const label = { inputProps: { 'aria-label': 'Size switch demo' } };
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];
const optionshistoryLocation = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];


const Historystates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',

];

const Historynumbers = [
  51551518445, 4555555555, 5555451211, 5517777,

];


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const SearchInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: '20px',
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



//  for historytable
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Vehicle',
    headerName: 'Vehicle',
    width: 150,
    editable: true,
  },
  {
    field: 'StartTime',
    headerName: 'Start Time',
    width: 150,
    editable: true,
  },
  {
    field: 'EndTime',
    headerName: 'End Time',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'StartLocation',
    headerName: 'Start Location',
    width: 150,
    editable: true,
  },
  {
    field: 'EndLocation',
    headerName: 'End Location',
    width: 150,
    editable: true,
  },
  {
    field: 'Distance',
    headerName: 'Distance',
    width: 150,
    editable: true,
  },
  {
    field: 'Duration',
    headerName: 'Duration',
    width: 150,
    editable: true,
  },
  {
    field: 'Mileage',
    headerName: 'Mileage',
    width: 150,
    editable: true,
  },
  {
    field: 'Fuel',
    headerName: 'Fuel',
    width: 150,
    editable: true,
  },









];

const rows = [
  { id: 1, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14, },
  { id: 2, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 3, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 4, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 5, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 6, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 7, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 8, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 9, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
];



// for timeline tab

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}








export const RealTime = () => {









  const [selectedOption, setSelectedOption] = useState('Vehicle');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };





















  const [openmessage, setOpenmessage] = React.useState(false);

  const handleClickOpenMessage = () => {
    setOpenmessage(true);
  };
  const handleCloseMessage = () => {
    setOpenmessage(false);
  };

  const [openshare, setOpenshare] = React.useState(false);

  const handleClickOpenshare = () => {
    setOpenshare(true);
  };
  const handleCloseshare = () => {
    setOpenshare(false);
  };






  const [messageComment, setMessageComment] = useState('');

  const handleChangemessageComment = (event) => {
    setMessageComment(event.target.value);
  };

  const [textarea, setTextarea] = useState('');

  const handleChangetextare = (event) => {
    setTextarea(event.target.value);
  };


  const [time, setTime] = useState('');

  const handleChangetime = (event) => {
    setTime(event.target.value);
  };


  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  // const [age, setAge] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const [day, setDay] = React.useState('');

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };



  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };


  // const [age, setAge] = React.useState('');
  const [dropdowndrawer, setDropdowndrawer] = React.useState('');

  const handleChangedropdowndrawer = (event) => {
    setDropdowndrawer(event.target.value);
  };

  const [valuetabs, setValuetabs] = React.useState('1');

  const handleChangetabs = (event, newValue) => {
    setValuetabs(newValue);
  };


  const [searchTermdirection, setSearchTermdirection] = useState('');

  const handleSearchChangedirection = (event) => {
    setSearchTermdirection(event.target.value);
  };




  const [selectedOptionnearby, setSelectedOptionnearby] = useState('');

  const handleSelectChangenearby = (event) => {
    setSelectedOptionnearby(event.target.value);
  };


  const [number, setNumber] = useState('');

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };







  // const [open, setOpen] = React.useState(false);
  const [openDriverModify, setOpenDriverModify] = React.useState(false);

  const handleClickOpenDriverModify = () => {
    setOpenDriverModify(true);
  };
  const handleCloseDriverModify = () => {
    setOpenDriverModify(false);
  };






  const [changeDriverName, setChangeDriverName] = useState('');

  const handleChangeDriverName = (event) => {
    setChangeDriverName(event.target.value);
  };


  const [selectedDateDriverAssign, setSelectedDateDriverAssign] = useState(null);

  const handleDateChangeDriverAssign = (newValue) => {
    setSelectedDateDriverAssign(newValue);
  };




  const [newDrivercreation, setNewDrivercreation] = React.useState(false);

  const handleDrivercreation = () => {
    setNewDrivercreation(true);
    setOpenDriverModify(false);

  };
  const handleCloseDrivercreation = () => {
    setNewDrivercreation(false);
  };



  const [newDriverSelect, setNnewDriverSelect] = useState('');

  const handleNewDriverSelect = (event) => {
    setNnewDriverSelect(event.target.value);
  };






  const [openAddTag, setOpenAddTag] = React.useState(false);

  const handleClickOpenAddTag = () => {
    setOpenAddTag(true);
  };

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












  const [historyLocation, setHistoryLocation] = React.useState(false);

  const handleOpenhistoryLocation = () => {
    setHistoryLocation(true);
  };

  const handleClosehistoryLocation = () => {
    setHistoryLocation(false);
  };




  const [selecthistoryLocation, setSelecthistoryLocation] = useState('');

  const handleChangeselecthistoryLocation = (event) => {
    setSelecthistoryLocation(event.target.value);
  };



  const [selectedDatehistoryLocation, setSelectedDatehistoryLocation] = useState(null);

  const handleDateChangehistoryLocation = (newDate) => {
    setSelectedDatehistoryLocation(newDate);
  };













  // history drawer

  const [openHistoryDrawer, setOpenHistoryDrawer] = useState(false);

  const handleOpenHistoryDrawer = () => {
    setOpenHistoryDrawer(true);
  };

  const handleCloseHistoryDrawer = () => {
    setOpenHistoryDrawer(false);
  };

  // history state select
  const [selectHistoryState, setSelectHistoryState] = useState('');

  const handleHistoryState = (event) => {
    setSelectHistoryState(event.target.value);
  };


  // history number select
  const [selectHistorynumber, setSelectHistorynumber] = useState('');

  const handleHistorynumber = (event) => {
    setSelectHistorynumber(event.target.value);
  };





  // start and end date 
  const [selectedDatehistory, setSelectedDatehistory] = useState(null);

  const handleDateChangehistory = (newValue) => {
    setSelectedDatehistory(newValue);
  };

  // for history
  const [history, SetHistory] = useState(true);
  const openhistoryTab = () => {
    SetHistory(true);
  }
  const [timeline, SetTimeline] = useState(false);
  const opentimelineTab = () => {
    SetHistory(false);
    SetTimeline(true);
  }

  const [stoppages, SetStoppages] = useState(false);
  const openstoppagesTab = () => {
    SetHistory(false);
    SetTimeline(false);
    SetStoppages(true);
  }








  // for timeline tab
  const [value, setValue] = React.useState(0);

  const handleChangetimelinetab = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <div className="form-container-realtime">
        <div className="main-content-container">
          {/* <p className="head-tab-type-2-all">
            <span className="Title-Name">Real Time</span>
          </p> */}
          <div className='main-content-form'>
            <div className='main-head-hover'>

              <div className='hovering-contents'>
                <div className='first-div-realtime'>
                  <div>
                    <p><span className='spantext'>48</span> vehicle</p>
                    <p><span className='spantext orange'>7</span> Idle</p>
                    <p><span className='spantext red'>3</span> Dispatched</p>
                  </div>
                  <div>
                    <p><span className='spantext green'>6</span> Running</p>
                    <p><span className='spantext orange'>28</span> Parked</p>
                    <p><span className='spantext red'>3</span> Not Online</p>
                  </div>
                </div>
                <div className='second-div-realtime'>
                  <div>
                    <p><span className='spantext'>48</span> Not On Job</p>
                    <p><span className='spantext'>0</span> On Job</p>
                    <p><span className='spantext'>0</span> Waiting To Load</p>
                    <p><span className='spantext'>0</span> Loaded</p>
                    <p><span className='spantext'>0</span> Waiting To Unload</p>
                    <p><span className='spantext'>0</span> Waiting In Garage</p>
                  </div>
                  <div>
                    <p><span className='spantext'>0</span> In Garage</p>
                    <p><span className='spantext'>0</span> Unloading</p>
                    <p><span className='spantext'>0</span> Empty</p>
                    <p><span className='spantext'>0</span> Scheduled</p>
                  </div>
                </div>
                <div className='third-div-realtime'>
                  <div>
                    <p><span className='spantext'>0</span> Late</p>
                    <p><span className='spantext'>0</span> On Time</p>
                    <p><span className='spantext'>0</span> Early</p>
                  </div>

                </div>
              </div>
            </div>

            <div className='main-body-container'>
              <div className='vehicle-section'>
                <div style={{ display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "center", }}>


                  <div style={{ width: "70%" }}>
                    {selectedOption === 'Vehicle' && (
                      <TextField
                        variant="outlined"
                        placeholder="Search vehicles/Groups..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ display: 'flex', justifyContent: 'center', margin: '20px', marginLeft: "0px" }}
                      />
                    )}

                    {selectedOption === 'Location' && (
                      <TextField
                        select
                        variant="outlined"
                        label="Search for Locations"

                        placeholder="Search for Locations..."
                        value={dropdownValue}
                        onChange={handleDropdownChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ display: 'flex', justifyContent: 'center', margin: '20px', marginLeft: "0px" }}
                      >
                        <MenuItem value="car">Car</MenuItem>
                        <MenuItem value="bike">Bike</MenuItem>
                        <MenuItem value="truck">Truck</MenuItem>
                      </TextField>
                    )}
                  </div>
                  <div style={{ width: "20%" }}>
                    <ToggleButtonGroup
                      value={selectedOption}
                      exclusive
                      onChange={handleToggleChange}
                      aria-label="text alignment"
                      sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
                    >
                      <ToggleButton value="Vehicle" aria-label="Vehicle" sx={{ margin: '0px', borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", height: "35px" }}>
                        Vehicle
                      </ToggleButton>
                      <ToggleButton value="Location" aria-label="Location" sx={{ margin: '0px', borderTopRightRadius: "10px", borderBottomRightRadius: "10px", height: "35px" }}>
                        Location
                      </ToggleButton>
                    </ToggleButtonGroup>

                  </div>
                </div>
                {selectedOption === 'Vehicle' && (
                  <div className='vehicle-details' onClick={toggleDrawer(false)}>


                    <div className="vehicle-indiduals">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3 className='heading-three '>1544115144444</h3>
                            <div className='location-icon' >
                              <FaLocationArrow style={{ color: "#fff" }} />
                            </div>
                          </div>

                          <div className='flex-class margins'>
                            <p className='indidual-para text-color'>Group: chennai</p>
                            <p className='flex-class indidual-para driver-para text-color'> <span>Driver: Sekar</span> <span onClick={handleClickOpenDriverModify}>< FiUpload /></span></p>
                          </div>

                          <div className='flex-class margins'>
                            <p className='flex-class indidual-para '> <span>< GoClock /></span><span className='text-warning'>15m</span></p>
                            <p className='indidual-para driver-para text-warning'>2.5 km</p>

                            <p className='indidual-para driver-para text-color'>speed: <span className='text-warning'>25 km/h</span></p>
                          </div>
                          <p className='indidual-para margins'> <span><CiLocationOn /></span> <span>5-7, Sholinganallur Main Road, Sholinganallur, Chennai, Kanchipuram, TamilNadu</span></p>
                          <p className='indidual-para margins' style={{ color: "rgb(85, 85, 85)", fontWeight: "600" }}> NEAREST ADDRESS: 21 km from JESSY CABS ( Office )</p>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p className='indidual-para margins' > <span><GiPathDistance /></span> <span style={{ color: "#0078d4", fontWeight: "700" }}>Not On Job</span></p>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <div className="call-icon">
                                <a href="tel:+4733378901"><IoCall style={{ color: "#fff" }} /></a>


                              </div>
                              <div className="share-icon" onClick={handleClickOpenshare}>
                                <BsFillShareFill style={{ color: "#fff" }} />

                              </div>
                              <div className="message-icon" onClick={handleClickOpenMessage}>
                                <BiSolidMessageRounded style={{ color: "#fff" }} />

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className='last-row-buttons'>
                        <button className='bottom-buttons' onClick={handleOpenHistoryDrawer}>History</button>
                        <button className='bottom-buttons'>Details</button>
                        <button className='bottom-buttons' onClick={handleClickOpenAddTag}>Add Tag</button>
                        <button className='bottom-buttons' onClick={handleOpenhistoryLocation}>History Location</button>
                      </div>

                    </div>



                  </div>

                )}
                {selectedOption === 'Location' && (
                  <div className='flex-class' style={{ justifyContent: "space-between" }}>
                    <div>
                      <p>KM Radius for</p>
                      <p style={{ margin: "0px" }}>Search Location/Nearby (KM)50</p>
                    </div>
                    <div className='flex-class'>
                      <input type="number" name="" id="" style={{ width: "50px" }} />
                      <Button style={{ border: "1px solid #1976d2" }}>Apply</Button>
                    </div>
                  </div>
                )}

              </div>
              <div className='map-section'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.091173962482!2d80.2378432752463!3d13.029865687290904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x68a5e4e6a95e21f3%3A0x840072ebc67720!2sNASTAF%20Technologies!5e0!3m2!1sen!2sin!4v1722591242854!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>


            <div>



            </div>



          </div>
        </div>
      </div>








































      <div>
        {/* <Button variant="outlined" >
        Open Full-Page Drawer
      </Button> */}
        <Drawer
          anchor="top"
          open={openHistoryDrawer}
          onClose={handleCloseHistoryDrawer}
          PaperProps={{
            sx: { width: '100%', height: '100%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <IconButton onClick={handleCloseHistoryDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 3 }}>



            <>
              <div style={{ padding: "30px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <IoBook />
                    {/* <p style={{marginTop:"0px"}}>History</p> */}
                    <h3>History</h3>

                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <FormControl sx={{ m: 1, width: 200 }}>
                      <Select
                        value={selectHistoryState}
                        onChange={handleHistoryState}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select a state</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Select a state</em>
                        </MenuItem>
                        {Historystates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 200 }}>
                      <Select
                        value={selectHistorynumber}
                        onChange={handleHistorynumber}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select a number</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Select a number</em>
                        </MenuItem>
                        {Historynumbers.map((number) => (
                          <MenuItem key={number} value={number}>
                            {number}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>


                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box sx={{ m: 2 }}>
                        <DatePicker
                          label="Select Date"
                          value={selectedDatehistory}
                          onChange={handleDateChangehistory}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              fullWidth
                              style={{
                                height: '40px', // Adjust height as needed
                                '& input': {
                                  height: '100%', // Ensure input takes full height
                                  padding: '8px 14px', // Adjust padding if needed
                                },
                              }}
                              InputProps={{
                                style: {
                                  height: '100%', // Ensure input takes full height
                                },
                              }}
                            />

                          }
                        />
                      </Box>
                    </LocalizationProvider>

                    <button style={{ display: 'flex', gap: "5px", alignItems: "center", padding: "5px 10px", backgroundColor: "blue", borderRadius: "10px", border: "1px solid blue", color: "#fff", height: "40px", fontSize: "15px", fontWeight: "500" }}><TbReportSearch />Reports
                      <RiArrowDropDownLine />
                    </button>

                  </div>

                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "10px 20px 20px 20px", }}>
                  <div style={{ display: "flex" }}>
                    <button style={{ display: "flex", gap: "4px", padding: "5px 10px", alignItems: "center", color: "#000000", border: "1px solid #ccc", backgroundColor: "#fff" }} onClick={openhistoryTab}>
                      <FaList />
                      History
                    </button>

                    <button style={{ display: "flex", gap: "4px", padding: "5px 10px", alignItems: "center", color: "#000000", border: "1px solid #ccc", backgroundColor: "#fff" }} onClick={opentimelineTab}>
                      <FaBookOpen />
                      Timeline

                    </button>

                    <button style={{ display: "flex", gap: "4px", padding: "5px 10px", alignItems: "center", color: "#000000", border: "1px solid #ccc", backgroundColor: "#fff" }} onClick={openstoppagesTab}>
                      <IoStop />

                      Stoppages
                    </button>

                    <button style={{ display: "flex", gap: "4px", padding: "5px 10px", alignItems: "center", color: "#000000", border: "1px solid #ccc", backgroundColor: "#fff" }}>
                      <IoSpeedometerSharp />
                      speed Violation
                    </button>

                    <button style={{ display: "flex", gap: "4px", padding: "5px 10px", alignItems: "center", color: "#000000", border: "1px solid #ccc", backgroundColor: "#fff" }}>
                      <FaRegEye />

                      Trips b/w Sites

                    </button>


                    <button style={{ display: "flex", gap: "4px", padding: "5px 10px", alignItems: "center", color: "#000000", border: "1px solid #ccc", backgroundColor: "#fff" }}>
                      <FaHistory />

                      Historical Location

                    </button>


                  </div>
                </div>
                {history &&
                  <>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "space-around", alignItems: "initial" }}>


                      <div style={{ width: "48%" }}>
                        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
                          <p>Account Summary</p>
                          <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <div>
                              <div style={{ display: "flex", gap: "2px" }}>
                                <span>11</span><span>57%</span><span>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p style={{ margin: "0px" }}>Runnings</p>

                            </div>


                            <div>
                              <div style={{ display: "flex", gap: "2px" }}>
                                <span>11</span><span>57%</span><span>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p style={{ margin: "0px" }}>Total Km</p>

                            </div>


                            <div>

                              <span>0</span>

                              <p style={{ margin: "0px" }}>Alarms</p>

                            </div>

                          </div>



                        </div>
                      </div>
                      <div style={{ width: "48%" }}>
                        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
                          <p>Fuel Summary
                            (Diesel)</p>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            No fuel data available for this period.

                          </div>


                        </div>
                      </div>
                    </div>

                    <div style={{ padding: "20px" }}>
                      <p>History - 0703 (KA03AD0703)
                      </p>

                      <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          disableRowSelectionOnClick
                        />
                      </Box>

                    </div>
                  </>
                }

{timeline &&
                  <>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "space-around", alignItems: "initial" }}>


                      <div style={{ width: "48%" }}>
                        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
                          <p>Account Summary</p>
                          <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <div>
                              <div style={{ display: "flex", gap: "2px" }}>
                                <span>11</span><span>57%</span><span>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p style={{ margin: "0px" }}>Runnings</p>

                            </div>


                            <div>
                              <div style={{ display: "flex", gap: "2px" }}>
                                <span>11</span><span>57%</span><span>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p style={{ margin: "0px" }}>Total Km</p>

                            </div>


                            <div>

                              <span>0</span>

                              <p style={{ margin: "0px" }}>Alarms</p>

                            </div>

                          </div>



                        </div>
                      </div>
                      <div style={{ width: "48%" }}>
                        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
                          <p>Fuel Summary
                            (Diesel)</p>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            No fuel data available for this period.

                          </div>

                          <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChangetimelinetab} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>


                        </div>
                      </div>
                      
                    </div>
                    <div style={{border:"1px solid #ccc", display:"flex", justifyContent:"space-between"}}>
                      
                        <div>

                        </div>
                        <div>

                        </div>
                      
                    </div>

                    {/* <div style={{ padding: "20px" }}>
                      <p>History - 0703 (KA03AD0703)
                      </p>

                      <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          disableRowSelectionOnClick
                        />
                      </Box>

                    </div> */}
                  </>
                }

{stoppages &&
                  <>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "space-around", alignItems: "initial" }}>


                      <div style={{ width: "48%" }}>
                        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
                          <p>Accountdddddddddddddd Summary</p>
                          <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <div>
                              <div style={{ display: "flex", gap: "2px" }}>
                                <span>11</span><span>57%</span><span>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p style={{ margin: "0px" }}>Runnings</p>

                            </div>


                            <div>
                              <div style={{ display: "flex", gap: "2px" }}>
                                <span>11</span><span>57%</span><span>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p style={{ margin: "0px" }}>Total Km</p>

                            </div>


                            <div>

                              <span>0</span>

                              <p style={{ margin: "0px" }}>Alarms</p>

                            </div>

                          </div>



                        </div>
                      </div>
                      <div style={{ width: "48%" }}>
                        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
                          <p>Fuel Summary
                            (Diesel)</p>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            No fuel data available for this period.

                          </div>


                        </div>
                      </div>
                    </div>

                    {/* <div style={{ padding: "20px" }}>
                      <p>History - 0703 (KA03AD0703)
                      </p>

                      <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          disableRowSelectionOnClick
                        />
                      </Box>

                    </div> */}
                  </>
                }


              </div>
            </>






























          </Box>
        </Drawer>
      </div>






      <React.Fragment>

        <Dialog
          open={historyLocation}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClosehistoryLocation}
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
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Historical Vehicle Location
            <p style={{ fontSize: "15px", fontWeight: "300", color: "rgb(134 134 134)", marginTop: "3px", }}>View the location and status of any vehicle at any time.</p>
            <IconButton
              aria-label="close"
              onClick={handleClosehistoryLocation}
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
              <>
                <div style={{ borderTop: "1px solid #ccc" }}>
                  <div style={{ display: "flex", gap: "5px", padding: "20px", alignItems: "center" }}>

                    <FormControl sx={{ m: 1, width: 300 }}>
                      <Select
                        value={selecthistoryLocation}
                        onChange={handleChangeselecthistoryLocation}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select an option</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Select an option</em>
                        </MenuItem>
                        {optionshistoryLocation.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={selectedDatehistoryLocation}
                        onChange={handleDateChangehistoryLocation}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClosehistoryLocation}>Disagree</Button>
            <Button onClick={handleClosehistoryLocation} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
        </Dialog>
      </React.Fragment>



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
            <Button onClick={handleCloseAddTag} style={{ color: "#00000", border: "1px solid #ccc" }}>Cancel</Button>
            <Button onClick={handleCloseAddTag} autoFocus style={{ color: "#fff", border: "1px solid #0078d4", backgroundColor: "#0078d4" }}>
              Add Tag
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>


      <React.Fragment>

        <BootstrapDialog
          onClose={handleCloseDriverModify}
          aria-labelledby="customized-dialog-title"
          open={openDriverModify}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modify Driver
          </DialogTitle>
          {/* <p> Add, Edit and Delete Driver</p> */}



          <IconButton
            aria-label="close"
            onClick={handleCloseDriverModify}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>vehicle:</p>
                    <p style={{ fontWeight: "700", fontSize: "15px" }}>3125 (KA01AN3125)</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", borderBottom: "1px solid #ccc" }}>
                    <p style={{ width: "150px" }}>Drivers Name:</p>
                    <p style={{ fontWeight: "700", fontSize: "15px" }}>SAGAYARAJ
                    </p>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Change Driver:</p>
                    <Box sx={{ m: 1, minWidth: 320 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Option</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={changeDriverName}
                          label="Option"
                          onChange={handleChangeDriverName}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Assigned From:</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box sx={{ m: 1, minWidth: 300 }}>
                        <DatePicker
                          label="Select Date"
                          value={selectedDateDriverAssign}
                          onChange={handleDateChangeDriverAssign}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </LocalizationProvider>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p style={{ color: "#0078d4" }} onClick={handleDrivercreation}>Add New Driver</p>
                  </div>

                </div>
              </>
            </Typography>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDriverModify} style={{ backgroundColor: "#0078d4", color: "#fff", borderRadius: "8px", border: "1px solid #0078d4", fontWeight: "600" }}>
              Update driver
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>

      {/* aaaaaaaaaaa */}
      <React.Fragment>

        <BootstrapDialog
          onClose={handleCloseDrivercreation}
          aria-labelledby="customized-dialog-title"
          open={newDrivercreation}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modify Drivers
          </DialogTitle>
          {/* <p> Add, Edit and Delete Driver</p> */}



          <IconButton
            aria-label="close"
            onClick={handleCloseDrivercreation}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>vehicle:</p>
                    <p style={{ fontWeight: "700", fontSize: "15px" }}>3125 (KA01AN3125)</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>First Name:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <TextField
                        id="simple-input"
                        variant="outlined"
                        // value={value}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="Enter Your First Name"
                      />
                    </Box>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Last Name:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <TextField
                        id="simple-input"
                        variant="outlined"
                        // value={value}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="Enter Your Name"
                      />
                    </Box>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Mobile Number:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <TextField
                        id="simple-input"
                        variant="outlined"
                        // value={value}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="Enter Mobile Number"
                      />
                    </Box>
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <p style={{ width: "150px" }}>Group:</p>
                    <Box sx={{ m: 1, minWidth: 300 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Option</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={newDriverSelect}
                          label="Option"
                          onChange={handleNewDriverSelect}
                        >

                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>



                </div>
              </>
            </Typography>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDriverModify} style={{ backgroundColor: "#0078d4", color: "#fff", borderRadius: "8px", border: "1px solid #0078d4", fontWeight: "600" }}>
              Create and Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>

      <div>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, p: 2 }}>
              {/* <Typography variant="h4">Full Page Drawer Content</Typography> */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p>Latest - 1060 (TN09DH1060)
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 180 }}>
                      <Select
                        id="demo-simple-select-autowidth"
                        value={dropdowndrawer}
                        onChange={handleChangedropdowndrawer}
                        autoWidth
                        displayEmpty
                      >
                        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ border: "1px solid #ccc", display: "flex", gap: "3px", alignItems: "center", padding: "10px 20px", height: "11px", borderRadius: "8px" }}>
                    <MdChangeHistory />
                    <p style={{ margin: "0px" }}>History</p>
                  </div>

                  <div style={{ border: "1px solid #ccc", display: "flex", gap: "5px", alignItems: "center", padding: "10px 20px", height: "11px", borderRadius: "8px" }}>
                    <GoHistory />
                    <p style={{ margin: "0px" }}>History Location</p>
                  </div>

                  <div style={{ border: "1px solid #ccc", display: "flex", gap: "5px", alignItems: "center", padding: "10px 20px", height: "11px", borderRadius: "8px" }}>
                    <FaCarOn />
                    <p style={{ margin: "0px" }}>Details</p>
                  </div>

                  <div style={{ border: "1px solid #ccc", display: "flex", gap: "5px", alignItems: "center", backgroundColor: "#0078d4", color: "white", borderRadius: "8px", padding: "10px 20px", height: "11px" }}>
                    <FaShare />

                    <p style={{ margin: "0px" }}>Share Realtime Tracking </p>
                  </div>
                  {/* <button></button> */}

                </div>
              </div>


              <div style={{ display: "flex" }}>

                <div>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={valuetabs}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangetabs} aria-label="lab API tabs example">
                          <Tab label="Overview" value="1" />
                          <Tab label="Speed Graph" value="2" />
                          <Tab label="Directions" value="3" />
                          <Tab label="Near By" value="4" />
                        </TabList>
                      </Box>
                      <TabPanel value="1" >
                        <div style={{ border: "1px solid #ccc", padding: "20px" }}>


                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>
                              <p>Parked</p>
                              <p>:</p>
                            </span>
                            <p style={{ color: 'green' }}>Speed 13km/h</p>

                          </div>
                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>
                              <span>Current Location</span>
                              <span>:</span>
                            </span>


                            <span>Patel G Kulappa Road, Ramaswamipalya, Banasawadi, Bengaluru, Bangalore Urban, Karnataka</span>


                          </div>

                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>Model</span>
                              <span>:</span>
                            </span>
                            <span>2016 TOYOTA ETIOS</span>

                          </div>

                          <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #ccc", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>Group</span>
                              <span>:</span>

                            </span>
                            <span>Bangalore</span>

                          </div>


                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>Fuel Type</span>
                              <span>:</span>
                            </span>
                            <span>Diesel</span>


                          </div>

                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>Distance</span>
                              <span>:</span>
                            </span>
                            <span>1.2 km</span>

                          </div>

                          <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #ccc", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>Time</span>
                              <span>:</span>
                            </span>
                            <span>25m</span>

                          </div>



                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>Start Time</span>
                              <span>:</span>
                            </span>
                            <span>06 Aug 24, 11:21 AM</span>


                          </div>

                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>End Time</span>
                              <span>:</span>
                            </span>
                            <span>06 Aug 24, 11:46 AM</span>

                          </div>

                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>Start Location</span>
                              <span>:</span>
                            </span>
                            <span>Saint Thomas Town, Saint Thomas Town, Kacharakanahalli, Bengaluru, Bangalore Urban, Karnataka</span>

                          </div>

                          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <span style={{ width: "140px", display: "flex", gap: "10px", justifyContent: "space-between" }}>

                              <span>End Location</span>
                              <span>:</span>
                            </span>
                            <span>Patel G Kulappa Road, Ramaswamipalya, Banasawadi, Bengaluru, Bangalore Urban, Karnataka</span>


                          </div>






                        </div>
                      </TabPanel>
                      <TabPanel value="2" >

                      </TabPanel>
                      <TabPanel value="3" >
                        <div style={{ padding: "10px" }}>
                          {/* <Box sx={{ m: 1, minWidth: 300, }}>
                            <TextField
                              id="search-input"
                              label="Search"
                              variant="outlined"
                              value={searchTermdirection}
                              onChange={handleSearchChangedirection}
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box> */}
                          <Box sx={{ m: 1, minWidth: 300 }}>
                            <TextField
                              id="search-input"
                              label="Search"
                              variant="outlined"
                              value={searchTermdirection}
                              onChange={handleSearchChangedirection}
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                                sx: { height: '40px' }, // Adjust the height as needed
                              }}
                              sx={{
                                '.MuiOutlinedInput-root': { height: '40px' }, // Adjust the height as needed
                                '.MuiInputLabel-root': { lineHeight: '40px' }, // Adjust the label's line-height as needed
                              }}
                            />
                          </Box>
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button style={{ border: "1px solid gray", padding: "10px 20px", color: "#fff", backgroundColor: "gray", borderRadius: "8px" }}>Get Direction</button>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="4">
                        <div style={{ padding: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>

                            <span style={{ width: "140px", display: "flex", gap: "3px", justifyContent: 'space-between' }}>
                              <span>Category</span>
                              <span>
                                :
                              </span>

                            </span>
                            <Box sx={{ m: 1, minWidth: 302 }}>
                              <TextField
                                id="select-input"
                                select
                                label="Select Option"
                                value={selectedOptionnearby}
                                onChange={handleSelectChangenearby}
                                variant="outlined"
                                fullWidth
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={21}>Twenty-one</MenuItem>
                                <MenuItem value={22}>Twenty-one and a half</MenuItem>
                              </TextField>
                            </Box>


                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ width: "140px", display: "flex", gap: "3px", justifyContent: 'space-between' }}>
                              <span>
                                Near By KM
                              </span>
                              <span>:</span>
                            </span>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                              <Box sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                  id="number-input"
                                  label="Number"
                                  type="number"
                                  value={number}
                                  onChange={handleNumberChange}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Box>


                              <button style={{ color: "gray", border: "1px solid gray", borderRadius: "8px", padding: "10px 20px", height: "40px" }}>Apply</button>


                            </div>
                          </div>
                          <div style={{ borderTop: "1px solid #ccc", display: "flex", justifyContent: "center" }}>
                            <p>No Petrol pump found.</p>
                          </div>
                        </div>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>

                {/* <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.091173962473!2d80.23784327524626!3d13.029865687290913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x68a5e4e6a95e21f3%3A0x840072ebc67720!2sNASTAF%20Technologies!5e0!3m2!1sen!2sin!4v1722944324954!5m2!1sen!2sin" width="1000" height="700px"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div> */}

              </div>

            </Box>
          </Box>
        </Drawer>
      </div>


      <React.Fragment>
        <BootstrapDialog
          onClose={handleCloseshare}
          aria-labelledby="customized-dialog-title"
          open={openshare}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Share Vehicle's Realtime Tracking
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseshare}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div>
              <div>
                <label htmlFor="">Share Vehicle's Realtime Tracking*</label>
                <Textarea name="Outlined" placeholder="Type in here…" variant="outlined" />

              </div>
              <div>
                <label htmlFor="">Select one or more vehicles to share*</label>
                <div>
                  <FormControl sx={{ m: 1, width: "100%" }}>
                    <Select
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <label htmlFor="">Start Time</label>

                <div>
                  <Box sx={{ minWidth: 320, margin: '20px' }}>
                    <TextField
                      label="Select Time"
                      type="time"
                      value={time}
                      onChange={handleChangetime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      fullWidth
                    />
                  </Box>
                </div>
              </div>


              <div>
                <label htmlFor="">Expire the share after</label>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <label htmlFor="">Days</label>
                    <Box sx={{ minWidth: 60 }}>
                      <FormControl fullWidth>
                        <Select
                          id="demo-simple-select"
                          value={date}
                          onChange={handleChangeDate}
                          displayEmpty
                        >
                          <MenuItem value={10}>1</MenuItem>
                          <MenuItem value={20}>2</MenuItem>
                          <MenuItem value={30}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>


                  <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                    <label htmlFor="">Hours</label>
                    <Box sx={{ minWidth: 60 }}>
                      <FormControl fullWidth>
                        <Select
                          id="demo-simple-select"
                          value={day}
                          onChange={handleChangeDay}
                          displayEmpty
                        >
                          <MenuItem value={10}>1</MenuItem>
                          <MenuItem value={20}>2</MenuItem>
                          <MenuItem value={30}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>






                </div>
              </div>


              <div style={{ display: "flex", gap: "5px" }}>
                <Switch {...label} defaultChecked />
                <p>
                  Share Only Vehicle Details (Don't share location)</p>
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                <Switch {...label} />
                <p>
                  Show Map View Only</p>
              </div>
              <Button>Send Link to Contacts</Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus style={{ border: "1px solid #1976d2" }}>
              Add
            </Button>
            <Button autoFocus onClick={handleCloseshare} style={{ color: "red", border: "1px solid red", }}>
              Cancel
            </Button>

          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>

      <React.Fragment>
        <BootstrapDialog
          onClose={handleCloseMessage}
          aria-labelledby="customized-dialog-title"
          open={openmessage}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add Comments        </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseMessage}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div style={{ display: "flex", gap: "50px" }}>
              <div style={{ width: "20%" }}>
                <p>Comments</p>
              </div>
              <div>
                <Box sx={{ minWidth: 320 }}>
                  <FormControl fullWidth variant="outlined">
                    {/* Remove the InputLabel component */}
                    <Select
                      id="demo-simple-select"
                      value={messageComment}
                      onChange={handleChangemessageComment}
                      displayEmpty
                      renderValue={messageComment !== "" ? undefined : () => "Select the comment "}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

            </div>


            <div style={{ display: "flex", gap: "50px" }}>
              <div style={{ width: "20%" }}>
                <p>Details</p>
              </div>
              <div>
                <Box sx={{ minWidth: 320, margin: '20px' }}>
                  <TextField
                    label="Your Text"
                    placeholder="Enter your text here..."
                    multiline
                    rows={4}
                    variant="outlined"
                    value={textarea}
                    onChange={handleChangetextare}
                    fullWidth
                  />
                </Box>
              </div>

            </div>



            <div style={{ display: "flex", gap: "50px" }}>
              <div style={{ width: "20%" }}>
                <p>start Time</p>
              </div>
              <div>
                <Box sx={{ minWidth: 320, margin: '20px' }}>
                  <TextField
                    label="Select Time"
                    type="time"
                    value={time}
                    onChange={handleChangetime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    fullWidth
                  />
                </Box>
              </div>

            </div>


            <div style={{ display: "flex", gap: "50px" }}>
              <div style={{ width: "20%" }}>
                <p>End Time</p>
              </div>
              <div>
                <Box sx={{ minWidth: 320, margin: '20px' }}>
                  <TextField
                    label="Select Time"
                    type="time"
                    value={time}
                    onChange={handleChangetime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    fullWidth
                  />
                </Box>
              </div>

            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus style={{ border: "1px solid #1976d2" }}>
              Add
            </Button>
            <Button autoFocus onClick={handleCloseMessage} style={{ color: "red", border: "1px solid red", }}>
              Cancel
            </Button>

          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </>
  )
}
