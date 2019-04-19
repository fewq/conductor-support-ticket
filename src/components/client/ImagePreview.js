import {Modal, Button, Image} from 'react-bootstrap';
import React, { Component } from "react";

export default class ImagePreview extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleDownload = this.handleDownload.bind(this);
  
      this.state = {
        show: false,
        imgSource: props.src,
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    handleDownload() {
      console.log("attempting download.");
      this.handleClose();
    }
  
    render() {
      return (
        <div>
          <Image thumbnail src={this.state.imgSource} onClick={this.handleShow} />
  
          <Modal show={this.state.show} onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
            <Modal.Header closeButton>
              <Modal.Title>Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image fluid src={this.state.imgSource} />
            </Modal.Body>
            <Modal.Footer>
              <a href={this.state.imgSource} download="screenshot.png">
                <Button variant="primary" onClick={this.handleDownload}>
                  Download
                </Button>
              </a>
            </Modal.Footer>
          </Modal>
          </div>
      );
    }
  }