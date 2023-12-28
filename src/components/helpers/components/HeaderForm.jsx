import React from "react";
import { Box } from "@mui/material";

const HeaderForm = ({ product }) => {

    const headerForm = () => {
        switch (product) {
            case "milagros":
                return headerMilagros;
        }
    };
    return (
        <Box sx={{ my: 1 }}>
            <h1>Completa tus datos</h1>
        </Box>
    );
};

export default HeaderForm;
