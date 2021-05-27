import React from 'react'
import { TextField, Grid} from '@material-ui/core'
import { useFormContext, Controller} from  'react-hook-form'
const FormInput = ({ name, label, value}) => {
    const { control }=useFormContext()
    const isError=false
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                // as={TextField}
                name={name}   //Props
                control={control}
                error={isError}
                defaultValue=""

                render={({field})=> (
                    <TextField
                        {...field}
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

export default FormInput
