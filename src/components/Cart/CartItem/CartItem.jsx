import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core'
import useStyles from './styles'

// Each item in the cart
const CartItem = ({product, onUpdateCartQty, onRemoveFromCart}) => {
    const classes=useStyles()

    // Update the cart i.e increase or decrease product counts
    const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);
// Remove products from the cart
    const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
    return (
        <Card className='cart-item'>
            <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    {/* For text in material UI */}
                    <Typography variant='h5'>
                        {product.name}
                    </Typography>
                    <Typography variant='h6'>
                        {product.line_total.formatted_with_symbol}
                    </Typography>
                </div>
                {/* <Typography dangerouslySetInnerHTML={{__html: product.description}} 
                            variant="body2" color='textSecondary'/> */}
            
                
            </CardContent>
            <CardActions  className={classes.cardActions}>
               
                <div className={classes.buttons}>
                    {/* Decrease and increase product count buttons */}
                    <Button type='button' 
                            size='small'  
                            onClick={() => handleUpdateCartQty(product.id, product.quantity - 1)}>
                        -
                    </Button>
                    {/* Display product quantity */}
                    <Typography>{product.quantity} </Typography> 
                    <Button 
                            type='button' 
                            size='small' 
                            onClick={() => handleUpdateCartQty(product.id, product.quantity + 1)}>
                        +
                    </Button>

                </div>
                <Button variant='contained' type='button' color='secondary'
                        onClick={()=> onRemoveFromCart(product.id) }>Remove</Button>


            </CardActions>

        </Card>
    )
}

export default CartItem
