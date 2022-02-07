const express = require("express");
const { Container } = require("./index");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

const session = new Container("products.json");

const initializeDB = async () => {
    // Incluyendo productos antes de iniciar el servidor
    const mockedUpDB = [
        {
            name: "Bicicleta",
            price: 20000,
            thumbnail: "url://someUrl.com/fakeUrl.jpg",
        },
        {
            name: "Remera Azul",
            price: 5000,
            thumbnail: "url://someUrl.com/fakeUrl.jpg",
        },
        {
            name: "Zapatillas",
            price: 35000,
            thumbnail: "url://someUrl.com/fakeUrl.jpg",
        },
        {
            name: "Botas de Nieve",
            price: 40000,
            thumbnail: "url://someUrl.com/fakeUrl.jpg",
        },
        {
            name: "Campera",
            price: 18000,
            thumbnail: "url://someUrl.com/fakeUrl.jpg",
        },
        {
            name: "Remera Blanca",
            price: 4500,
            thumbnail: "url://someUrl.com/fakeUrl.jpg",
        },
        {
            name: "Buzo con capucha",
            price: 12000,
            thumbnail: "url://someUrl.com/fakeUrl.jpg",
        },
    ];

    const dbExists = fs.existsSync(`${__dirname}/products.json`);
    if (!dbExists) {
        // Generamos el archivo json
        await session.createFile();
    }
    const db = require("./products.json");
    if (db.length === 0) {
        // Si el json está vacío, incorporamos los productos
        setTimeout(() => {
            mockedUpDB.forEach(async (element) => {
                await session.save(element);
            });
        }, 3000);
    }
};
// Inicializamos la Base de Datos
initializeDB();

app.get("/", (req, res) => {
    res.json({
        message: "Bienvenidos al desafío nº 3",
        searchAllProducts:
            "Para buscar todos los productos dirígete a /products",
        searchRandomProduct:
            "Para buscar un producto aleatorio dirígete a /randomProduct",
    });
});

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
    const productArray = require("./products.json");
    if (productArray.length === 0) {
        res.json({
            error: "No products were found",
        });
    }

    res.json({
        message: productArray,
    });
});

// GET A RANDOM PRODUCT
app.get("/randomProduct", (req, res) => {
    const productArray = require("./products.json");

    const randomIndex = Math.ceil(Math.random() * productArray.length);

    res.json({
        message: productArray[randomIndex - 1],
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
