// API for products, cart and other e commerce applications
import Commerce from '@chec/commerce.js'
// import dotenv from 'dotenv'
export const commerce=new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true)
// export const commerce=new Commerce('pk_277643b14d12d4340b5ae90c2b818964a795a48e5837f', true)
