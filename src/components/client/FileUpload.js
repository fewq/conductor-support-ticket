import React, {useState, useMemo, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const FileUpload = props => {
	const {setFieldValue, onChange, onBlur, value} = props;
  const {
    getRootProps, 
    getInputProps, 
    open,
    isDragActive,
    isDragAccept,
    isDragReject, 
    acceptedFiles} = useDropzone({
      accept: "image/*",
      noKeyboard: true,
      noClick: true,
      onDrop: acceptedFiles => {
        setFieldValue("attachments",value.concat(acceptedFiles.map(file => 
          Object.assign(file, {preview: URL.createObjectURL(file)})
        )));
        // setFieldValue("attachments", files);
        onChange("attachments", value);
        onBlur("attachments", true);
	  	}
	  });

	const thumbs = value.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={file.name}
        />
        <p>{file.name}</p>
      </div>
    </div>
  ));

  
  useEffect(() => () => {
    // Revoke the data uris to avoid memory leaks
    value.forEach(file => URL.revokeObjectURL(file.preview));
  }, [value]);
  
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);
	
  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()}>
        </input>
        <div style={thumbsContainer}>
          {thumbs}
        </div>
        <p>Drag 'n' drop some files here, or click to select files. </p>
        <button type="button" className="btn btn-outline-primary" onClick={open}>
          Open File Dialog
        </button>
      </div>
      
    </section>
  );
}

export default FileUpload;