import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import products from '../../configs/Products';
import useValidations from './hooks/UseValidations';
import anime from 'animejs';
import BackdropLoading from "./BackdropLoading"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Place } from '@mui/icons-material';


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Formulario = ({ product, onPurchase, onChangeData }) => {
    const [productPresentation, setProductPresentation] = useState(
        products[product].contents.default_presentation
    );
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [stringData, setStringData] = useState("");
    const [loading, setLoading] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const { isCellPhone, minLength } = useValidations();
    let query = useQuery();


    const isDisabled = () => {
        return (
            !name ||
            !minLength(name, 7) ||
            !contactNumber ||
            !isCellPhone(contactNumber) ||
            ((!address || !neighborhood || !minLength(neighborhood, 3)))
        );
    };

    const resetForm = () => {
        setName("");
        setContactNumber("");
        setAddress("");
        setNeighborhood("");
    };

    useEffect(() => {
        anime({
            targets: "#btn_buy",
            scale: [0.95, 1.05],
            direction: "alternate",
            easing: "easeOutBack",
            loop: true,
        });
    }, []);

    useEffect(() => {
        if (typeof onChangeData === "function") {
            onChangeData(stringData);
        }
    }, [stringData]);

    useEffect(() => {
        if (name || contactNumber || address) {
            setStringData(
                JSON.stringify({
                    name,
                    cellphone: contactNumber,
                    address,
                    neighborhood,
                })
            );
        } else {
            setStringData("");
        }
    }, [
        name,
        contactNumber,
        address,
        neighborhood,
    ]);

    const sendData = () => {
        setLoading(true);

        // Envío de eventos
        const sendEvents = () => {
            if (window.location.hostname !== "localhost") {
                addEvent(
                    products[product].route_name +
                    "_" +
                    localStorage.getItem("fnl"),
                    "buy"
                );
            }
        };

        if (!isDisabled()) {
            const slackFields = [
                {
                    title: "Producto",
                    value: products[product].name +
                        " " +
                        products[product].contents.presentations[productPresentation].description
                            .toString()
                            .toLowerCase(),
                    short: false,
                },
                {
                    title: "Cliente",
                    value: name,
                    short: false,
                },
                {
                    title: "Teléfono",
                    value: contactNumber,
                    short: false,
                },
                {
                    title: "Dirección",
                    value: address,
                    short: false,
                },
                {
                    title: "Barrio",
                    value: neighborhood,
                    short: false,
                },
            ];

            const encodeMessage = encodeURIComponent(products[product].contents.whatsapp_message);
            const confirmation_message_url =
                "https://wa.me/57" +
                contactNumber +
                `?text=${encodeMessage}`+"\n" + "\n" + 
                "Tengo interes en:" + "\n" +  
                products[product].contents.presentations[
                    productPresentation
                ].description + "\n" + "\n" + 
                "Mis datos son:" + "\n" + "\n" +
                name + "\n" +
                address + "\n" + "barrio " + neighborhood + "\n" +
                contactNumber

            slackFields.push({
                title: "Url de confirmación",
                value: confirmation_message_url,
                short: false,
            });
            fetch('/api/new-order', {
                method: "POST",
                body: JSON.stringify({
                    to: `whatsapp:+573177250502`,
                    body: confirmation_message_url
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then((data) => {
                console.log(data)
                setLoading(false);
                if (data.ok) {
                    sendEvents();
                    resetForm();
                    if (typeof onPurchase === "function") {
                        onPurchase();
                    }
                }
            });

        }
    };


    /**
    * Añade eventos de registro o confirmación y abre modal de confirmación de compra
    *
    * @param Event e
    */
    const startConfirmation = (e) => {
        e.preventDefault();

        if (window.location.hostname !== "localhost") {
            addEvent(
                products[product].route_name +
                "_" +
                localStorage.getItem("fnl"),
                "in_confirmation"
            );

            if (query.has("fbclid")) {
                if (
                    products[product].pixel &&
                    products[product].pixel[localStorage.getItem("fnl")]
                ) {
                    window.fbq(
                        "init",
                        products[product].pixel[localStorage.getItem("fnl")]
                    );
                    window.fbq("track", "CompleteRegistration", {
                        content_name: products[product].name,
                        ph: contactNumber,
                        ct: cityName + " - " + departmentName,
                        country: "Colombia",
                        fn: name,
                    });
                }
            }
        }

        setOpenConfirmation(true);
    };

    const propsAvatar = {
        p: 0.5,
        width: "30px",
        height: "30px",
    };
    const fontSizeIcon = "1.3rem";

    const placeholder = {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "sans-serif",
    };

    return (
        <form onSubmit={startConfirmation}>
            <Box style={{ padding: 6, textAlign: "left" }}>
                <BackdropLoading open={loading} text="Registrando tu orden" />
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}
                >
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Nombre y Apellido
                    </InputLabel>
                    <TextField
                        sx={{ border: 2, borderRadius: 1 }}
                        id="name"
                        placeholder="Escribe aquí tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                        fullWidth
                        margin="normal"
                        inputProps={{ style: placeholder }}
                        helperText={
                            !minLength(name, 7) && name
                                ? "Tu nombre completo debe tener por lo menos 7 caracteres"
                                : ""
                        }
                        FormHelperTextProps={{ sx: { color: "error.main" } }}
                        size="small"
                        required
                    />
                </FormControl>
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}
                >
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Celular (WhatsApp)
                    </InputLabel>
                    <TextField
                        sx={{ border: 2, borderRadius: 1 }}
                        id="contact_number"
                        placeholder="Escribe tu número de celular"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                        inputProps={{ style: placeholder }}
                        helperText={
                            !isCellPhone(contactNumber) && contactNumber
                                ? "Número de celular incorrecto"
                                : ""
                        }
                        size="small"
                        FormHelperTextProps={{ sx: { color: "error.main" } }}
                        required
                    />
                </FormControl>
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}
                >
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Dirección (lo más completa posible) *
                    </InputLabel>
                    <TextField
                        sx={{ border: 2, borderRadius: 1 }}
                        id="address"
                        placeholder="Calle, carrera, #apto, #torre, #casa"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        margin="normal"
                        inputProps={{ style: placeholder }}
                        size="small"
                        required
                    />
                </FormControl>
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}
                >
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Barrio *
                    </InputLabel>
                    <TextField
                        sx={{ border: 2, borderRadius: 1 }}
                        id="neighborhood"
                        placeholder="Nombre del barrio"
                        value={neighborhood}
                        onChange={(e) =>
                            setNeighborhood(e.target.value.toUpperCase())
                        }
                        fullWidth
                        margin="normal"
                        inputProps={{ style: placeholder }}
                        helperText={
                            !minLength(neighborhood, 3) && neighborhood
                                ? "El nombre del barrio debe tener por lo menos 3 caracteres"
                                : ""
                        }
                        FormHelperTextProps={{
                            sx: { color: "error.main" },
                        }}
                        size="small"
                        required
                    />
                </FormControl>
                <Box mt={2}></Box>
            </Box>
            <Box mt={2} p={2}>
                <Button
                    id="btn_buy"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    disabled={isDisabled()}
                    type="submit"
                    style={{
                        fontSize: 25,
                        borderRadius: 18,
                        color: "#FFFFFF",
                    }}
                >
                    COMFIRMAR DATOS{" "}
                </Button>
            </Box>

            <Dialog
                sx={{ "& .MuiDialog-paper": { width: "100%" } }}
                maxWidth="xs"
                open={openConfirmation}
            >
                <DialogTitle variant="span">CONFIRMA TUS DATOS</DialogTitle>
                <DialogContent dividers sx={{ p: 0 }}>
                    <List
                        sx={{
                            width: "100%",
                        }}
                        disablePadding
                        dense
                    >
                        <ListItem
                            sx={{ py: 0.2, alignItems: "flex-start" }}
                        >
                            <ListItemAvatar sx={{ pt: 1 }}>
                                <Avatar sx={propsAvatar}>
                                    <PersonOutlineIcon
                                        sx={{ fontSize: fontSizeIcon }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Nombre completo"
                                secondary={name}
                            />
                        </ListItem>
                        <ListItem
                            sx={{ py: 0.2, alignItems: "flex-start" }}
                        >
                            <ListItemAvatar sx={{ pt: 1 }}>
                                <Avatar sx={propsAvatar}>
                                    <WhatsAppIcon
                                        sx={{ fontSize: fontSizeIcon }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Número de contacto"
                                secondary={contactNumber}
                            />
                        </ListItem>
                        <ListItem
                            sx={{ py: 0.2, alignItems: "flex-start" }}
                        >
                            <ListItemAvatar sx={{ pt: 1 }}>
                                <Avatar sx={propsAvatar}>
                                    <Place
                                        sx={{ fontSize: fontSizeIcon }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Dirección"
                                secondary={
                                    address + " / " + neighborhood
                                }
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => setOpenConfirmation(false)}
                    >
                        Modificar
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenConfirmation(false);
                            sendData();
                        }}
                    >
                        Si, acepto
                    </Button>
                </DialogActions>
            </Dialog>
        </form >
    );
}

export default Formulario