import { useMediaQuery } from "@mui/material";

/**
 * Define valores para cada tamaño de pantalla y retorna el valor de acuerdo a la pantalla actual
 *
 * @param      {Object}  values  Objeto con los valores de las pantallas {xs:?, sm:?, md:?, lg:?, xl:?}
 * @return     {<type>}  Valor de acuerdo al tamaño actual de la pantalla
 */
const useValueByBreakpoints = (values) => {
    const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
    const isSm = useMediaQuery((theme) => theme.breakpoints.only("sm"));
    const isMd = useMediaQuery((theme) => theme.breakpoints.only("md"));
    const isLg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
    const isXl = useMediaQuery((theme) => theme.breakpoints.only("xl"));

    //console.log({ isXs, isSm, isMd, isLg, isXl });

    //Se ordenan los valores en un array, de tamaño de pantalla menor a mayor
    const indexValues = [
        values.xs !== null && typeof values.xs !== "undefined"
            ? values.xs
            : null,
        values.sm !== null && typeof values.sm !== "undefined"
            ? values.sm
            : null,
        values.md !== null && typeof values.md !== "undefined"
            ? values.md
            : null,
        values.lg !== null && typeof values.lg !== "undefined"
            ? values.lg
            : null,
        values.xl !== null && typeof values.xl !== "undefined"
            ? values.xl
            : null,
    ];

    /**
     * Calcula el primer valor anterior válido de la lista de valores
     *
     * @param      {number}  Indice del desde el cual se inicia la busqueda
     */
    const getPreviousValue = (index) => {
        let new_value = null;

        for (let i = index - 1; i >= 0; i--) {
            if (indexValues[i] !== null) {
                new_value = indexValues[i];
                break;
            }
        }

        return new_value;
    };

    /**
     * Calcula el primer valor siguiente válido de la lista de valores
     *
     * @param      {number}  Indice del desde el cual se inicia la busqueda
     */
    const getNextValue = (index) => {
        let new_value = null;

        for (let i = index + 1; i <= 4; i++) {
            if (indexValues[i] !== null) {
                new_value = indexValues[i];
                break;
            }
        }

        return new_value;
    };

    const getCurrentValue = () => {
        if (isXs) {
            if (getPreviousValue(1) !== null) {
                return getPreviousValue(1);
            } else {
                return getNextValue(0);
            }
        }
        if (isSm) {
            if (getPreviousValue(2) !== null) {
                return getPreviousValue(2);
            } else {
                return getNextValue(1);
            }
        }
        if (isMd) {
            if (getPreviousValue(3) !== null) {
                return getPreviousValue(3);
            } else {
                return getNextValue(2);
            }
        }
        if (isLg) {
            if (getPreviousValue(4) !== null) {
                return getPreviousValue(4);
            } else {
                return getNextValue(3);
            }
        }
        if (isXl) {
            if (getPreviousValue(5) !== null) {
                return getPreviousValue(5);
            } else {
                return getNextValue(4);
            }
        }
    };

    return getCurrentValue();
};

export default useValueByBreakpoints;
