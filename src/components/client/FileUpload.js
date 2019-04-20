import React, { useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  width: 450
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "table-cell",
  height: "auto",
  width: "100%",
  verticalAlign: "middle"
};

const getBase64 = file => {
  return new Promise(function(resolve) {
    var reader = new FileReader();
    reader.onloadend = event => {
      resolve(reader);
    };
    reader.readAsDataURL(file);
  });
};

const FileUpload = props => {
  const { setFieldValue, onChange, onBlur, value } = props;
  const maxSize = 500000; // limit to 0.5MB per file

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject,
    rejectedFiles,
    acceptedFiles
  } = useDropzone({
    accept: "image/*",
    noKeyboard: true,
    noClick: true,
    minSize: 0,
    maxSize: maxSize,
    onDrop: acceptedFiles => {
      acceptedFiles.map(async file => {
        if (file.size < maxSize) {
          let reader = await getBase64(file);
          let bufferValue = reader.result;
          setFieldValue(
            "files",
            value.concat(
              Object.assign(
                file,
                { preview: URL.createObjectURL(file) },
                { buffer: bufferValue }
              )
            )
          );
        }
      });
    }
  });

  const thumbs = value.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
        <p>{file.name}</p>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Revoke the data uris to avoid memory leaks
      value.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [value]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div style={thumbsContainer}>{thumbs}</div>
        {!isDragActive &&
          "Click the button below or drop a file to upload. File Size Limit: 1mb."}
        {isDragActive && !isDragReject && "File Type Ok."}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
        <br />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={open}
        >
          Upload
        </button>
      </div>
    </section>
  );
};

export default FileUpload;
