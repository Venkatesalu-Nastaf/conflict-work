import React,{useEffect, useState,useRef} from "react";
import { APIURL } from "../../../url";
import './PdfParticularData.css'
import generatePDF from 'react-to-pdf';
import { PdfData } from "./PdfContext";

const PdfParticularData = ({addressDetails,particularPdf,organisationdetail,imagename,tripno})=>{
    console.log(tripno,"tri",organisationdetail,"org",particularPdf,'modelapdf',typeof(particularPdf),Array.isArray(particularPdf));

    const targetRef = useRef();
    const {setPdfPrint} = PdfData()

    const [orgname,setOrgname] = useState('')
    const [orgaddress1,setOrgaddress1] = useState('')
    const [orgaddress2,setOrgaddress2] = useState('')
    const [orgaddress3,setOrgaddress3] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')
    const [address3,setAddress3] = useState('')
    const [customer,setCustomer] = useState('')
    const [empno,setEmpno] = useState('')
    const [customermobile,setCustomermobile] = useState()
    const [guestname,setGuestname] = useState('')
    const [fuel,setFuel] = useState('')
    const [vehicletype,setVehicletype] = useState('')
    const [vehicleno,setVehicleno] = useState('')
    const [duty,setDuty] = useState('')
    const [drivername,setDrivername] = useState('')
    const [drivermobile,setDrivermobile] = useState('')
    const [signimageUrl,setSignImageUrl] = useState('')
    const [GmapimageUrl, setGMapImageUrl] = useState('');
    const [attachedImage, setAttachedImage] = useState('');
    const [routeData, setRouteData] = useState('');
    const [remark,setRemark] = useState('')
    const apiUrl = APIURL;
    const organisationimage=imagename
    const organisationdetails=organisationdetail

    useEffect(()=>{
        let addressone = ''
        let addresstwo = ''
        let addressthree = ''
        let organisationname = ''
        organisationdetail?.map((li)=>{
           addressone = li.addressLine1
           addresstwo = li.addressLine2
           addressthree = li.location
           organisationname = li.organizationname
        })
        setOrgaddress1(addressone)
        setOrgaddress2(addresstwo)
        setOrgaddress3(addressthree)
        setOrgname(organisationname)
    },[organisationdetail])
      
    useEffect(()=>{
        let addressone = ''
        let addresstwo = ''
        let addressthree = ""
        let customers = ''
        let fueltype = ''
        let employeeno = ''
        let empname = ''
        let guestmobile =''
        let dutytype=''
        let vehtype = ''
        let vehno = ''
        let drivernames = ''
        let remarks = ''
        let driverMobNo = ''
          if (Array.isArray(particularPdf)) {
            particularPdf.forEach((li) => {
    addressone = li.address1
    addresstwo = li.city
    addressthree = li.streetno
    customers = li.customer
    fueltype = li.fueltype
    employeeno = li.employeeno
    empname = li.guestname
    guestmobile = li.guestmobileno
    dutytype = li.duty
    vehtype = li.vehType
    vehno = li.vehRegNo
    drivernames = li.driverName
    remarks = li.remark
    driverMobNo = li.mobile
})
          }
setAddress1(addressone)
setAddress2(addresstwo)
setAddress3(addressthree)
setCustomer(customers)
setFuel(fueltype)
setEmpno(employeeno)
setGuestname(empname)
setCustomermobile(guestmobile)
setDuty(dutytype)
setVehicletype(vehtype)
setVehicleno(vehno)
setRemark(remarks)
setDrivername(drivernames)
setDrivermobile(driverMobNo)
        },[particularPdf])

    // useEffect(() => {
    //     let customername = '';
    //     if (Array.isArray(particularPdf)) {
    //         particularPdf.forEach((li) => {
    //             customername = li.customer;
    //         });
    //     }
    //     setCustomer(customername);
    // }, [particularPdf]);

      // signimage fetch 
      useEffect(() => {
        const fetchData = async () => {
            const tripidno = tripno
            try {
                const response = await fetch(`${apiUrl}/get-signimage/${tripidno}`);
                if (response.status === 200) {
                    const imageUrl = URL.createObjectURL(await response.blob());
                    setSignImageUrl(imageUrl);
                } else {
                    setSignImageUrl("")
                }
            } catch (err) {
                console.log(err, 'error');
            }
        };
    
        fetchData();
    
        return () => {
            setSignImageUrl(""); 
        };
    }, [apiUrl, tripno]);
    
//   mapimagefetch
useEffect(()=>{
     const fetchData = async()=>{
        const tripidno = tripno
        try{
            const response = await fetch(`${apiUrl}/getmapimages/${tripidno}`);
            if (response.status === 200) {
                const responseData = await response.blob();
                const imageUrl = URL.createObjectURL(responseData);
                setGMapImageUrl(imageUrl);
            }
        }
        catch(err){
            console.log(err,'error');
        }
     }
     fetchData()
},[apiUrl,tripno])     

useEffect(()=>{
const fetchData = async()=>{
    const tripidno = tripno
    try{
    const response = await fetch(`${apiUrl}/routedata/${encodeURIComponent(tripidno)}`);
    if (response.status === 200) {
        const routeData = await response.json();
        setRouteData(routeData);
    }
    else {
        setRouteData("")
        const timer = setTimeout(fetchData, 2000);
        return () => clearTimeout(timer);
    }
}
catch(err){
    console.log(err,'error');
}
}
fetchData()
},[apiUrl,tripno])

useEffect(()=>{
const fetchData = async()=>{
    const tripidno = tripno
    try{
        const response = await fetch(`${apiUrl}/get-attachedimage/${tripidno}`);
        if (response.status === 200) {
            const data = await response.json();
            const attachedImageUrls = data.imagePaths.map(path => `${apiUrl}/images/${path}`);
            setAttachedImage(attachedImageUrls);
        }

        else {
            const timer = setTimeout(fetchData, 2000);
            return () => clearTimeout(timer);
        }
    }
    catch(err){
        console.log(err,'error');
    }
}
fetchData()
},[])

const handlePopup = ()=>{
setPdfPrint(false)
}
    return(
        <>
      <div>
            <div style={{display:'flex',flexDirection:'column',width:'784px',padding:20,}} ref={targetRef}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'50px'}}>
                    <div className="customerdiv">
           <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{orgname}</h2>
           <h2 className="organisationtext">{orgaddress1}</h2>
           <h2 className="organisationtext">{orgaddress2}</h2>
           <h2 className="organisationtext">{orgaddress3}</h2>
           </div>
           <div className="Taxinvoicediv">
            <h3  className="Taxinvoicetext">
                <span>LOG </span>
                <span className="invoice">SHEET</span>
                 </h3>
           </div>
           <div className="imagediv">
           <img src={`${apiUrl}/public/org_logo/${organisationimage}`}  className="image" />
           {/* <h2 className="organisationtext"> GST : {organisationdetails[0].gstnumber}</h2> */}
           </div>

           </div>
           <div className="mobilediv">
           <h2 className="organisationtext">Tel : {organisationdetails[0]?.telephone} Mob :  {organisationdetails[0]?.contactPhoneNumber}</h2>

           <h2 className="organisationtext"> GST : {organisationdetails[0]?.gstnumber}</h2>

           </div>

           <div style={{display:'flex',gap:30,border:'1.5px solid #000000',padding:10}}>
            <div className="clientFistDiv">
             
               <p className="detailstext"><span className="labeltag">Client Name </span><p className="colontag">:</p> <span className="clientName">{customer}</span></p>
               <p className="detailstext"><span className="labeltag">Address </span><p className="colontag">:</p><span className="clientName">{address1}, {address3}{'\n'}{address2}</span></p>
                 <p className="detailstext"><span className="labeltag">Category </span><p className="colontag">:</p><span className="clientName"></span></p>
                 <p className="detailstext"> <span className="labeltag">Fuel Type </span><p className="colontag">:</p><span className="clientName">{fuel}</span></p>
                 <p className="detailstext"> <span className="labeltag">Emp.No </span><p className="colontag">:</p><span className="clientName">{empno}</span></p>
                 <p className="detailstext"><span className="labeltag">Emp.Name </span ><p className="colontag">:</p><span className="clientName"> {guestname}</span></p>
                 <p className="detailstext"><span className="labeltag">Report Add</span><p className="colontag">:</p><span></span></p>
                 <p className="detailstext"><span className="labeltag">Client Mobile</span><p className="colontag">:</p><span className="clientName">{customermobile}</span></p>
                 <p className="detailstext"><span className="labeltag">Drop Address</span><p className="colontag">:</p><span></span></p>
            </div>
            <div className="clientSecondDiv">
             <p className="detailstext"><span className="labeltagsecond">Escort Route </span><p className="colontag">:</p><span >No</span> </p>
             <p className="detailstext"> <span className="labeltagsecond">Airport Transfer</span><p className="colontag">:</p><span>No</span> </p>
             <p className="detailstext"><span className="labeltagsecond">CCode </span><p className="colontag">:</p><span>No</span> </p>
            </div>
            <div>
              <p className="detailstext"><span className="labeltag">Log No</span><p className="colontag">:</p></p>
              <p className="detailstext"><span className="labeltag">Date</span><p className="colontag">:</p></p>
              <p className="detailstext"><span className="labeltag">Duty Type  </span><p className="colontag">:</p><span className="clientName">{duty}</span> </p>
              <p className="detailstext"><span className="labeltag">Vehicle Type  </span><p className="colontag">:</p><span className="clientName">{vehicletype}</span> </p>
              <p className="detailstext"><span className="labeltag">Vehicle No  </span><p className="colontag">:</p><span className="clientName">{vehicleno}</span></p>
              <p className="detailstext"><span className="labeltag">Driver Name  </span><p className="colontag">:</p><span className="clientName">{drivername}</span></p>
              <p className="detailstext"><span className="labeltag">Driver Mobile</span><p className="colontag">:</p><span className="clientName">{drivermobile}</span></p>
              <p className="detailstext"><span className="labeltag">Request No</span><p className="colontag">:</p></p>
              <p className="detailstext"><span className="labeltag">Service City</span><p className="colontag">:</p></p>
              <p className="detailstext"><span className="labeltag">Package</span><p className="colontag">:</p></p>
              <p className="detailstext"><span className="labeltag">Segment</span><p className="colontag">:</p></p>
            </div>
           </div>
           <div className="remarksdiv">
            <p><span className="remarks">Remarks :</span> <span className="remarksdata">{remark}</span ></p>
           </div>
           <div className="tablediv">
           <div className="table">
            <table style={{borderTop:'none'}}>
                <thead>
                <tr>
                        <th></th>
                        <th>DATE </th>
                        <th >HOURS</th>
                        <th >KMS</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Closing</td>
                    <td></td>
                    <td></td>
                    <td></td>


                </tr>
                <tr>
                    <td>Releasing</td>
                    <td></td>
                    <td></td>
                    <td></td>


                </tr>
                <tr>
                    <td>Reporting</td>
                    <td></td>
                    <td></td>
                    <td></td>

                </tr>
                <tr>
                    <td> Starting </td>
                    <td></td>
                    <td></td>
                    <td></td>

                   
                </tr>
                <tr>
                    <td>Total </td>
                    <td></td>
                    <td></td>
                    <td></td>

                   
                </tr>
                </tbody>
            </table>
           </div>
           <div className="sign" style={{display:'flex',flexDirection:'column',
        justifyContent:'space-between'}}>
          {signimageUrl !== "" ? 
          <img className='dialogboximg' style={{marginTop:'40px'}} src={signimageUrl} alt=" " /> : <div className='dialogboximg' ></div>}
          <h3 style={{margin :'0px'}}>Guest Signature</h3>
           </div>
           </div>
           <div>
            <div className="parkingdiv">
                <p>Total Parking</p>
                <p>Total Permit</p>
                <p>Total Fastag/Toll</p>

            </div>
            <div>
                {GmapimageUrl !==''?  <img className="mapimage" src={GmapimageUrl} alt='' />:<div></div>}
          

            </div>
            <div className="tripsheet-RouteSummary">
            <h2>Route Summary</h2>
            <ol type="1">
              {routeData.length > 0 && routeData.map((data, index) => (
                <li><p key={index}><strong>{data.trip_type}</strong>: {data.place_name}</p></li>
              ))}
            </ol>
          </div>
           </div>
           <div >
            <p className="attachtext">Attached Image</p>
            {attachedImage && Array.isArray(attachedImage) && attachedImage.length && attachedImage!=="" > 0 ? 
  attachedImage.map((image, index) => (
    <img key={index} src={image} alt='' className="attachimage" />
  ))
 : 
  <div></div>
}

           </div>
         
           </div>
           <div className="printdiv">
           <button  className="print" onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>PRINT</button>
           <button onClick={handlePopup}className="print">
                    Cancel
                  </button>
                  </div>
           
</div>
      
        </>
    )
}
export default PdfParticularData