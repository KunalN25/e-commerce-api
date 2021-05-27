import React from 'react';
import { Typography, List, ListItem, ListItemText,Divider } from '@material-ui/core';

const Review = ({ checkoutToken }) => (
  <>
    <Typography variant="h6" gutterBottom>Order summary</Typography>

    <List disablePadding>
        {/* Loop over all the products in the cart */}
        {checkoutToken.live.line_items.map((product) => (
                
            <ListItem style={{ padding: '10px 0' }} key={product.name}>
                {/*Name and Quantity of the product */}
                <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                {/* Price of the product(s) */}
                <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
            </ListItem>
        ))}
             <hr/>
             {/* <Divider variant='middle'/> */}
            <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
            </ListItem>
    </List>
  </>
);

export default Review;