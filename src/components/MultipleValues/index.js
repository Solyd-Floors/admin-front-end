/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags(props) {
  const classes = useStyles();
    console.log({FFFF:props.value})
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={props.options}
        getOptionLabel={(option) => option.show}
        value={props.value}
        onChange={props.onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Tile sizes"
          />
        )}
      />
    </div>
  );
}