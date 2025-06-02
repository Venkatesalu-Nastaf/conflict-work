import React from 'react';
import PdfContent from './PdfContent';
const PdfPage = ({logo,invdata,invoiceno,invoiceDate,groupTripid,customeraddress,customer,organisationdetail,imagedata, commonStateAdress,billingGroupDetails,customerData,stationData})=>{
  return(
<PdfContent logo={logo} invdata={invdata} invoiceno={invoiceno} invoiceDate={invoiceDate} groupTripid={groupTripid} customeraddress={customeraddress} customer={customer} organisationdetails={organisationdetail} customStateDetails ={commonStateAdress}  billingGroupDetails={billingGroupDetails} customerData={customerData} stationData={stationData}  />
  )
}
export default PdfPage;
