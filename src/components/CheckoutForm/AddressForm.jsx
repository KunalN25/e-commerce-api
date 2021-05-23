import React,{useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
// Default export
import FormInput from './CustomTextField';
// This is the form for shipping address
const AddressForm = ({ checkoutToken,next }) => {
    const methods = useForm()
    
    // States for list of data and the individual data
   {


   /*{}
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const countries=Object.entries(shippingCountries).map(([code,name]) => ({ id: code, label: name })) 
    const subdivisions=Object.entries(shippingSubdivisions).map(
                                            ([code, name]) => ({ id: code, label: name }))
    const options=shippingOptions.map(
                        (sO) => ({ id: sO.id, 
                                   label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
    // Get all shipping countries from the API
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
        setShippingCountries(countries);
        // This gives an array with keys of the countries i.e. EU,IN,US,etc and the first 
        // element of it
        setShippingCountry(Object.keys(countries)[0]);
      };
      
    // Get all subdivisions frm the API
      const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
      };

    // Get all shipping options from the API
      const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    
        setShippingOptions(options);
        setShippingOption(options[0].id);
      };
      useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
      },[]) */
    }
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods}>
                {/* data object contains data for all specific fields */}
                <form onSubmit={methods.handleSubmit((data) => next(data))}>
                <Grid container spacing={3}>
                    {/* Required, name of the field and label */}
                    <FormInput name="firstName" label="First name" />
                    <FormInput name="lastName" label="Last name" />
                    <FormInput name="address1" label="Address line 1" />
                    <FormInput name="email" label="Email" />
                    <FormInput name="city" label="City" />
                    <FormInput name="zip" label="Zip / Postal code" />
                    
                    {/* Shipping fields Not included */}
                    <>
                    {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} 
                                fullWidth 
                                onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>    
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubdivision} 
                                fullWidth 
                                onChange={(e) => setShippingSubdivision(e.target.value)}>
                                    {/* Map over object entries 
                            {subdivisions.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} 
                                fullWidth 
                                onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                    </Grid> */}
                    </>
                </Grid>  
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} to='/cart' variant="outlined" to="/cart">Back to Cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
