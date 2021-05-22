import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import useStyles from './styles'

// Each product item
const ProductItem = ({ product , addToCart }) => {
    const classes=useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.media.source} title={product.name}></CardMedia>
                <CardContent>
                    <div className={classes.cardContent}>
                        {/* For text in material UI */}
                        <Typography variant='h5' gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant='h5' gutterBottom>
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{__html: product.description}} 
                                variant="body2" color='textSecondary'/>
                   
                    
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    {/* Icon Button to add the product to cart */}
                    {/* Set the product count as 1 while adding it */}
                    <IconButton aria-label="Add to Cart" onClick={() => addToCart(product.id, 1) }>
                        <AddShoppingCart/>
                    </IconButton>

                </CardActions>

            </Card>
        </div>
    )
}

export default ProductItem
