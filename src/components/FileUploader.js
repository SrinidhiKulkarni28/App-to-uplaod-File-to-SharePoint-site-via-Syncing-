import React from 'react'
import axios from 'axios'
import {useCallback} from 'react'
import Button from "@material-ui/core/Button";
import { DropzoneDialog } from "material-ui-dropzone";
import {  Box } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';

const initialState = {
    open: false,
    files: [],
    selectedFile: null,
    uploadLinks: [],
    showlinks: false
  };



  const theme = createMuiTheme({
    overrides: {
      MuiPaper: {
        root:{
          borderBlockColor:"#282c34"
        }
      },
      MuiButton: {
        label: {
         
          color:"white",
          '&:hover': 
          {
            color: "#007db8"
          }
        },
        root:{
          backgroundColor:"grey",
          '&:hover':{
            backgroundColor:"red",
            color: "#007db8"
          }
        }
      },
      MuiDropzoneArea: {
        icon: {
          marginTop: "10%",
          backgroundColor: "",
          color: "#007db8"
        },
        root: {
          color:"#007db8",
          
      
        },
        successAlert: {
          backgroundColor: "yellow",
          color: "#000"
        },
      },
      MuiDialogActions: {
        root: {
          color:"#007db8"
        }
      }
    
    }
  });

function FileUploader(props) {

    
    const [state, setState] = React.useState(initialState);

    const handleOpen = () => {
      setState({
        ...state,
        open: true
      });
    };
    
    const onDrop = useCallback(
      (acceptedFiles) => {
        console.log("the accepted files are:",acceptedFiles)
      },
      [],
    )

    const handleClose = () => {
        setState({
          ...state,
          open: false
        });
      };
    
      const handleSave = files => {
        setState({
          ...state,
          files:files[0],
          open: false,
         
        });
        {console.log("the files isss",state.files)}
        let form_data = new FormData();
        // let files["name"] = files.File.name
        for(let i=0;i<files.length;i++)
        {
        form_data.append('FILES_'+i,files[i]);
              
        
        }
        let url = 'http://localhost:8000/fileuploaderapp/upload/'
        axios.post(url,form_data, {
          headers: {
            Accept: 'application/json, text/plain, */*',
          }
        })
        .then(res=>{console.log("the response is",res);props.getfiles(res.data)})
        .catch(err => console.log(err))
        
       
        // form_data.append("Folder",props.tooltip)
        // var data = null
        // let method = 'POST'
        // console.log("the files is:",files)
        // console.log("the form data:",form_data)
        // console.log("the folder type is:",props.tooltip)
      
  
        
  
        // let url = 'http://localhost:8000/api/upload_document/'
        // axios.post(url,form_data, {
        //   headers: {
        //     Accept: 'application/json, text/plain, */*',
        //   }
        // })
        //     .then(res => { 
        //       console.log(res.data);
        //       setState({
        //         ...state,
        //         uploadLinks: res.data,
        //         open: false
        //       });
              
        //       props.uploadlist(res.data,props.tooltip)
              
              
              
        //     })
        //     .catch(err => console.log(err))
          
      };

      return (
        <div>
      {/* <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        Add Image
      </Button> */}


        <Box > 
            <Button style={{ position:'absolute',background: "#007db8",marginTop: '0.5%',marginLeft: '-6%' }} variant="contained" color="primary"  className="upload button" onClick={handleOpen}>
              <Tooltip title={props.tooltip} placement="top"><CloudUploadIcon></CloudUploadIcon></Tooltip>
            </Button>
        </Box> 
      <MuiThemeProvider theme={theme}>
      <DropzoneDialog
        onDrop={onDrop}
        open={state.open}
        onSave={handleSave}
        acceptedFiles={['.rtf,.docx','image/jpeg','application/x-soffice','image/png','image/jpg','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/docx','application/rtf','application/x-rtf','text/richtext','application/doc','application/pdf','text/plain','application/msword','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.wordprocessingml.template','text/rtf']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        cancelButtonText={"cancel"}
        submitButtonText={"Submit"}
        showFileNamesInPreview={true}
        dialogTitle={"Attach Files to Upload"}
        dropzoneText={"   "}
      />

     
      </MuiThemeProvider>
    </div>
    )
}

export default FileUploader
