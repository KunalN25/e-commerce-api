import React from 'react'
import { TextField, Grid} from '@material-ui/core'
import { useFormContext, Controller} from  'react-hook-form'
const CustomTextField = ({ name, label}) => {
    const { control }=useFormContext()
    const isError=false
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                // as={TextField}
                name={name}   //Props
                control={control}
                error={isError}
                render={({field})=> (
                    <TextField
                        fullWidth
                        label={label}
                        required
                        />
                )}
                // label={label}     //Props
                // fullWidth
                // required
            />
      </Grid>
    )
}

export default CustomTextField
