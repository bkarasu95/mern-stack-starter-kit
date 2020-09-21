import React from "react";

export default class ImageUploader extends React.Component<
  IImageUploaderProps,
  IImageUploaderState
> {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files)
    for (let i = 0; i < this.fileObj[0].length; i++) {
        this.fileArray.push(URL.createObjectURL(this.fileObj[0][i])); // image preview
    }
  }

  render() {
    const {
      input: { onChange },
    } = this.props;
    return (
      <>
        <div className="form-group multi-preview">
          {(this.fileArray || []).map((url, key) => (
            <img src={url} alt="..." key={key} />
          ))}
        </div>

        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              this.uploadMultipleFiles(e);
              onChange(e.target.files);
            }}
            multiple
          />
        </div>
      </>
    );
  }
}

interface IImageUploaderProps {
  input?: any;
}

interface IImageUploaderState {
}
