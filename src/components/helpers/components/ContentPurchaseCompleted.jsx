import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Paper, Typography } from "@mui/material";
import RelatedProductList from "./RelatedProductList";
import products from "../../configs/Products";

const ContentPurchaseCompleted = ({ product }) => {
    return (
        <Box textAlign="center">
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: "6rem" }} />
            <Typography variant="h2">
                <Typography variant="span">En un </Typography>
                <Typography variant="span" highlight={true}>
                    momento uno{" "}
                </Typography>
                <Typography variant="span">de nuestros </Typography>
                <Typography variant="span" highlight={true}>
                    asesores{" "}
                </Typography>
                <Typography variant="span">
                    se comunicara{" "}
                </Typography>
                <Typography variant="span" highlight={true}>
                    Contigo.{" "}
                </Typography>
            </Typography>
            {products[product].related.length ? (
                <Paper elevation={2} sx={{ p: 2, textAlign: "left" }}>
                    <Typography>
                        Cuida tu cabello{" "}
                        con estos productos.
                    </Typography>
                    <RelatedProductList product={product} />
                </Paper>
            ) : null}
        </Box>
    );
};

export default ContentPurchaseCompleted;
