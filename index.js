const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var personas = [
    { id: 1, name: 'Juan', phone: '5585369035' },
    { id: 2, name: 'Sarti', phone: '5515364635' },
    { id: 3, name: 'Sandy', phone: '5535354636' },
    { id: 4, name: 'Xime', phone: '5585378055' },
]

app.get('/', (req, res) => {
    res.send(JSON.stringify(personas));
    console.table(personas);
});

app.post('/agregar', (req, res) => {
    const bo = req.body;
    console.log(bo);
    personas.push(bo);
    res.send('New person: ' + JSON.stringify(bo));
});

app.delete('/eliminar/:id', (req, res) => {
    const idPerson = req.params.id;
    if (idPerson * 1 > personas.length) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    } else {
        personas = personas.filter(person => person.id != idPerson);
        res.status(200).json({ status: 'success', message: 'person deleted successfully' });
    }
});

app.put('/actualizar/:id', (req, res) => {
    const idPerson = req.params.id;
    if (idPerson * 1 > personas.length) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    } else {
        const personToUpdate = personas.find(per => per.id == idPerson);
        const personIndex = personas.indexOf(personToUpdate);

        console.log(personToUpdate);

        const updatePersonObject = Object.assign(personToUpdate, req.body);
        personas[personIndex] = personToUpdate;

        return res.status(200).json({ status: 'success', message: 'persons updated successfully' });
    }
})

app.listen(port = 3000, () => {
    console.log(`Server listening on port ${port}`);
});