const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get('/', async (req, res) => {
    const resArr = [];
    const urls =[
                'https://fakestoreapi.com/products/1',
                'https://fakestoreapi.com/products/3', 
                'https://fakestoreapi.com/products/5'
                ];
    function getItem(gtin) {
        const URL = `${gtin}`
        return fetch(URL).then(response => response.json());
    }

    async function populateCart() {
        let itemRequests = []
        itemRequests = urls.map(gtin => getItem(gtin));
        return await Promise.all(itemRequests)
    }
    (async function () {
        try {
            const data = await populateCart();
            console.log(data);
            res.send(data);
        }
        catch (err) {
            console.log(err);
        }
    })();
});
app.listen(port, () => console.log(`app listening on port ${port}!`));