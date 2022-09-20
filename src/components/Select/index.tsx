/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

interface Props {
  placeholder?: string;
  setOption: (option: any) => void;
  error?: boolean;
  initialValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SimpleSelect: React.FC<Props> = ({
  placeholder,
  options,
  setOption,
  error,
  initialValue,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOption(event.target.value as string);
    setValue(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.formControl} error={error}>
        <InputLabel id="demo-simple-select-error-label">
          {placeholder}
        </InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          value={value || initialValue}
          onChange={handleChange}
        >
          {options.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Selecione uma opção</FormHelperText>
      </FormControl>
    </div>
  );
};

export default SimpleSelect;
