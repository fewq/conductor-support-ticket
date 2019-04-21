import React from "react";
import { Spinner, Button } from "react-bootstrap";
import ImagePreview from "./ImagePreview";
import { saveAs } from "file-saver";
import JSZip from "jszip";
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
    return <span className="badge badge-pill badge-info"> {obj} </span>;
  });
};

export const renderTopicsShort = topics => {
  return topics.map((obj, i) => {
    return (
      <span className="badge badge-pill badge-dark"> {obj.charAt(0)} </span>
    );
  });
};

export const renderLoading = () => {
  return <Spinner animation="border" variant="warning" />;
};

export const renderStatus = status => {
  switch (status) {
    case "Pending Admin":
      return <span className="badge badge-secondary mr-2"> {status} </span>;

    case "Pending BA":
      return <span className="badge badge-light mr-2"> {status} </span>;

    case "Pending Developers":
      return <span className="badge badge-light mr-2"> {status} </span>;

    case "Pending Client":
      return <span className="badge badge-warning mr-2"> {status} </span>;

    case "Resolved":
      return <span className="badge badge-success mr-2"> {status} </span>;

    case "Deleted":
      return <span className="badge badge-danger mr-2"> {status} </span>;

    default:
      return null;
  }
};

export const renderScreenshots = objects => {
  return (
    <div>
      <h4>
        {" "}
        Screenshots{" "}
        <Button
          variant="outline-warning"
          onClick={() => {
            handleDownload(objects);
          }}
        >
          {" "}
          Download all{" "}
        </Button>{" "}
      </h4>
      <hr className="mt-2 mb-5" />
      <div className="row text-center text-lg-left">
        {objects.map((obj, i) => {
          return (
            <div key={i} className="col-lg-3 col-md-4 col-6">
              <div className="d-block mb-4 h-100">
                <ImagePreview index={i} imgSources={objects} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const renderStatusHistory = objects => {
  return (
    <div>
      <p>Update History</p>
      <table className="table table-striped text-white">
        <thead>
          <tr>
            <th>Date</th>
            <th>Attended By</th>
            <th>Comments</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((obj, i) => (
            <tr>
              <td>{obj.dateOfUpdate}</td>
              <td>{obj.attendedBy}</td>
              <td>{obj.comments}</td>
              <td>
                <p>
                  {renderStatus(obj.prevStatusToClient)} →{" "}
                  {renderStatus(obj.statusToClient)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const handleDownload = objects => {
  var zip = new JSZip();
  var img = zip.folder("images");
  console.log("handling download");
  objects.map((obj, i) => {
    let filename = "screenshot" + i;
    let imgData = obj.replace(/^data:image\/\w+;base64,/, "");
    img.file(filename, imgData, { base64: true });
  });
  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "example.zip");
  });
};
