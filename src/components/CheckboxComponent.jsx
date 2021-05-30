import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const CheckboxComponent = ({ changeCheckbox }) => {

    return (
      <div className="checkbox">
        <FormControlLabel
        control={<Checkbox onChange={changeCheckbox} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}/>}
        label="Чувствительность к регистру"
      />
      </div> 
    )
}
