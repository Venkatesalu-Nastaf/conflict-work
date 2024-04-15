import React,{useEffect,useState} from 'react';
import { Page, Text, View, Document as PDFDocument, StyleSheet,Image } from '@react-pdf/renderer';
import { APIURL } from '../../../url';
import dayjs from 'dayjs';
import Logo from './Logo/logo.png'
import numWords from 'num-words'


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
    border:'1px solid black'
  },
  heading:{
  border:'2px solid #000000',
  padding: '20px'
  },
  // borderoutsite:{
  //   border:'2px solid #000000',

  // },
  section: {
      marginTop:10
 
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%', // Set the width of the table row to 100%
  },
  tableCell: {
    // borderColor: '#000',
    // borderWidth: 1,
    width: '13.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
    fontSize:'10px',
    borderRight:'1px solid #000000'
  },
  gst:{
    display: 'flex',
    // flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    gap:'130px',

  },
  seconddivision:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:5

  },
  taxinvoice:{
    border:'1px soli #000000',
    backgroundColor:'lightgrey',
    justifyContent:'center',
    alignItems:'center'
  },
  text1:{
    fontSize:'18px',
    fontWeight:'bold'
  },
  text2:{
    fontSize:'12px',

  },
  invoicerightside:{
       fontSize:'12px'
  },
  gstno:{
    fontSize:'13px',
    fontWeight:'bold'
  },
  customername:{
    fontSize:13,
    fontWeight:'extrabold',
    width:'45%',
  },
  underlinetext:{
    textDecoration:'underline',
    fontSize:14
  },
  invoicediv:{
    marginTop:10
  },
  tableheading:{
    fontSize:'11px',
    borderColor: '#000',
    borderWidth: 1,
    width: '13.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tableheadsno:{
     fontSize:'11px',
    borderColor: '#000',
    borderWidth: 1,
    width: '9.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
  },
  tablecellsno:{
    width: '9.33%', // Set the width of each cell to 33.33% for equal distribution
    padding: 5,
    fontSize:'12px',
    borderRight:'1px solid #000000'
  },
  tableheadingparticular:{
    width:'59%',
    fontSize:'11px',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    
  },
  tablecellparticular:{
    width:'59%',
    // borderColor: '#000',
    // borderWidth: 1,
    padding: 5,
    fontSize:'11px',
    borderRight:'1px solid #000000',
  },
  tableheadingpermit:{
    width:'16%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    fontSize:'11px',
   
  },
  tableCellpermit:{
    width:'16%',
    // borderColor: '#000',
    // borderWidth: 1,
    padding: 5,
    fontSize:'10px',
    borderRight:'1px solid #000000',

  },
  grandtotal:{
    
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    gap:'20px',
    padding:10
  },
  totalsum:{
   display:'flex',
   flexDirection:'row',
    justifyContent:'space-between',
    border:'1px solid #000000',
    marginTop:10
  },
  totalsuminitial:{
  width:'45%',
   },
total:{
  fontSize:12
},
tablevalue:{
flexDirection:'column',
borderBottom:'1px solid #000000',
borderRight:'1px solid #000000',
borderLeft:'1px solid #000000',
},
tablevalueRow:{
  flexDirection:'row'
},
logo:{
  height:80,
  width:80
},
headingsection:{
  flexDirection:'row',
  justifyContent:'space-between',
  height:75
},
logodiv:{
  marginBottom:10
},
tableheadtripno:{
  fontSize:'11px',
  borderColor: '#000',
  borderWidth: 1,
  width: '12.33%', // Set the width of each cell to 33.33% for equal distribution
  padding: 5,
},
tablecelltripno:{
  width: '12.33%', // Set the width of each cell to 33.33% for equal distribution
  padding: 5,
  fontSize:'10px',
  borderRight:'1px solid #000000'
},

amounttext:{
  textAlign:'center'
},
lastsection:{
  flexDirection:'row',
  justifyContent:'space-between',
  padding:'10px'
},
rupees:{
  width:'70%',
},
signaturesection:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:'30px',
},lastsectiondiv:{
  border:'1px solid #000000',

},
rupeestext:{
  fontSize:'12px'
},
signtext:{
  fontSize:'12px',
  padding:'10px',
},
jessytext:{
  fontSize:'14px'
}
  

});

const PdfContent = ({invdata,invoiceno,invoiceDate,groupTripid,customeraddress,customer})=>{
    
    const [totalAmount,setTotalAmount] = useState('')
    const [parking,setParking] = useState('')
    const [permit,setPermit] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')
    const [address3,setAddress3] = useState('')
    const [extraKm,setExtraKm] = useState('')
    const [extraKmAmount,setExtraKmAmount] = useState('')
    const organizationname = customer

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
    })
    setTotalAmount(totalamount)
    setParking(parkingamount)
    setPermit(permitamount)
    setExtraKmAmount(exkmamount)
  }
}, [apiUrl])


useEffect(() => {
  if (customeraddress) {
    let address1 = ""
    let address2 = ""
    let city = ""
    customeraddress?.map((li) => {
      address1 = li.address1
      address2 = li.address2
      city = li.city
    })
  
    setAddress1(address1)
    setAddress2(address2)
    setAddress3(city)
  }
}, [apiUrl])


