import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image } from '@react-pdf/renderer';
import { APIURL } from '../../../url';
import dayjs from 'dayjs';
import numWords from 'num-words'


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 3,
    pageBreakInside: 'avoid',
    overflow: 'hidden',
    border: '2px solid rgb(0, 0, 0)',

  },
  heading: {
    // border: '2px solid rgb(255, 0, 0)',
    padding: '20px',
    boxSizing: 'border-box',
    pageBreakInside: 'avoid',
    overflow: 'hidden',
    // width:'100%',
  },


  section: {
    marginTop: 10,

  },
  tableRow: {
    flexDirection: 'row',
    width: '100%', // Set the width of the table row to 100%
  },
  tableCell: {
    width: '17.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
    fontSize: '11px',
    borderRight: '1px solid #000000',
  },
  tableCelldate: {
    width: '17.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
    fontSize: '11px',
    borderRight: '1px solid #000000'
  },
  gst: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0px 130px',

  },
  seconddivision: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5

  },
  taxinvoice: {
    border: '1px soli #000000',
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text1: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  text2: {
    fontSize: '12px',
  },
  invoicerightside: {
    fontSize: '12px'
  },
  invoicerightsideHeading: {
    width: '200px'
  },
  gstno: {
    fontSize: '11px',
    fontWeight: 'bold'
  },
  customername: {
    fontSize: 13,
    fontWeight: 'extrabold',
    width: '45%',
  },
  underlinetext: {
    textDecoration: 'underline',
    fontSize: 14
  },
  invoicediv: {
    marginTop: 10
  },
  tableheading: {
    fontSize: '11px',
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderBottom: '1px solid #000',
    width: '17.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tableheadingAmount: {
    fontSize: '11px',
    borderTop: '1px solid #000',
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    width: '17.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tableheadsno: {
    fontSize: '11px',

    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderBottom: '1px solid #000',
    width: '9.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tablecellsno: {
    width: '9.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
    fontSize: '12px',
    borderRight: '1px solid #000000'
  },
  tableheadingparticular: {
    width: '66%',
    fontSize: '11px',
    borderTop: '1px solid #000',
    borderRight: '1px solid #000',
    borderLeft: '1px solid #000',
    borderBottom: '1px solid #000',
    padding: 5,

  },
  tablecellparticular: {
    width: '66%',
    padding: 5,
    fontSize: '11px',
    borderRight: '1px solid #000000',
    wordWrap: 'break-word',
  },
  tablecellparticularInside: {
    width: '90%',
    // backgroundColor:"red",
    flexWrap: 'wrap'
  },
  tableheadingpermit: {
    width: '16%',
    borderTop: '1px solid #000',
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    padding: 5,
    fontSize: '11px',

  },
  tableCellpermit: {
    width: '16%',
    padding: 5,
    fontSize: '11px',
    borderRight: '1px solid #000000',

  },
  grandtotal: {

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px',
    padding: 10,
    marginBottom: 20,
  },
  totalsum: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: '1px solid #000000',
    marginTop: 10
  },
  totalsuminitial: {
    width: '45%',
    flexDirection: 'column',
    justifyContent: "flex-end",

  },
  total: {
    fontSize: 12
  },
  tablevalue: {
    flexDirection: 'column',
    borderBottom: '1px solid #000000',
    // borderRight: '1px solid #000000',
    borderLeft: '1px solid #000000',
  },
  tablevalueRow: {
    flexDirection: 'row'
  },
  logo: {
    height: 60,
    width: 60
  },
  headingsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 75
  },
  logodiv: {
    marginBottom: 10
  },
  tableheadtripno: {
    fontSize: '11px',
    borderTop: '1px solid #000',
    borderLeft: '1px solid #000',
    borderBottom: '1px solid #000',
    width: '12.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tablecelltripno: {
    width: '12.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
    fontSize: '10px',
    borderRight: '1px solid #000000'
  },

  amounttext: {
    textAlign: 'center'
  },
  lastsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
    width:"50%",
  },
  rupees: {
    width: '70%',
  },
  signaturesection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width:"50%",
    alignItems:"flex-end",
    paddingRight:"10px",
  },
  lastsectiondiv: {
    borderRight: '1px solid #000000',
    borderLeft: '1px solid #000000',
    borderBottom: '1px solid #000000',
    flexDirection: 'row',
    marginBottom: "30px",
    // marginTop:"100px",
    width:"100%",
    justifyContent:"space-between"


  },
  rupeestext: {
    fontSize: '17px',
    textTransform: 'capitalize'
  },
  rupeestexteo: {
    // fontSize: "10px",
    textTransform: 'capitalize'
  },
  signtext: {
    fontSize: '12px',
    padding: '10px',
  },
  jessytext: {
    fontSize: '14px'
  },
  totalrupeesword: {
    // marginTop: "20px",
    flexDirection: 'row',
    // paddingLeft:'5px',
    // width:"60%",
    width: "100%",
  },
  signone: {
    height: "50px"
  },
  textRupees: {
    width: "45%",
    // width:"100%",
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '5px',

  }


});

