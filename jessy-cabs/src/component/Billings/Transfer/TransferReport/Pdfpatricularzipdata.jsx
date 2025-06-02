import React, { useEffect, useState } from "react";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image ,Font } from '@react-pdf/renderer';
import NotoTamil from '../../../Font/NotoSansTamil-Regular.ttf';

Font.register({
  family: 'NotoTamil',
  src: NotoTamil,
});

const styles = StyleSheet.create({

   tamilText: {
    fontFamily: 'NotoTamil',
    fontSize: 8,
  },

  page: {
    flexDirection: 'row',
    fontSize: "inherit",
    // padding: 10,
  },
  heading: {
    // border: '2px solid rgb(15, 1, 1)',
    padding: '15px',
    // height: "",
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
    padding: '0px',
    marginTop: "2px"
  },

  text1: {
    fontSize: '11px',
    width: "54%",
    fontWeight: '500',
  },
  text2: {
    fontSize: '10px',

  },
  text2add: {
    fontSize: '9px',
    width: "54%",
    textAlign: "justify",
  },

  gstno: {
    fontSize: '10px',
    // fontWeight: 'bold'
  },


  logo: {
    height: 40,
    width: 70
  },

  headingsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    // height: "70px",
  },
  logodiv: {
    // marginBottom: 10
    width: "25%",
    padding: '0px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  maintablediv: {
    border: '1px solid #000000',
  },
  maintabble: {
    // border: '1px solid #000000',
    // display:"flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'flex-start',
    gap: '10px',
    paddingRight: "10px"
  },
  deatilssection: {

    flexDirection: 'row',
    // marginTop: "5px",
    // marginBottom: "1px",
    alignItems: "center",

  },
  deatilssection1: {

    flexDirection: 'row',
    // marginTop:"20px",
    // marginBottom: "1px",
    alignItems: "center",

  },
  labeltag: {
    fontSize: '9px',
    color: '#545151',
    width: '80px',
    backgroundColor: '#EEE',
    padding: "5px 6px",
    border: 'none',
    textAlign: 'justify',
  },
  labelMidContainer: {
    fontSize: '10px',
    fontWeight: 'extrabold',
    width: '70px',
  },
  clientName: {
    fontSize: '9px',
    color: '#545151',
    padding: "6px",
    // fontWeight: 'extrabold',

  },
  clientNameadd: {
    fontSize: '9px',
    color: '#545151',
    // fontWeight: 'extrabold',
    width: "40%",
    padding: "6px"

  },
  // labeltag1: {
  //   fontSize: '13px',
  //   textAlign: 'center'

  // },
  clientName1: {
    fontSize: '10px',
    color: '#545151',
    // textAlign: 'center',
    width: "80%",

  },
  clientAddress: {
    padding: "6px",
    fontSize: '9px',
    color: '#545151',
    // fontWeight: 'extrabold',
    textAlign: 'justify',
    lineHeight: '1.3px',
    width: '45%'
  },
  remarksection: {
    flexDirection: 'row',
    alignItems: "flex-start",
    gap: '10px',
    // borderLeft: '1px solid #000000',
    // borderRight: '1px solid #000000',
    // height: 30,
    padding: "5px"


  }, tablesigndiv: {
    flexDirection: "row",
    // border: '1px solid #000000',
    borderLeft: "1px solid #000000",
    borderRight: "1px solid #000000",
    borderBottom: "1px solid #000000",
  },
  tablediv: {
    width: '60%',
    // borderRight: "1px solid #000000",
    // border: '1px solid green',
    // flexDirection:'row',
    // padding: "20px",
    // borderLeft:"1px solid #000000",
    borderRight: "1px solid #000000",

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
    textAlign: 'left',
    // borderBottom: '1px solid #000000'
  },
  labeltag1: {
    width: '25%',
    // textAlign: 'center',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },
  labeltagremark: {
    textAlign: 'center',
    fontSize: '10px',
    paddingLeft: '5px',
    // padding: "5px 6px",
    backgroundColor: '#EEE',
    border: 'none',
  },
  labeltag2: {
    width: '25%',
    textAlign: 'left',
    // justifyContent: 'center',
    // alignItems: 'center',
    fontSize: '10px',
    padding: '2px',
    color: '#545151',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
    // borderTop: "1px solid #000000",
    // borderRight: '1px solid #000000'
  },

  labeltag3: {
    width: '25%',
    textAlign: 'left',
    // justifyContent: 'center',
    // alignItems: 'center',
    color: '#545151',
    fontSize: '10px',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
    // borderTop: "1px solid #000000",
    // borderRight: '1px solid #000000'
  },
  labeltag4: {
    width: '25%',
    textAlign: 'left',
    // justifyContent: 'center',
    // alignItems: 'center',
    color: '#545151',
    fontSize: '10px',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
    // borderRight: '1px solid #000000',
    // borderTop: "1px solid #000000",

  },

  labeltag5: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'left',
    color: '#545151',
    // borderRight: '1px solid #000000',
    // borderLeft: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },
  labeltag6: {
    width: '25%',
    textAlign: 'left',
    fontSize: '10px',
    color: '#545151',
    // borderRight: '1px solid #000000',

    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },

  labeltag9: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'left',
    color: '#545151',
    // borderRight: '1px solid #000000',
    // borderLeft: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },

  labeltag10: {
    width: '25%',
    textAlign: 'left',
    fontSize: '10px',
    color: '#545151',
    // borderRight: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },

  labeltag13: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'left',
    color: '#545151',
    // borderRight: '1px solid #000000',
    // borderLeft: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },
  labeltag14: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'left',
    color: '#545151',
    // borderRight: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },

  labeltag17: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'left',
    color: '#545151',
    // borderLeft: '1px solid #000000',

    // borderRight: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },
  labeltag18: {
    width: '25%',
    textAlign: 'left',
    fontSize: '10px',
    color: '#545151',
    // borderRight: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },

  labeltag21: {
    fontSize: '10px',
    width: '25%',
    textAlign: 'left',
    color: '#545151',
    // borderLeft: '1px solid #000000',
    // borderRight: '1px solid #000000',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },
  labeltag22: {
    width: '25%',
    textAlign: 'left',
    color: '#545151',
    // borderRight: '1px solid #000000',
    fontSize: '11px',
    padding: '2px',
    borderRight: '1px solid #ccc',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: "2px",
    margin: "1px",
  },

  tablehead1: {
    // borderBottom: '1px solid #000000',
    flexDirection: 'row',
    // gap:'10px'


  },
  tablehead4: {
    flexDirection: 'row',
    // borderBottom: '1px solid #000000',

  },
  tablehead2: {
    flexDirection: 'row',
    // borderBottom: '1px solid #000000',

  },
  tablehead3: {
    flexDirection: 'row',
    // borderBottom: '1px solid #000000',

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
    flexDirection: 'column',
    justifyContent: "flex-start",
    // alignItems:'center',
    gap: "10px",
    padding: '3px',
    // height: "190px",
    height: "250px",
  },
  topmap: {
    // marginTop: "40px"
    display: "flex",
    flexDirection: "row",
    gap: "10px",

  },
  mapsection: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  atimg: {
    textAlign: 'center'
  },
  addimg: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: "center",
    gap: "30px",
    alignItems: "center",
    // backgroundColor: "red",
    // height: '100vh', 
  },

  imagedivadd: {

    height: '170px',
  },

  imgwidth: {
    width: '50%',
    // height: '800px',
    // backgroundColor: "yellow",
  },

  headerSecond: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "flex-start"
  },

  firstHeader: {
    width: "48%",
    alignItems: "flex-end",
    lineHeight: "1.5px",
  },



});

const PdfzipParticularData = ({ particularPdf, organisationdetail, imagename, customerData, stationData }) => {

  const [orgname, setOrgname] = useState('')
  // const [orgaddress1, setOrgaddress1] = useState('')
  // const [orgaddress3, setOrgaddress3] = useState('')
  // const [address1, setAddress1] = useState('')
  const [guestaddress1, setGuestAddress1] = useState('')
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
  // const [tripsheetdate, setTripsheetdate] = useState('')
  const [tripStartDate, setTripStartDate] = useState('')
  const [tripCloseDate, setTripCloseDate] = useState('')
  const [tripshedoutDate, setTripShedOutDate] = useState('')
  const [tripshedinDate, setTripShedinDate] = useState('')
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
  // const [addresscustomer, setAddresscustomer] = useState('')
  // const [bookimage, setBookingimage] = useState([])
  // // const [starttime, setStarttime] = useState('0')
  // // const [shedintime, setShedintime] = useState('0')
  // // const [startkm, setStartkm] = useState('0')
  // // const [closekm, setClosekm] = useState('0')
  // // const [releasingKM, setReleasingKM] = useState('0')
  // // const [reportKM, setReportKM] = useState('0')


  const [remark, setRemark] = useState('')
  const apiUrl = APIURL;
  const organisationimage = imagename

  const organisationdetails = organisationdetail

  // const convertTimeFormat = (time) => {

  //   // const regex = /(\d+)h\s*(\d+)m/;
  //   // const match = time.match(regex);
  //   // if (match) {
  //   //   const hours = match[1].padStart(2, '0');
  //   //   const minutes = match[2].padStart(2, '0');
  //   //   return `${hours}:${minutes}`;
  //   // }
  //   return time; // Return original if it doesn't match the pattern
  // };

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
    // let addressone = ''
    // let addressthree = ''
    let organisationname = ''
    organisationdetail?.forEach((li) => {
      // addressone = li.addressLine1
      // addressthree = li.location
      organisationname = li.organizationname
    })
    // setOrgaddress1(addressone)
    // setOrgaddress3(addressthree)
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
    // let Tripdate = ''
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
    // let customeraddress1 = ""
    // let startTime = ''
    // let shedInTime = ''
    // let startkm = ''
    // let closekm = ''
    // let reportkm = ''
    // let releasekm = ''
    let Tripshedoutdate = ''
    let Tripshedindate = ''

    // let bookingimagedata = []
    if (Array.isArray(particularPdf)) {
      particularPdf.forEach((li) => {
        addressone = li.address1
        customers = li.customer
        fueltype = li.fueltype
        employeeno = li.employeeno
        empname = li.guestname
        guestmobile = li.guestmobileno
        dutytype = li.duty
        vehtype = li.vehicleName
        vehno = li.vehRegNo
        request = li.request
        drivernames = li.driverName
        remarks = li.remark
        driverMobNo = li.mobile
        signatureimage = JSON.parse(li.signature_data)
        mapimage = JSON.parse(li.map_data)
        routemapdata = JSON.parse(li.gmapdata)
        attachedimagedata = JSON.parse(li.Attachedimage)
        // bookingimagedata = JSON.parse(li.bookattachedimage)
        packages = li.calcPackage
        Dropaddress = li.useage
        Report = li.transferreport
        Segment = li.segment
        Department = li.department
        Escort = li.escort
        Tripid = li.tripid
        // Tripdate = li.tripsheetdate
        Tripstartdate = li.startdate
        TripClosedate = li.closedate
        Tripshedoutdate = li.shedOutDate
        // Tripshedindate = li.shedInDate
        Tripshedindate = li.shedInDateold

        // Reporttime = li.starttime
        // Starttime = li.reporttime
        // CloseTime = li.closetime
        // Releasingtime = li.shedintime


        Starttime = li.starttime
        Reporttime = li.reporttime
        CloseTime = li.closetime
        Releasingtime = li.shedintime
        // ReportKm = li.startkm
        // StartKm = li.shedout
        // CloseKm = li.shedin
        // ReleaseKm = li.closekm

        StartKm = li.startkm
        ReportKm = li.shedout
        ReleaseKm = li.shedin
        CloseKm = li.closekm

        // Reporttime = trimSeconds(li.reporttime)
        // startTime = trimSeconds(li.starttime)
        // shedInTime = trimSeconds(li.shedintime)
        // CloseTime = trimSeconds(li.closetime);
        // startkm = li.shedout;
        // closekm = li.shedin;
        // reportkm = li.startkm;
        // releasekm = li.closekm;
        Totaldays = li.totaldays
        Totaltime = li.TotalTimeWithoutAddHours
        Totalkms = parseInt(li.shedin) - parseInt(li.shedout) || 0
        TotalParking = li.parking
        TotalToll = li.toll
        TotalPermit = li.permit
        CustomerCode = li.customercode
        Categorygroups = li.orderedby
        // customeraddress1 = li.Customeraddress1





      })
    }
    // console.log(particularPdf, "pdfff")



    const uniqueArray = Array.from(new Set(attachedimagedata?.filter(item => item.attachedimageurl !== null)?.map(JSON.stringify)))?.map(JSON.parse);

    // const uniqueArraybook = Array.from(new Set(bookingimagedata?.filter(item => item.imagees !== null)?.map(JSON.stringify)))?.map(JSON.parse);


    // const uniqueArraybook = Array.from(new Set(bookingimagedata?.map(JSON.stringify)))?.map(JSON.parse);

    // Convert the unique array back to a JSON string
    const uniqueJsonString = JSON.stringify(uniqueArray);
    // const uniqueJsonStringbook = JSON.stringify(uniqueArraybook);
    // const mapdata = Array.from(new Set(routemapdata?.filter(item => item.trip_type !== null && item.place_name)?.map(JSON.stringify)))?.map(JSON.parse);

    const mapdata = Array.from(new Set(routemapdata?.filter(item => item.trip_type !== null && item.place_name)?.map(JSON.stringify)))?.map(JSON.parse)?.sort((a, b) => {
      const order = { start: 1, waypoint: 2, end: 3 };
      return (order[a.trip_type] || 4) - (order[b.trip_type] || 4);

    });
    // console.log(mapdata,"mapdata")
    const { signature_path } = signatureimage
    const { map_path } = mapimage
    // setAddress1(customeraddress1)
    setGuestAddress1(addressone)
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
    // setTripsheetdate(Tripdate)
    setTripStartDate(Tripstartdate)
    setTripCloseDate(TripClosedate)
    setTripShedOutDate(Tripshedoutdate)
    setTripShedinDate(Tripshedindate)

    setTripReporttime(Reporttime)
    setTripStartTime(Starttime)
    setTripClosetime(CloseTime)
    setTripReleasingTime(Releasingtime)
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
    // setAddresscustomer(customeraddress1)
    // setStarttime(startTime)
    // setShedintime(shedInTime)
    setCalcPackages(packages)
    // setBookingimage(JSON.parse(uniqueJsonStringbook))
    // setStartkm(startkm)
    // setClosekm(closekm)
    // setReleasingKM(releasekm)
    // setReportKM(reportkm)
    setAttachedimage(JSON.parse(uniqueJsonString))
  }, [particularPdf])

  // const firstSet = routemap.slice(0, 12);
  // const nextSet = routemap.slice(12, 24);
  // const remainingItems = routemap.slice(24);
  const hclKm = parseInt(tripCloseKm || 0) - parseInt(tripStartKm || 0)
  // console.log(tripCloseKm, tripReportKm, "kmmmm")
  // console.log(bookimage, "bookimage", stationData, "stationData")
  // console.log(tripshedinDate, "tripshed", tripCloseDate)
  // console.log(vehicletype, "zip")

  return (
    <>
      <PDFDocument>
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <View style={styles.borderoutsite}>
              <View style={styles.section}>
                <View style={styles.headingsection}>
                  <View style={styles.logodiv}>
                    <Image src={organisationimage} style={styles.logo} />
                  </View>
                  <View style={styles.firstHeader}>
                    <Text style={styles.text1}>{orgname}</Text>
                    <Text style={styles.text2add}> {stationData[0]?.address}</Text>
                    {/* <Text style={styles.text2}>{orgaddress3} </Text> */}
                  </View>
                  {/* <View style={styles.headerSecond}>
                    <Text style={{ fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>LOG SHEET</Text>
                  </View> */}
                </View>
                <View style={styles.gst}>
                  <View>

                    <Text style={styles.text2}>Tel:{organisationdetails[0].telephone},Mob:{organisationdetails[0].contactPhoneNumber} </Text>

                  </View>
                  <View>

                    {/* <Text style={styles.gstno}>GSTIN: {organisationdetails[0].gstnumber}</Text> */}
                    <Text style={styles.gstno}>GSTIN: {stationData[0]?.gstno}</Text>
                    {/* <Text style={styles.text2add}> {stationData[0]?.gstno}</Text> */}

                  </View>

                </View>

                <View style={styles.maintablediv}>

                  <View style={styles.maintabble}>
                    <View style={{ flexDirection: "column", margin: "1px", fontSize: "75%" }}>

                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Client Name:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}>{customer}</Text>
                      </View>

                      <View style={styles.deatilssection1}>
                        <Text style={[styles.labeltag,{ height: "60px", paddingTop: "20px"}]}>Address:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={[styles.clientAddress, { padding: "2px 6px" }]}> {customerData[0]?.address1}</Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Category:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}> {category}  </Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Fuel Type:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}> {fuel}</Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Emp No:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}> {empno}</Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Guest Name:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}> {guestname}</Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Guest Mobile:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}> {customermobile}</Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Report Add:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        {/* <Text style={styles.clientNameadd}> {address1}</Text> */}
                        <Text style={styles.clientNameadd}> {guestaddress1}</Text>
                      </View>

                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Drop Address:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientNameadd}> {dropaddress}</Text>
                      </View>

                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Escort Route:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}> {escort}</Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Airport Transfer:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
                        <Text style={styles.clientName}> {report}</Text>
                      </View>
                      <View style={styles.deatilssection1}>
                        <Text style={styles.labeltag}>Ccode:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "11px" }}> :</Text> */}
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


                    <View style={{ flexDirection: "column", margin: "1px", fontSize: "75%" }}>
                      <View style={styles.deatilssection}>
                        <Text style={styles.labeltag}>Log No:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {Tripidno}</Text>
                      </View>
                      <View style={styles.deatilssection}>

                        <Text style={styles.labeltag}>Date:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {dayjs(tripshedoutDate).format('DD/MM/YYYY')}</Text>
                      </View>
                      <View style={styles.deatilssection}>
                        <Text style={styles.labeltag}>Duty Type:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {duty}</Text>
                      </View>
                      <View style={styles.deatilssection}>
                        <Text style={styles.labeltag}>Vehicle Type:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {vehicletype}</Text>
                      </View>
                      <View style={styles.deatilssection}>
                        <Text style={styles.labeltag}>Vehicle No:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {vehicleno}</Text>
                      </View>
                      <View style={styles.deatilssection}>

                        <Text style={styles.labeltag}>Driver Name:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {drivername}</Text>
                      </View>
                      <View style={styles.deatilssection}>

                        <Text style={styles.labeltag}>Driver Mobile:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {drivermobile}</Text>
                      </View>
                      <View style={styles.deatilssection}>

                        <Text style={styles.labeltag}>Request No:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {request}</Text>
                      </View>
                      <View style={styles.deatilssection}>
                        <Text style={styles.labeltag}>Service City:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {department}</Text>
                      </View>
                      <View style={styles.deatilssection}>
                        <Text style={styles.labeltag}>Package:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {duty === "Transfer" || duty === "Outstation" ? duty : calcpackage}</Text>
                      </View>
                      <View style={styles.deatilssection}>
                        <Text style={styles.labeltag}>Segment:</Text>
                        {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                        <Text style={styles.clientName}> {segment}</Text>
                      </View>


                    </View>
                  </View>

                  <View style={styles.remarksection}>
                    <Text style={styles.labeltagremark}>Remarks:</Text>
                    {/* <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text> */}
                    <Text style={styles.clientName1}>{remark}</Text>

                  </View>

                </View>


                <View style={styles.tablesigndiv}>
                  {/* <View style={styles.tablediv}>
                   
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


                  </View> */}


                  <View style={styles.tablediv}>
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

                    </View>
                    {customerData[0]?.hybrid === 1 ?
                      <>

                        <View style={styles.tablehead1}>
                          <View style={styles.labeltag5}>
                            <Text > Closing</Text>

                          </View>


                          <View style={styles.labeltag6}>
                            {/* <Text>{dayjs(tripshedinDate).format('DD/MM/YYYY')}</Text> */}
                            <Text>{tripshedinDate}</Text>

                          </View>



                          <View style={styles.labeltag6}>
                            {duty !== "Outstation" ? <Text>{'-'}</Text> : <Text> {trimSeconds(tripRelasingTime)}</Text>}

                          </View>
                          <View style={styles.labeltag6}>
                            {duty === "Outstation" ? <Text>{tripReleaseKm}</Text> : <Text>{"-"}</Text>}

                          </View>

                        </View>

                        <View style={styles.tablehead2}>
                          <View style={styles.labeltag9}>
                            <Text >Releasing</Text>

                          </View>


                          <View style={styles.labeltag10}>
                            <Text>{dayjs(tripCloseDate).format('DD/MM/YYYY')}</Text>

                          </View>

                          <View style={styles.labeltag10}>
                            <Text>{trimSeconds(tripClosetime)}</Text>

                          </View>
                          <View style={styles.labeltag10}>
                            <Text>{tripCloseKm}</Text>

                          </View>
                        </View>
                        <View style={styles.tablehead3}>
                          <View style={styles.labeltag13}>
                            <Text >Reporting</Text>

                          </View>


                          <View style={styles.labeltag14}>
                            <Text>{dayjs(tripStartDate).format('DD/MM/YYYY')}</Text>

                          </View>



                          <View style={styles.labeltag14}>
                            <Text>{trimSeconds(tripStartTime)}</Text>

                          </View>
                          <View style={styles.labeltag14}>
                            <Text> {tripStartKm} </Text>

                          </View>

                        </View>
                        <View style={styles.tablehead4}>
                          <View style={styles.labeltag17}>
                            <Text >Starting</Text>

                          </View>


                          <View style={styles.labeltag18}>
                            <Text>{dayjs(tripshedoutDate).format('DD/MM/YYYY')}</Text>

                          </View>
                          <View style={styles.labeltag18}>
                            {duty !== "Outstation" ? <Text>{"-"}</Text> : <Text> {trimSeconds(tripReporttime)} </Text>}

                          </View>
                          <View style={styles.labeltag18}>
                            <Text>-</Text>

                          </View>

                        </View>
                        <View style={styles.tablehead5}>
                          <View style={styles.labeltag21}>
                            <Text >Total</Text>

                          </View>


                          <View style={styles.labeltag22}>
                            {/* <Text>{triptotaldays ? triptotaldays : 0}</Text> */}
                            <Text>{duty === "Outstation" ? triptotaldays : "-"}</Text>

                          </View>

                          <View style={styles.labeltag22}>
                            <Text>{triptotaltime ? triptotaltime : 0.00}</Text>

                          </View>
                          <View style={styles.labeltag22}>
                            {duty !== "Outstation" ? <Text>{hclKm}</Text> : <Text>{triptotalkms}</Text>}

                          </View>

                        </View>







                      </>


                      : <>


                        <View style={styles.tablehead1}>
                          <View style={styles.labeltag5}>
                            <Text > Closing</Text>

                          </View>


                          <View style={styles.labeltag6}>
                            {/* <Text>{dayjs(tripshedinDate).format('DD/MM/YYYY')}</Text> */}
                            <Text>{tripshedinDate}</Text>

                          </View>



                          <View style={styles.labeltag6}>
                            <Text> {trimSeconds(tripRelasingTime)}</Text>

                          </View>
                          <View style={styles.labeltag6}>
                            <Text>{tripReleaseKm}</Text>

                          </View>

                        </View>

                        <View style={styles.tablehead4}>
                          <View style={styles.labeltag17}>
                            <Text >Starting</Text>

                          </View>


                          <View style={styles.labeltag18}>
                            <Text>{dayjs(tripshedoutDate).format('DD/MM/YYYY')}</Text>

                          </View>
                          <View style={styles.labeltag18}>
                            <Text> {trimSeconds(tripReporttime)} </Text>

                          </View>
                          <View style={styles.labeltag18}>
                            <Text>{tripReportKm}</Text>

                          </View>


                        </View>
                        <View style={styles.tablehead5}>
                          <View style={styles.labeltag21}>
                            <Text >Total</Text>

                          </View>


                          <View style={styles.labeltag22}>
                            {/* <Text>{triptotaldays ? triptotaldays : 0}</Text> */}
                            <Text>{duty === "Outstation" ? triptotaldays : "-"}</Text>

                          </View>

                          <View style={styles.labeltag22}>
                            <Text>{triptotaltime ? triptotaltime : 0.00}</Text>

                          </View>
                          <View style={styles.labeltag22}>
                            <Text>{triptotalkms}</Text>

                          </View>

                        </View>


                      </>
                    }



                  </View>

                  <View style={styles.signdiv}>
                    <View style={styles.signimg}>
                      <Image src={`${apiUrl}/public/signature_images/${signnature_image}`} style={styles.signatureimage} />

                    </View>
                    <View style={styles.signtxt}>
                      <Text style={{ margin: '0px', fontSize: '10px' }}>Guest Signature</Text>

                    </View>


                  </View>
                </View>


                <View style={styles.mapdiv}>

                  {/* <View style={{ height: 170, border: '1px solid #000000', width: '60%' }} >
                    <Image src={`${apiUrl}/public/map_images/${map_image}`} />

                  </View> */}

                  <View style={styles.topmap}>
                    <View style={{ flexDirection: 'row', marginTop: "3px" }}>
                      <Text style={{ fontSize: '10px' }}>Total Parking</Text>
                      <Text style={{ fontSize: "9px" }}> :</Text>
                      <Text style={{ fontSize: '9px', marginRight: '2px', color: '#363434' }}>{totalparking ? totalparking : 0}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: "3px" }}>
                      <Text style={{ fontSize: '10px' }}>Total Permit</Text>
                      <Text style={{ fontSize: "9px" }}> :</Text>
                      <Text style={{ fontSize: '9px', marginRight: '2px', color: '#363434' }}>{totalpermit ? totalpermit : 0}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: "3px" }}>
                      <Text style={{ fontSize: '10px' }}>Total Fastag/Toll</Text>
                      <Text style={{ fontSize: "9px" }}> :</Text>
                      <Text style={{ fontSize: '9px', marginRight: '2px', color: '#363434' }}>{totaltoll ? totaltoll : 0}</Text>
                    </View>

                  </View>

                  <View style={styles.mapsection}>
                    {map_image && (
                      <View style={{ height: 150, width: '28%' }}>
                        <Image style={{ height: "100%", width: '100%' }} src={`${apiUrl}/public/map_images/${map_image}`} />
                      </View>
                    )}


                    {/* <View style={{ flexDirection: 'column' }}> */}
                      {routemap.length > 0 ?
                      
                        <View style={{ width: "70%" }}>
                          {routemap.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row' }}>
                              <Text style={{ fontSize: 8, marginTop: "1px", marginBottom: '2px' }}>
                                {index + 1} .
                              </Text>
                              <Text style={[styles.tamilText,{ marginLeft: '1px', fontSize: 8, marginTop: "1px", marginBottom: '2px'}]}>
                                {item.trip_type}, {item.place_name}
                              </Text>
                            </View>
                          ))}
                        </View>
                        : <></>}

                      {/* {nextSet.length > 0 ?
                        <View style={{ width: "73%" }}>
                          {nextSet.map((item, index) => (
                            <View key={index + 12} style={{ flexDirection: 'row' }}>
                              <Text style={{ fontSize: 9, marginTop: "1px", marginBottom: '2px', }}>
                                {index + 13} .
                              </Text>
                              <Text style={{ marginLeft: '2px', fontSize: 9, marginTop: "1px", marginBottom: '2px' }}>
                                {item.trip_type}, {item.place_name}
                              </Text>
                            </View>
                          ))}
                        </View>
                        : <></>} */}


                      {/* {remainingItems.length > 0 ?
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
                        </View> : <></>} */}


                    {/* </View> */}
                  </View>

                </View>

                {/* <View style={{ flexDirection: 'row', gap: "10px" }}>
                  {routemap.map((item, index) => (
                    <View key={index}>  <Text style={{ fontSize: 9 }}>{index + 1} {"."} {item.trip_type}{","}{item.place_name}</Text></View>
                  ))
                  }

                </View> */}



                {/* {attachedImage && attachedImage.length > 0 ? (
                  <>
                   
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
                )} */}


                {attachedImage && attachedImage.length > 0 && (
                  <>
                    <View style={[styles.addimg, { width: '550px', }]}>
                      {/* <View key={index} style={[styles.imgwidth, { padding: '3px' }]} > */}
                      {attachedImage.map((item, index) => {
                        const dataimgetype1 = item.attachedimageurl.split('.').pop();
                        // URL.createObjectURL(img)
                        if (dataimgetype1 !== "pdf") {
                          return (
                            // <View key={index} style={{ width: '100%' }}>
                            <View key={index} style={[styles.imgwidth, { padding: '3px' }]} >

                              <Image src={`${apiUrl}/images/${item.attachedimageurl}`} />
                            </View>
                          );
                        } else {
                          return null;
                        }
                      })}
                      {/* </View> */}

                    </View>
                  </>
                )
                }


                {/* dont remove the code */}

                {/* {bookimage && bookimage.length > 0 && (
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
                } */}


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

