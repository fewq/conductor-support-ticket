import {Modal, Button, Image} from 'react-bootstrap';
import React, { Component } from "react";

export default class ImagePreview extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.changeToNextImage = this.changeToNextImage.bind(this);
      this.changeToPrevImage = this.changeToPrevImage.bind(this);
  
      this.state = {
        show: false,
        imgSources: props.imgSources,
        numberOfImages: props.imgSources.length,
        index: props.index,
        modalIndex: props.index,
        src: props.imgSources[props.index],
        modalSrc: props.imgSources[props.index]
      };

    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    changeToPrevImage() {
      let newIndex = (this.state.modalIndex - 1)%(this.state.numberOfImages);
      this.setState({modalIndex: newIndex});
      this.setState({modalSrc: this.state.imgSources[newIndex]});
    }

    changeToNextImage() {
      let newIndex = (this.state.modalIndex + 1)%(this.state.numberOfImages);
      this.setState({modalIndex: newIndex});
      this.setState({modalSrc: this.state.imgSources[newIndex]});
    }
  
    render() {
      return (
        <div>
          <Image thumbnail src={this.state.src} href="" onClick={this.handleShow} />
          <Modal show={this.state.show} onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
            <Modal.Header closeButton>
              <Modal.Title>Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <a href={this.state.modalSrc} download="screenshot.png">
                <Image fluid src={this.state.modalSrc} />
              </a>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.changeToPrevImage}>
                ←
              </Button>
              <Button variant="secondary" onClick={this.changeToNextImage}>
                →
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
      );
    }
  }