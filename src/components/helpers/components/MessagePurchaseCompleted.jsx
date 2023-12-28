import { Backdrop, Box, Button } from "@mui/material";
import React from "react";
import ContentPurchaseCompleted from "./ContentPurchaseCompleted";

const MessagePurchaseCompleted = ({ open, onClose, product }) => {
    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClose={onClose}
        >
            <Box p={2}>
                <Box
                    textAlign="center"
                    p={2}
                    sx={{ bgcolor: "white", borderRadius: "0.5rem" }}
                >
                    <ContentPurchaseCompleted product={product} />
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Box>
        </Backdrop>
    );
};

export default MessagePurchaseCompleted;