const PdfContent = ({ logo, invdata, invoiceno, invoiceDate, groupTripid, customeraddress, customer, organisationdetails, images, customStateDetails, billingGroupDetails, customerData, stationData }) => {

  const [totalAmount, setTotalAmount] = useState('')
  const [parking, setParking] = useState('')
  const [permit, setPermit] = useState('')
  const [address1, setAddress1] = useState('')
  const [gst, setGst] = useState('')
  const [extraKmAmount, setExtraKmAmount] = useState('')
  const [extraHrAmount, setExtraHrAmount] = useState('')
  const [toll, setToll] = useState('')
  const [vpermettovendor, setVpermettovendor] = useState('')
  const [vendortoll, setVendortoll] = useState('')
  const [nightTotalAmount, setNightTotalAmount] = useState('')
  const [driverBetaAmount, setDriverBetaAmount] = useState('')
  const [gstAmount, setGstAmount] = useState(0)
  const [fullGST, setFullGST] = useState(0)
  const [advance, setAdvance] = useState();
  const organizationname = customer
  const organisationdetailfill = organisationdetails
  // const organisationimage = images
  const newStateforpdf = customStateDetails
  // console.log(customStateDetails,'custommm');
  //   console.log(newStateforpdf,'Custom state datas ',newStateforpdf.length)
  //   console.log(newStateforpdf[0]?.Stationname,'Custom state stationname ')
  //   console.log(newStateforpdf.address,'Custom state address')
  //   console.log(newStateforpdf.gstno,'Custom state gstno ')

  //   if (newStateforpdf) {

  //     if (newStateforpdf.length === 0) {
  //         console.log("newStateforpdf is empty");
  //     } else {
  //         console.log("newStateforpdf is not empty, length:", newStateforpdf.length);
  //     }
  // } else {
  //     console.log("newStateforpdf is null or undefined.");
  // }


  const apiUrl = APIURL;

  useEffect(() => {
    if (invdata) {
      let totalamount = 0
      let parkingamount = 0
      let permitamount = 0
      let exkmamount = 0
      let exhramount = 0
      let tollamount = 0
      let vpermet = 0
      let vendortollamount = 0
      let nightAmount = 0
      let driverBeta = 0
      let gstamount = 0
      let advanceamount = 0
      let totalDays = 0
      invdata?.map((li) => {
        totalamount += parseInt(li.package_amount || 0)
        parkingamount += parseInt(li.parking || 0)
        permitamount += parseInt(li.permit || 0)
        exkmamount += parseInt(li.ex_kmAmount || 0) // Corrected property name
        exhramount += parseInt(li.ex_hrAmount || 0)
        tollamount += parseInt(li.toll || 0)
        vpermet += parseInt(li.vpermettovendor || 0)
        vendortollamount += parseInt(li.vendortoll || 0)
        nightAmount += parseInt(li.night_totalAmount || 0)
        driverBeta += parseInt(li.driverBeta_amount || 0)
        advanceamount += parseInt(li.customeradvance || 0)
        gstamount = parseFloat(li.gstTax / 2 || 0)
        totalDays = li.totaldays
        setFullGST(li.gstTax || 0)
        return null
      })
      setTotalAmount(totalamount)
      setParking(parkingamount)
      setPermit(permitamount)
      setExtraKmAmount(exkmamount)
      setExtraHrAmount(exhramount)
      setToll(tollamount)
      setVpermettovendor(vpermet)
      setVendortoll(vendortollamount)
      setNightTotalAmount(nightAmount)
      setDriverBetaAmount(driverBeta)
      setGstAmount(gstamount)
      setAdvance(advanceamount)
    }
  }, [apiUrl, invdata])


  useEffect(() => {
    if (customeraddress) {
      let address1 = ""
      // let address2 = ""
      // let city = ""
      let gstno = ""
      customeraddress?.map((li) => {
        address1 = li.address1
        // address2 = li.address2
        // city = li.city
        gstno = li.gstnumber
        return null
      })

      setAddress1(address1)
      // setAddress2(address2)
      // setAddress3(city)
      setGst(gstno)
    }
  }, [apiUrl, customeraddress])

  const fullAmount = parseInt(totalAmount) + parseInt(nightTotalAmount) + parseInt(driverBetaAmount) + parseInt(extraHrAmount) + parseInt(extraKmAmount)
  // const cgst = fullAmount * 2.5 / 100
  // const sgst = fullAmount * 2.5 / 100
  const groupgst = billingGroupDetails[0]?.gstTax / 2;
  const groupigst = billingGroupDetails[0]?.gstTax;
  const igst = (fullAmount * fullGST / 100);
  const cgst = (fullAmount * gstAmount / 100);
  const sgst = (fullAmount * gstAmount / 100);
  const billingGroupCGST = (fullAmount * groupgst / 100 || 0)
  const billingGroupIGST = Math.round(fullAmount * billingGroupDetails[0]?.gstTax / 100 || 0)

  const park = parseInt(parking)
  const permitcharge = parseInt(permit)
  const tollAmount = parseInt(toll)

  const parkpermit = park + permitcharge + tollAmount
  // const FullAmount = fullAmount + cgst + sgst + parkpermit - parseInt(advance)
  const FullAmount = Math.round(billingGroupDetails.length > 0 ? fullAmount + billingGroupCGST + billingGroupCGST + parkpermit - parseInt(advance) : fullAmount + cgst + sgst + parkpermit - parseInt(advance));
  const formattedFullAmount = FullAmount;

  const rupeestext = numWords(parseInt(formattedFullAmount));

  // final calculation
  const cgstcalc = customerData[0]?.gstTax / 2;
  const sgstcalc = customerData[0]?.gstTax / 2;
  const cgstAmount = ((fullAmount * cgstcalc) / 100 || 0).toFixed(2);

  const igstcalc = customerData[0]?.gstTax;
  const igstAmount = Math.round(fullAmount * igstcalc / 100 || 0)


  return (
    <>
      <PDFDocument>
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <View style={styles.borderoutsite}>
              <View style={styles.section}>
                <View style={styles.headingsection}>
                  {/* <View> */}
                  {/* <Text style={styles.text1}> JESSY CABS</Text>
                    <Text style={styles.text2}> No:8/7, 11th Street,Nandanam(Extn.)</Text>
                    <Text style={styles.text2}> Nadanam,Chennai-600 035</Text>
                    <Text style={styles.text2}> booking@jessycabs.in</Text> */}

                  {/* <Text style={styles.text1}>{organisationdetailfill[0].organizationname}</Text>
                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                      {organisationdetailfill[0].addressLine1}
                    </Text>
                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                      {organisationdetailfill[0].location}
                    </Text>
                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                      {organisationdetailfill[0].contactEmail}
                    </Text>
                    
                    
                  </View> */}


                  <View>
                    <Text style={styles.underlinetext}>{organisationdetailfill[0]?.organizationname}</Text>
                    <Text style={[styles.text2, { fontSize: 11.5, width: '50%', }]}>
                      {stationData[0]?.address}
                    </Text>
                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                      {stationData[0]?.state.toUpperCase()}
                    </Text>
                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                      {organisationdetailfill[0]?.contactEmail}
                    </Text>
                    {/* {newStateforpdf.length > 0 && newStateforpdf[0].gstno !== "" && newStateforpdf[0].gstno !== null ? (
                      // Render this view if newStateforpdf has values
                      <>
                        <Text style={styles.underlinetext}>{organisationdetailfill[0]?.organizationname}</Text>
                        <Text style={[styles.text2, { fontSize: 11.5 }]}>
                          {newStateforpdf[0]?.address}
                        </Text>
                        <Text style={[styles.text2, { fontSize: 11.5 }]}>
                          {newStateforpdf[0]?.state?.toUpperCase()}
                        </Text>
                        <Text style={[styles.text2, { fontSize: 11.5 }]}>
                          {organisationdetailfill[0]?.contactEmail}
                        </Text>
                      </>
                    ) : (
                      // Render this view if newStateforpdf is null or empty
                      <>
                        <Text style={styles.text1}>{organisationdetailfill[0]?.organizationname}</Text>
                        <Text style={[styles.text2, { fontSize: 11.5 }]}>
                          {organisationdetailfill[0]?.addressLine1}
                        </Text>
                        <Text style={[styles.text2, { fontSize: 11.5 }]}>
                          {organisationdetailfill[0]?.location?.toUpperCase()}
                        </Text>
                        <Text style={[styles.text2, { fontSize: 11.5 }]}>
                          {organisationdetailfill[0]?.contactEmail}
                        </Text>
                      </>
                    )} */}
                  </View>


                  <View style={styles.logodiv}>
                    {/* <Image src={Logo} style={styles.logo} /> */}
                    {/* <Image src={`${apiUrl}/public/org_logo/${organisationimage}`} style={styles.logo} /> */}
                    <Image src={logo} style={styles.logo} />
                  </View>
                </View>
                <View style={styles.gst}>
                  <View>
                    {/* <Text style={styles.text2}>Tel:044-24354247,Mob:9841505689 </Text> */}
                    <Text style={[styles.text2, { fontSize: 10 }]}>
                      Tel: {organisationdetailfill[0].telephone}, Mob: {organisationdetailfill[0].contactPhoneNumber}
                    </Text>
                  </View>
                  <View>
                    {/* <Text style={styles.gstno}>GSTIN:33AALCC0190M1ZK</Text> */}
                    {newStateforpdf.length > 0 && newStateforpdf[0].gstno !== "" && newStateforpdf[0].gstno !== null ? (
                      <Text style={[styles.gstno, { fontSize: 10 }]}>
                        GSTIN: {newStateforpdf[0]?.gstno}
                      </Text>
                    ) : (
                      <Text style={[styles.gstno, { fontSize: 10 }]}>
                        GSTIN: {organisationdetailfill[0].gstnumber}
                      </Text>
                    )
                    }
                  </View>
                </View>
                <View style={styles.taxinvoice}>
                  <Text style={styles.invoicetext}>
                    TAX INVOICE
                  </Text>

                </View>
                <View style={styles.seconddivision}>
                  <View style={{ width: 200 }}>
                    <Text style={[styles.underlinetext, { fontSize: 11 }]}>
                      Details of Receiver | Billed to:
                    </Text>
                    <Text style={[styles.customername, { width: 300, fontSize: 12, fontWeight: 600 }]}>{customer}</Text>
                    <Text style={[styles.text2, { fontSize: 10, width: 220 }]}>{customerData[0]?.address1}</Text>
                    <Text style={[styles.text2, { fontSize: 10 }]}>{customerData[0]?.state}</Text>
                    <Text style={[styles.text2, { fontSize: 10 }]}>GSTIN: {customerData[0]?.gstnumber}</Text>
                  </View>

                  <View style={styles.invoicediv}>
                    {/* <Text style={styles.invoicerightside}><Text style={styles.invoicerightsideHeading}>Invoice No :</Text> {invoiceno}</Text>
                    <Text style={styles.invoicerightside}><Text style={styles.invoicerightsideHeading}>Invoice Date :</Text> {invoiceDate}</Text>
                    <Text style={styles.invoicerightside}><Text style={styles.invoicerightsideHeading}>Group Ref No :</Text> {groupTripid}</Text> */}

                    <View style={styles.grandtotal}>
                      <View>
                        <Text style={[styles.total, { fontSize: 10 }]}>Invoice No: </Text>
                        <Text style={[styles.text2, { fontSize: 10 }]}>Invoice Date:</Text>
                        <Text style={[styles.text2, { fontSize: 10 }]}>Group Ref No:</Text>
                      </View>
                      <View>
                        <Text style={[styles.invoicerightside, { fontSize: 10 }]}>{invoiceno}</Text>
                        <Text style={[styles.invoicerightside, { fontSize: 10 }]}>
                          {dayjs(invoiceDate).format('DD-MM-YYYY')}
                        </Text>
                        <Text style={[styles.invoicerightside, { fontSize: 10 }]}>{groupTripid}</Text>
                      </View>
                    </View>

                  </View>
                </View>

                <View style={styles.section}>
                  <View>
                    <View style={styles.tableRow}>

                      <View style={styles.tableheadsno}><Text>S No</Text></View>
                      <View style={styles.tableheading}><Text>Trip Date</Text></View>
                      <View style={styles.tableheadtripno}><Text>Trip No</Text></View>
                      <View style={styles.tableheadingparticular}><Text>Particulars</Text></View>
                      <View style={styles.tableheadingpermit}><Text>Park/Permit/Toll</Text></View>
                      <View style={styles.tableheadingAmount}><Text>Amount</Text></View>
                    </View>
                    <View style={[styles.tablevalue, { fontSize: "10px" }]}>
                      {invdata.map((item, index) => (

                        <View style={styles.tablevalueRow} key={index}>
                          <React.Fragment>
                            <View style={styles.tablecellsno}>
                              <Text style={{ fontSize: 9 }}>{index + 1}</Text>
                            </View>
                            <View style={styles.tableCelldate}>
                              <Text style={{ fontSize: 9 }}>{dayjs(item.startdate).format('DD/MM/YYYY')}</Text>                            </View>
                            <View style={styles.tablecelltripno}>
                              <Text style={{ fontSize: 9 }}>{item.tripid}</Text>
                            </View>
                            <View style={styles.tablecellparticular}>
                              <View style={styles.tablecellparticularInside} >
                                <Text style={{ fontSize: 9 }}>{item.guestname}</Text>
                                {/* <Text style={{ fontSize: 10 }}>
                                {item.vehRegNo} / {item.duty} / TKms : {item.totalkm1} / Hrs : {item.totaltime}
                                / {item.vehicleName2}
                              </Text> */}
                              <View style={{flexDirection:'column'}}>

                              <View style={{width:'100%',}}>
                              {item?.duty === "Outstation" ?
                                  <Text style={{ fontSize: 9, }}>
                                    {item.vehRegNo} / {item.duty} / TKms : {item.totalkm1} / Days : {item.totaldays}
                                  </Text> :
                                  <Text style={{ fontSize: 9 }}>
                                    {item.vehRegNo} / {item.duty} / TKms : {item.totalkm1} / Hrs : {item.totaltime}
                                  </Text>
                                }
                                <Text style={{ fontSize: 9 }}>
                                  {item.vehicleName} {item.vehType}
                                </Text>
                              </View>
                              <View style={{width:"100%",}}>
                              <Text style={{ fontSize: 9 }}>Vehicle Hire Charges For : {item.calcPackage}</Text>

                                {/* {item.extraKM > 0 && item.extrakm_amount > 0 ? (
                                  <Text style={{ fontSize: 9 }}>Extra Kms : {item.extraKM} Kms @ Rs.{item.extrakm_amount}</Text>
                                ) : null} */}
                                {item.extraKM > 0 && item.extrakm_amount > 0 ? (
                                <Text style={{ fontSize: 9 }}>
                                  {item.duty === "Outstation"  
                                    ? `${item.extraKM} Kms @ Rs.${item.extrakm_amount}`
                                    : `Extra Kms : ${item.extraKM} Kms @ Rs.${item.extrakm_amount}`}
                                </Text>
                              ) : null}


                                {item.extraHR > 0 && item.extrahr_amount > 0 ? (
                                  <Text style={{ fontSize: 9 }}>Extra Hrs : {item.extraHR} hrs @ Rs.{item.extrahr_amount}</Text>
                                ) : null}

                                {item.nightBta > 0 && item.nightCount > 0 ? (
                                  <Text style={{ fontSize: 9 }}>Night Bata : {item.nightCount} Night @ Rs.{item.nightBta}</Text>
                                ) : null}

                                {item.driverBeta > 0 && item.driverbeta_Count > 0 ? (
                                  <Text style={{ fontSize: 9 }}>Driver Bata : {item.driverbeta_Count} Days @ Rs.{item.driverBeta}</Text>
                                ) : null}

                                <Text style={{ fontSize: 9 }}>{item.pickup}</Text>
                              </View>

                              </View>
                              

                                
                                
                              </View>

                            </View>

                            {/* <View style={styles.tableCellpermit}><Text style={styles.permittext}>{item.permit ? item.permit : 0} / {item.parking ? item.parking : 0}</Text></View> */}
                            <View style={styles.tableCellpermit}>
                              <Text style={{ fontSize: 9 }}>{'\n'}</Text>
                              <Text style={{ fontSize: 9 }}>{'\n'}</Text>
                              {/* <Text style={[styles.permittext, { fontSize: 9 }]}>
                                {(parseInt(item.permit) || 0) + (parseInt(item.parking) || 0) + (parseInt(item.toll) || 0)}.00
                              </Text> */}
                              {(parseInt(item.permit) || 0) + (parseInt(item.parking) || 0) + (parseInt(item.toll) || 0) > 0 && (
                              <Text style={[styles.permittext, { fontSize: 9 }]}>
                                {(parseInt(item.permit) || 0) + (parseInt(item.parking) || 0) + (parseInt(item.toll) || 0)}.00
                              </Text>
                            )}
                            </View>
                            <View style={[styles.tableCell, { paddingRight: 15 }]}>
                              <Text style={{ fontSize: 9 }}>{'\n'}</Text>
                              <Text style={{ fontSize: 9 }}>{'\n'}</Text>
                              {item.package_amount > 0 && (
                                <Text style={{ fontSize: 9, textAlign: 'right', paddingRight: 26 }}>{item.package_amount}.00</Text>
                              )}
                              {item.extraKM > 0 && item.ex_kmAmount > 0 && (
                                <Text style={{ fontSize: 9, textAlign: 'right', paddingRight: 26 }}>{item.ex_kmAmount}.00</Text>
                              )}
                              {item.extraHR > 0 && item.ex_hrAmount > 0 && (
                                <Text style={{ fontSize: 9, textAlign: 'right', paddingRight: 26 }}>{item.ex_hrAmount}.00</Text>
                              )}
                              {item.nightBta > 0 && item.night_totalAmount > 0 && (
                                <Text style={{ fontSize: 9, textAlign: 'right', paddingRight: 26 }}>{item.night_totalAmount}.00</Text>
                              )}
                              {item.driverBeta > 0 && item.driverBeta_amount > 0 && (
                                <Text style={{ fontSize: 9, textAlign: 'right', paddingRight: 26 }}>{item.driverBeta_amount}.00</Text>
                              )}
                            </View>
                          </React.Fragment>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.totalsum}>
                {customerData[0]?.gstTax === 0 || customerData[0]?.gstTax === null ? (

                  <View style={styles.totalsuminitial}>



                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', paddingLeft: 12 }}>
                      <Text style={{ fontSize: 11, marginTop: 5 }}>NOTE:</Text>
                      {/* <Text style={{ fontSize: 10 }}>
                        IGST@5% or both CGST@2.5% & SGST@2.5% of Rs:335 is to be paid by Service Recipient Under RCM as per Notification 22/2019 – Central tax (Rate) dated 30-09-2019
                      </Text> */}
                      <Text style={{ fontSize: 10, marginBottom: 10 }}>
                        IGST@5% or both CGST@2.5% & SGST@2.5% of Rs:
                        {fullAmount > 0 && (
                          (fullAmount * 0.05).toFixed(2) // Calculate 5% and format to 2 decimal places
                        )} is to be paid by Service Recipient Under RCM as per Notification 22/2019 - Central tax (Rate) dated 30-09-2019
                      </Text>
                      <View>
                        <View>
                          <Text style={{ width: 200, fontSize: 11, }}>
                            E.& O.E In Words-Rupees
                          </Text>
                        </View>

                        <View style={styles.totalrupeesword}>
                          <Text style={[styles.rupeestexteo, { paddingBottom: 10, marginBottom: 5, fontSize: 10 }]}>
                            {rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)} Rupees Only
                          </Text>
                        </View>

                      </View>

                    </View>
                  </View>
                ) : (
                  <View style={styles.textRupees}>
                    <View>
                      <Text style={{ width: 200, fontSize: 11, paddingLeft: 7 }}>
                        E.& O.E In Words-Rupees
                      </Text>
                    </View>
                    <View style={styles.totalrupeesword}>
                      <Text style={[styles.rupeestexteo, { paddingBottom: 3, paddingLeft: 7, fontSize: 10 }]}>
                        {rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)} Rupees Only
                      </Text>
                    </View>
                  </View>

                )}
                {/* </View> */}
                <View style={styles.grandtotal}>
                  {/* <View >
                    <Text style={styles.total}>SUB TOTAL: </Text>
                    <Text style={styles.text2}>CGST {gstAmount} on {fullAmount}:</Text>
                    <Text style={styles.text2}>SGST {gstAmount} on {fullAmount}:</Text>
                    <Text style={styles.text2}>Parking & Permit:</Text>
                    <Text style={styles.text2}>Total Amount:</Text>
                  </View>
                  
                  <View>
                    <Text style={styles.text2}>{fullAmount}</Text>
                    <Text style={styles.text2}>{cgst}</Text>
                    <Text style={styles.text2}>{sgst}</Text>
                    <Text style={styles.text2}>{parkpermit}</Text>
                    <Text style={styles.text2}>{formattedFullAmount}</Text>
                  </View> */}
                  <View style={{ flexDirection: 'column', display: 'flex', justifyContent: 'flex-end', paddingRight: 5, marginLeft: 33 }}>
                    {fullAmount > 0 && (
                      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ width: '200px', fontSize: 10 }}>SUB TOTAL: </Text>
                        <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{fullAmount}.00</Text>
                      </View>
                    )}
                    {/* {newStateforpdf.length > 0 && newStateforpdf[0].gstno !== "" && newStateforpdf[0].gstno !== null && newStateforpdf[0].gstno !== undefined ? (
                      <>
                        {cgst > 0 && (
                          <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 2 }}>
                            {billingGroupDetails.length > 0 ? <Text style={{ width: '130px', fontSize: 10 }}>CGST {groupgst}% on {fullAmount}:</Text>  : <Text style={{ width: '130px', fontSize: 10 }}>CGST {gstAmount}% on {fullAmount}:</Text> }
                            {billingGroupDetails.length > 0 ? <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{billingGroupCGST}.00</Text> :  <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{cgst}.00</Text> }
                          </View>
                        )}

                        {sgst > 0 && (
                          <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 2 }}>
                           {billingGroupDetails.length > 0 ? <Text style={{ width: '130px', fontSize: 10 }}>SGST {groupgst}% on {fullAmount}:</Text> : <Text style={{ width: '130px', fontSize: 10 }}>SGST {gstAmount}% on {fullAmount}:</Text> }
                           {billingGroupDetails.length > 0 ? <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{billingGroupCGST}.00</Text> : <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{sgst}.00</Text>}
                          </View>
                        )}
                      </>
                    ) : (
                      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 2 }}>
                       {billingGroupDetails.length > 0 ? <Text style={{ width: '130px', fontSize: 10 }}>IGST {groupigst}% on {fullAmount}:</Text> : <Text style={{ width: '130px', fontSize: 10 }}>IGST {fullGST}% on {fullAmount}:</Text> }
                       {billingGroupDetails.length > 0 ? <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{billingGroupIGST}.00</Text> : <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{igst}.00</Text>}
                      </View>
                    )} */}
                    {
                      customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ?
                        <>
                          <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 1, }}>
                            <Text style={{ width: '200px', fontSize: 10, }}>CGST {cgstcalc}% on {fullAmount}:</Text>
                            <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{cgstAmount}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 1 }}>
                            <Text style={{ width: '200px', fontSize: 10 }}>SGST {sgstcalc}% on {fullAmount}:</Text>
                            <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{cgstAmount}</Text>
                          </View>
                        </> :

                        <View View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 1 }}>
                          {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <Text style={{ width: '200px', fontSize: 10 }}>IGST {igstcalc}% on {fullAmount}:</Text> : <Text style={{ width: '200px', fontSize: 10 }}> </Text>}
                          {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{igstAmount}.00</Text> : <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>0.00</Text>}
                        </View>
                    }


                    {parkpermit > 0 && (
                      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <Text style={{ width: '200px', fontSize: 10 }}>Parking & Permit:</Text>
                        <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{parkpermit}.00</Text>
                      </View>
                    )}

                    {advance > 0 && (
                      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', borderBottom: '1px solid #000', width: "100%" }}>
                        <Text style={{ width: '200px', fontSize: 10 }}>Customer Advance (-)</Text>
                        <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{advance}.00</Text>
                      </View>
                    )}

                    {formattedFullAmount > 0 && (
                      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <Text style={{ width: '200px', fontSize: 10 }}>Total Amount:</Text>
                        <Text style={{ fontSize: 10, padding: 5, width: '60px', textAlign: 'right' }}>{formattedFullAmount}.00</Text>
                      </View>
                    )}
                  </View>


                </View>
              </View>

              {/* <View style={styles.totalrupeesword}>
                <Text style={styles.rupeestext}>{rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)}</Text>

              </View> */}

              <View style={styles.lastsectiondiv}>
                <View style={styles.lastsection}>
                  < View style={styles.rupees}>
                    {/* <View style={styles.totalrupeesword}>
                      <Text style={[styles.rupeestext, { paddingBottom: 10, marginBottom: 5 }]}>
                        {rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)} Rupees Only
                      </Text>
                    </View> */}
                    {/* <Text style={styles.rupeestext}>{rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)}</Text> */}
                    <Text style={[styles.underlinetext, { fontSize: 12 }]}>Bank Details</Text>

                    <Text style={[styles.text2, { fontSize: 10 }]}>
                      {organisationdetailfill[0].BankDetails}
                    </Text>
                    {/* {gstAmount === 0 ? (
                    <Text style={[styles.text2, { fontSize: 10, width: 320, marginTop: 10 }]}>
                      GST is to be paid by Service Recipient Under RCM as per Notification
                      22/2019 - Central tax (Rate) dated 30-09-2019
                    </Text>
                    ) */}
                    {gstAmount === 0 && (
                      <Text style={[styles.text2, { fontSize: 10, width: 320, marginTop: 10 }]}>
                        GST is to be paid by Service Recipient Under RCM as per Notification
                        22/2019 - Central tax (Rate) dated 30-09-2019
                      </Text>
                    )}

                    {/* <Text>GST is to be paid by Service Recepient Under RCM as per Notification 22/2019 - Central tax (Rate) dated 30-09-2019</Text> */}

                  </View>
                </View>

                <View style={styles.signaturesection}>

                  <View style={[styles.companyName, { flexDirection: 'row' }]}>

                    <Text style={[styles.jessytext, { paddingTop: 15, fontSize: "12px" }]}>For Jessy Cabs Pvt Ltd</Text>

                  </View>
                  {/* <View style={[styles.companyName, { marginBottom: 100 }]}>  
                    <Text style={styles.jessytext}>For jessy Cabs</Text>
                  </Vie w> */}
                  <View style={styles.signone}>
                    <Text></Text>
                  </View>

                  <View style={styles.signtwo}>
                    <Text style={styles.signtext}>Authorised Signature</Text>
                  </View>
                </View>
              </View>
              {/* <Text>GST is to be paid by Service Recepient Under RCM as per Notification 22/2019 - Central tax (Rate) dated 30-09-2019</Text> */}
            </View>

          </View>


        </Page>
      </PDFDocument>
    </>
  )
}
export default PdfContent;
