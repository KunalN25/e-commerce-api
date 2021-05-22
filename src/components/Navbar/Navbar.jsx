import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import useStyles from './styles'
import  {Link, useLocation} from 'react-router-dom'
// Navigation Bar
// For mobile navigation too
const Navbar = ({ count }) => {
    const classes=useStyles();
    const location=useLocation();
    console.log('Location path  ', location.pathname)
    return (
        <>
            <AppBar position='fixed' color='inherit' className={classes.appBar}>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title}>
                        {/* <img src='' className={classes.image} alt='Electron' height='25px'  /> */}
                        Electron
                    </Typography>
                    {/* <div className={classes.grow}/> */}
                    <div className={classes.button}>
                        <Link to='/cart'></Link>
                        {/* If the path name is on home page, that is we are not on home(product)
                             page then don't show the cart button */}
                        {location.pathname === '/' && (
                            <div className={classes.button}>
                                <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                                    {/* No of items in badge content */}
                                    <Badge badgeContent={count} color='secondary'>
                                        <ShoppingCart/>
                                    </Badge>
                                </IconButton> 
                            </div>
                              )
                        }

                    </div>
                </Toolbar>
            </AppBar>   
        </>
    )
}

export default Navbar
