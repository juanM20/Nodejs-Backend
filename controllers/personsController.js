let { personas } = require('../data/personsData');

exports.getAllPersons = (req, res) => {
    res.send(JSON.stringify(personas));
    console.table(personas);
}

exports.createPerson = (req, res) => {
    const bo = req.body;
    console.log(bo);
    personas.push(bo);
    res.send('New person: ' + JSON.stringify(bo));
}

exports.deletePerson = (req, res) => {
    const idPerson = req.params.id;
    if (idPerson * 1 > personas.length) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    } else {
        personas = personas.filter(person => person.id != idPerson);
        res.status(200).json({ status: 'success', message: 'person deleted successfully' });
    }
}

exports.updatePerson = (req, res) => {
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
}

exports.getPerson = (req, res) => {
    const idPerson = req.params.id;
    if (idPerson * 1 > personas.length) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    } else {
        const person = personas.find(person => person.id == idPerson);
        return res.status(200).json({ status: 'success', person: person });
    }
}