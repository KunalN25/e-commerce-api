import React from 'react';
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';

export const CustomSelectField = ({ name, label, required, options }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        required={required}
        render={(props) => (
          <Select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            fullWidth
          >
            {options.map((item) => (
              <MenuItem value={item.value}>{item.name}</MenuItem>
            ))}
          </Select>
        )}
      />
    </Grid>
  );
};


// The usage (in this case I did it with cities, but it can be used with anything)
const cityOptions = [
  { name: 'São Paulo', value: 'sao paulo' },
  { name: 'Rio de Janeiro', value: 'rio de janeiro' },
  { name: 'Brasília', value: 'brasilia' },
  { name: 'Jundiai', value: 'jundiai' },
];

<CustomSelectField
  required
  name="selectCity"
  label="Cidade"
  options={cityOptions}
/>