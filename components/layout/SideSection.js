import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function SideSection() {
  return (
    <Grid
      item
      xs={false}
      sm={false}
      md={3}
      sx={{
        backgroundColor: "#4D776D",
      }}
    >
<Box>
    <Typography variant="h2" component="h1" fontWeight={600} fontSize={50} sx={{color:"white" , mt:5, ml:2}} >
        Welcome
    </Typography>
    {/*<Typography variant="body1" fontWeight={300} fontSize={20} sx={{ ml:2, color:"white"}}>*/}
    {/*    Digital Credentials Drive Your Business Forward*/}
    {/*</Typography>*/}
    <Typography variant="body1" fontWeight={400} fontSize={20} sx={{color:"white", mt:3, ml:2}} >
        Learning Institutions
    </Typography>
    <Typography variant="body1" fontWeight={300} fontSize={17} sx={{ ml:2, color:"white"}}>
        Digital credentials translate training into career success for earners, driving demand and revenue for your training and development programs.
    </Typography>
    <Typography variant="body1" fontWeight={400} fontSize={20} sx={{color:"white", mt:3, ml:2}} >
        Employers
    </Typography>
    <Typography variant="body1" fontWeight={300} fontSize={17} sx={{ ml:2, color:"white"}}>
        Attract, engage, and retain talent effectively with verified digital credentials. Make data-driven human capital <br/>decisions using trusted credentials and skills.
    </Typography>
    <Typography variant="body1" fontWeight={400} fontSize={20} sx={{color:"white", ml:2, mt:3}} >
    Earners
</Typography>
    <Typography variant="body1" fontWeight={300} fontSize={17} sx={{ ml:2, color:"white"}}>
        Bring value to your members with credentials connected to relevant career opportunities. Save time and money <br/>switching from paper certificates to digital badges.
    </Typography>
</Box>
        <Box sx={{ ml: -3, maxWidth: 100 }}>
            <img src="../../../register.png" style={{ maxWidth: "800px" }} />
        </Box>
    </Grid>
  );
}
