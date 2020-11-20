import React, { useState } from 'react';
import axios from 'axios';
 
const Flights = (props) => {
    const [purchaseError, setPurchaseError] = useState();
    const [saveCardError, setSaveCardError] = useState();
    const [token, setToken] = useState();

    const purchaseHandler = (flight, method) => {
        const spreedlyExpress = global.SpreedlyExpress;
        spreedlyExpress.init("Stf2sjJUxF1Ys1Vkjmaw3pDciVa", {
            "amount": flight.price,
            "company_name": "Spreedly Airlines",
            "sidebar_top_description": "Best flights since 2006",
            "sidebar_bottom_description": "Your order total today",
            "submit_label": "Purchase Flight",
            "full_name": "First Last"
        },
        {
            "email": "customer@gmail.com"
        });
        spreedlyExpress.openView();
        spreedlyExpress.onPaymentMethod((token, paymentMethod) => {
            const url = method === 'purchase' ? "http://localhost:3004/api/purchase" : "http://localhost:3004/api/deliver";
            const data = method === 'purchase' ? {
                token,
                amount: flight.price * 100,
                currencyCode: "USD"
            } : {
                token,
                flight: {
                    price: flight.price,
                    number: flight.number,
                    from: flight.from,
                    to: flight.to
                }
            }
            setToken(token);
            console.log('data', data);
            axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                    if(response.status !== 200) {
                        setPurchaseError('Failed to make a purchase. Please check your data and try again.');
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    setPurchaseError('Failed to make a purchase.');
                }
            );
        });
    }

    const saveCardHandler = () => {
        const url = "http://localhost:3004/api/retain";
        console.log('token', token);
        const data = {
            token
        }
        axios.put(url, data)
            .then(response => {
                console.log(response.data);
                if(response.status !== 200) {
                    setSaveCardError('Failed to save card data. Please check your data and try again.');
                }
            })           
            .catch(error => {
                console.log('error', error);
                setSaveCardError('Failed to save card data.');
            }
        );
        setToken('');
    }

    return (  
        <> 
            <div className="card" style={{ width: '80%', margin: 'auto'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Flight Number</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Price, USD</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.flights.map(item => (
                        <tr key={item.number}>
                            <td>{item.number}</td>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td>{item.price}</td>
                            <td>
                                <button value={item.price} className="btn btn-info" onClick={() => purchaseHandler(item, 'purchase')}>BUY</button>
                            </td>
                            <td>
                                <button value={item.price} className="btn btn-info" onClick={() => purchaseHandler(item, 'deliver')}>BUY WITH EXPEDIA</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            {<p style={{ color: 'red', margin: 'auto'}}>{purchaseError}</p>}
            <div style={{width: '18rem', margin: 'auto', padding: '20px'}}>
                <button className="btn btn-primary" onClick={saveCardHandler} disabled={!token}>
                    SAVE CREDIT CARD
                </button>
                {<p style={{ color: 'red', margin: 'auto'}}>{saveCardError}</p>}
            </div>
        </>
    )
};
 
export default Flights;