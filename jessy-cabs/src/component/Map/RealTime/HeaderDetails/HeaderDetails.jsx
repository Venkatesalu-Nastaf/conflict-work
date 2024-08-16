import React from 'react'
import "../RealTime.css"
import "./HeaderDetails.css"
import ViewIcon from "./ViewIcon/ViewIcon";
import DownLoadIcon from "./DownLoadIcon/DownLoadIcon";
import FilterIcon from "./FilterIcon/FilterIcon";
import ShareIcon from "./ShareIcon/ShareIcon";
const HeaderDetails = () => {
    return (
        <>
            <div className='main-head-hover'>
                <div className='dummy-hover'>
                    <div className='hovering-contents'>
                        <div className='first-div-realtime'>
                            <div>
                                <p className='top-head-section'><span className='spantext'>48</span><span className='text-color-head'>vehicle</span> </p>
                                <p><span className='spantext orange'>7</span><span className='text-color-head'>Idle</span> </p>
                                <p><span className='spantext red'>3</span><span className='text-color-head'>Dispatched</span> </p>
                            </div>
                            <div className='top-head-section'>
                                <p className='top-head-section'><span className='spantext green'>6</span> <span className='text-color-head'>Running</span></p>
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