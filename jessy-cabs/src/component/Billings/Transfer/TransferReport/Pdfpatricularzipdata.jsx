import React, { useEffect, useState } from "react";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image,} from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 10,
  },
  heading: {
    border: '2px solid #000000',
    padding: '20px'
  },

  section: {
    marginTop: 10

  },

  gst: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '130px',

  },

  text1: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  text2: {
    fontSize: '12px',

  },

  gstno: {
    fontSize: '13px',
    fontWeight: 'bold'
  },


  logo: {
    height: 80,
    width: 80
  },

  headingsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 75
  },
  logodiv: {
    marginBottom: 10
  },
  maintabble: {
    border: '2px solid #000000',
    // display:"flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    gap: '10px',
    height: '280px',
  },
  deatilssection: {

    flexDirection: 'row',
    marginTop: "10px",


  },
  deatilssection1: {

    flexDirection: 'row',
    // marginTop:"20px",
    marginTop: "8px",
    marginBottom: "8px",


  },
  labeltag: {
    fontSize: '13px',
    // width: '90px',

  },
  clientName: {
    fontSize: '11px'

  },
  // labeltag1: {
  //   fontSize: '13px',
  //   textAlign: 'center'

  // },
  clientName1: {
    marginTop: '2px',
    fontSize: '11px',
    textAlign: 'center'

  },
  remarksection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    borderLeft: '2px solid #000000',
    borderRight: '2px solid #000000',

    height: 30,


  }, tablesigndiv: {
    flexDirection: "row",
    border: '1px solid #000000',

  },
  tablediv: {
    width: '60%',
    border: '1px solid #000000',
    // flexDirection:'row',

  },
  signdiv: {
    width: '40%',

  },
  signatureimage: {
    height: '100px'

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
    padding: '3px',
    borderRight: '1px solid #000000',
  },
  labeltagremark: {
    textAlign: 'center',

  },
  labeltag2: {
    width: '25%',
    // textAlign: 'center',
    fontSize: '13px',
    padding: '3px',

    borderRight: '1px solid #000000'
  },

  labeltag3: {
    width: '25%',
    // textAlign: 'center',
    fontSize: '13px',
    padding: '3px',

    borderRight: '1px solid #000000'
  },
  labeltag4: {
    width: '25%',
    textAlign: 'center',
    fontSize: '13px',
    padding: '3px',
    borderRight: '1px solid #000000',

  },

  labeltag5: {
    fontSize: '12px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '5px'
  },
  labeltag6: {
    width: '25%',
    textAlign: 'center',
    fontSize: '11px',
    borderRight: '1px solid #000000',
    padding: '5px'
  },

  labeltag9: {
    fontSize: '12px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '5px'
  },

  labeltag10: {
    width: '25%',
    textAlign: 'center',
    fontSize: '11px',
    borderRight: '1px solid #000000',
    padding: '5px'
  },

  labeltag13: {
    fontSize: '12px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '5px'
  },
  labeltag14: {
    fontSize: '11px',
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    padding: '5px'
  },

  labeltag17: {
    fontSize: '12px',
    width: '25%',
    textAlign: 'center',

    borderRight: '1px solid #000000',
    padding: '5px'
  },
  labeltag18: {
    width: '25%',
    textAlign: 'center',
    fontSize: '11px',

    borderRight: '1px solid #000000',
    padding: '5px'
  },

  labeltag21: {
    fontSize: '12px',
    width: '25%',
    textAlign: 'center',


    borderRight: '1px solid #000000',
    padding: '5px'
  },
  labeltag22: {
    width: '25%',
    textAlign: 'center',
    borderRight: '1px solid #000000',
    fontSize: '11px',
    padding: '5px'
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
    borderBottom: '1px solid #000000',

  }, signimg: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '15px',


  },
  signtxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',

  },
  topmap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '3px'
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

