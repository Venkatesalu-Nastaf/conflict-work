
import dayjs from "dayjs";

const CopyEmailHtmlBooking = () => {

    // HTML content for pending status

    const pendingHtmlContent =(datatripsheet)=>{
        const updatdata=datatripsheet
        const formattedDate = dayjs(updatdata?.startdate).format('YYYY-MM-DD');
        const formattedFromDate = dayjs(formattedDate).format('YYYY-MM-DD');

    return `
       <table border="1" bordercolor="#000000" style="border-collapse: collapse; width: 100%;">
                    <thead style="background-color: #9BB0C1; color: #FFFFFF;">
                        <tr>
                            <th colspan="2" style="padding: 8px; text-align: center;">JESSY CABS Booking Confirmation </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px;"><strong>Trip No:</strong></td>
                            <td style="padding: 8px;">${updatdata?.bookingno}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Name of Guest:</strong></td>
                            <td style="padding: 8px;">${updatdata?.guestname}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Contact Number :</strong></td>
                            <td style="padding: 8px;">${updatdata?.guestmobileno}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Reporting Date :</strong></td>
                            <td style="padding: 8px;">${formattedFromDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Reporting Time(24HR) :</strong></td>
                            <td style="padding: 8px;">${updatdata?.starttime} Hrs</td>
                        </tr>
                       
                        <tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Reporting Address:</strong></td>
                            <td style="padding: 8px;">${updatdata?.Address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Drop Address :</strong></td>
                            <td style="padding: 8px;">${updatdata?.useage}</td>
                        </tr>
                       
                        <tr>
                        <td style="padding: 8px;"><strong>Type of Car Required:</strong></td>
                        <td style="padding: 8px;color: #000"">${updatdata?.vehicleName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Duty Type</strong></td>
                        <td style="padding: 8px;color: #000"">${updatdata?.duty}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Confirmed By:</strong></td>
                        <td style="padding: 8px;color: #000"">${updatdata?.username}</td>
                    </tr>
                    </tbody>
                </table>
                <p>The Vehicle and Driver details will be sent to you before the pick-up time. Incase of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>
    `;
    }
    

    // HTML content for cancelled status
    const cancelledHtmlContent =(datatripsheet)=>{
        const updatdata=datatripsheet
        const formattedDate = dayjs(updatdata?.startdate).format('YYYY-MM-DD');
        const formattedFromDate = dayjs(formattedDate).format('YYYY-MM-DD');
    

    return `
        <table border="1" bordercolor="#000000" style="border-collapse: collapse; width: 100%;">
                    <thead style="background-color: #9BB0C1 ; color: #FFFFFF;">
                        <tr>
                            <th colspan="2" style="padding: 8px; text-align: center;">JESSY CABS BOOKING CANCELLATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px;"><strong>Trip No:</strong></td>
                            <td style="padding: 8px; color: #000">${updatdata?.bookingno}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Name of Guest:</strong></td>
                            <td style="padding: 8px;color: #000"">${updatdata?.guestname}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Location:</strong></td>
                            <td style="padding: 8px;color: #000"">${updatdata?.servicestation}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Date:</strong></td>
                            <td style="padding: 8px;color: #000"">${formattedFromDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Time (24):</strong></td>
                            <td style="padding: 8px;color: #000"">${updatdata?.starttime} Hrs</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Car Sent:</strong></td>
                            <td style="padding: 8px;color: #000"">${updatdata?.vehicleName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Vehicle RegNo:</strong></td>
                            <td style="padding: 8px;color: #000"">${updatdata?.vehRegNo}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Driver Name / Phone:</strong></td>
                            <td style="padding: 8px;color: #000"">${updatdata?.driverName}</td>
                        </tr>
                    </tbody>
                </table>
                <p>In case of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>

    `;
    }

    const getHtmlContentdata= (status,datatripsheet) => {
        switch(status) {
            case 'pending':
                return pendingHtmlContent(datatripsheet);
            case 'Cancelled':
                return cancelledHtmlContent(datatripsheet);
            default:
                return 'Check Your Status is not recognized.</p>';
        }
    };

   

    return {
        getHtmlContentdata
    }
    
};

export default CopyEmailHtmlBooking;
