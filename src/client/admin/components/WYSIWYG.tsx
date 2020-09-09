import ReactQuill from "react-quill";
import ReactQuillImageUploader, {
  saveImageSrc,
} from "react-quill-image-uploader";
import React from "react";

declare global {
  interface Event {
    clientX: any;
    clientY: any;
  }
}

class WYSIWYG extends React.Component<IWYSIWYGProps, IWYSIWYGState> {
  constructor(props) {
    super(props);
    this.state = {
      quill: {},
    };
  }
  modules = {
    toolbar: {
      container: [["bold", "italic", "underline", "strike"], ["image"]],
      handlers: {
        image: () => {
          const { clientX, clientY } = window.event;
          const position = { x: clientX, y: clientY }; // position the plugin to show
          this.ReactQuillImageUploaderRef.toggle(position); // show or hide the plugin
          // toggle() is also ok
          // this.ReactQuillImageUploaderRef.toggle()
        },
      },
    },
  };
  ReactQuillImageUploaderRef: any;
  quill: any;
  quillRef: any;
  componentDidMount() {
    this.quill = this.quillRef.getEditor();
    this.setState({ quill: this.quill });

    // add new one to history
    // from version 0.0.1
    // ReactQuillImageUploader.saveImageSrc("https://iph.href.lu/100x100")
    // from version 0.0.4
    ReactQuillImageUploader.saveImage({
      name: "demo.jpg",
      src: "https://iph.href.lu/100x100",
    });

    // remove all and add new one by the history api

    // es6
    // import {setHistory} from 'react-quill-image-uploader'
    // setHistory([{
    //   name: "demo.jpg",
    //   src: "https://iph.href.lu/100x100"
    // }])

    // es5
    // ReactQuillImageUploader.setHistory([{
    //   name: "demo.jpg",
    //   src: "https://iph.href.lu/100x100"
    // }])
  }

  uploadImageCallBack = (file, base64) => {
    // check file.size
    // check file type by file.name

    return new Promise((resolve, reject) => {
      // submit file to server
      let src = "https://iph.href.lu/200x200"; // demo image src
      if (base64) {
        src = base64;
      }
      // upload img thing
      const uploadSuccess = true;
      console.log(src);
      console.log(file);
      if (uploadSuccess) {
        // insert img into editor manually
        this.ReactQuillImageUploaderRef.insertImg(src);

        // return data to save to plugin history
        resolve({
          data: {
            name: file.name || "",
            link: src,
          },
        });
      } else if (!uploadSuccess) {
        // return resolve({status: 'fail'}) or reject(), plugin will warn the user to upload again, will not save in history
        // resolve({
        //   status: 'fail',
        // })
        // resolve()
        // or
        console.log("failed");

        setTimeout(() => {
          return reject();
        }, 3 * 1000);
      } else {
        // return nothing, meaning that do not save anything to history or upload fail panel
        resolve();
      }
    });
  };
  render() {
    const { quill = {} } = this.state;
    const {
      input: { onChange },
    } = this.props;
    return (
      <div>
        <ReactQuill
          ref={(el) => {
            this.quillRef = el;
          }}
          placeholder=""
          modules={this.modules}
          onChange={() => {
            onChange(quill.root.innerHTML);
          }}
          onChangeSelection={() => {
            onChange(quill.root.innerHTML);
          }}
        />
        <ReactQuillImageUploader
          ref={(el) => {
            this.ReactQuillImageUploaderRef = el;
          }}
          isShowUploadFail={true} // default true, uopload fail history is hidden when false
          isShowHistory={true} // default true, history is hidden when false
          quill={this.state.quill}
          uploadCallback={this.uploadImageCallBack}
        />
      </div>
    );
  }
}

export interface IWYSIWYGProps {
  input?: any;
}

export interface IWYSIWYGState {
  quill: any;
}

export default WYSIWYG;
