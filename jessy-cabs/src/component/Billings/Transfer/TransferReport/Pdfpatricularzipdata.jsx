import React,{useEffect, useState,useRef} from "react";
import { APIURL } from "../../../url";
// import './PdfParticularData.css'
import { Page, Text, View, Document as PDFDocument, StyleSheet, Image } from '@react-pdf/renderer';

// import generatePDF from 'react-to-pdf';

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
    logo1: {
      height: 130,
      width: 130
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
    },maintabble:{
      border:'2px solid #000000',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      gap:'10px'
    },
    deatilssection:{
      flexDirection:'row',
      gap:'10px'

    },
    labeltag:{
      fontSize:'11px'

    },
    clientName:{
      fontSize:'11px'

    },
    remarksection:{
      flexDirection:'row',
      borderBottom:'2px solid #000000',
      borderRight:'2px solid #000000',
      borderLeft:'2px solid #000000'
    },tablesigndiv:{
      flexDirection:"row",
     
    },
    tablediv:{
      width:'60%',
      border:'1px solid #000000',
      // flexDirection:'row',

    },
    signdiv:{
      width:'40%'
    },

    tablehead:{
flexDirection:"row",
// width:'25%',
borderBottom:'1px solid #000000'
    },
    labeltag1:{
   
    width:'25%',
    textAlign:'center',
      borderRight:'1px solid #000000'
    },
    labeltag2:{
      width:'25%',
      textAlign:'center',
      fontSize:'13px',
      borderRight:'1px solid #000000'
    },

    labeltag3:{
      width:'25%',
      textAlign:'center',
      fontSize:'13px',
      borderRight:'1px solid #000000'
    },
    labeltag4:{
      width:'25%',
      textAlign:'center',
      fontSize:'13px',
      borderRight:'1px solid #000000'
    },
   
    labeltag5:{
      fontSize:'12px',
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000'
    },
    labeltag6:{
      width:'25%',
      textAlign:'center',
      fontSize:'11px',
      borderRight:'1px solid #000000'
    },

    labeltag7:{
      width:'25%',
      fontSize:'11px',
      textAlign:'center',
      borderRight:'1px solid #000000'
    },
    labeltag8:{
      fontSize:'11px',
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000'
    },
    labeltag9:{
      fontSize:'12px',
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000'
    },

    labeltag10:{
      width:'25%',
      textAlign:'center',
      fontSize:'11px',
      borderRight:'1px solid #000000'
    },
    labeltag11:{
      width:'25%',
      textAlign:'center',
      fontSize:'11px',
      borderRight:'1px solid #000000'
    },
    labeltag12:{
      fontSize:'11px',
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000'
    },
    labeltag13:{
      fontSize:'12px',
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000'
    },
    labeltag14:{
      fontSize:'11px',
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000'
    },
    labeltag15:{
      width:'25%',
      textAlign:'center',
      fontSize:'11px',
     
      borderRight:'1px solid #000000'
    },
    labeltag16:{
    width:'25%',
    textAlign:'center',
    fontSize:'11px',
     
    borderRight:'1px solid #000000'
    
  },
    labeltag17:{
      fontSize:'12px',
      width:'25%',
      textAlign:'center',
     
      borderRight:'1px solid #000000'
    },
    labeltag18:{
      width:'25%',
      textAlign:'center',
      fontSize:'11px',
     
      borderRight:'1px solid #000000'
    },
    labeltag19:{
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000',
      fontSize:'11px',
    },
    labeltag20:{
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000',
      fontSize:'11px',
    },
    labeltag21:{
      fontSize:'12px',
      width:'25%',
      textAlign:'center',
      
     
      borderRight:'1px solid #000000'
    },
    labeltag22:{
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000',
      fontSize:'11px',
    },
    labeltag23:{
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000',
      fontSize:'11px'
    },
    labeltag24:{
      width:'25%',
      textAlign:'center',
      borderRight:'1px solid #000000',
      fontSize:'11px'
    },
    
   
   

  
   


    tablehead1:{
      borderBottom:'1px solid #000000',
      flexDirection:'row',
      // gap:'10px'


    },
    tablehead4:{
      flexDirection:'row',
      borderBottom:'1px solid #000000',

    },
    tablehead2:{
      flexDirection:'row',
      borderBottom:'1px solid #000000',

    },
    tablehead3:{
      flexDirection:'row',
      borderBottom:'1px solid #000000',

    },
    tablehead5:{
      flexDirection:'row',
      borderBottom:'1px solid #000000',

    },
  
  
  });


