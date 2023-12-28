import { Box, Container, Grid, ThemeProvider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import ScrollToTop from '../../../helpers/components/ScrollTop';
import products from '../../../configs/Products';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import HeaderForm from '../../../helpers/components/HeaderForm';
import MessagePurchaseCompleted from '../../../helpers/components/MessagePurchaseCompleted';
import useFunnelTheme from '../../../helpers/components/hooks/useFunnelTheme';
import Formulario from '../../../helpers/components/Formulario';

const Funnel1 = ({ product }) => {
    const { getFunnelTheme } = useFunnelTheme();
    const [showMessagePurchaseCompleted, setShowMessagePurchaseCompleted] =
        useState(false);

    return (
        <ThemeProvider theme={getFunnelTheme(product)}>
        <Grid container justifyContent="center" sx={{backgroundColor:"primary.main"}}>
            <Grid2 item xs={12} sm={8} md={3} sx={{ textAlign: "center" }}>
                <ScrollToTop />
                <Box>
                    <Box>
                        {
                            products[product].contents.title[
                            localStorage.getItem("fnl")
                            ]
                        }
                    </Box>
                    <Box>
                        {
                            products[product].contents.kit_milagros[
                            localStorage.getItem("fnl")
                            ]
                        }
                    </Box>
                </Box>
                <Container>
                    <Box
                        sx={{
                            border: 3,
                            backgroundColor: "white",
                            borderColor: "primary.main",
                            borderRadius: 5,
                            p: 0.5,
                            boxShadow: 8,
                        }}
                    >
                        <HeaderForm product={product} />
                        <Formulario
                            product={product}
                            onPurchase={() =>
                                setShowMessagePurchaseCompleted(true)
                            }
                        />
                        <MessagePurchaseCompleted
                            open={showMessagePurchaseCompleted}
                            onClose={() =>
                                setShowMessagePurchaseCompleted(false)
                            }
                            product={product}
                        />
                    </Box>
                </Container>
            </Grid2>
        </Grid>
        </ThemeProvider>
    )
}

export default Funnel1