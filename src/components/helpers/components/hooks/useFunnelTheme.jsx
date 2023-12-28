import { createTheme, responsiveFontSizes } from "@mui/material";
import getTheme from "../../../configs/Theme";

const useFunnelTheme = () => {
    const getFunnelTheme = (product) => {
        let theme;
        switch (product) {
            case "milagros":
                theme = createTheme(getTheme("pink"));
                break;
            default:
                theme = createTheme(getTheme("pink"));
                break;
        }

        theme = responsiveFontSizes(theme);
        return theme;
    };

    return {
        getFunnelTheme,
    };
};

export default useFunnelTheme;