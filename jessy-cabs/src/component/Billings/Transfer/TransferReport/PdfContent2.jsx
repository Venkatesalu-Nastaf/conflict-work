import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image } from '@react-pdf/renderer';
import { APIURL } from '../../../url';
import numWords from 'num-words'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 10,
    },
    headingsection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '170px',
        padding: 5,

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
        fontWeight:'bold'
    },
    headtext: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight:'bold'
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
        width: '70px'
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
    },
    lasttxt: {
        backgroundColor: 'red'
    },

    lastdiv: {
        flexDirection: 'row',
    },
    lastFirstdiv: {
        width: '70%',
        flexDirection: 'column',
        marginLeft: '10px'
    },
    logo: {
        height: 80,
        width: 80,
    },
    gstno: {
        fontSize: '15px',
        fontWeight: 'bold',
        marginRight:'40px'
    },
    text2: {
        fontSize: '13px',
        padding: 5
    },
    text3: {
        fontSize: '12px',
        padding: 5,
        marginTop: '10px'
    },
    textgst: {
        fontSize: '12px',
        padding: 5,
        borderBottom: '1px solid #000000'
    }
})

const PdfContent2 = ({ invdata, customeraddress, invoiceno, customer, invoiceDate, fromDate, enddate,organisationname,imagename  }) => {
    const [address1, setAddress1] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [extraKmAmount, setExtraKmAmount] = useState('')
    const [parking, setParking] = useState('')
    const [permit, setPermit] = useState('')
    const [gst, setGst] = useState('')
    const apiUrl = APIURL;
    const organisationdetailfill=organisationname
    const organisationimage=imagename
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

    const fullAmount = parseInt(totalAmount) + parseInt(extraKmAmount)
    const cgst = fullAmount * 2.5 / 100
    const sgst = fullAmount * 2.5 / 100
    const park = parseInt(parking)
    const permitcharge = parseInt(permit)
    // const parkpermit = park + permitcharge
    const FullAmount = fullAmount + cgst + sgst + park + permitcharge
    const formattedFullAmount = FullAmount.toFixed(2);
    const tripsheetnos = invdata?.length
    const rupeestext = numWords(parseInt(formattedFullAmount));
    return (
        <PDFDocument>
            <Page size="A4" style={styles.page}>
                <View style={styles.heading}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.headtext}>Tax Invoice</Text>
                    </View>
                    <View style={styles.headingsection}>
                        <View>
                            {/* <Text style={styles.text1}>JESSY CABS</Text>
                            <Text style={styles.text2}>No:8/7, 11th Street,Nandanam(Extn.)</Text>
                            <Text style={styles.text2}>Nadanam,Chennai-600 035</Text>
                            <Text style={styles.text2}>booking@jessycabs.in</Text>
                            <Text style={styles.text2}>Tel:044-24354247,Mob:9841505689 </Text> */}
                            <Text style={styles.text1}> {organisationdetailfill[0].organizationname}</Text>
        <Text style={styles.text2}> {organisationdetailfill[0].addressLine1}</Text>
        <Text style={styles.text2}> {organisationdetailfill[0].location}</Text>
        <Text style={styles.text2}>{organisationdetailfill[0].contactEmail} </Text>
        <Text style={styles.text2}>Tel:{organisationdetailfill[0].telephone},Mob:{organisationdetailfill[0].contactPhoneNumber} </Text>

                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                {/* <Image src={Logo} style={styles.logo} /> */}
                                <Image src={`${apiUrl}/public/org_logo/${organisationimage}`} style={styles.logo} />
                            </View>
                            <View style={{ flexDirection: 'row',marginRight:'70px' }}>
                                {/* <Text style={styles.gstno}>GSTIN  :  33AALCCn0190M1ZK</Text> */}
                                <Text style={styles.gstno}>GSTIN: {organisationdetailfill[0].gstnumber}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.maincontent}>
                        <View style={styles.clientdiv}>
                            <View style={styles.clientnamediv}>
                                <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
                                    <Text style={styles.clientext}>Client Name : </Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.clientsubtext}>{customer}</Text>
                                        <Text style={styles.clientsubtext}>{address1}</Text>

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.clientext}>GST IN : </Text>
                                    <Text style={styles.clientsubtext}>{gst}</Text>
                                </View>
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.billtext}>Bill No</Text>
                                    <Text style={styles.billtextinvoice}>{invoiceno}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.billtextdate}>Bill Date</Text>
                                    <Text style={styles.billtextdatetext}>{invoiceDate}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderBottom: '1px solid black' }}>
                            <View style={{ flexDirection: 'row', width: '250px', justifyContent: 'space-between', padding: 5 }}>
                                <Text style={{ fontSize: '13px' }}>Duration :  </Text>
                                <Text style={{ fontSize: '12px' }}>{fromDate} </Text>
                                <Text style={{ fontSize: '12px' }}>To</Text>
                                <Text style={{ fontSize: '12px' }}> {enddate}</Text>
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
                                <Text style={{ fontSize: '14px', padding: 5 }}>{rupeestext.charAt(0).toUpperCase() + rupeestext.slice(1)}</Text>
                                <Text style={{ fontSize: '13px' }}>For JESSY CABS</Text>
                                <Text style={{ padding: 20 }}></Text>
                                <Text style={{ fontSize: '13px' }}>Authorised Signature</Text>
                            </View>

                            <View style={styles.lastamount}>

                                <View style={styles.lastsectiontxt}>
                                    <Text style={styles.text2}>SUB TOTAL </Text>
                                    <Text style={styles.text2} >CGST 2.5% on {fullAmount} </Text>
                                    <Text style={styles.text2}>SGST 2.5% on {fullAmount}</Text>
                                    <Text style={styles.text2}>Net Payable : </Text>
                                </View>

                                <View style={styles.lastsectionamount}>
                                    <Text style={{ fontSize: '12px', padding: '5px' }}>{fullAmount}</Text>
                                    <Text style={styles.text2}>{cgst}</Text>
                                    <Text style={styles.textgst}>{sgst}</Text>
                                    <Text style={styles.text3}>{formattedFullAmount}</Text>
                                </View>
                            </View>



                        </View>


                    </View>



                </View>
            </Page>
        </PDFDocument>
    )
}

export default PdfContent2;
