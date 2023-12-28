import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const BackdropLoading = ({ open, text }) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <Box
                textAlign="center"
                sx={{ bgcolor: "#FFF", p: 2, borderRadius: "0.5rem" }}
            >
                <CircularProgress color="primary" />

                {text && (
                    <Typography color="primary" display="block">
                        {text}
                    </Typography>
                )}
            </Box>
        </Backdrop>
    );
};

export default BackdropLoading;
