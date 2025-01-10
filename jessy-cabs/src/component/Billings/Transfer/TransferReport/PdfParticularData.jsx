import React, { useEffect, useState, useRef } from "react";
import { APIURL } from "../../../url";
import './PdfParticularData.css'
import generatePDF from 'react-to-pdf';
import { PdfData } from "./PdfContext";
import dayjs from "dayjs";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { blue } from "@mui/material/colors";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PdfParticularData = ({ logo, addressDetails, particularPdf, organisationdetail, imagename, tripno, customerData, stationData }) => {

  const targetRef = useRef();
  const { setPdfPrint } = PdfData()
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);

  }

  const [orgname, setOrgname] = useState('')
  const [orgaddress1, setOrgaddress1] = useState('')
  const [orgaddress3, setOrgaddress3] = useState('')
  const [address1, setAddress1] = useState('')
  const [customer, setCustomer] = useState('')
  const [empno, setEmpno] = useState('')
  const [customermobile, setCustomermobile] = useState()
  const [guestname, setGuestname] = useState('')
  const [fuel, setFuel] = useState('')
  const [vehicletype, setVehicletype] = useState('')
  const [vehicleno, setVehicleno] = useState('')
  const [duty, setDuty] = useState('')
  const [drivername, setDrivername] = useState('')
  const [drivermobile, setDrivermobile] = useState('')
  const [signimageUrl, setSignImageUrl] = useState('')
  const [GmapimageUrl, setGMapImageUrl] = useState('');
  const [attachedImage, setAttachedImage] = useState('');
  const [routeData, setRouteData] = useState('');
  const [request, setRequest] = useState('')
  const [calcpackage, setCalcPackages] = useState('')
  const [report, setReport] = useState('')
  const [dropaddress, setDropAddress] = useState('')
  const [segment, setSegement] = useState('')
  const [department, setDepartment] = useState('')
  const [escort, setEscort] = useState('')
  const [Tripidno, setTripidno] = useState('')
  const [tripsheetdate, setTripsheetdate] = useState('')
  const [tripStartDate, setTripStartDate] = useState('')
  const [tripCloseDate, setTripCloseDate] = useState('')
  const [tripshedoutDate, setTripShedOutDate] = useState('')
  const [tripshedinDate, setTripShedinDate] = useState('')
  const [tripReporttime, setTripReporttime] = useState('')
  const [tripRelasingTime, setTripReleasingTime] = useState('')
  const [tripClosetime, setTripClosetime] = useState('')
  const [tripStartTime, setTripStartTime] = useState('')
  const [tripStartKm, setTripStartKm] = useState('')
  const [tripReportKm, setTripReportKm] = useState('')
  const [tripReleaseKm, setTripReleaseKm] = useState('')
  const [tripCloseKm, setTripCloseKm] = useState('')
  const [triptotaldays, setTripTotalDays] = useState('')
  const [triptotaltime, setTripTotalTime] = useState('')
  const [triptotalkms, setTriptotalKms] = useState('')
  const [totalpermit, setTotalpermit] = useState('')
  const [totaltoll, setTotaltoll] = useState('')
  const [totalparking, setTotalParking] = useState('')
  const [tripCustomercode, setTripCustomercode] = useState('')
  const [category, setCategory] = useState('')
  const [addressCustomer, setAddresscustomer] = useState('')
  const [bookmailiamge, setBookmailimage] = useState('')
  const [remark, setRemark] = useState('')
  const apiUrl = APIURL;
  const organisationimage = imagename
  const organisationdetails = organisationdetail

  useEffect(() => {
    let addressone = ''
    let addressthree = ''
    let organisationname = ''
    organisationdetail?.forEach((li) => {
      addressone = li.addressLine1
      addressthree = li.location
      organisationname = li.organizationname
    })
    setOrgaddress1(addressone)
    setOrgaddress3(addressthree)
    setOrgname(organisationname)
  }, [organisationdetail])

  useEffect(() => {
    let addressone = ''
    let customers = ''
    let fueltype = ''
    let employeeno = ''
    let empname = ''
    let guestmobile = ''
    let dutytype = ''
    let vehtype = ''
    let vehno = ''
    let drivernames = ''
    let remarks = ''
    let driverMobNo = ''
    let request = ''
    let packages = ''

    let Dropaddress = ''
    let Report = ''
    let Segment = ''
    let Department = ''
    let Escort = ''
    let Tripid = ''
    let Tripdate = ''
    let Tripstartdate = ''
    let TripClosedate = ''
     let Tripshedoutdate = ''
    let Tripshedindate = ''
    let Reporttime = ''
    let Releasingtime = ''
    let Starttime = ''
    let CloseTime = ''
    let ReportKm = ''
    let ReleaseKm = ""
    let StartKm = ""
    let CloseKm = ""
    let Totaldays = ''
    let Totaltime = ''
    let Totalkms = ''
    let TotalParking = ''
    let TotalToll = ''
    let TotalPermit = ''
    let CustomerCode = ''
    let Categorygroups = ''
    let AddressCustomer1 = ''

    if (Array.isArray(particularPdf)) {
      particularPdf.forEach((li) => {
        console.log(li.TotalTimeWithoutAddHours,li.closekm, 'hcll');

        addressone = li.address1

        customers = li.customer
        fueltype = li.fueltype
        employeeno = li.employeeno
        empname = li.guestname
        guestmobile = li.guestmobileno
        dutytype = li.duty
        vehtype = li.vehicleName
        vehno = li.vehRegNo
        drivernames = li.driverName
        remarks = li.remark
        driverMobNo = li.mobileNo
        request = li.request

        packages = li.calcPackage
        Dropaddress = li.useage
        Report = li.transferreport
        Segment = li.segement
        Department = li.department
        Escort = li.escort
        Tripid = li.tripid
        Tripdate = li.tripsheetdate
        Tripstartdate = li.startdate
        TripClosedate = li.closedate
        Tripshedoutdate = li.shedOutDate
        Tripshedindate = li.shedInDate
        // Reporttime = li.starttime
        // Starttime = li.reporttime
        // CloseTime = li.closetime
        // Releasingtime = li.shedintime

        Starttime  = li.starttime
        Reporttime = li.reporttime
        CloseTime = li.closetime
        Releasingtime = li.shedintime
        // ReportKm = li.startkm
        // StartKm = li.shedout
        // CloseKm = li.closekm
        // ReleaseKm = li.shedin

        StartKm = li.startkm
        ReportKm = li.shedout
        CloseKm = li.closekm
        ReleaseKm = li.shedin
        Totaldays = li.totaldays
        Totaltime = li.TotalTimeWithoutAddHours
        Totalkms = parseInt(li.shedin) - parseInt(li.shedout) || 0
        TotalParking = li.parking
        TotalToll = li.toll
        TotalPermit = li.permit
        CustomerCode = li.customercode
        Categorygroups = li.orderedby
        AddressCustomer1 = li.CustomerAddress1


      })
    }
    // setTripReporttime(Reporttime)
    // setTripStartTime(Starttime)
    // setTripClosetime(Releasingtime)
    // setTripReleasingTime(CloseTime)

    setTripReporttime(Reporttime)
    setTripStartTime(Starttime)
    setTripClosetime(CloseTime)
    setTripReleasingTime(Releasingtime)
    setTripReportKm(ReportKm)
    setTripStartKm(StartKm)
    setTripCloseKm(CloseKm)
    setTripReleaseKm(ReleaseKm)
    setAddress1(addressone)
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
    setRemark(remarks)
    setDrivername(drivernames)
    setDrivermobile(driverMobNo)

    setRequest(request)
    setReport(Report)
    setDropAddress(Dropaddress)
    setSegement(Segment)
    setDepartment(Department)
    setEscort(Escort)
    setTripidno(Tripid)
    setTripsheetdate(Tripdate)
    setTripStartDate(Tripstartdate)
    setTripCloseDate(TripClosedate)
    setTripShedOutDate(Tripshedoutdate)
    setTripShedinDate(Tripshedindate)
    // setTripReporttime(Reporttime)
    // setTripClosetime(CloseTime)
    setTripTotalDays(Totaldays)
    setTripTotalTime(Totaltime)
    setTriptotalKms(Totalkms)
    setTotalParking(TotalParking)
    setTotalpermit(TotalPermit)
    setTotaltoll(TotalToll)
    setTripCustomercode(CustomerCode)
    setCategory(Categorygroups)
    setAddresscustomer(AddressCustomer1)

    setCalcPackages(packages)
  }, [particularPdf, segment])



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
  useEffect(() => {
    const fetchData = async () => {
      const tripidno = tripno
      try {
        const response = await fetch(`${apiUrl}/getmapimages/${tripidno}`);
        if (response.status === 200) {
          const responseData = await response.blob();
          const imageUrl = URL.createObjectURL(responseData);
          setGMapImageUrl(imageUrl);
        }
      }
      catch (err) {
        console.log(err, 'error');
      }
    }
    fetchData()
  }, [apiUrl, tripno])

  useEffect(() => {
    const fetchData = async () => {
      const tripidno = tripno
      try {
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
      catch (err) {
        console.log(err, 'error');
      }
    }
    fetchData()
  }, [apiUrl, tripno])

  useEffect(() => {
    const fetchData = async () => {
      const tripidno = tripno
      try {
        const response = await fetch(`${apiUrl}/get-attachedimage/${tripidno}`);
        if (response.status === 200) {
          const data = await response.json();
          const attachedImageUrls = data.imagePaths.map(path => `${apiUrl}/images/${path}`);
          setAttachedImage(attachedImageUrls);
        }
      }
      catch (err) {
        console.log(err, 'error');
      }
    }
    fetchData()
  }, [apiUrl, tripno])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const tripidno = tripno
  //     try {
  //       const response = await fetch(`${apiUrl}/booking-docPDFView/${tripidno}`);
  //       if (response.status === 200) {
  //         const data = await response.json();
  //         const attachedImageUrls = data.files
  //         // const attachedImageUrls = data.files.map(path => `${apiUrl}/images/${path.path}`);
  //         // const imagepath=data.files.map
  //         // console.log(attachedImageUrls, "dataimgaeurls")
  //         setBookmailimage(attachedImageUrls);
  //       }

  //       else {
  //         const timer = setTimeout(fetchData, 2000);
  //         return () => clearTimeout(timer);
  //       }
  //     }
  //     catch (err) {
  //       console.log(err, 'error');
  //     }
  //   }
  //   fetchData()
  // }, [apiUrl, tripno])

  const handlePopup = () => {
    setPdfPrint(false)
  }
  function trimSeconds(time) {

    // Split the time string by colon (:)
    const timeParts = time?.split(':');

    // Check if there are seconds (length 3), return hours:minutes
    if (timeParts?.length === 3) {
      return `${timeParts[0]}:${timeParts[1]}`;
    }

    // If there's only hours:minutes, return it as is
    return time;
  }

  const hclKm = parseInt(tripCloseKm || 0) - parseInt(tripStartKm || 0)
  //  const HclTotalKms = customerData[0]?.hybrid === 1 ? 
  console.log(customerData, 'hybrid', particularPdf);
  // console.log(bookmailiamge,"bookmailiamge")

  return (
    <>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '784px', padding: 20, }} ref={targetRef}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="customerdiv">
              <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{orgname}</h2>
              <h2 className="organisationtext">{stationData[0]?.address}</h2>
              {/* <h2 className="organisationtext">{orgaddress3}</h2> */}
            </div>
            <div className="Taxinvoicediv">
              <h3 className="Taxinvoicetext">
                <span>LOG </span>
                <span className="invoice">SHEET</span>
              </h3>
            </div>
            <div className="imagediv">
              {/* <img src={`${apiUrl}/public/org_logo/${organisationimage}`} className="image" alt="organisationimage"/> */}
              <img src={logo} className="image" alt="organisationimage" />
              {/* <h2 className="organisationtext"> GST : {organisationdetails[0].gstnumber}</h2> */}
            </div>

          </div>
          <div className="mobilediv">
            <h2 className="organisationtext">Tel : {organisationdetails[0]?.telephone} Mob :  {organisationdetails[0]?.contactPhoneNumber}</h2>

            <h2 className="organisationtext"> GST : {stationData[0]?.gstno}</h2>

          </div>

          <div style={{ display: 'flex', gap: 20, border: '1.5px solid #000000', padding: '10px', }}>
            <div className="clientFistDiv">

              <p className="detailstext"><span className="labeltag">Client Name </span><p className="colontag">:</p> <span className="clientName">{customer}</span></p>
              <p className="detailstext"><span className="labeltag">Address </span><p className="colontag">:</p><span className="clientName">{customerData[0]?.address1}</span></p>
              <p className="detailstext"><span className="labeltag">Category </span><p className="colontag">:</p><span className="clientName">{category}</span></p>
              <p className="detailstext"> <span className="labeltag">Fuel Type </span><p className="colontag">:</p><span className="clientName">{fuel}</span></p>
              <p className="detailstext" > <span className="labeltag">Emp.No </span><p className="colontag">:</p><span className="clientName">{empno}</span></p>
              <p className="detailstext"><span className="labeltag">Emp.Name </span ><p className="colontag">:</p><span className="clientName"> {guestname}</span></p>
              <p className="detailstext"><span className="labeltag">Report Add</span><p className="colontag">:</p><span className="clientName">{address1}</span></p>
              <p className="detailstext"><span className="labeltag">Client Mobile</span><p className="colontag">:</p><span className="clientName">{customermobile}</span></p>
              <p className="detailstext"><span className="labeltag">Drop Address</span><p className="colontag">:</p><span className="clientNamedrop">{dropaddress}</span></p>
            </div>
            <div className="clientSecondDiv">
              <p className="detailstext"><span className="labeltagsecond">Escort Route </span><p className="colontag">:</p><span >{escort}</span> </p>
              {/* <p className="detailstext"><span className="labeltagsecond">Airport Transfer</span><p className="colontag">:</p><span>{report ? "Yes" : "No"}</span> </p> */}
              <p className="detailstext"><span className="labeltagsecond">Airport Transfer</span><p className="colontag">:</p><span>{report}</span> </p>
              <p className="detailstext"><span className="labeltagsecond">CCode </span><p className="colontag">:</p><span>{tripCustomercode ? tripCustomercode : 'No'}</span> </p>
            </div>
            <div className="clientThirdDiv">
              <p className="detailstext"><span className="labeltag">Log No</span><p className="colontag">:</p>{Tripidno}</p>
              <p className="detailstext"><span className="labeltag">Date</span><p className="colontag">:</p>{tripsheetdate ? dayjs(tripsheetdate).format('DD/MM/YYYY') : ""}</p>
              <p className="detailstext"><span className="labeltag">Duty Type  </span><p className="colontag">:</p><span className="clientName">{duty}</span> </p>
              <p className="detailstext"><span className="labeltag">Vehicle Type  </span><p className="colontag">:</p><span className="clientName">{vehicletype}</span> </p>
              <p className="detailstext"><span className="labeltag">Vehicle No  </span><p className="colontag ">:</p><span className="clientName">{vehicleno}</span></p>
              <p className="detailstext"><span className="labeltag">Driver Name  </span><p className="colontag">:</p><span className="clientName">{drivername}</span></p>
              <p className="detailstext"><span className="labeltag">Driver Mobile</span><p className="colontag">:</p><span className="clientName">{drivermobile}</span></p>
              <p className="detailstext"><span className="labeltag">Request No</span><p className="colontag">:</p>{request}</p>
              <p className="detailstext"><span className="labeltag">Service City</span><p className="colontag">:</p>{department}</p>
              <p className="detailstext"><span className="labeltag">Package</span><p className="colontag">:</p>{duty === "Transfer" || duty === "Outstation" ? duty : calcpackage}</p>
              <p className="detailstext"><span className="labeltag">Segment</span><p className="colontag">:</p>{segment}</p>
            </div>
          </div>
          <div className="remarksdiv">
            <p style={{ marginLeft: '10px', marginBottom: '10px' }}><span className="remarks">Remarks :</span> <span className="remarksdata">{remark}</span ></p>
          </div>
          <div className="tablediv">
            <div className="table">
              <table style={{ borderTop: 'none' }}>
                <thead>
                  <tr>
                    <th></th>
                    <th>DATE </th>
                    <th >HOURS</th>
                    <th >KMS</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <td> Closing </td>
                    <td>{tripCloseDate ? dayjs(tripCloseDate).format('DD/MM/YYYY') : ''}</td>
                    {customerData[0]?.hybrid === 1 && duty !== "Outstation" ? <td>{'-'}</td> : <td>{trimSeconds(tripClosetime)}</td>}
                    {customerData[0]?.hybrid !== 1  ? <td>{tripReleaseKm}</td> : <td>{'-'}</td>}
                  </tr>
                  {customerData[0]?.hybrid === 1 ? <tr>
                    <td>Releasing</td>
                    <td>{tripCloseDate ? dayjs(tripCloseDate).format('DD/MM/YYYY') : ''}</td>
                    <td>{trimSeconds(tripRelasingTime)}</td>
                    {customerData[0]?.hybrid == 1 ? <td>{hclKm}</td> : <td>{'-'}</td>}
                  </tr> : ""}
                  {customerData[0]?.hybrid === 1 ? <tr>
                    <td>Reporting</td>
                    <td>{tripStartDate ? dayjs(tripStartDate).format('DD/MM/YYYY') : ''}</td>
                    <td>{tripReporttime ? trimSeconds(tripReporttime) : 0.00}</td>
                    {customerData[0]?.hybrid == 1 ? <td>0</td> : <td>{'-'}</td>}
                  </tr> : ""}
                  <tr>
                    <td>Starting</td>
                    <td>{tripStartDate ? dayjs(tripStartDate).format('DD/MM/YYYY') : ''}</td>
                    {customerData[0]?.hybrid === 1 ? <td>{'-'}</td> : <td>{trimSeconds(tripStartTime)}</td>}
                    {customerData[0]?.hybrid !== 1 ? <td>{tripStartKm}</td> : <td>{'-'}</td>}
                  </tr>

                  <tr>
                    <td>Total </td>
                    <td>{triptotaldays ? triptotaldays : 0}</td>
                    <td>{triptotaltime ? triptotaltime : 0.00}</td>
                    {customerData[0]?.hybrid === 1 ? <td> {hclKm}</td> : <td>{triptotalkms}</td>}
                  </tr>
                </tbody> */}



             <tbody>
              {customerData[0]?.hybrid === 1 ?
              <>
                  <tr>
                    <td> Closing </td>
                    <td>{tripshedinDate ? dayjs(tripshedinDate).format('DD/MM/YYYY') : ''}</td>
                    {customerData[0]?.hybrid === 1 && duty !== "Outstation" ? <td>{'-'}</td> : <td>{trimSeconds(tripRelasingTime)}</td>}
                    {customerData[0]?.hybrid === 1 && duty === "Outstation"   ? <td>{tripReleaseKm}</td> : <td>{'-'}</td>}
                  </tr>
               <tr>
                    <td>Releasing</td>
                    <td>{tripCloseDate ? dayjs(tripCloseDate).format('DD/MM/YYYY') : ''}</td>
                    <td>{trimSeconds(tripClosetime)}</td>
                    <td>{tripCloseKm}</td>
                  </tr>
                  <tr>
                    <td>Reporting</td>
                    <td>{tripStartDate ? dayjs(tripStartDate).format('DD/MM/YYYY') : ''}</td>
                    <td>{trimSeconds(tripStartTime)}</td>
                    <td>{tripStartKm}</td>
                  
                  </tr> 
                  <tr>
                    <td>Starting</td>
                    <td>{tripshedoutDate ? dayjs(tripshedoutDate).format('DD/MM/YYYY') : ''}</td>
                    {/* <td>{trimSeconds(tripStartTime)}</td> */}
                    {customerData[0]?.hybrid === 1 && duty === "Outstation"   ? <td>{trimSeconds(tripReporttime)}</td> : <td>{'-'}</td>}
                     {/* <td>{tripStartKm}</td> */}
                     {/* {customerData[0]?.hybrid === 1 && duty === "Outstation"   ? <td>{tripReportKm}</td> : <td>{'-'}</td>} */}
                     <td>{'-'}</td>
                  </tr>

                  <tr>
                    <td>Total </td>
                    <td>{triptotaldays}</td>
                    <td>{triptotaltime}</td>
                    {customerData[0]?.hybrid === 1 && duty !== "Outstation" ? <td> {hclKm}</td> : <td>{triptotalkms}</td>}
                  </tr>
                  </>
                  :
                  <>

                  <tr>
                    <td> Closing </td>
                    {/* <td>{tripCloseDate ? dayjs(tripCloseDate).format('DD/MM/YYYY') : ''}</td> */}
                    <td>{tripshedinDate ? dayjs(tripshedinDate).format('DD/MM/YYYY') : ''}</td>
                    <td>{trimSeconds(tripRelasingTime)}</td>
                    {/* <td>{trimSeconds(tripClosetime)}</td> */}
                    <td>{tripReleaseKm}</td> 
                  </tr>
                
                  <tr>
                    <td>Starting</td>
                    {/* <td>{tripStartDate ? dayjs(tripStartDate).format('DD/MM/YYYY') : ''}</td> */}
                    <td>{tripshedoutDate ? dayjs(tripshedoutDate).format('DD/MM/YYYY') : ''}</td>
                    <td>{trimSeconds(tripReporttime)}</td>
                    <td>{tripReportKm}</td> 
                  </tr>

                  <tr>
                    <td>Total </td>
                    <td>{triptotaldays}</td>
                    <td>{triptotaltime}</td>
                    <td>{triptotalkms}</td>
                  </tr>
                  </>
                  }
                </tbody>
              </table>
            </div>
            <div className="sign" style={{
              display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {signimageUrl !== "" ?
                <img className='dialogboximg' style={{ marginTop: '40px' }} src={signimageUrl} alt=" " /> : <div className='dialogboximg' ></div>}
              <h3 style={{ margin: '0px' }}>Guest Signature</h3>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
              <div>
                {GmapimageUrl !== '' ? <img className="mapimage" src={GmapimageUrl} alt='' style={{ width: '375px', height: '100%' }} /> : <div></div>}
              </div>
              <div className="parkingdiv">
                <p>Total Parking: {totalparking ? totalparking : 0}</p>
                <p>Total Permit: {totalpermit ? totalpermit : 0}</p>
                <p>Total Fastag/Toll: {totaltoll ? totaltoll : 0}</p>
              </div>
            </div>
            {routeData.length > 0 && (
              <div className="tripsheet-RouteSummary" style={{ marginTop: 50 }}>
                <h2>Route Summary</h2>
                <ol type="1">
                  {routeData.map((data, index) => (
                    <li key={index}>
                      <p><strong>{data.trip_type}</strong>: {data.place_name}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

          </div>
          {console.log(attachedImage,"pp")}
          <div>
            {attachedImage ? <p className="attachtext" style={{ marginTop: 180 }}>Attached Image</p> : <p className="attachtext"></p>}
       

              {attachedImage && Array.isArray(attachedImage) && attachedImage.length > 0 && attachedImage !== "" ? (
                                            <>
            
                                                {attachedImage.map((file, index) => {
                                                    const fileExtension = file.substring(file.lastIndexOf('.') + 1);
                                                    console.log(fileExtension); // Logs the file extension (e.g., "jpg", "pdf")
                                                    return fileExtension === 'pdf' ? (
                                                        <Document
                                                            file={file}
                                                            onLoadSuccess={onDocumentLoadSuccess}
                                                        >
                                                            {Array.from(new Array(numPages), (el, index) => (
            
                                                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            
                                                            ))}
            
                                                        </Document>
                                                    ) : (
                                                        <img
                                                            key={index}
                                                            src={file}
                                                            alt=""
                                                            className="attachimage"
                                                            loading="lazy"
                                                        />
                                                    );
                                                })}
                                            </>
                                        ) : (
                                            <></>
                                        )}
          </div>
          {/* <div>
            {bookmailiamge && Array.isArray(bookmailiamge) && bookmailiamge.length && bookmailiamge !== "" > 0 ?
              bookmailiamge.map((image, index) => (



                <>
                  <Document
                    file={image}
                    onLoadSuccess={onDocumentLoadSuccess}

                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                  <p>Page {numPages} of {numPages}</p>
                </>


              ))
              :
              <div></div>}
          </div> */}

          {/* dont delete this code */}
          {/* {bookmailiamge && Array.isArray(bookmailiamge) && bookmailiamge.length > 0 ?
            bookmailiamge.map((image, index) => (
              image.mimetype === "pdf" ? (
                <div key={index}>
                  <Document
                    file={`${apiUrl}/images/${image.path}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.from(new Array(numPages), (el, index) => (

                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />

                    ))}
                  </Document>

                </div>
              ) : (
                <div key={index}>
                  <img src={`${apiUrl}/images/${image.path}`} alt={`image_${index}`} className="bookimage" />

                </div>
              )
            ))
            :
            <div></div>
          } */}


        </div>
        <div className="printdiv">
          <button className="print" onClick={() => generatePDF(targetRef, { filename: `Trip No ${Tripidno}` })}>PRINT</button>
          <button onClick={handlePopup} className="print">
            Cancel
          </button>
        </div>

      </div>

    </>
  )
}
export default PdfParticularData