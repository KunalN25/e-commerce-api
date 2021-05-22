import React from 'react'
import { Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom'
// Cart Component
const Cart = ({ cart,  onUpdateCartQty, onRemoveFromCart, handleEmptyCart }) => {
    
    
    const classes=useStyles()
    if(!cart.line_items) return "Loading"

    // Function to return empty card
    const EmptyCart = () => (
        <Typography variant='subtitle1'>
            <p>You have no items in the shopping cart</p>
            <Link to='/' className={classes.link}>Start adding some !!</Link>
        </Typography>
    )
    // Render the items of the filled cart
    const FilledCart = () => (
        <>
            <Grid container  spacing={3}>
                {cart.line_items.map((product)=> (
                    // Parameters for mobile devices and different screen sizes
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        {/* Cart Item */}
                        <CartItem 
                            product={product}  
                            onUpdateCartQty={onUpdateCartQty} 
                            onRemoveFromCart={onRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: { cart.subtotal.formatted_with_symbol }
                </Typography>
                <div>
                    {/* Empty Cart Button */}
                    <Button 
                            className={classes.emptyBtn} 
                            size='large' 
                            type='button' 
                            variant='contained' 
                            color='secondary'
                            onClick={handleEmptyCart} >
                            
                            Empty Cart
                    </Button>
                    <Button className={classes.checkoutBtn} size='large' type='button' 
                            variant='contained' color='primary'>
                            
                            Checkout
                    </Button>
                </div>
            </div>
        </>
        
    )
    return (
        <div>
            <Container>
                <div className={classes.toolbar}/>
                {/* gutterbottom adds some padding below */}
                <Typography className={classes.title} variant='h3' gutterBottom>
                    Shopping Cart
                </Typography>

                {cart.line_items.length === 0 ? <EmptyCart/> : <FilledCart/>}
                

            </Container>
        </div>
    )
}

export default Cart
