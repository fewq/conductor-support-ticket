import React from 'react';

export const disableEnterButton = (event) => {
  if (event.target.type !== 'textarea') {
    if (event.which === 13 ) {
      event.preventDefault();
    }
  }
  else {
    if (event.which === 13 ) {
      event.value = event.value + "\n";
    }
  }

};

export const convertDateToString = date => {
  let objDate = new Date(date);
  var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return objDate.toLocaleDateString("en-US", dateOptions);
}

export const renderTopics = topics => {
  return topics.map( (obj, i) => {
    return <span class="badge badge-pill badge-info"> {obj} </span>
});
}


// haven't get it to reflect the true icon yet
export const getFilePreview = (file) => {
  const filename = file.name;
  const extension = String(filename.split('.').pop()).toLowerCase();
  var result = "fa-file-o";

  var icon_classes = {
    // Media
    "png": "fa-file-image-o",
    "jpg": "fa-file-image-o",
    "jpeg": "fa-file-image-o",
    "gif": "fa-file-image-o",
    "mp3": "fa-file-audio-o",
    "mp4": "fa-file-audio-o",
    "vid": "fa-file-video-o",
    "avi": "fa-file-video-o",

    // Documents
    "pdf": "fa-file-pdf-o",
    "doc": "fa-file-word-o",
    "xlsx": "fa-file-excel-o",
    "csv": "fa-file-excel-o",
    "ppt": "fa-file-powerpoint-o",
    "txt": "fa-file-text-o",
    "html": "fa-file-code-o",
    "json": "fa-file-code-o",
    // Archives
    "gzip": "fa-file-archive-o",
    "zip": "fa-file-archive-o",
  };

  for (let key in icon_classes) {
    if (extension === key) {
      console.log("found extension match.")
      result = icon_classes[key];
      console.log(result);
    }
  }

  return result + " img-thumbnail mt-2";
}