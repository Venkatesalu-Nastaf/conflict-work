import React from 'react';
import './Paymentinvoice.css';

const Invoice = () => {
    return (
        <body>
            <div id="invoiceholder">
                <div id="invoice" className="effect2">

                    <div id="invoice-top">
                        <div className="logo"><img src="https://www.almonature.com/wp-content/uploads/2018/01/logo_footer_v2.png" alt="Logo" /></div>
                        <div className="title">
                            <h1>Invoice #<span className="invoiceVal invoice_num">tst-inv-23</span></h1>
                            <p>Invoice Date: <span id="invoice_date">01 Feb 2018</span><br />
                                GL Date: <span id="gl_date">23 Feb 2018</span>
                            </p>
                        </div>
                    </div>

                    <div id="invoice-mid">
                        <div id="message">
                            <h2>Hello Andrea De Asmundis,</h2>
                            <p>An invoice with invoice number #<span id="invoice_num">tst-inv-23</span> is created for <span id="supplier_name">TESI S.P.A.</span> which is 100% matched with PO and is waiting for your approval. <p>Click here</p> to login to view the invoice.</p>
                        </div>
                        <div className="cta-group mobile-btn-group">
                            <p className="btn-primary">Approve</p>
                            <p className="btn-default">Reject</p>
                        </div>
                        <div className="clearfix">
                            <div className="col-left">
                                <div className="clientlogo"><img src="https://cdn3.iconfinder.com/data/icons/daily-sales/512/Sale-card-address-512.png" alt="Sup" /></div>
                                <div className="clientinfo">
                                    <h2 id="supplier">TESI S.P.A.</h2>
                                    <p><span id="address">VIA SAVIGLIANO, 48</span><br /><span id="city">RORETO DI CHERASCO</span><br /><span id="country">IT</span> - <span id="zip">12062</span><br /><span id="tax_num">555-555-5555</span><br /></p>
                                </div>
                            </div>
                            <div className="col-right">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td><span>Invoice Total</span><label id="invoice_total">61.2</label></td>
                                            <td><span>Currency</span><label id="currency">EUR</label></td>
                                        </tr>
                                        <tr>
                                            <td><span>Payment Term</span><label id="payment_term">60 gg DFFM</label></td>
                                            <td><span>Invoice Type</span><label id="invoice_type">EXP REP INV</label></td>
                                        </tr>
                                        <tr><td colSpan="2"><span>Note</span>#<label id="note">None</label></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="invoice-bot">

                        <div id="table">
                            <table className="table-main">
                                <thead>
                                    <tr className="tabletitle">
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Taxable Amount</th>
                                        <th>Tax Code</th>
                                        <th>%</th>
                                        <th>Tax Amount</th>
                                        <th>AWT</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tr className="list-item">
                                    <td data-label="Type" className="tableitem">ITEM</td>
                                    <td data-label="Description" className="tableitem">Servizio EDI + Traffico mese di novembre 2017</td>
                                    <td data-label="Quantity" className="tableitem">46.6</td>
                                    <td data-label="Unit Price" className="tableitem">1</td>
                                    <td data-label="Taxable Amount" className="tableitem">46.6</td>
                                    <td data-label="Tax Code" className="tableitem">DP20</td>
                                    <td data-label="%" className="tableitem">20</td>
                                    <td data-label="Tax Amount" className="tableitem">9.32</td>
                                    <td data-label="AWT" className="tableitem">None</td>
                                    <td data-label="Total" className="tableitem">55.92</td>
                                </tr>
                                <tr className="list-item">
                                    <td data-label="Type" className="tableitem">ITEM</td>
                                    <td data-label="Description" className="tableitem">Traffico mese di novembre 2017 FRESSNAPF TIERNAHRUNGS GMBH riadd. Almo DE</td>
                                    <td data-label="Quantity" className="tableitem">4.4</td>
                                    <td data-label="Unit Price" className="tableitem">1</td>
                                    <td data-label="Taxable Amount" className="tableitem">46.6</td>
                                    <td data-label="Tax Code" className="tableitem">DP20</td>
                                    <td data-label="%" className="tableitem">20</td>
                                    <td data-label="Tax Amount" className="tableitem">9.32</td>
                                    <td data-label="AWT" className="tableitem">None</td>
                                    <td data-label="Total" className="tableitem">55.92</td>
                                </tr>
                                <tr className="list-item total-row">
                                    <th colSpan="9" className="tableitem">Grand Total</th>
                                    <td data-label="Grand Total" className="tableitem">111.84</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <footer>

                    </footer>
                </div>
            </div>
        </body>
    );
};

export default Invoice;
