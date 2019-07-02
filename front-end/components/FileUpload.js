import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormFileUploadField = (props) => {
    const [state, setState] = React.useState({
        file: "",
        folder: props.openfolder.hasOwnProperty('id') ? props.openfolder.id : "",
        error: false,
        errorText: "",
        isUploading: false
    });
    // let textInput = React.createRef();
    console.log(props.ref)
    function handleChange(event) {
        console.log(event)

    }
    const {inpuId} =  props;
    return (
        <div>
            <TextField
                inputRef={props.ref}
                error={state.error}
                required
                helperText={state.errorText}
                onChange={handleChange} autoFocus
                id={props.inpuId} label="Upload File"
                inputProps={{'multiple': true}}
                // onClick={props.clikHandler()}
                type="file" fullWidth/>
        </div>
    );
};
export default FormFileUploadField;