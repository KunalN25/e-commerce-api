// Form for checkout
import React, {useState, useEffect} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps= ['Shipping Address', 'Payment details']
const Checkout = ({cart}) => {
    const classes=useStyles()
    const [chktoken,setChktoken] = useState(null)
    const [activeStep,setActiveStep] = useState(0)
    // Contains the shipping data of the customer
    const [shippingData, setShippingData] = useState({})
    // console.log('Chcekout', steps.length)
    useEffect(()=>{
        // When the checkout is done, generate a checkout token
        const genToken = async ()=>{
            try{
                // Generate the token wrt the particular cart
                const token=await commerce.checkout.generateToken(cart.id,{type: 'cart'})
                console.log(token)
                setChktoken(token)
            }catch(err){

            }
        }

        genToken()
    },[cart])
    // Invoke the generate token every time the cart changes

    const nextStep = () => setActiveStep((prev) => prev+1) 
    const backStep = () => setActiveStep((prev) => prev-1) 

    // This function is called from the AddressForm i.e. the child component
    const next = (data) => {
        setShippingData(data)

        nextStep()
    }
    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )
    // Two different forms in steps
    const Form = () => (activeStep === 0
        ? <AddressForm  checkoutToken={chktoken} 
                        nextStep={nextStep} 
                        // setShippingData={setShippingData} 
                        next={next}   //Address form is first step
                        />
        : <PaymentForm  checkoutToken={chktoken} 
                        nextStep={nextStep} 
                        backStep={backStep} 
                        shippingData={shippingData} 
                        // onCaptureCheckout={onCaptureCheckout} 
                        />); //Payment form second step
   

    return (
        <>
            {/* <CssBaseline /> */}
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    {/* Stepper to highlight steps in the form filling */}
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                   
                    {/* The last step is confirmation */}
                    {/* In the second part of the operator where the form is rendered, we will 
                        only render the form if the checkout token exists because the address
                        form depends on the checkout token and hence would give an error if the 
                        checkout token does not exist */}
                    {activeStep === steps.length ? <Confirmation /> : chktoken  && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
