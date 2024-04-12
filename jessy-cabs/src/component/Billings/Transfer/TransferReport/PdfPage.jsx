import React,{useEffect,} from 'react';
import PdfContent from './PdfContent';
const PdfPage = ({invdata,invoiceno,invoiceDate,groupTripid,customeraddress,customer})=>{
  return(
<PdfContent invdata={invdata} invoiceno={invoiceno} invoiceDate={invoiceDate} groupTripid={groupTripid} customeraddress={customeraddress} customer={customer} />
  )
}
export default PdfPage;
