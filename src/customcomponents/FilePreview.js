import React from "react";

const FilePreview = ({ previewUrl, fileType }) => {
  console.log(previewUrl, "previewUrl" );
  console.log(fileType, "fileType" );
  if (!previewUrl) {
    return (
      <img
        src="https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png"
        alt="No Preview Available"
        width="300"
        style={{
          backgroundColor: "#f4f4f4",
          borderRadius: "4px",
          objectFit: "contain",
        }}
      />
    );
  }

//code starts new 
const isYouTubeUrl = (url) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const renderYouTubePreview = (url) => {
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
return (
    <iframe
      src={embedUrl}
      title="YouTube Preview"
      width="300"
      height="200"
      style={{
        backgroundColor: "#f4f4f4",
        borderRadius: "4px",
        border: "none",
      }}
      allowFullScreen
    ></iframe>
  );
}

  //codes ends new
  switch (fileType) {
    case "pdf":
    case "svg":
    case "image":
    case "png":
    case "jpg":
      return (
        <img
          src={previewUrl}
          alt="Preview"
          width="300"
          style={{ backgroundColor: "#f4f4f4", borderRadius: "4px" }}
        />
      );
    case "video":
    case "mp4":
      return (
        <video
          src={previewUrl}
          controls
          width="300"
          style={{ backgroundColor: "#f4f4f4", borderRadius: "4px" }}
        />
      );
    case "audio":
    case "mp3":
      return (
        <audio
          src={previewUrl}
          controls
          style={{ backgroundColor: "#f4f4f4", borderRadius: "4px" }}
        />
      );
  case "text":
  return (
    <iframe
      src={previewUrl}
      title="Website Preview"
      width="300"
      height="200"
      style={{
        backgroundColor: "#f4f4f4",
        borderRadius: "4px",
        border: "none",
      }}
       sandbox="allow-same-origin allow-scripts"
       allowpaymentrequest={true}
       loading={false}
    ></iframe>
  );
    default:
      //start new code
      if (isYouTubeUrl(previewUrl)) {
        return renderYouTubePreview(previewUrl);
      }
      //end new code
      return (
        <iframe
          src={previewUrl}
          title="Preview"
          width="300"
          height="200"
          style={{
            backgroundColor: "#f4f4f4",
            borderRadius: "4px",
            border: "none",
          }}
        ></iframe>
      );
  }
};

export default FilePreview;
