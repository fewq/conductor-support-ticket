import React from "react";
import Kanban from "./Kanban";

export const kanban = () => <Kanban />;

export const disableEnterButton = event => {
  if (event.target.type !== "textarea") {
    if (event.which === 13) {
      event.preventDefault();
    }
  } else {
    if (event.which === 13) {
      event.value = event.value + "\n";
    }
  }
};

export const convertDateToString = date => {
  let objDate = new Date(date);
  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return objDate.toLocaleDateString("en-US", dateOptions);
};

export const renderTopics = topics => {
  return topics.map((obj, i) => {
    return <span class="badge badge-pill badge-info"> {obj} </span>;
  });
};

export const renderStatus = status => {
  switch(status){
    case "Pending Admin":
      return <span class="badge badge-secondary mr-2"> {status} </span>;
    
    case "Pending BA": 
      return <span class="badge badge-light mr-2"> {status} </span>;
    
    case "Pending Developers":
      return <span class="badge badge-light mr-2"> {status} </span>;
    
    case "Pending Client":
      return <span class="badge badge-warning mr-2"> {status} </span>;

    case "Cancelled":
      return <span class="badge badge-danger mr-2"> {status} </span>;
    
    case "Resolved":
    return <span class="badge badge-success mr-2"> {status} </span>;

    default:
      return null;
  }
}