const PdfzipParticularData = ({ particularPdf, organisationdetail, imagename, }) => {

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
  const [tripReporttime, setTripReporttime] = useState('')
  const [tripClosetime, setTripClosetime] = useState('')
  const [triptotaldays, setTripTotalDays] = useState('')
  const [triptotaltime, setTripTotalTime] = useState('')
  const [triptotalkms, setTriptotalKms] = useState('')
  const [totalpermit, setTotalpermit] = useState('')
  const [totaltoll, setTotaltoll] = useState('')
  const [totalparking, setTotalParking] = useState('')
  const [tripCustomercode, setTripCustomercode] = useState('')
  const [category, setCategory] = useState('')
  const [addresscustomer, setAddresscustomer] = useState('')
  const [bookimage,setBookingimage]=useState([])
 

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
    let CloseTime = ''
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
   
    let bookingimagedata=[]
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
        bookingimagedata=JSON.parse(li.bookattachedimage)
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
        Reporttime = li.reporttime
        CloseTime = li.closetime
        Totaldays = li.totaldays
        Totaltime = li.totaltime
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
   

    const { signature_path } = signatureimage
    const { map_path } = mapimage
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
    setMapimage(map_path)
    setSignatureimage(signature_path)
    setRoutemapdata(routemapdata)
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
    setTripClosetime(CloseTime)
    setTripTotalDays(Totaldays)
    setTripTotalTime(Totaltime)
    setTriptotalKms(Totalkms)
    setTotalParking(TotalParking)
    setTotalpermit(TotalPermit)
    setTotaltoll(TotalToll)
    setTripCustomercode(CustomerCode)
    setCategory(Categorygroups)
    setAddresscustomer(customeraddress1)

    setCalcPackages(packages)
    setBookingimage(JSON.parse(uniqueJsonStringbook))
 
    setAttachedimage(JSON.parse(uniqueJsonString))
  }, [particularPdf])

  

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
                    <Text style={styles.text2}> {orgaddress1}</Text>
                    <Text style={styles.text2}>{orgaddress3} </Text>
                  </View>
                  <View>
                    <Text>LOG SHEET</Text>
                  </View>
                  <View style={styles.logodiv}>

                    <Image src={`${apiUrl}/public/org_logo/${organisationimage}`} style={styles.logo} />
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

                  <View style={{ flexDirection: "column", margin: "5px" }}>

                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Client Name  :</Text>
                      <Text style={styles.clientName}> {customer}</Text>
                    </View>

                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Address        :</Text>
                      <Text style={styles.clientName}> {addresscustomer}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Category      :</Text>
                      <Text style={styles.clientName}> {category}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Fuel Type      :</Text>
                      <Text style={styles.clientName}> {fuel}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Emp.No         :</Text>
                      <Text style={styles.clientName}> {empno}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Emp.Name    :</Text>
                      <Text style={styles.clientName}> {guestname}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Report Add    :</Text>
                      <Text style={styles.clientName}> {address1}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Client Mobile :</Text>
                      <Text style={styles.clientName}> {customermobile}</Text>
                    </View>
                    <View style={styles.deatilssection1}>
                      <Text style={styles.labeltag}>Drop Address :</Text>
                      <Text style={styles.clientName}> {dropaddress}</Text>
                    </View>


                  </View>


                  <View style={{ flexDirection: "column", margin: "5px" }}>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Escort Route   :</Text>
                      <Text style={styles.clientName}> {escort}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Airport Transfer:</Text>
                      <Text style={styles.clientName}> {report ? "Yes" : "No"}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Ccode              :</Text>
                      <Text style={styles.clientName}> {tripCustomercode ? tripCustomercode : 'No'}</Text>
                    </View>

                  </View>


                  <View style={{ flexDirection: "column", margin: "5px" }}>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Log No         :</Text>
                      <Text style={styles.clientName}> {Tripidno}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Date            :</Text>
                      <Text style={styles.clientName}> {tripsheetdate ? dayjs(tripsheetdate).format('DD/MM/YYYY') : ""}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Duty Type     :</Text>
                      <Text style={styles.clientName}> {duty}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Vehicle Type  :</Text>
                      <Text style={styles.clientName}> {vehicletype}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Vehicle No    :</Text>
                      <Text style={styles.clientName}> {vehicleno}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Driver Name :</Text>
                      <Text style={styles.clientName}> {drivername}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Driver Mobile:</Text>
                      <Text style={styles.clientName}> {drivermobile}</Text>
                    </View>
                    <View style={styles.deatilssection}>

                      <Text style={styles.labeltag}>Request No  :</Text>
                      <Text style={styles.clientName}> {request}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Service City  :</Text>
                      <Text style={styles.clientName}> {department}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Package       :</Text>
                      <Text style={styles.clientName}> {calcpackage}</Text>
                    </View>
                    <View style={styles.deatilssection}>
                      <Text style={styles.labeltag}>Segment       :</Text>
                      <Text style={styles.clientName}> {segment}</Text>
                    </View>


                  </View>

                </View>







                <View style={styles.remarksection}>
                  <Text style={styles.labeltagremark}>Remarks :</Text>
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
                        <Text > Starting</Text>

                      </View>


                      <View style={styles.labeltag6}>
                        <Text>{tripStartDate ? dayjs(tripStartDate).format('DD/MM/YYYY') : ''}</Text>

                      </View>



                      <View style={styles.labeltag6}>
                        <Text>{'-'}</Text>

                      </View>
                      <View style={styles.labeltag6}>
                        <Text>{'-'}</Text>

                      </View>

                    </View>



                    <View style={styles.tablehead2}>
                      <View style={styles.labeltag9}>
                        <Text >Reporting</Text>

                      </View>


                      <View style={styles.labeltag10}>
                        <Text>{tripStartDate ? dayjs(tripStartDate).format('DD/MM/YYYY') : ''}</Text>

                      </View>



                      <View style={styles.labeltag10}>
                        <Text>{tripReporttime ? tripReporttime : 0.00}</Text>

                      </View>
                      <View style={styles.labeltag10}>
                        <Text>{'-'}</Text>

                      </View>

                    </View>

                    <View style={styles.tablehead3}>
                      <View style={styles.labeltag13}>
                        <Text >Releasing</Text>

                      </View>


                      <View style={styles.labeltag14}>
                        <Text>{tripCloseDate ? dayjs(tripCloseDate).format('DD/MM/YYYY') : ''}</Text>

                      </View>



                      <View style={styles.labeltag14}>
                        <Text>{tripClosetime}</Text>

                      </View>
                      <View style={styles.labeltag14}>
                        <Text>{triptotalkms}</Text>

                      </View>

                    </View>


                    <View style={styles.tablehead4}>
                      <View style={styles.labeltag17}>
                        <Text >Closing</Text>

                      </View>


                      <View style={styles.labeltag18}>
                        <Text>{tripCloseDate ? dayjs(tripCloseDate).format('DD/MM/YYYY') : ''}</Text>

                      </View>



                      <View style={styles.labeltag18}>
                        <Text>{'-'}</Text>

                      </View>
                      <View style={styles.labeltag18}>
                        <Text>{'-'}</Text>

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
                        <Text>{triptotalkms ? triptotalkms : 0}</Text>

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



                  {/* </View> */}
                </View>



                <View style={styles.topmap}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: '13px' }}>Total Parking:</Text>
                    <Text style={{ fontSize: '11px', marginTop: '2px', marginRight: '2px' }}>{totalparking ? totalparking : 0}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: '13px' }}>Total Permit:</Text>
                    <Text style={{ fontSize: '11px', marginTop: '2px', marginRight: '2px' }}>{totalpermit ? totalpermit : 0}</Text>

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: '13px' }}>Total Fastag/Toll:</Text>
                    <Text style={{ fontSize: '11px', marginTop: '2px', marginRight: '2px' }}>{totaltoll ? totaltoll : 0}</Text>
                  </View>

                </View>




                <View style={{ width: '100%', height: 210, border: '2px solid #000000' }} >
                  <Image src={`${apiUrl}/public/map_images/${map_image}`} />

                </View>



                <View>
                  <Text> Route summary</Text>

                  {routemap.map((item, index) => (






                    <View key={index}>  <Text style={{ fontSize: 10 }}>{index + 1} {"."} {item.trip_type}{","}{item.place_name}</Text></View>



                  ))
                  }
                </View>



