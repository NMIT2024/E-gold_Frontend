import React, { Component } from "react";

class Fileupload extends Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <div className="form-group" style={{ display: "inline-flex" }}>
          <input
            type="file"
            className="form-control"
            onChange={this.uploadMultipleFiles}
            multiple
          />{" "}
          &nbsp;&nbsp;
          <button type="button" className="loginBtn" onClick={this.uploadFiles}>
            Upload
          </button>
        </div>
        <br />
        <br />
        <div className="form-group multi-preview">
          {(this.fileArray || []).map((url) => (
            <>
              <img src={url} alt="..." style={{ width: "100%" }} />
              <br />
              <br />
            </>
          ))}
        </div>
      </form>
    );
  }
}

export default Fileupload;
