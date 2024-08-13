import React from 'react'
import "../RealTime.css"
const HeaderDetails = () => {
    return (
        <>
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
        </>
    )
}

export default HeaderDetails;