const fullAmount = parseInt(totalAmount) + parseInt(extraKmAmount)
const cgst = totalAmount * 2.5 / 100
const sgst = totalAmount * 2.5 / 100
const FullAmount = totalAmount + cgst + sgst
const park = parseInt(parking)
const permitcharge = parseInt(permit)
const parkpermit  = park + permitcharge
const rupeestext = numWords(parseInt(FullAmount))
return(
<>
  <PDFDocument>
    <Page size="A4" style={styles.page}>
      <View style={styles.heading}>
        <View style={styles.borderoutsite}>
        <View style={styles.section}>
          <View style={styles.headingsection}>
            <View>
        <Text style={styles.text1}> JESSY CABS</Text>
        <Text style={styles.text2}> No:8/7, 11th Street,Nandanam(Extn.)</Text>
        <Text style={styles.text2}> Nadanam,Chennai-600 035</Text>
        <Text style={styles.text2}> booking@jessycabs.in</Text>
</View>
<View style={styles.logodiv}>
      <Image src={Logo} style={styles.logo} />
      </View>
</View>
      <View style={styles.gst}>
        <View>
        <Text style={styles.text2}>Tel:044-24354247,Mob:9841505689 </Text>
        </View>
        <View>
        <Text style={styles.gstno}>GSTIN:33AVNPM9362R1ZK</Text>

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
              <Text style={styles.text2}>{address2}</Text>
              <Text style={styles.text2}>{address3}</Text>
              <Text style={styles.text2}>GSTIN: 33AALCC0190M1ZK</Text>

        </View>
        
        
          <View style={styles.invoicediv}>
        <Text style={styles.invoicerightside}>Invoice No : {invoiceno}</Text>
              <Text style={styles.invoicerightside}>Invoice Date : {invoiceDate}</Text>
              <Text style={styles.invoicerightside}>Group Ref No : {groupTripid}</Text>
              


        </View>
      </View>
      {/* <Text></Text>
 <View></View> */}


<View style={styles.section}>
        <View>
          <View style={styles.tableRow}>
        
            <View style={styles.tableheadsno}><Text>S NO</Text></View>
            <View style={styles.tableheading}><Text>TRIP DT</Text></View>
            <View style={styles.tableheadtripno}><Text>TRIP NO</Text></View>
            <View style={styles.tableheadingparticular}><Text>PARTICULARS</Text></View>
            <View style={styles.tableheadingpermit}><Text>Par/Permit</Text></View>
            <View style={styles.tableheading}><Text>AMOUNT</Text></View>

          </View>


          <View style={styles.tablevalue}>
          {invdata.map((item, index) => (
             
          <View style={styles.tablevalueRow} key={index}>
    <React.Fragment >
      <View style={styles.tablecellsno}><Text>{index + 1}</Text></View>
      <View style={styles.tableCell}><Text>{dayjs(item.startdate).format('MM/DD/YY')}</Text></View>
      <View style={styles.tablecelltripno}><Text>{item.tripid}</Text></View>
      <View style={styles.tablecellparticular}><Text>{item.orderedby} {'\n'}{item.vehRegNo} / {item.duty} / TKms : {item.totalkm1} / Hrs : {item.totaltime} {'\n'}Vehicle Hire Charges For : {item.calcPackage} {'\n'}  {item.extraKM ? `Extra Kms : ${item.extraKM} Kms @ Rs.${item.extrakm_amount} \n` : ''}{item.pickup}</Text></View>
      <View style={styles.tableCellpermit}><Text style={styles.permittext}>{item.permit?item.permit :0} / {item.parking ? item.parking : 0}</Text></View>
      <View style={styles.tableCell}><Text style={styles.amounttext}>{item.netamount} {'\n'} {item.ex_kmAmount}</Text></View>
    </React.Fragment>
</View>
  ))}

          {/* <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>Data 1</Text></View>
            <View style={styles.tableCell}><Text>Data 2</Text></View>
            <View style={styles.tableCell}><Text>Data 3</Text></View>
  
            <View style={styles.tablecellparticular}><Text>Data 3</Text></View>
            <View style={styles.tableCellpermit}><Text>Data 3</Text></View>
            <View style={styles.tableCell}><Text>Data 3</Text></View>

          </View> */}

          {/* <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>Data 1</Text></View>
            <View style={styles.tableCell}><Text>Data 2</Text></View>
            <View style={styles.tableCell}><Text>Data 3</Text></View>
  
            <View style={styles.tablecellparticular}><Text>Data 3</Text></View>
            <View style={styles.tableCellpermit}><Text>Data 3</Text></View>
            <View style={styles.tableCell}><Text>Data 3</Text></View>

          </View> */}

          </View>

          
        </View>
      </View>


</View>






<View style={styles.totalsum}>
<View style={styles.totalsuminitial}></View>

<View style={styles.grandtotal}> 

<View >
<Text style={styles.total}>SUB TOTAL </Text>
<Text style={styles.text2}>CGST 2.5% on {totalAmount}</Text>
<Text style={styles.text2}>SGST 2.5% on {totalAmount}</Text>
<Text style={styles.text2}>Parking & Permit</Text>
<Text style={styles.text2}>Total Amount</Text>
</View>


<View>
<Text style={styles.text2}>{fullAmount}</Text>
<Text style={styles.text2}>{cgst}</Text>
<Text style={styles.text2}>{sgst}</Text>
<Text style={styles.text2}>{parkpermit}</Text>
<Text style={styles.text2}>{FullAmount}</Text>
</View>
</View>

</View>


<View style={styles.lastsectiondiv}>
<View style={styles.lastsection}> 

<View style={styles.rupees}>
    <Text style={styles.rupeestext}>{rupeestext}</Text>
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
