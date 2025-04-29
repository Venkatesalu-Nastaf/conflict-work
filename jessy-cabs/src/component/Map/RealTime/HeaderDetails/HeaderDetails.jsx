import React, { useState,useMemo} from 'react'
import "../RealTime.css"
import "./HeaderDetails.css"
import ViewIcon from "./ViewIcon/ViewIcon";
import DownLoadIcon from "./DownLoadIcon/DownLoadIcon";
import FilterIcon from "./FilterIcon/FilterIcon";
import ShareIcon from "./ShareIcon/ShareIcon";
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon from react-icons
import dayjs from 'dayjs';
import axios from 'axios';
import { APIURL } from "../../../url";


const HeaderDetails = ({todayVehicle}) => {
    const apiUrl = APIURL;
    const [isClicked, setIsClicked] = useState(false);
    const [countrunning, setCountRunning] = useState(0);

    const handleISClick = () => {
        setIsClicked(!isClicked);
    };

    const handleISClose = () => {
        setIsClicked(false);
    };
    const startdate =dayjs().format('YYYY-MM-DD');
  const countdata = async()=>{
    try{
        const response = await axios.get(`${apiUrl}/gpstripidgetongoingdata/${startdate}`)
        const res= response.data;
      
        setCountRunning(res[0].countdata)
    }
    catch(err){
        console.log(err)
    }
  }
const data1 = useMemo(() => {
countdata()
  return todayVehicle;
}, [todayVehicle]);
    // const data1 = useMemo(() => {
    //     console.log("calldata",++1)
    //     return todayVehicle;
    //   }, [todayVehicle]);
    
       

    return (
        <>
            <div className='main-head-hover'>
                <div className='dummy-hover'>
                    <div className='hovering-contents'>
                        <div className='first-div-realtime'>
                            <div>
                                <p onClick={handleISClick} className={`top-head-section top-head-section-p-click ${isClicked ? 'clicked' : ''}`}>
                                    <span>
                                    <span className='spantext'>{data1? data1.length : 0}</span>
                                    <span className={`text-color-head ${isClicked ? 'white' : ''}`}>vehicle</span>
                                    </span>
                                   <span>
                                   {isClicked && (
                                        <AiOutlineClose onClick={handleISClose} />
                                    )}
                                   </span>
                                   
                                </p>
                                <p><span className='spantext orange'>7</span><span className='text-color-head'>Idle</span> </p>
                                <p><span className='spantext red'>3</span><span className='text-color-head'>Dispatched</span> </p>
                            </div>
                            <div className='top-head-section'>
                                <p className='top-head-section'><span className='spantext green'>{countrunning}</span> <span className='text-color-head'>Running</span></p>
                                <p><span className='spantext orange'>28</span><span className='text-color-head'>Parked</span> </p>
                                <p><span className='spantext red'>3</span><span className='text-color-head'>Not Online</span> </p>
                            </div>
                        </div>
                        <div className='second-div-realtime'>
                            <div>
                                <p className='top-head-section'><span className='spantext'>48</span><span className='text-color-head'>Not On Job</span></p>
                                <p><span className='spantext'>0</span><span className='text-color-head'>On Job</span> </p>
                                <p><span className='spantext'>0</span><span className='text-color-head'>Waiting To Load</span> </p>
                                <p><span className='spantext'>0</span><span className='text-color-head'>Loaded</span> </p>
                                <p><span className='spantext'>0</span><span className='text-color-head'>Waiting To Unload</span> </p>
                                <p><span className='spantext'>0</span><span className='text-color-head'>Waiting In Garage</span> </p>
                            </div>
                            <div>
                                <p className='top-head-section'><span className='spantext'>0</span> <span className='text-color-head'> In Garage</span> </p>
                                <p><span className='spantext'>0</span> <span className='text-color-head'> Unloading</span> </p>
                                <p><span className='spantext'>0</span> <span className='text-color-head'> Empty</span> </p>
                                <p><span className='spantext'>0</span> <span className='text-color-head'> Scheduled</span> </p>
                            </div>
                        </div>
                        <div className='third-div-realtime'>
                            <div >
                                <p className='top-head-section'><span className='spantext'>0</span> <span className='text-color-head'>Late</span> </p>
                                <p><span className='spantext'>0</span> <span className='text-color-head'>On Time</span></p>
                                <p><span className='spantext'>0</span> <span className='text-color-head'>Early</span></p>
                            </div>
                        </div>


                    </div>
                    <div className='head-icon-section'>
                        <div className='icon-division'>
                            <ViewIcon />
                        </div>
                        <div className='icon-division'>
                            <ShareIcon />
                        </div>
                        <div className='icon-division'>
                            <DownLoadIcon />
                        </div>
                        <div className='icon-division'>
                            <FilterIcon />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderDetails;