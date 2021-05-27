import React from 'react'
import {Grid} from '@material-ui/core'
import ProductItem from './ProductItem/ProductItem'
import useStyles from './styles.js'
// const prds=[
//     {
//         id:1000,
//         name:'mobile',
//         price:300,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
//     {
//         id:1001,
//         name:'laptop',
//         price:500,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'


//     },
//     {
//         id:1002,
//         name:'computer',
//         price:750,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
//     {
//         id:1003,
//         name:'headphone',
//         price:175,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
//     {
//         id:1004,
//         name:'headphone',
//         price:23,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
//     {
//         id:1005,
//         name:'mouse',
//         price:300,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
//     {
//         id:1006,
//         name:'keyboard',
//         price:500,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'


//     },
//     {
//         id:1007,
//         name:'printer',
//         price:750,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
//     {
//         id:1008,
//         name:'fax',
//         price:175,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
//     {
//         id:1009,
//         name:'speaker',
//         price:23,
//         imageURL: 'https://cdn1.vectorstock.com/i/1000x1000/75/50/pixel-computer-logo-icon-design-vector-22627550.jpg'

//     },
    
//     ]

const Products = ({products, addToCart}) => {

    const classes=useStyles()
    // console.log('Prd from products.jsx ',typeof(products))
    // console.log('Prd  ',typeof(prds))
    console.log(products)

    return (
        <main className={classes.content}>
            {/* Empty div to add height */}
            <div className={classes.toolbar}/>
            {/* Products in a grid */}
            <Grid container justify='center' spacing={4}>
                {products.map((product)=> (
                    // Parameters for mobile devices and different screen sizes
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductItem product={product} addToCart={addToCart} />
                    </Grid>
                ))}
            </Grid>
            
            



        </main>
    )
}

export default Products
