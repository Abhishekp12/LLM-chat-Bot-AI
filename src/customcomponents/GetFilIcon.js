import React from 'react';
import { Typography,  InputAdornment, IconButton,} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
const GetFilIcon = ({file=null ,setFile=null}) => {
    const getFileIcon = () => {
        if (!file || !file.type) return <DescriptionIcon />;

        const fileType = file.type;
      
        if (fileType.startsWith('image/')) {
          return <ImageIcon />;
        } else if (fileType.startsWith('audio/')) {
          return <AudiotrackIcon />;
        } else if (fileType.startsWith('video/')) {
          return <VideocamIcon />;
        } else if (fileType === 'application/pdf') {
          return <DescriptionIcon />; // Icon for PDF files
        } else {
          return <DescriptionIcon />; // Default icon for other file types
        }
    };


  return (
    <>
    {file && (

                <InputAdornment position="end">
                  {getFileIcon()}
                  <Typography variant="body2" ml={1}>
                    {file.name} 
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setFile(null)}
                    edge="end"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
                // </Box>
              )}
    </>
  )
}

export default GetFilIcon
