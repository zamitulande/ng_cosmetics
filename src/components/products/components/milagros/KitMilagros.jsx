import React from 'react'
import useValueByBreakpoints from '../../../helpers/components/hooks/UseValueByBreakpoints';
import { Box } from '@mui/material';
import kit_milagros from '../../../../assets/products/milagros/kit_milagros.jpeg'

const KitMilagros = () => {
    const price_image_width = useValueByBreakpoints({
        xs: "100%",
        sm: "80%",
        md: "60%",
        lg: "60%",
        xl: "60%",
    });

    const img_styles = {
        width: price_image_width,
    };
    return (
        <Box sx={{ my: 2 }}>
            <img src={kit_milagros} alt="antes" width="250px" style={img_styles} />
        </Box>
    )
}

export default KitMilagros