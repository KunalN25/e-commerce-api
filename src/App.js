import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// import Products from './components/Products/Products'
// Default exports taken from the components folder where they are defined separately
// so as to not make the code messy here
import {Products, Navbar, Cart, Checkout} from './components'
import { commerce } from './lib/commerce'
import  useStyles from './styles.js'


const App = () => {
    
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})    //Cart
    const [order,setOrder]= useState({})    //Final order
    const [error_msg, setError_msg] = useState('')
    const [error_obj, setError_obj] = useState({})
    const [refreshed, setRefreshed] = useState(false)   //Set whether cart is refreshed

    // Fetch the products
    const fetch = async () => {
        const {data} = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const addTOCart = async (productId, count) => {
        const res=await commerce.cart.add(productId,count)
        // Update the cart after adding
        setCart(res.cart)
    }
    // Increase or decrease product count using API
    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const response = await commerce.cart.update(lineItemId, { quantity });
    
        setCart(response.cart);
      };
    // Remove product  using API
    
      const handleRemoveFromCart = async (lineItemId) => {
          console.log("Remove frm cart")
        const response = await commerce.cart.remove(lineItemId);
    
        setCart(response.cart);
      };

      const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
    
        setCart(response.cart);
      };

      const refreshCart = async () => {
        //   After the order is complete, the cart is refreshed
          const newCart= await commerce.cart.refresh()
        //   console.log(newCart)
          setCart(newCart)
          setRefreshed(true)
      }

      const handleCaptureCheckout = async (checkoutToken, order) => {
            try {
                console.log('Checkout complete')
                 commerce.checkout.capture(checkoutToken, order)
                                    .then((response) => {
                                        console.log(response)
                                        setOrder(response)   
                
                                        refreshCart()
                                    },(err)=>{
                                        console.log(err)
                                        setError_obj(err.data.error)
                                    })
                
            } catch (error) {
                // setError_msg(error.data.error.message)
                // setError_obj(error.data.error)

                // console.log(error_msg)
            }
      }
    useEffect(()=>{
        fetch()
        fetchCart()
    },[])
    // console.log('Products  ', products)    

    return (
        <Router>
            <div >
                {/* Navbar of the app gets the number of items to display*/}
                <Navbar count={cart.total_items}/>
                <Switch>
                    <Route default exact path='/'>
                        <Products products={products} addToCart={addTOCart}/>

                    </Route>
                    <Route exact path='/cart'>
                        <Cart 
                            cart={cart} 
                            onUpdateCartQty={handleUpdateCartQty} 
                            onRemoveFromCart={handleRemoveFromCart} 
                            handleEmptyCart={handleEmptyCart}
                        />

                    </Route>
                    <Route exact path='/checkout'>
                        {/* Pass the cart to Checkout component to generate token for the API */}
                        <Checkout 
                            cart={cart} 
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error_msg = {error_msg}
                            error={error_obj}
                            setError = {setError_obj}
                            refreshed={refreshed}
                            ></Checkout>

                    </Route>



                    <Route exact path='/feature'>
                        <div style={{marginTop: '100px' }} >
                            <h1>Additional Features (Tentative)</h1> 
                            Login and auth, editing profile, wishlist, <br/>
                            product review(opt), search products, say out of stock
                        </div>  

                    </Route>
                </Switch>
                
            </div>
        </Router>
        
    )
}

export default App
