import React, { useEffect, useState } from "react";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image, } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    // padding: 10,
  },
  heading: {
    border: '2px solid #000000',
    padding: '20px'
  },

  section: {
    marginTop: 1

  },

  gst: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '130px',
    padding: '0px'

  },

  text1: {
    fontSize: '15px',
    fontWeight: 'bold'
  },
  text2: {
    fontSize: '11px',

  },

  gstno: {
    fontSize: '11px',
    fontWeight: 'bold'
  },


  logo: {
    height: 50,
    width: 50
  },

  headingsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logodiv: {
    // marginBottom: 10
    padding: '0px'
  },
  maintabble: {
    border: '1px solid #000000',
    // display:"flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    gap: '10px',
    paddingRight: "10px"
  },
  deatilssection: {

    flexDirection: 'row',
    marginTop: "5px",


  },
  deatilssection1: {

    flexDirection: 'row',
    // marginTop:"20px",
    marginBottom: "4px",
    alignItems: "center",

  },
  labeltag: {
    fontSize: '10px',
    fontWeight: 'extrabold',
    width: '70px',
  },
  labelMidContainer: {
    fontSize: '10px',
    fontWeight: 'extrabold',
    width: '70px',
  },
  clientName: {
    fontSize: '10px',
    color: '#000000',
    fontWeight: 'extrabold',

  },
  // labeltag1: {
  //   fontSize: '13px',
  //   textAlign: 'center'

  // },
  clientName1: {
    fontSize: '10px',
    color: '#545151',
    textAlign: 'center'

  },
  clientAddress: {
    fontSize: '10px',
    color: '#000000',
    fontWeight: 'extrabold',
    textAlign: 'left',
    lineHeight: '1.3px',

  },
  remarksection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    borderLeft: '1px solid #000000',
    borderRight: '1px solid #000000',

    height: 30,


  }, tablesigndiv: {
    flexDirection: "row",
    border: '1px solid #000000',

  },
  tablediv: {
    width: '60%',
    // border: '1px solid green',
    // flexDirection:'row',

  },
  signdiv: {
    width: '40%',

  },
  signatureimage: {
    height: '70px'

  },

  tablehead: {
    flexDirection: "row",
    // width:'25%',
    textAlign: 'center',
    borderBottom: '1px solid #000000'
  },
  labeltag1: {

    width: '25%',
    // textAlign: 'center',
    borderRight: '1px solid #000000',
  },
  labeltagremark: {
    textAlign: 'center',
    fontSize: '10px',
    paddingLeft: '5px'

  },
  labeltag2: {
    width: '25%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    padding: '1px',

    borderRight: '1px solid #000000'
  },

  labeltag3: {
    width: '25%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    padding: '1px',

    borderRight: '1px solid #000000'
  },
  labeltag4: {
    width: '25%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    padding: '1px',
    borderRight: '1px solid #000000',

  },

  labeltag5: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '2px'
  },
  labeltag6: {
    width: '25%',
    textAlign: 'center',
    fontSize: '10px',
    borderRight: '1px solid #000000',
    padding: '2px'
  },

  labeltag9: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '2px'
  },

  labeltag10: {
    width: '25%',
    textAlign: 'center',
    fontSize: '10px',
    borderRight: '1px solid #000000',
    padding: '2px'
  },

  labeltag13: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '2px'
  },
  labeltag14: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '2px'
  },

  labeltag17: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'center',

    borderRight: '1px solid #000000',
    padding: '2px'
  },
  labeltag18: {
    width: '25%',
    textAlign: 'center',
    fontSize: '10px',

    borderRight: '1px solid #000000',
    padding: '2px'
  },

  labeltag21: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'center',


    borderRight: '1px solid #000000',
    padding: '2px'
  },
  labeltag22: {
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    fontSize: '11px',
    padding: '2px'
  },


  tablehead1: {
    borderBottom: '1px solid #000000',
    flexDirection: 'row',
    // gap:'10px'


  },
  tablehead4: {
    flexDirection: 'row',
    borderBottom: '1px solid #000000',

  },
  tablehead2: {
    flexDirection: 'row',
    borderBottom: '1px solid #000000',

  },
  tablehead3: {
    flexDirection: 'row',
    borderBottom: '1px solid #000000',

  },
  tablehead5: {
    flexDirection: 'row',
    // borderBottom: '1px solid #000000',

  }, signimg: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: '15px',
    // height:"40px"


  },
  signtxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
    // height:"40px"


  },
  mapdiv: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    // alignItems:'center',
    gap: "30px",
    padding: '3px'
  },
  topmap: {
    marginTop: "40px"
  },
  atimg: {
    textAlign: 'center'
  },
  addimg: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  imagedivadd: {

    height: '170px',
  },

  imgwidth: {
    width: '50%',

  }


});