const PdfzipParticularData = ({addressDetails,particularPdf,organisationdetail,imagename,tripno})=>{
    console.log(tripno,"tri",organisationdetail,"org",particularPdf,'modelapdf',typeof(particularPdf),Array.isArray(particularPdf));
    // const pdfDataArray = Object.values(particularPdf);
    // console.log(pdfDataArray,"modearray")

    // const targetRef = useRef();
    // const {setPdfPrint,pdfPrint} = PdfData()
    // console.log(pdfPrint,"modelprint")

    
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
    //   useEffect(() => {
    //     const fetchData = async () => {
    //         const tripidno = tripno
    //         console.log(tripidno,"tripimagenoo")
    //         try {
    //             const response = await fetch(`${apiUrl}/get-signimageforpdfrendered/${tripidno}`);
    //             if (response.status === 200) {
                 
    //               const data= await response.json()
    //               console.log(data,"tripimageresponsesss")
    //                 // const imageUrl = URL.createObjectURL(await response.blob());
    //                 // console.log(imageUrl,"tripimage")
    //                 setSignImageUrl(data);
    //             } else {
    //                 setSignImageUrl("")
    //             }
    //         } catch (err) {
    //             console.log(err, 'error');
    //         }
    //     };
    
    //     fetchData();
    
    //     return () => {
    //         setSignImageUrl(""); 
    //     };
    // }, [apiUrl, tripno]);
    
//   mapimagefetch
useEffect(()=>{
     const fetchData = async()=>{
        const tripidno = tripno
        try{
            const response = await fetch(`${apiUrl}/getmapimages/${tripidno}`);
            if (response.status === 200) {
                const responseData = await response.blob();
                console.log(responseData,"gp")
                const imageUrl = URL.createObjectURL(responseData);
                console.log(imageUrl,"gppppppp")
                setGMapImageUrl(response);
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
useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await fetch(`${apiUrl}/get-signimageforpdfrendered/${tripno}`);
          if (response.status === 200) {
              const data = await response.json();
              // Check if the image URL is valid
              if (data && data !== "Not valid image extension") {
                  const imageUrl = `${apiUrl}/public/signature_images/${data}`;
                  setSignImageUrl(imageUrl);
              } else {
                  console.error("Invalid image extension or image not found");
                  // Handle invalid image extension or image not found
                  // For example, display a placeholder image or show an error message
              }
          } else {
              console.error("Failed to fetch image:", response.statusText);
              // Handle failed image fetch, show error message or retry mechanism
          }
      } catch (err) {
          console.error("Error fetching image:", err);
          // Handle other errors, show error message or retry mechanism
      }
  };

  fetchData();

  // Cleanup function
  return () => {
      // Perform cleanup if needed
  };
}, [apiUrl, tripno]);




console.log(signimageUrl,"url",organisationimage,GmapimageUrl)

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
        <Text style={styles.text2}> {orgaddress2}</Text>
        <Text style={styles.text2}>{orgaddress3} </Text>
                  </View>
                  <View>
                    <Text>LOG SHEET</Text>
                  </View>
                  <View style={styles.logodiv}>
                    {/* <Image src={Logo} style={styles.logo} /> */}
                    <Image src={`${apiUrl}/public/org_logo/${organisationimage}`} style={styles.logo} />
                  </View>
                </View>
                <View style={styles.gst}>
                  <View>
                    {/* <Text style={styles.text2}>Tel:044-24354247,Mob:9841505689 </Text> */}
                    <Text style={styles.text2}>Tel:{organisationdetails[0].telephone},Mob:{organisationdetails[0].contactPhoneNumber} </Text>

                  </View>
                  <View>
                    {/* <Text style={styles.gstno}>GSTIN:33AALCC0190M1ZK</Text> */}
                    <Text style={styles.gstno}>GSTIN: {organisationdetails[0].gstnumber} {fuel}</Text>

                  </View>

                </View>





                <View style={styles.maintabble}>
               <View style={{  }}>

       <View style={styles.deatilssection}>
          <Text style={styles.labeltag}>Client Name;</Text>
          <Text style={styles.clientName}>{customer}</Text>
       </View>

       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Address:</Text>
          <Text style={styles.clientName}>{address1}, {address3}{'\n'}{address2}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Fuel Type:</Text>
          <Text style={styles.clientName}>{fuel}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Emp.No:</Text>
          <Text style={styles.clientName}>{empno}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Emp.Name:</Text>
          <Text style={styles.clientName}>{guestname}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Client Mobile:</Text>
          <Text style={styles.clientName}>{customermobile}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Drop Address:</Text>
          <Text style={styles.clientName}>dropaddress</Text>
       </View>

       
        </View>



        <View>
        <View style={styles.deatilssection}>
        <Text style={styles.labeltag}>Escort Route:</Text>
          <Text style={styles.clientName}>{''}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Airport Transfer:</Text>
          <Text style={styles.clientName}>{""}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Ccode:</Text>
          <Text style={styles.clientName}>{""}</Text>
       </View>

        </View>



        <View>
        <View style={styles.deatilssection}>
        <Text style={styles.labeltag}>Log No:</Text>
          <Text style={styles.clientName}>{''}</Text>
       </View>
       <View style={styles.deatilssection}>
      
       <Text style={styles.labeltag}>Date:</Text>
          <Text style={styles.clientName}>{""}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Duty Type :</Text>
          <Text style={styles.clientName}>{duty}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Vehicle Type  :</Text>
          <Text style={styles.clientName}>{vehicletype}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Vehicle No:</Text>
          <Text style={styles.clientName}>{vehicleno}</Text>
       </View>
       <View style={styles.deatilssection}>
     
       <Text style={styles.labeltag}>Driver Name :</Text>
          <Text style={styles.clientName}>{drivername}</Text>
       </View>
       <View style={styles.deatilssection}>
     
       <Text style={styles.labeltag}>Driver Mobile:</Text>
          <Text style={styles.clientName}>{drivermobile}</Text>
       </View>
       <View style={styles.deatilssection}>
     
       <Text style={styles.labeltag}>Request No:</Text>
          <Text style={styles.clientName}>{""}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Service City:</Text>
          <Text style={styles.clientName}>{""}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Package :</Text>
          <Text style={styles.clientName}>{""}</Text>
       </View>
       <View style={styles.deatilssection}>
       <Text style={styles.labeltag}>Segment:</Text>
          <Text style={styles.clientName}>{""}</Text>
       </View>
      
       
        </View>
        {/* Include other details as needed */}
      </View>
      
         
      
    
      
  
          
          <View style={styles.remarksection}>
          <Text style={styles.labeltag}>Remarks :</Text>
          <Text style={styles.clientName}>{remark}</Text>

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
            <View  style={styles.labeltag4}>
          <Text>KMS</Text>

            </View>
            {/* <View></View> */}
          </View>

          <View style={styles.tablehead1}>
            <View style={styles.labeltag5}>
          <Text >Closing</Text>
              
            </View>


            <View  style={styles.labeltag6}>
          <Text>dcdvsd</Text>

            </View>



            <View  style={styles.labeltag7}>
            <Text>dcfdfdfffv</Text>

            </View>
            <View  style={styles.labeltag8}>
            <Text>dcdfdvc</Text>

            </View>

          </View>



          <View style={styles.tablehead2}>
            <View style={styles.labeltag9}>
          <Text >Releasing</Text>
              
            </View>


            <View  style={styles.labeltag10}>
          <Text>dcdvsd</Text>

            </View>



            <View  style={styles.labeltag11}>
            <Text>dcfdfdff</Text>

            </View>
            <View  style={styles.labeltag12}>
            <Text>dcdfdvc</Text>

            </View>

          </View>

          <View style={styles.tablehead3}>
            <View style={styles.labeltag13}>
          <Text >Reporting</Text>
              
            </View>


            <View  style={styles.labeltag14}>
          <Text>dcdvsd</Text>

            </View>



            <View  style={styles.labeltag15}>
            <Text>dcfdfdff</Text>

            </View>
            <View  style={styles.labeltag16}>
            <Text>dcdfdvc</Text>

            </View>

          </View>


          <View style={styles.tablehead4}>
            <View style={styles.labeltag17}>
          <Text >Starting</Text>
              
            </View>


            <View  style={styles.labeltag18}>
          <Text>dcdvsd</Text>

            </View>



            <View  style={styles.labeltag19}>
            <Text>dcfdfdff</Text>

            </View>
            <View  style={styles.labeltag20}>
            <Text>dcdfdvc</Text>

            </View>

          </View>
          <View style={styles.tablehead5}>
            <View style={styles.labeltag21}>
          <Text >Starting</Text>
              
            </View>


            <View  style={styles.labeltag22}>
          <Text>dcdvsd</Text>

            </View>



            <View  style={styles.labeltag23}>
            <Text>dcfdfdff</Text>

            </View>
            <View  style={styles.labeltag24}>
            <Text>dcdfdvc</Text>

            </View>

          </View>
         

          </View>


         
{/* </View> */}

          
     
       <View style={styles.signdiv}>
        
                 <Image  
                  // src={signimageUrl}
                  source={{ uri: signimageUrl }}
                  style={{ width: 200, height: 200 }} />
                {/* //  source={{ uri: signimageUrl }}  style={styles.logo1} /> */}
                 {/* <Image src={`${apiUrl}/public/org_logo/${organisationimage}`} style={styles.logo} /> */}
          <Text style={{margin :'0px'}}>Guest Signature</Text>
         
              
                  </View>
        
           
          {/* </View> */}
          </View>
          <View>
             
                {/* <Image  
                
                  src={GmapimageUrl}
                   /> */}
                   <Image
          source={  GmapimageUrl } // Use source prop with the uri of the image
          style={{ width: 200, height: 200 }} // Specify the width and height of the image
        />
          

            </View>




                {/* <View style={styles.taxinvoice}>
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
                </View> */}
              </View>

            </View>

          </View>

        </Page>
      </PDFDocument>
    </>
  )
 

//     return(
//         <>
//       <div>
//             <div style={{display:'flex',flexDirection:'column',width:'784px',padding:20,}}>
//                 <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'50px'}}>
//                     <div className="customerdiv">
//            <h2 className="organisationnametext" style={{ textTransform: 'uppercase' }}>{orgname}</h2>
//            <h2 className="organisationtext">{orgaddress1}</h2>
//            <h2 className="organisationtext">{orgaddress2}</h2>
//            <h2 className="organisationtext">{orgaddress3}</h2>
//            </div>
//            <div className="Taxinvoicediv">
//             <h3  className="Taxinvoicetext">
//                 <span>TAX </span>
//                 <span className="invoice">INVOICE</span>
//                  </h3>
//            </div>
//            <div className="imagediv">
//            <img src={`${apiUrl}/public/org_logo/${organisationimage}`}  className="image" />
//            {/* <h2 className="organisationtext"> GST : {organisationdetails[0].gstnumber}</h2> */}
//            </div>

//            </div>
//            <div className="mobilediv">
//            <h2 className="organisationtext">Tel : {organisationdetails[0]?.telephone} Mob :  {organisationdetails[0]?.contactPhoneNumber}</h2>

//            <h2 className="organisationtext"> GST : {organisationdetails[0]?.gstnumber}</h2>

//            </div>

//            <div style={{display:'flex',gap:30,border:'1.5px solid #000000',padding:10}}>
//             <div className="clientFistDiv">
             
//                <p className="detailstext"><span>Client Name :</span> <span className="clientName">{customer}</span></p>
//                <p className="detailstext"><span>Address :</span><span className="clientName">{address1}, {address3}{'\n'}{address2}</span></p>
//                  <p className="detailstext"><span>Category :</span><span></span></p>
//                  <p className="detailstext"> <span>Fuel Type :</span><span className="clientName">{fuel}</span></p>
//                  <p className="detailstext"> <span>Emp.No :</span><span className="clientName">{empno}</span></p>
//                  <p className="detailstext"><span>Emp.Name :</span ><span className="clientName"> {guestname}</span></p>
//                  <p className="detailstext"><span>Report Add</span><span></span></p>
//                  <p className="detailstext"><span>Client Mobile</span><span className="clientName">{customermobile}</span></p>
//                  <p className="detailstext"><span>Drop Address</span><span></span></p>
//             </div>
//             <div className="clientSecondDiv">
//              <p className="detailstext"><span>Escort Route : </span><span className="clientName">No</span> </p>
//              <p className="detailstext">Airport Transfer : <span>No</span> </p>
//              <p className="detailstext">CCode : <span>No</span> </p>
//             </div>
//             <div>
//               <p className="detailstext">Log No</p>
//               <p className="detailstext">Date</p>
//               <p className="detailstext"><span>Duty Type : </span><span className="clientName">{duty}</span> </p>
//               <p className="detailstext"><span>Vehicle Type : </span><span className="clientName">{vehicletype}</span> </p>
//               <p className="detailstext"><span>Vehicle No : </span><span className="clientName">{vehicleno}</span></p>
//               <p className="detailstext"><span>Driver Name : </span><span className="clientName">{drivername}</span></p>
//               <p className="detailstext">Driver Mobile</p>
//               <p className="detailstext">Request No</p>
//               <p className="detailstext">Service City</p>
//               <p className="detailstext">Package</p>
//               <p className="detailstext">Segment</p>
//             </div>
//            </div>
//            <div className="remarksdiv">
//             <p><span className="remarks">Remarks :</span> <span className="remarksdata">TIDEL PARK TO IBIS HOTEL</span ></p>
//            </div>
//            <div className="tablediv">
//            <div className="table">
//             <table style={{borderTop:'none'}}>
//                 <thead>
//                 <tr>
//                         <th></th>
//                         <th>DATE </th>
//                         <th >HOURS</th>
//                         <th >KMS</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 <tr>
//                     <td>Closing</td>
//                     <td></td>
//                     <td></td>
//                     <td></td>


//                 </tr>
//                 <tr>
//                     <td>Releasing</td>
//                     <td></td>
//                     <td></td>
//                     <td></td>


//                 </tr>
//                 <tr>
//                     <td>Reporting</td>
//                     <td></td>
//                     <td></td>
//                     <td></td>

//                 </tr>
//                 <tr>
//                     <td> Starting </td>
//                     <td></td>
//                     <td></td>
//                     <td></td>

                   
//                 </tr>
//                 <tr>
//                     <td>Total </td>
//                     <td></td>
//                     <td></td>
//                     <td></td>

                   
//                 </tr>
//                 </tbody>
//             </table>
//            </div>
//            <div className="sign" >
//           {signimageUrl !== "" ? 
//           <img className='dialogboximg' src={signimageUrl} alt=" " /> : <div className='dialogboximg' ></div>}
//           <h3 style={{ marginTop: 'auto', marginBottom: '0' }}>Guest Signature</h3>
//            </div>
//            </div>
//            <div>
//             <div className="parkingdiv">
//                 <p>Total Parking</p>
//                 <p>Total Permit</p>
//                 <p>Total Fastag/Toll</p>

//             </div>
//             <div>
//                 {GmapimageUrl !==''?  <img className="mapimage" src={GmapimageUrl} alt='' />:<div></div>}
          

//             </div>
//            </div>
//            <div >
//             <p className="attachtext">Attached Image</p>
//             {attachedImage && Array.isArray(attachedImage) && attachedImage.length && attachedImage!==""> 0 ? 
//   attachedImage.map((image, index) => (
//     <img key={index} src={image} alt='' className="attachimage" />
//   ))
//  : 
//   <div></div>
// }


//            </div>
//            </div>
//            <div className="printdiv">
//            {/* <button  className="print" onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>PRINT</button>
//            {/* <button onClick={handlePopup}className="print">
//                     Cancel
//                   </button> */} 
//                   </div>
           
// </div>
      
//         </>
//     )
}
export default PdfzipParticularData