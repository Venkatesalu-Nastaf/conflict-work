import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image } from '@react-pdf/renderer';
import { APIURL } from '../../../url';
import dayjs from 'dayjs';
import numWords from 'num-words'


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
  tableRow: {
    flexDirection: 'row',
    width: '100%', // Set the width of the table row to 100%
  },
  tableCell: {
    width: '13.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
    fontSize: '10px',
    borderRight: '1px solid #000000'
  },
  gst: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '130px',

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
  gstno: {
    fontSize: '13px',
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
    borderTop:'1px solid #000',
    borderLeft:'1px solid #000',
    borderBottom:'1px solid #000',
    width: '13.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tableheadingAmount: {
    fontSize: '11px',
    borderTop:'1px solid #000',
    borderRight:'1px solid #000',
    borderBottom:'1px solid #000',
    width: '13.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tableheadsno: {
    fontSize: '11px',

    borderTop:'1px solid #000',
    borderLeft:'1px solid #000',
    borderBottom:'1px solid #000',
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
    width: '62%',
    fontSize: '11px',
    borderTop:'1px solid #000',
    borderRight:'1px solid #000',
    borderLeft:'1px solid #000',
    borderBottom:'1px solid #000',
    padding: 5,

  },
  tablecellparticular: {
    width: '62%',
    padding: 5,
    fontSize: '11px',
    borderRight: '1px solid #000000',
  },
  tableheadingpermit: {
    width: '16%',
    borderTop:'1px solid #000',
    borderRight:'1px solid #000',
    borderBottom:'1px solid #000',
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
    padding: 10
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
  tableheadtripno: {
    fontSize: '11px',
    borderTop:'1px solid #000',
    borderLeft:'1px solid #000',
    borderBottom:'1px solid #000',
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
    padding: '10px'
  },
  rupees: {
    width: '70%',
  },
  signaturesection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
   lastsectiondiv: {
    borderRight: '1px solid #000000',
    borderLeft: '1px solid #000000',
    borderBottom: '1px solid #000000',

  },
  rupeestext: {
    fontSize: '12px'
  },
  signtext: {
    fontSize: '12px',
    padding: '10px',
  },
  jessytext: {
    fontSize: '14px'
  }


});

