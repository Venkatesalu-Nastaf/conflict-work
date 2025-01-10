import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image } from '@react-pdf/renderer';
import { APIURL } from '../../../url';
import numWords from 'num-words'
import dayjs from 'dayjs';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 10,
    },
    headingsection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '0px',
        padding: 0,
    },
    heading: {
        border: '2px solid #000000',
        padding: '20px'
    },
    // text2: {
    //     fontSize: '12px',
    // },
    text1: {
        fontSize: '17px',
        fontWeight: 'bold'
    },
    headtext: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    billtext: {
        fontSize: '13px',
        padding: 5,
        width: '70px'
    },
    billtextinvoice: {
        fontSize: '13px',
        padding: 5,
        width: '70px'
    },
    billtextdate: {
        fontSize: '13px',
        padding: 5,
        width: '70px'
    },
    billtextdatetext: {
        fontSize: '13px',
        width: '70px',
        marginTop: '5px'
    },
    clientdiv: {
        borderBottom: '1px solid black',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clientnamediv: {
        flexDirection: 'column'
    },
    clientext: {
        fontSize: '13px',
        width: '90px'

    },
    clientsubtext: {
        fontSize: '12px',

    },
    maincontent: {
        border: '1px solid #000000'
    },
    particulardiv: {
        flexDirection: 'row',

    },
    particular: {
        width: '70%',
        borderRight: '1px solid #000000',
        borderBottom: '1px solid #000000',
        textAlign: 'center',
        padding: 5,
        alignItems: "center"

    },
    particularsdiv: {
        width: '70%',
        borderRight: '1px solid #000000',
        borderBottom: '1px solid #000000',
        textAlign: 'center',
        padding: 5,
        alignItems: "center",
        height: '250px'
    },

    Amount: {
        width: '30%',
        borderBottom: '1px solid #000000',
        textAlign: 'center',
        marginTop: '5px'
    },
    // lastdiv: {
    //     border: '1px solid #000000'
    // },
    lastamount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '250px'

    },
    lastsectiontxt: {
    },
    lastsectionamount: {
        textAlign: 'right'
    },
    lasttxt: {
        backgroundColor: 'red'
    },

    lastdiv: {
        flexDirection: 'row',
        padding: '10px'
    },
    lastFirstdiv: {
        width: '70%',
        flexDirection: 'column',
        marginLeft: '0px',
        textAlign: 'left'
    },
    logo: {
        height: 60,
        width: 60,
    },
    gstno: {
        fontSize: '11px',
        fontWeight: 'bold',
        marginRight: '0px'
    },
    text2: {
        fontSize: '11px',
        paddingTop: 5,
        width:"60%"
    },
    text3: {
        fontSize: '12px',
        padding: 5,
        marginTop: '10px'
    },
    textgst: {
        fontSize: '12px',
        // padding: 5,
        borderBottom: '1px solid #000000',
    }
})