<View style={{ flexDirection: 'column', width: '100%' }}>
  {attachedImage && attachedImage.length > 0 ? (
    <>
      <View style={{ width: "100%" }}>
        <Text style={styles.atimg}>Attached image</Text>
      </View>
      <View style={[styles.addimg, { width: '100%' }]}>
        {attachedImage.map((item, index) => (
          <View key={index} style={[styles.imgwidth, { padding: '3px' }]} >
            <Image src={`${apiUrl}/images/${item.attachedimageurl}`} style={[styles.imagedivadd]} />
          </View>
        ))}
      </View>
    </>
  ) : (
    
    <View style={{ width: "100%" ,margin:'auto',marginTop:'100px',backgroundColor:'red'}}>
        <Text style={styles.atimg}>  No Attached image</Text>
      </View>
  )}
</View>


<View style={{ flexDirection: 'column', width: '100%' }}>
  {bookimage&&bookimage.length > 0 && (
    <>
      <View style={{ width: '100%' }}>

            {bookimage.map((item, index) => {
      const dataimgetype = item.imagees.split('.').pop();

      if (dataimgetype !== "pdf") {
        return (
          <View key={index} style={{width:'100%',backgroundColor:'green'}}>
            <Image src={`${apiUrl}/public/booking_doc/${item.imagees}`} style={{height:'500px'}}  />
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
    
  
</View>



             

        
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

