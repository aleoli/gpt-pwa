import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div style={{
      width: '100%',
      textAlign: 'center',
      marginTop: '20px',
      marginBottom: '20px',
    }}>
      <CircularProgress />
    </div>
  )
}

export default Loading;
