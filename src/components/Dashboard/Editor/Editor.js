import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdbreact";
import "./Editor.css";
import NavbarPage from "../Navbar/Navbar";
import { connect } from "react-redux";
import htmlToText from "html-to-text";
import jsPDF from "jspdf";

class EditFile extends Component {
  state = {
    textData: this.props.TextResponse
  };

  exportPdf = e => {
    e.preventDefault();
    const input = this.state.textData;
    const text = htmlToText.fromString(input, {
      wordwrap: 130
    });
    var pdf = new jsPDF();
    pdf.setFontSize(10);
    pdf.setFont("times");
    pdf.text(20, 10, text);
    pdf.save("Document.pdf");
  };

  textUpdated = content => {
    this.setState({
      textData: content
    });
  };

  render() {
    return (
      <div>
        <div>
          <NavbarPage />
        </div>
        <MDBContainer>
          <MDBRow>
            <MDBCol size="8" sm="8" lg="8">
              <form onSubmit={this.exportPdf}>
                <div className="E-Container">
                  <Editor
                    apiKey="gvz9qgjqz9ke1r5j2k3exubmbhrywvohg6vtc3jzzf3cbx61"
                    initialValue={this.props.TextResponse}
                    onEditorChange={this.textUpdated}
                    init={{
                      powerpaste_allow_local_images: true,
                      plugins: "save",
                      toolbar:
                        "save | undo redo | bold italic | alignleft aligncenter alignright | code",
                      height: "480"
                    }}
                  />
                  <div className="text-right" style={{ marginTop: 20 }}>
                    <MDBBtn type="submit">Save File</MDBBtn>
                  </div>
                </div>
              </form>
            </MDBCol>
            <MDBCol size="4" sm="4" lg="4">
              <MDBCard style={{ width: "100%", marginTop: 38 }}>
                <MDBCardBody>
                  <MDBCardTitle>Preview an Image</MDBCardTitle>
                  <img
                    src={this.props.displayImage}
                    style={{ width: 300, height: 350 }}
                    className="img-fluid"
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    TextResponse: state.text.textData,
    displayImage: state.text.image
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFile);
