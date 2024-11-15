import React,{useEffect,} from 'react';
import PdfContent from './PdfContent';
const PdfPage = ({logo,invdata,invoiceno,invoiceDate,groupTripid,customeraddress,customer,organisationdetail,imagedata, commonStateAdress,billingGroupDetails})=>{
  return(
<PdfContent logo={logo} invdata={invdata} invoiceno={invoiceno} invoiceDate={invoiceDate} groupTripid={groupTripid} customeraddress={customeraddress} customer={customer} organisationdetails={organisationdetail} images={imagedata} customStateDetails ={commonStateAdress}  billingGroupDetails={billingGroupDetails} />
  )
}
export default PdfPage;