const PdfContent = ({ invdata, invoiceno, invoiceDate, groupTripid, customeraddress, customer,organisationdetails,images }) => {

  const [totalAmount, setTotalAmount] = useState('')
  const [parking, setParking] = useState('')
  const [permit, setPermit] = useState('')
  const [address1, setAddress1] = useState('')
  const [gst, setGst] = useState('')
  const [extraKmAmount, setExtraKmAmount] = useState('')
  const organizationname = customer
  const organisationdetailfill=organisationdetails
  const organisationimage=images
  const apiUrl = APIURL;

  useEffect(() => {
    if (invdata) {
      let totalamount = 0
      let parkingamount = 0
      let permitamount = 0
      let exkmamount = 0
      invdata?.map((li) => {
        totalamount += parseInt(li.netamount || 0)
        parkingamount += parseInt(li.parking || 0)
        permitamount += parseInt(li.permit || 0)
        exkmamount += parseInt(li.ex_kmAmount || 0) // Corrected property name
        return null
      })
      setTotalAmount(totalamount)
      setParking(parkingamount)
      setPermit(permitamount)
      setExtraKmAmount(exkmamount)
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

  const fullAmount = parseInt(totalAmount) + parseInt(extraKmAmount)
  const cgst = fullAmount * 2.5 / 100
  const sgst = fullAmount * 2.5 / 100
  const park = parseInt(parking)
  const permitcharge = parseInt(permit)
  const parkpermit = park + permitcharge
  const FullAmount = fullAmount + cgst + sgst + park + permitcharge
  const formattedFullAmount = FullAmount.toFixed(2);

  const rupeestext = numWords(parseInt(formattedFullAmount));
  return (
    <>
      <PDFDocument>
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <View style={styles.borderoutsite}>
              <View style={styles.section}>
                <View style={styles.headingsection}>
                  <View>
                    {/* <Text style={styles.text1}> JESSY CABS</Text>
                    <Text style={styles.text2}> No:8/7, 11th Street,Nandanam(Extn.)</Text>
                    <Text style={styles.text2}> Nadanam,Chennai-600 035</Text>
                    <Text style={styles.text2}> booking@jessycabs.in</Text> */}
                    <Text style={styles.text1}> {organisationdetailfill[0].organizationname}</Text>
        <Text style={styles.text2}> {organisationdetailfill[0].addressLine1}</Text>
        <Text style={styles.text2}> {organisationdetailfill[0].location}</Text>
        <Text style={styles.text2}>{organisationdetailfill[0].contactEmail} </Text>
                  </View>
                  <View style={styles.logodiv}>
                    {/* <Image src={Logo} style={styles.logo} /> */}
                    <Image src={`${apiUrl}/public/org_logo/${organisationimage}`} style={styles.logo} />
                  </View>
                </View>
                <View style={styles.gst}>
                  <View>
                    {/* <Text style={styles.text2}>Tel:044-24354247,Mob:9841505689 </Text> */}
                    <Text style={styles.text2}>Tel:{organisationdetailfill[0].telephone},Mob:{organisationdetailfill[0].contactPhoneNumber} </Text>

                  </View>
                  <View>
                    {/* <Text style={styles.gstno}>GSTIN:33AALCC0190M1ZK</Text> */}
                    <Text style={styles.gstno}>GSTIN: {organisationdetailfill[0].gstnumber}</Text>

                  </View>

                </View>



                <View style={styles.taxinvoice}>
                  <Text style={styles.invoicetext}>
                    TAX INVOICE
                  </Text>

                </View>



                <View style={styles.seconddivision}>
                  <View >
                    <Text style={styles.underlinetext}>
                      Details of Receiver | Billed to:
                    </Text>
                    <Text style={styles.customername}>{organizationname}</Text>
                    <Text style={styles.text2}>{address1}</Text>
                    <Text style={styles.text2}>GSTIN: {gst} </Text>

                  </View>


                  <View style={styles.invoicediv}>
                    <Text style={styles.invoicerightside}>Invoice No : {invoiceno}</Text>
                    <Text style={styles.invoicerightside}>Invoice Date : {invoiceDate}</Text>
                    <Text style={styles.invoicerightside}>Group Ref No : {groupTripid}</Text>

                  </View>
                </View>

                <View style={styles.section}>
                  <View>
                    <View style={styles.tableRow}>

                      <View style={styles.tableheadsno}><Text>S NO</Text></View>
                      <View style={styles.tableheading}><Text>TRIP DT</Text></View>
                      <View style={styles.tableheadtripno}><Text>TRIP NO</Text></View>
                      <View style={styles.tableheadingparticular}><Text>PARTICULARS</Text></View>
                      <View style={styles.tableheadingpermit}><Text>Par/Permit</Text></View>
                      <View style={styles.tableheadingAmount}><Text>AMOUNT</Text></View>

                    </View>


                    <View style={styles.tablevalue}>
                      {invdata.map((item, index) => (

                        <View style={styles.tablevalueRow} key={index}>
                          <React.Fragment >
                            <View style={styles.tablecellsno}><Text>{index + 1}</Text></View>
                            <View style={styles.tableCell}><Text>{dayjs(item.startdate).format('MM/DD/YY')}</Text></View>
                            <View style={styles.tablecelltripno}><Text>{item.tripid}</Text></View>
                            <View style={styles.tablecellparticular}><Text>{item.orderedby} {'\n'}{item.vehRegNo} / {item.duty} / TKms : {item.totalkm1} / Hrs : {item.totaltime} {'\n'}Vehicle Hire Charges For : {item.calcPackage} {'\n'}  {item.extraKM ? `Extra Kms : ${item.extraKM} Kms @ Rs.${item.extrakm_amount} \n` : ''}{item.pickup}</Text></View>
                            <View style={styles.tableCellpermit}><Text style={styles.permittext}>{item.permit ? item.permit : 0} / {item.parking ? item.parking : 0}</Text></View>
                            <View style={styles.tableCell}><Text style={styles.amounttext}>{item.netamount} {'\n'} {item.ex_kmAmount}</Text></View>
                          </React.Fragment>
                        </View>
                      ))}


                    </View>

                  </View>
                </View>

              </View>

              <View style={styles.totalsum}>
                <View style={styles.totalsuminitial}></View>

                <View style={styles.grandtotal}>

                  <View >
                    <Text style={styles.total}>SUB TOTAL </Text>
                    <Text style={styles.text2}>CGST 2.5% on {fullAmount}</Text>
                    <Text style={styles.text2}>SGST 2.5% on {fullAmount}</Text>
                    <Text style={styles.text2}>Parking & Permit</Text>
                    <Text style={styles.text2}>Total Amount</Text>
                  </View>

                  <View>
                    <Text style={styles.text2}>{fullAmount}</Text>
                    <Text style={styles.text2}>{cgst}</Text>
                    <Text style={styles.text2}>{sgst}</Text>
                    <Text style={styles.text2}>{parkpermit}</Text>
                    <Text style={styles.text2}>{formattedFullAmount}</Text>
                  </View>
                </View>

              </View>


              <View style={styles.lastsectiondiv}>
                <View style={styles.lastsection}>

                  <View style={styles.rupees}>
                    <Text style={styles.rupeestext}>{rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)}</Text>
                  </View>

                  <View style={styles.companyName}>
                    <Text style={styles.jessytext}>For jessy Cabs</Text>
                  </View>
                </View>


                <View style={styles.signaturesection}>

                  <View style={styles.signone}>
                    <Text></Text>
                  </View>

                  <View style={styles.signtwo}>
                    <Text style={styles.signtext}>Authorised Signature</Text>
                  </View>
                </View>
              </View>

            </View>

          </View>

        </Page>
      </PDFDocument>
    </>
  )
}
export default PdfContent;
