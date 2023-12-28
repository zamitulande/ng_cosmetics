import React from 'react'
import useValueByBreakpoints from "../../../helpers/components/hooks/UseValueByBreakpoints"
import { Box } from '@mui/material';
import titulo from '../../../../assets/products/milagros/titulo-milagros.png'
import paga from '../../../../assets/products/milagros/paga-casa.png'
import domicilio from '../../../../assets/products/milagros/domicilio.png'

const Title = () => {
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
      <img src={titulo} alt="antes" width="250px" style={img_styles} />
      <img src={paga} alt="antes" width="150px" style={img_styles} />
      <img src={domicilio} alt="antes" width="50px" style={img_styles} />
    </Box>
  )
}

export default Title