import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

// Contains the stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)


const PaymentForm = ({ checkoutToken,shippingData, nextStep, backStep, onCaptureCheckout, timeout }) => {
    
    // console.log('chec public key ', process.env.REACT_APP_CHEC_PUBLIC_KEY)
    
    // console.log('striple key ', process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    // Handle the submit of the payment info
    const handleSubmit = async (event, elements, stripe) => {
        
        // Prevent the website to refresh after clicking
        event.preventDefault();
        
        if (!stripe || !elements) return;
    
        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = 
                await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        // Check error
        if (error) {
          console.log('[error]', error);
        } else {
          console.log(shippingData)

            // Object containing all the details required for the order payment
          const orderData = {
            //   All the items selected
            line_items: checkoutToken.live.line_items,

            customer: { 
                        firstname: shippingData.firstName, 
                        lastname: shippingData.lastName, 
                        email: shippingData.email 
                      },
            shipping: { 
                        name: 'Primary', 
                        street: shippingData.address1, 
                        town_city: shippingData.city,
                        county_state: 'MH',
                        postal_zip_code: shippingData.zip,
                        country: 'IN'
                      },
            fulfillment: { shipping_method: 'ship_nPEVlNpNzoa7dM' },
            payment: {
              gateway: 'stripe',
              stripe: {
                payment_method_id: paymentMethod.id,
              },
            },
          };

        //   Give the order
          onCaptureCheckout(checkoutToken.id, orderData);
          timeout();
          nextStep();
        }
      };
    return (
        <>
        {/* General list of everything purchased */}
            <Review checkoutToken={checkoutToken}/>
            {/* <Divider/> */}
            <Typography variant='h6' gutterbottom style={{ margin: '20px 0' }}>
                Payment Method  
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)} >
                            {/* Stripe card element */}
                            <CardElement  />
                            <br/>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='outlined' onClick={backStep} >Back</Button>
                                <Button type='submit' variant='outlined' disabled={!stripe} color='primary'>
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    ) }
                </ElementsConsumer>
            </Elements>
           
        </>
    )
}

export default PaymentForm