const PdfContent2 = ({ logo, invdata, customeraddress, invoiceno, customer, invoiceDate, fromDate, enddate, organisationname, imagename, commonStateAdress, billingGroupDetails, customerData, stationData }) => {
    const [address1, setAddress1] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [extraKmAmount, setExtraKmAmount] = useState('')
    const [parking, setParking] = useState('')
    const [permit, setPermit] = useState('')
    const [toll, setToll] = useState('')
    const [gst, setGst] = useState('')
    const [gstAmount, setGstAmount] = useState(0)
    const [advance, setAdvance] = useState();
    const apiUrl = APIURL;
    const organisationdetailfill = organisationname
    const organisationimage = imagename
    const customStateDatas = commonStateAdress


    useEffect(() => {
        if (invdata) {
            let totalamount = 0
            let parkingamount = 0
            let Tollamount = 0
            let permitamount = 0
            let exkmamount = 0
            let advanceamount = 0
            let gstamount = 0
            invdata?.map((li) => {
                totalamount += parseInt(li.totalcalcAmount || 0)
                parkingamount += parseInt(li.parking || 0) 
                Tollamount += parseInt(li.toll || 0)
                permitamount += parseInt(li.permit || 0)
                exkmamount += parseInt(li.ex_kmAmount || 0) // Corrected property name
                advanceamount += parseInt(li.customeradvance || 0)
                gstamount = parseInt(li.gstTax)
                return null
            })
            setTotalAmount(totalamount)
            setToll(Tollamount)
            setParking(parkingamount)
            setPermit(permitamount)
            setExtraKmAmount(exkmamount)
            setGstAmount(gstamount)
            setAdvance(advanceamount)
        }
    }, [apiUrl, invdata])

    useEffect(() => {
        if (customeraddress) {
            let address1 = ""
            let gstno = ""
            customeraddress?.map((li) => {
                address1 = li.address1
                gstno = li.gstnumber
                return null
            })

            setAddress1(address1)
            setGst(gstno)
        }
    }, [apiUrl, customeraddress])
    const park = parseInt(parking)
    const permitcharge = parseInt(permit)
    const tollcharge = parseInt(toll)
    const tollparkpermit = park + permitcharge + tollcharge

    const fullAmount = parseInt(totalAmount) - tollparkpermit
    const calgst = gstAmount / 2;
    const cgst = Math.round(fullAmount * calgst / 100)
    const sgst = Math.round(fullAmount * calgst / 100)
    const igst = Math.round(fullAmount * gstAmount / 100)
    const groupgst = billingGroupDetails[0]?.gstTax / 2;
    const groupigst = billingGroupDetails[0]?.gstTax;
    const billingGroupCGST = Math.round(fullAmount * groupgst / 100 || 0)
    const billingGroupIGST = Math.round(fullAmount * billingGroupDetails[0]?.gstTax / 100 || 0)

    // const park = parseInt(parking)
    // const permitcharge = parseInt(permit)
    // const tollcharge = parseInt(toll)
    // const parkpermit = park + permitcharge
    const FullAmount = billingGroupDetails.length > 0 ? fullAmount + billingGroupCGST + billingGroupCGST - parseInt(advance) : fullAmount + cgst + sgst - parseInt(advance)
    const formattedFullwithtollpark = FullAmount + tollparkpermit;
    // const formattedFullAmount = FullAmount.toFixed(0);
    const formattedFullAmount = formattedFullwithtollpark.toFixed(0);
    // const igstFullAmount = fullAmount + igst - parseInt(advance);
    const igstFullAmount = billingGroupDetails.length > 0 ? fullAmount + billingGroupIGST - parseInt(advance) : fullAmount + igst - parseInt(advance)
    const igstFullFormattedAmount = igstFullAmount.toFixed(0)
    const tripsheetnos = invdata?.length
    const rupeestext = numWords(parseInt(formattedFullAmount));

    // final gst amount
    const cgstcalc = customerData[0]?.gstTax / 2;
    const sgstcalc = customerData[0]?.gstTax / 2;
    const cgstAmount = Math.round(fullAmount * cgstcalc / 100 || 0);

    const igstcalc = customerData[0]?.gstTax;
    const igstAmount = Math.round(fullAmount * igstcalc / 100 || 0)
    console.log(customer, 'pdf222');

    return (
        <PDFDocument>
            <Page size="A4" style={styles.page}>
                <View style={styles.heading}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.headtext}>Tax Invoice</Text>
                    </View>
                    <View style={styles.headingsection}>
                        <View style={{ marginBottom: '5px' }}>
                            <Text style={styles.text1}>{organisationdetailfill[0]?.organizationname}</Text>
                            <Text style={styles.text2}>{stationData[0]?.address}</Text>
                            <Text style={styles.text2}>{stationData[0]?.state}</Text>
                            <Text style={styles.text2}>{organisationdetailfill[0]?.contactEmail}</Text>
                            <Text style={styles.text2}>
                                Tel: {organisationdetailfill[0]?.telephone || 'N/A'}, Mob: {organisationdetailfill[0]?.contactPhoneNumber || 'N/A'}
                            </Text>
                            {/* <Text style={styles.text1}>JESSY CABS</Text>
                            <Text style={styles.text2}>No:8/7, 11th Street,Nandanam(Extn.)</Text>
                            <Text style={styles.text2}>Nadanam,Chennai-600 035</Text>
                            <Text style={styles.text2}>booking@jessycabs.in</Text>
                            <Text style={styles.text2}>Tel:044-24354247,Mob:9841505689 </Text> */}
                            {/*                           
                          {console.log('organisationdetailfill:', organisationdetailfill)}
{console.log('newStateforpdf:', customStateDatas)} */}

                            {/* {customStateDatas.length > 0 && customStateDatas[0]?.gstno !== "" && customStateDatas[0]?.gstno !== undefined ? (
                                // Render this view if newStateforpdf has values
                                <>

                                    <Text style={styles.text1}>{organisationdetailfill[0]?.organizationname}</Text>

                                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                                        {customStateDatas[0]?.address}
                                    </Text>
                                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                                        {customStateDatas[0]?.Stationname}
                                    </Text>
                                    <Text style={[styles.text2, { fontSize: 11.5 }]}>
                                        {organisationdetailfill[0]?.contactEmail}
                                    </Text>
                                </>
                            ) : (

                                <>
                                    <Text style={styles.text1}>{organisationdetailfill[0]?.organizationname}</Text>
                                    <Text style={styles.text2}>{organisationdetailfill[0]?.addressLine1}</Text>
                                    <Text style={styles.text2}>{organisationdetailfill[0]?.location}</Text>
                                    <Text style={styles.text2}>{organisationdetailfill[0]?.contactEmail}</Text>
                                    <Text style={styles.text2}>
                                        Tel: {organisationdetailfill[0]?.telephone || 'N/A'}, Mob: {organisationdetailfill[0]?.contactPhoneNumber || 'N/A'}
                                    </Text>
                                </>
                            )} */}

                            {/* <Text style={styles.text1}>{organisationdetailfill[0].organizationname}</Text>
                            <Text style={styles.text2}>{organisationdetailfill[0].addressLine1}</Text>
                            <Text style={styles.text2}>{organisationdetailfill[0].location}</Text>
                            <Text style={styles.text2}>{organisationdetailfill[0].contactEmail} </Text>
                            <Text style={styles.text2}>Tel: {organisationdetailfill[0].telephone}, Mob: {organisationdetailfill[0].contactPhoneNumber} </Text> */}

                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'relative', top: '-20px' }}>
                                <Image src={logo} style={styles.logo} />
                                {/* <Image src={`${apiUrl}/public/org_logo/${organisationimage}`} style={styles.logo} /> */}
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: '0px', position: 'relative', top: '15px' }}>
                                <Text style={[styles.gstno, { fontSize: 10 }]}>
                                    GSTIN: {stationData[0]?.gstno}
                                </Text>
                                {/* <Text style={styles.gstno}>GSTIN  :  33AALCCn0190M1ZK</Text> */}
                                {/* <Text style={styles.gstno}>GSTIN: {organisationdetailfill[0].gstnumber}</Text> */}
                                {/* {customStateDatas.length > 0 && customStateDatas[0]?.gstno !== "" && customStateDatas[0]?.gstno !== undefined ? (
                                    <Text style={[styles.gstno, { fontSize: 10 }]}>
                                        GSTIN: {customStateDatas[0]?.gstno}
                                    </Text>
                                ) : (
                                    <Text style={[styles.gstno, { fontSize: 10 }]}>
                                        GSTIN: {organisationdetailfill[0]?.gstnumber}
                                    </Text>
                                )
                                } */}
                            </View>
                        </View>
                    </View>

                    <View style={styles.maincontent}>
                        <View style={styles.clientdiv}>
                            <View style={styles.clientnamediv}>
                                <View style={{ flexDirection: 'row', paddingBottom: 4 ,alignItems:"baseline"}}>
                                    <Text style={styles.clientext}>Client Name </Text> 
                                     <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>
                                    <View style={{ flexDirection: 'column',width:"50%" }}>
                                        <Text style={styles.clientsubtext}>{customer}</Text>
                                        <Text style={styles.clientsubtext}>{customerData[0]?.address1}</Text>
                                        {/* <Text style={styles.clientsubtext}>{address1}</Text> */}

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' ,alignItems:"baseline"}}>
                                    <Text style={styles.clientext}>GST IN  </Text>
                                    <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>

                                    <Text style={styles.clientsubtext}>{customerData[0]?.gstnumber}</Text>
                                </View>
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row',alignItems:"baseline"}}>
                                    <Text style={styles.billtext}>Bill No</Text>
                                    <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>

                                    <Text style={styles.billtextinvoice}>{invoiceno}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' ,alignItems:"baseline"}}>
                                    <Text style={styles.billtextdate}>Bill Date</Text>
                                    <Text style={{ marginLeft: '3px', fontSize: "10px" }}> :</Text>

                                    {/* <Text style={styles.billtextdatetext}>{invoiceDate}</Text> */}
                                    <Text style={styles.billtextdatetext}>{dayjs(invoiceDate).format('DD-MM-YYYY')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderBottom: '1px solid black' }}>
                            <View style={{ flexDirection: 'row', width: '250px', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={{ fontSize: '13px' }}>Duration: </Text>
                                {/* <Text style={{ fontSize: '12px' }}>{fromDate} </Text> */}

                                <Text style={{ fontSize: '12px' }}>
                                    {dayjs(fromDate).format('DD-MM-YYYY')}
                                </Text>

                                <Text style={{ fontSize: '12px' }}>To: </Text>
                                {/* <Text style={{ fontSize: '12px' }}>{dayjs(enddate).format('DD-MM-YYYY')}</Text> */}
                                <Text style={{ fontSize: '12px' }}>{dayjs(enddate).format('DD-MM-YYYY')}</Text>
                            </View>
                        </View>

                        <View style={styles.particulardiv}>
                            <View style={styles.particular}>
                                <Text style={{ fontSize: '13px' }}>particular</Text>
                            </View>

                            <View style={styles.Amount}>
                                <Text style={{ fontSize: '13px', textAlign: 'center', alignItems: 'center' }}>Amount</Text>
                            </View>


                        </View>

                        <View style={styles.particulardiv}>
                            <View style={styles.particularsdiv}>
                                <Text style={{ fontSize: '12px' }}>{tripsheetnos} Nos of Tripsheet </Text>
                            </View>

                            <View style={styles.Amount}>
                                <Text style={{ fontSize: '12px', textAlign: 'center', alignItems: 'center' }}>{fullAmount}</Text>
                            </View>


                        </View>

                        <View style={styles.lastdiv}>

                            <View style={styles.lastFirstdiv}>
                                <Text style={{ fontSize: '12px' }} >Amount in Words :-</Text>
                                <Text style={{ fontSize: '14px', paddingTop: 5 }}>{rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)}</Text>
                                <Text style={{ fontSize: '13px', paddingTop: 10 }}>For JESSY CABS</Text>
                                {/* <Text style={{ padding: 20 }}></Text> */}
                                <Text style={{ fontSize: '13px', paddingTop: 30 }}>Authorised Signature</Text>
                            </View>

                            {/* <View style={styles.lastamount}>
                                <View style={styles.lastsectiontxt}>
                                    <Text style={styles.text2}>SUB TOTAL : </Text>
                                    <Text style={styles.text2} >CGST {gstAmount} on {fullAmount} :</Text>
                                    <Text style={styles.text2}>SGST {gstAmount} on {fullAmount} :</Text>
                                    <Text style={styles.text2}>Net Payable : </Text>
                                </View>

                                <View style={styles.lastsectionamount}>
                                    <Text style={{ fontSize: '12px', padding: '5px' }}>{fullAmount}</Text>
                                    <Text style={styles.text2}>{cgst.toFixed(0)}</Text>
                                    <Text style={styles.textgst}>{sgst.toFixed(0)}</Text>

                                    <Text style={styles.text3}>{formattedFullAmount}</Text>
                                </View>
                            </View> */}

                            <View style={{ flexDirection: 'column', display: 'flex', justifyContent: 'flex-end' }}>
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    <Text style={{ width: '120px', fontSize: '11px' }}>SUB TOTAL: </Text>
                                    <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{fullAmount || 0}</Text>
                                </View>
                                {
                                    customerData[0].state === stationData[0].state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ?
                                        <>
                                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                                <Text style={{ width: '120px', fontSize: '11px' }}>CGST {cgstcalc}% on {fullAmount}: </Text>
                                                <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{cgstAmount}.00</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', }}>
                                                <Text style={{ width: '120px', fontSize: '11px' }}>SGST {sgstcalc}% on {fullAmount}:</Text>
                                                <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{cgstAmount}.00</Text>
                                            </View>
                                        </>
                                        :
                                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', }}>
                                            {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <Text style={{ width: '120px', fontSize: '11px' }}>IGST {igstcalc}% on {fullAmount}:</Text> : <Text style={{ width: '120px', fontSize: '11px' }}>GST</Text>}
                                            {customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{igstAmount}</Text> : <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>0</Text>}
                                        </View>
                                    // customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ?

                                }
                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    <Text style={{ width: '120px', fontSize: '11px' }}>Parking & Permit: </Text>
                                    <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{tollparkpermit}</Text>
                                </View>
                                {/* {customStateDatas.length > 0 && customStateDatas[0]?.gstno !== "" && customStateDatas[0]?.gstno !== undefined ?
                                    <>
                                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                            {billingGroupDetails.length > 0 ? <Text style={{ width: '120px', fontSize: '11px' }}>CGST {groupgst}% on {fullAmount}: </Text> : <Text style={{ width: '120px', fontSize: '11px' }}>CGST {calgst}% on {fullAmount}: </Text>}
                                            {billingGroupDetails.length > 0 ? <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{billingGroupCGST.toFixed(0)}</Text> : <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{cgst.toFixed(0)}</Text>}
                                        </View>

                                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', }}>
                                            {billingGroupDetails.length > 0 ? <Text style={{ width: '120px', fontSize: '11px' }}>SGST {groupgst}% on {fullAmount}:</Text> : <Text style={{ width: '120px', fontSize: '11px' }}>SGST {calgst}% on {fullAmount}:</Text>}
                                            {billingGroupDetails.length > 0 ? <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{billingGroupCGST.toFixed(0)}</Text> : <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{sgst.toFixed(0)}</Text>}
                                        </View>  </> :
                                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', }}>
                                        {billingGroupDetails.length > 0 ? <Text style={{ width: '120px', fontSize: '11px' }}>IGST {groupigst}% on {fullAmount}:</Text> : <Text style={{ width: '120px', fontSize: '11px' }}>IGST {gstAmount}% on {fullAmount}:</Text>}
                                        {billingGroupDetails.length > 0 ? <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{billingGroupIGST.toFixed(0)}</Text> : <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{igst.toFixed(0)}</Text>}
                                    </View>
                                } */}

                                {advance !== 0 ? <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', borderBottom: '1px solid #000' }}>
                                    <Text style={{ width: '130px', fontSize: '11px' }}>Customer Advance (-)</Text>
                                    <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{advance}</Text>
                                </View> : ""}

                                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                                    <Text style={{ width: '120px', fontSize: '11px' }}>Net Payable:</Text>
                                    {/* {customStateDatas.length > 0 && customStateDatas[0]?.gstno!=="" && customStateDatas[0]?.gstno!==undefined  ?
                                    <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{formattedFullAmount}</Text> :
                                    <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{formattedFullAmount}</Text> } */}
                                    <Text style={{ fontSize: '12px', padding: '5px', width: '60px', textAlign: 'right' }}>{formattedFullAmount}</Text>
                                </View>
                            </View>





                        </View>

                    </View>


                    <View style={styles.totalsuminitial}>
                        {customerData[0]?.gstTax === 0 || customerData[0]?.gstTax === null ? (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
                                <Text style={{ fontSize: 11, }}>NOTE:</Text>
                                <Text style={{ fontSize: 10, marginTop: 5 }}>
                                    IGST@5% or both CGST@2.5% & SGST@2.5% of Rs:335 is to be paid by Service Recipient Under RCM as per Notification 22/2019 – Central tax (Rate) dated 30-09-2019
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </Page>
        </PDFDocument>
    )
}

export default PdfContent2;
