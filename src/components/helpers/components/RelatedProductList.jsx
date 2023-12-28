import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../configs/products/Routes";
import products from "../../configs/Products";

const RelatedProductList = ({ product }) => {
    /**.
     * Lista de elementos don datos de los productos relacionados
     */
    const getItems = () => {
        const items = [];

        for (let i = 0; i < products[product].related.length; i++) {
            const prod = products[products[product].related[i]];
            if (i > 0) {
                items.push(<Divider component="li" key={i + "_div"} />);
            }

            items.push(
                <ListItem key={i}>
                    <Link to={"/" + routes[prod.route_name].path}>
                        <ListItemButton dense alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={prod.route_image_xs}
                                    sx={{
                                        width: "70px",
                                        height: "70px",
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={prod.name}
                                secondary={prod.summary}
                                sx={{ pl: 2, color: "#000" }}
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
            );
        }

        return items;
    };

    return (
        <React.Fragment>
            <List
                sx={{
                    width: "100%",
                }}
            >
                {getItems()}
            </List>
        </React.Fragment>
    );
};

export default RelatedProductList;
