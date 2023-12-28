import Title from "../../products/components/milagros/Title";
import KitMilagros from "../../products/components/milagros/KitMilagros";


const milagros ={
    code: "1",
    name: "milagros",
    apis: {
        funnel_1: {
            url: "http://localhost:3001/api/new-order",
            //url: "https://boostec-sp-auto-zy9m3.ondigitalocean.app/api/new-order",
        },
    },
    contents:{
        title: {funnel_1: <Title/>},
        kit_milagros: {funnel_1: <KitMilagros/>},
        default_presentation: 0,
        whatsapp_message: "Hola un gusto atenderle, gracias por apoyar mi emprendimiento, mi nombre es Natalia Gaviria, usted me puede indicar en que producto de *Milagros* tiene interes?",
        presentations: [
            { description: "PRODUCTOS DE MILAGROS" },
        ],
    },
    related: [],
    channel: "#ventas-productos-milagros",
    whatsapp_number: "3177250502",
}

export default milagros