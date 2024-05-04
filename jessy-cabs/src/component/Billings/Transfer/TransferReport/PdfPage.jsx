import React,{useEffect,} from 'react';
import PdfContent from './PdfContent';
const PdfPage = ({invdata,invoiceno,invoiceDate,groupTripid,customeraddress,customer,organisationdetail,imagedata})=>{
  return(
<PdfContent invdata={invdata} invoiceno={invoiceno} invoiceDate={invoiceDate} groupTripid={groupTripid} customeraddress={customeraddress} customer={customer} organisationdetails={organisationdetail} images={imagedata} />
  )
}
export default PdfPage;
