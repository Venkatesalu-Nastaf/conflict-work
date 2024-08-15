import React from 'react'
import "../RealTime.css"

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



                        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "space-around" }}>


                            <div style={{ fontSize: "25px" }}>
                                < ViewIcon />
                            </div>
                            <div style={{ fontSize: "25px" }}>
                                <ShareIcon />
                            </div>
                            <div style={{ fontSize: "25px" }}>
                                <DownLoadIcon />
                            </div>
                            <div style={{ fontSize: "25px" }}>
                                <FilterIcon />
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default HeaderDetails;