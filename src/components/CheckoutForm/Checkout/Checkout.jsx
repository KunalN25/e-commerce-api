// Form for checkout
import React, {useState, useEffect} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps= ['Shipping Address', 'Payment details']
const Checkout = ({cart, onCaptureCheckout, order, error, refreshed, setError}) => {
    const classes=useStyles()
    const [chktoken,setChktoken] = useState(null)
    const [activeStep,setActiveStep] = useState(0);
    const [isFinish, setIsFinish] = useState(false);
    const history=useHistory();
    // Contains the shipping data of the customer
    const [shippingData, setShippingData] = useState({})
    // console.log('Chcekout', steps.length)

    useEffect(()=>{
        // When the checkout is done, generate a checkout token
        const genToken = async ()=>{
            try{
                // Generate the token wrt the particular cart
                const token=await commerce.checkout.generateToken(cart.id,{type: 'cart'})
                // console.log(token)
                setChktoken(token)
            }catch(err){
                // console.log(error)
                history.push('/')
            }
        }

        genToken()
    },[cart])   // Invoke the generate token every time the cart changes
    // Increment the steps in the stepper
    const nextStep = () => {
        // console.log(error)
        // if(Object.keys(error).length === 0)
            setActiveStep((prev) => prev+1) 
    }
    const backStep = () => setActiveStep((prev) => prev-1) 

    // This function is called from the AddressForm i.e. the child component
    const next = (data) => {
        setShippingData(data)
        // console.log(data)
        nextStep()  // 
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinish(true)
        }, 3000);
    }

    // If order exists then only show the confirmation
    
    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
           {/* Back to the home page*/}
           { refreshed && 
                <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
            }
          
        </>
        // If the timeout occurs
      )  : (
        // Show progress spinner until order completes
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
     
        // Show error message if error
      if (Object.keys(error).length !== 0) {
      // if(error){
        console.log(error)
        setError({})
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error.message}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        )
      }
 

    // const Confirmation = () => (
    //   <>
    //     Confirmation
    //   </>
    // )
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
                        onCaptureCheckout={onCaptureCheckout} 
                        timeout={timeout}
                        />); //Payment form second step
   

    return (
        <>
            {/* Baseline */}
            <CssBaseline />
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
