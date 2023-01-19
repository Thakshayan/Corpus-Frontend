import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"

const FormBar = ({label,value}) => {
    return ( 
        <FormControl
                sx={{ m:2, width:'90%' }}
                variant="outlined"
                fullWidth
            >
                <InputLabel htmlFor="outlined-adornment-password">
                    {label}
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type="text"
                    value={value}
                    label="Password"
                    disabled
                />
            </FormControl>
     );
}
 
export default FormBar;