const PdfzipParticularData = ({ particularPdf, organisationdetail, imagename, customerData, stationData }) => {

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
  const [signnature_image, setSignatureimage] = useState()
  const [map_image, setMapimage] = useState()
  const [routemap, setRoutemapdata] = useState([])
  const [attachedImage, setAttachedimage] = useState([])
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
  // const [tripReporttime, setTripReporttime] = useState('')
  // const [tripClosetime, setTripClosetime] = useState('')
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
  const [addresscustomer, setAddresscustomer] = useState('')
  const [bookimage, setBookingimage] = useState([])
  const [starttime, setStarttime] = useState('0')
  const [shedintime, setShedintime] = useState('0')
  const [startkm, setStartkm] = useState('0')
  const [closekm, setClosekm] = useState('0')
  const [releasingKM, setReleasingKM] = useState('0')
  const [reportKM, setReportKM] = useState('0')


  const [remark, setRemark] = useState('')
  const apiUrl = APIURL;
  const organisationimage = imagename

  const organisationdetails = organisationdetail

  const convertTimeFormat = (time) => {

    // const regex = /(\d+)h\s*(\d+)m/;
    // const match = time.match(regex);
    // if (match) {
    //   const hours = match[1].padStart(2, '0');
    //   const minutes = match[2].padStart(2, '0');
    //   return `${hours}:${minutes}`;
    // }
    return time; // Return original if it doesn't match the pattern
  };

  // const trimSeconds = (time) => {
  //   return time.slice(0, 5);
  // };
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
    let signatureimage = ''
    let request = ''
    let packages = ''
    let mapimage = ''
    let Dropaddress = ''
    let Report = ''
    let Segment = ''
    let Department = ''
    let Escort = ''
    let Tripid = ''
    let Tripdate = ''
    let Tripstartdate = ''
    let TripClosedate = ''
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
    let routemapdata = []
    let attachedimagedata = []
    let customeraddress1 = ""
    let startTime = ''
    let shedInTime = ''
    let startkm = ''
    let closekm = ''
    let reportkm = ''
    let releasekm = ''

    let bookingimagedata = []
    if (Array.isArray(particularPdf)) {
      particularPdf.forEach((li) => {
        addressone = li.address1
        customers = li.customer
        fueltype = li.fueltype
        employeeno = li.employeeno
        empname = li.guestname
        guestmobile = li.guestmobileno
        dutytype = li.duty
        vehtype = li.vehType
        vehno = li.vehRegNo
        request = li.request
        drivernames = li.driverName
        remarks = li.remark
        driverMobNo = li.mobile
        signatureimage = JSON.parse(li.signature_data)
        mapimage = JSON.parse(li.map_data)
        routemapdata = JSON.parse(li.gmapdata)
        attachedimagedata = JSON.parse(li.Attachedimage)
        bookingimagedata = JSON.parse(li.bookattachedimage)
        packages = li.calcPackage
        Dropaddress = li.useage
        Report = li.transferreport
        Segment = li.segment
        Department = li.department
        Escort = li.escort
        Tripid = li.tripid
        Tripdate = li.tripsheetdate
        Tripstartdate = li.startdate
        TripClosedate = li.closedate

        Reporttime = li.starttime
        Starttime = li.reporttime
        CloseTime = li.closetime
        Releasingtime = li.shedintime
        ReportKm = li.startkm
        StartKm = li.shedout
        CloseKm = li.shedin
        ReleaseKm = li.closekm

        // Reporttime = trimSeconds(li.reporttime)
        // startTime = trimSeconds(li.starttime)
        // shedInTime = trimSeconds(li.shedintime)
        // CloseTime = trimSeconds(li.closetime);
        // startkm = li.shedout;
        // closekm = li.shedin;
        // reportkm = li.startkm;
        // releasekm = li.closekm;
        Totaldays = li.totaldays
        Totaltime = convertTimeFormat(li.totaltime);
        Totalkms = li.totalkm1
        TotalParking = li.parking
        TotalToll = li.toll
        TotalPermit = li.permit
        CustomerCode = li.customercode
        Categorygroups = li.Groups
        customeraddress1 = li.Customeraddress1





      })
    }



    const uniqueArray = Array.from(new Set(attachedimagedata?.filter(item => item.attachedimageurl !== null)?.map(JSON.stringify)))?.map(JSON.parse);

    const uniqueArraybook = Array.from(new Set(bookingimagedata?.filter(item => item.imagees !== null)?.map(JSON.stringify)))?.map(JSON.parse);


    // const uniqueArraybook = Array.from(new Set(bookingimagedata?.map(JSON.stringify)))?.map(JSON.parse);

    // Convert the unique array back to a JSON string
    const uniqueJsonString = JSON.stringify(uniqueArray);
    const uniqueJsonStringbook = JSON.stringify(uniqueArraybook);
    const mapdata = Array.from(new Set(routemapdata?.filter(item => item.trip_type !== null && item.place_name)?.map(JSON.stringify)))?.map(JSON.parse);


    const { signature_path } = signatureimage
    const { map_path } = mapimage
    setAddress1(customeraddress1)
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
    setMapimage(map_path)
    setSignatureimage(signature_path)
    setRoutemapdata(mapdata)
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

    setTripReporttime(Reporttime)
    setTripStartTime(Starttime)
    setTripClosetime(Releasingtime)
    setTripReleasingTime(CloseTime)
    setTripReportKm(ReportKm)
    setTripStartKm(StartKm)
    setTripCloseKm(CloseKm)
    setTripReleaseKm(ReleaseKm)

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
    setAddresscustomer(customeraddress1)
    // setStarttime(startTime)
    // setShedintime(shedInTime)
    setCalcPackages(packages)
    setBookingimage(JSON.parse(uniqueJsonStringbook))
    // setStartkm(startkm)
    // setClosekm(closekm)
    // setReleasingKM(releasekm)
    // setReportKM(reportkm)
    setAttachedimage(JSON.parse(uniqueJsonString))
  }, [particularPdf])

  const firstSet = routemap.slice(0, 12);
  const nextSet = routemap.slice(12, 24);
  const remainingItems = routemap.slice(24);
  const hclKm = parseInt(tripCloseKm || 0) - parseInt(tripReportKm || 0)

  return (
    <>
      <PDFDocument>
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <View style={styles.borderoutsite}>
              <View style={styles.section}>
                <View style={styles.headingsection}>
                  <View>
                    <Text style={styles.text1}>{orgname}</Text>
                    <Text style={styles.text2}> {stationData[0]?.address}</Text>
                    {/* <Text style={styles.text2}>{orgaddress3} </Text> */}
                  </View>
                  <View>
                    <Text style={{ fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>LOG SHEET</Text>
                  </View>
                  <View style={styles.logodiv}>

                    <Image src={organisationimage} style={styles.logo} />
                  </View>
                </View>
                <View style={styles.gst}>
                  <View>

                    <Text style={styles.text2}>Tel:{organisationdetails[0].telephone},Mob:{organisationdetails[0].contactPhoneNumber} </Text>

                  </View>
                  <View>

                    <Text style={styles.gstno}>GSTIN: {organisationdetails[0].gstnumber}</Text>

                  </View>

                </View>
                <View style={styles.maintabble}>

                  <View style={{ flexDirection: "column", margin: "3px" }}>

                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Client Name </Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}>{customer}</Text>
                    </View>

                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Address</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientAddress}> {customerData[0]?.address1}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Category</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}> {category}  </Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Fuel Type</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}> {fuel}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Emp No</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}> {empno}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Guest Name</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}> {guestname}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Guest Mobile</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}> {customermobile}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Report Add</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}> {address1}</Text>
                    </View>

                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Drop Address</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={styles.clientName}> {dropaddress}</Text>
                    </View>

                    <View style={styles.deatilssection}>
                      <Text style={styles.labelMidContainer}>Escort Route</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {escort}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labelMidContainer}>Airport Transfer</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {report ? "Yes" : "No"}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labelMidContainer}>Ccode</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {tripCustomercode ? tripCustomercode : 'No'}</Text>
                    </View>


                  </View>


                  {/* <View style={{ flexDirection: "column", margin: "5px" }}>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labelMidContainer}>Escort Route</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {escort}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labelMidContainer}>Airport Transfer</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {report ? "Yes" : "No"}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labelMidContainer}>Ccode</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {tripCustomercode ? tripCustomercode : 'No'}</Text>
                    </View>

                  </View> */}


                  <View style={{ flexDirection: "column", margin: "5px" }}>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Log No</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {Tripidno}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Date</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {tripsheetdate ? dayjs(tripsheetdate).format('DD/MM/YYYY') : ""}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Duty Type</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {duty}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Vehicle Type</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {vehicletype}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Vehicle No</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {vehicleno}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Driver Name</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {drivername}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Driver Mobile</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {drivermobile}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Request No</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {request}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Service City</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {department}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Package</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {calcpackage}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Segment</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                      <Text style={styles.clientName}> {segment}</Text>
                    </View>


                  </View>

                </View>
                <View style={styles.remarksection}>
                  <Text style={styles.labeltagremark}>Remarks</Text>
                  <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                  <Text style={styles.clientName1}>{remark}</Text>

                </View>

                <View style={styles.tablesigndiv}>
                  <View style={styles.tablediv}>
                    {/* <View>
    
  </View> */}
                    <View style={styles.tablehead}>
                      <View style={styles.labeltag1}>
                        <Text >{"  "}</Text>

                      </View>
                      <View style={styles.labeltag2}>
                        <Text >DATE</Text>

                      </View>
                      <View style={styles.labeltag3}>
                        <Text >HOURS</Text>

                      </View>
                      <View style={styles.labeltag4}>
                        <Text>KMS</Text>

                      </View>
                      {/* <View></View> */}
                    </View>

                    <View style={styles.tablehead1}>
                      <View style={styles.labeltag5}>
                        <Text > Closing</Text>

                      </View>


                      <View style={styles.labeltag6}>
                        <Text>{dayjs(tripCloseDate).format('DD/MM/YYYY')}</Text>

                      </View>



                      <View style={styles.labeltag6}>
                        {customerData[0]?.hybrid === 1 ? <Text>{'-'}</Text> : <Text> {trimSeconds(tripClosetime)}</Text>}

                      </View>
                      <View style={styles.labeltag6}>
                        {customerData[0]?.hybrid !== 1 ? <Text>{tripReleaseKm}</Text> : <Text>{"-"}</Text>}

                      </View>

                    </View>
                    {customerData[0]?.hybrid === 1 ?
                      <View style={styles.tablehead2}>
                        <View style={styles.labeltag9}>
                          <Text >Releasing</Text>

                        </View>


                        <View style={styles.labeltag10}>
                          <Text>{dayjs(tripCloseDate).format('DD/MM/YYYY')}</Text>

                        </View>

                        <View style={styles.labeltag10}>
                          <Text>{trimSeconds(tripRelasingTime)}</Text>

                        </View>
                        <View style={styles.labeltag10}>
                          {customerData[0]?.hybrid == 1 ? <Text>{hclKm}</Text> : <Text>{"-"}</Text>}

                        </View>

                      </View> : ""}

                    {customerData[0]?.hybrid === 1 ?
                      <View style={styles.tablehead3}>
                        <View style={styles.labeltag13}>
                          <Text >Reporting</Text>

                        </View>


                        <View style={styles.labeltag14}>
                          <Text>{dayjs(tripStartDate).format('DD/MM/YYYY')}</Text>

                        </View>



                        <View style={styles.labeltag14}>
                          <Text>{trimSeconds(tripReporttime)}</Text>

                        </View>
                        <View style={styles.labeltag14}>
                          {customerData[0]?.hybrid == 1 ? <Text> 0 </Text> : <Text>{'-'}</Text>}

                        </View>

                      </View> : ""}


                    <View style={styles.tablehead4}>
                      <View style={styles.labeltag17}>
                        <Text >Starting</Text>

                      </View>


                      <View style={styles.labeltag18}>
                        <Text>{dayjs(tripStartDate).format('DD/MM/YYYY')}</Text>

                      </View>
                      <View style={styles.labeltag18}>
                        {customerData[0]?.hybrid === 1 ? <Text>{"-"}</Text> : <Text> {trimSeconds(tripStartTime)} </Text>}

                      </View>
                      <View style={styles.labeltag18}>
                        {customerData[0]?.hybrid !== 1 ? <Text>{tripStartKm}</Text> : <Text>{ }</Text>}

                      </View>

                    </View>
                    <View style={styles.tablehead5}>
                      <View style={styles.labeltag21}>
                        <Text >Total</Text>

                      </View>


                      <View style={styles.labeltag22}>
                        <Text>{triptotaldays ? triptotaldays : 0}</Text>

                      </View>

                      <View style={styles.labeltag22}>
                        <Text>{triptotaltime ? triptotaltime : 0.00}</Text>

                      </View>
                      <View style={styles.labeltag22}>
                        {customerData[0]?.hybrid === 1 ? <Text>{hclKm}</Text> : <Text>{triptotalkms}</Text>}

                      </View>

                    </View>


                  </View>

                  <View style={styles.signdiv}>
                    <View style={styles.signimg}>
                      <Image src={`${apiUrl}/public/signature_images/${signnature_image}`} style={styles.signatureimage} />

                    </View>
                    <View style={styles.signtxt}>
                      <Text style={{ margin: '0px', fontSize: '10px' }}>Guest Signature</Text>

                    </View>


                  </View>
                  {/* </View> */}</View>


                <View style={styles.mapdiv}>

                  <View style={{ height: 170, border: '1px solid #000000', width: '60%' }} >
                    <Image src={`${apiUrl}/public/map_images/${map_image}`} />

                  </View>

                  <View style={styles.topmap}>
                    <View style={{ flexDirection: 'row', marginTop: "10px" }}>
                      <Text style={{ fontSize: '12px', width: '90px' }}>Total Parking</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={{ fontSize: '11px', marginRight: '2px', color: '#363434' }}>{totalparking ? totalparking : 0}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: "10px" }}>
                      <Text style={{ fontSize: '12px', width: '90px' }}>Total Permit</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={{ fontSize: '11px', marginRight: '2px', color: '#363434' }}>{totalpermit ? totalpermit : 0}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: "10px" }}>
                      <Text style={{ fontSize: '12px', width: '90px' }}>Total Fastag/Toll</Text>
                      <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text>
                      <Text style={{ fontSize: '11px', marginRight: '2px', color: '#363434' }}>{totaltoll ? totaltoll : 0}</Text>
                    </View>

                  </View>


                </View>


                {/* <View style={{ flexDirection: 'row', gap: "10px" }}>
                  {routemap.map((item, index) => (
                    <View key={index}>  <Text style={{ fontSize: 9 }}>{index + 1} {"."} {item.trip_type}{","}{item.place_name}</Text></View>
                  ))
                  }

                </View> */}
                <View style={{ flexDirection: 'row', gap: '10px', marginTop: '3px' }}>
                  {firstSet.length > 0 ?
                    <View style={{ width: "48%" }}>
                      {firstSet.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row' }}>
                          <Text style={{ fontSize: 9, marginTop: "1px", marginBottom: '2px' }}>
                            {index + 1} .
                          </Text>
                          <Text style={{ marginLeft: '2px', fontSize: 9, marginTop: "1px", marginBottom: '2px' }}>
                            {item.trip_type}, {item.place_name}
                          </Text>
                        </View>
                      ))}
                    </View>
                    : <></>}

                  {nextSet.length > 0 ?
                    <View style={{ width: "48%" }}>
                      {nextSet.map((item, index) => (
                        <View key={index + 12} style={{ flexDirection: 'row' }}>
                          <Text style={{ fontSize: 9, marginTop: "1px", marginBottom: '2px' }}>
                            {index + 13} .
                          </Text>
                          <Text style={{ marginLeft: '2px', fontSize: 9, marginTop: "1px", marginBottom: '2px' }}>
                            {item.trip_type}, {item.place_name}
                          </Text>
                        </View>
                      ))}
                    </View>
                    : <></>}


                </View>
                {remainingItems.length > 0 ?
                  <View style={{ marginTop: '10px' }}>
                    <Text style={{ opacity: 0 }}>empty Line</Text>
                    <Text style={{ opacity: 0 }}>empty Line</Text>
                    {remainingItems.map((item, index) => (
                      <View key={index + 24} style={{ marginTop: '10px' }}>
                        <Text style={{ fontSize: 9, marginTop: "2px", marginBottom: '2px' }}>
                          {index + 25}. {item.trip_type}, {item.place_name}
                        </Text>
                      </View>
                    ))}
                  </View> : <></>}


                {/* <View style={{ flexDirection: 'column', width: '100%', marginTop: '10px' }}> */}
                {attachedImage && attachedImage.length > 0 ? (
                  <>
                    {/* <View style={{ width: "100%" }}> */}
                    {/* <Text style={styles.atimg}>Attached image</Text> */}
                    {/* </View> */}
                    <View style={[styles.addimg, { width: '100%' }]}>
                      {attachedImage.map((item, index) => (
                        <View key={index} style={[styles.imgwidth, { padding: '3px' }]} >
                          <Image src={`${apiUrl}/images/${item.attachedimageurl}`} style={[styles.imagedivadd]} />
                        </View>
                      ))}
                    </View>
                  </>
                ) : (
                  <></>
                  // <View style={{ width: "100%", margin: 'auto', marginTop: '100px' }}>
                  //   <Text style={styles.atimg}>  No Attached image</Text>
                  // </View>
                )}
                {/* </View> */}


                {/* <View style={{ flexDirection: 'column', width: '100%' }}> */}
                {bookimage && bookimage.length > 0 && (
                  <>
                    <View style={{ width: '100%' }}>

                      {bookimage.map((item, index) => {
                        const dataimgetype = item.imagees.split('.').pop();
                        // URL.createObjectURL(img)
                        if (dataimgetype !== "pdf") {
                          return (
                            <View key={index} style={{ width: '100%' }}>
                              <Image src={`${apiUrl}/images/${item.imagees}`} />
                            </View>
                          );
                        } else {
                          return null;
                        }
                      })}

                    </View>
                  </>
                )
                }


                {/* </View> */}
              </View>

            </View>

          </View>

        </Page>
      </PDFDocument>
    </>
  )



}
export default PdfzipParticularData

