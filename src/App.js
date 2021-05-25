import logo from './logo.svg';
import './App.css';
import FileUploader from './components/FileUploader'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import axios from 'axios'
import React from 'react';
function App() {

  const [files,setfiles]= React.useState([])
  const getUploadedFiles=(Files)=>{
        console.log("the ress is",Files)
        Files.map(x=>setfiles(fileold => [...fileold,x]))
      }


    const handleClicking = (x) => { console.log("clicking initiated")
      var filename= ""
      {console.log("passed param is:",x.target.outerText)
      filename = x.target.outerText}
      axios({
        url: "http://localhost:8000/fileuploaderapp/upload?filename="+filename,
        method: 'GET',
        responseType: 'blob', // Important
      }).then((response) => {
        var fileDownload = require('js-file-download');
        fileDownload(response.data, filename);
      });      
      
    }

  

  const handleDelete = (chipToDelete) => {
    console.log("reaching here",chipToDelete)
    setfiles((chips) => chips.filter((chip) => chip.name !== chipToDelete.name));
        axios.delete("http://localhost:8000/fileuploaderapp/upload?filename="+chipToDelete.name)
        .then(res => {console.log("hence result",res.data)})
        .catch(err=>{console.log(err)})

  }

  return (
    <div className="App">

      <div style={{display:'inline'}}>
      <div style={{position:'relative',marginTop:'0px',paddingLeft:'10px'}}> <FileUploader getfiles = {getUploadedFiles}></FileUploader></div>

      <div>
        <h6>Files Uploaded:</h6>
        {console.log("the files called is",files)}
        {files.map(x =>       
                              <Chip label={ x.name}
                              onClick={(e)=>{handleClicking(e)}}
                              onDelete={()=>handleDelete(x)} color="primary" />
                        )}
        
      </div>
      </div>
      {console.log("files are",files)}
    </div>
  );
}

export default App;
