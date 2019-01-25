import React, { Component } from 'react';
import FileUpload from '@material-ui/icons/FileUpload';

class FileUploadUtil extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return(
            <div>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button}>
                    檔案上傳
                    <FileUpload className={classes.rightIcon} />
                </Button>
            </label>
            </div>
        )
      }
}

export default FileUploadUtil;