let { personas } = require('../data/personsData');

exports.checkID = (req, res, next, val) => {
    console.log(`Person id: ${val}`);
    if (req.params.id * 1 > personas.length) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    }
    next();
}

exports.checkBody = (req, res, next) => {
    const bo = req.body;
    console.log('Body structure: ', bo);
    if (!bo.id || !bo.name || !bo.phone) {
        return res.status(404).json({ status: 'fail', message: 'Invalid body request' });
    }
    next();

}

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
    personas = personas.filter(person => person.id != idPerson);
    res.status(200).json({ status: 'success', message: 'person deleted successfully' });
}

exports.updatePerson = (req, res) => {
    const idPerson = req.params.id;
    const personToUpdate = personas.find(per => per.id == idPerson);
    const personIndex = personas.indexOf(personToUpdate);
    console.log(personToUpdate);
    const updatePersonObject = Object.assign(personToUpdate, req.body);
    personas[personIndex] = personToUpdate;
    return res.status(200).json({ status: 'success', message: 'persons updated successfully' });
}

exports.getPerson = (req, res) => {
    const idPerson = req.params.id;
    const person = personas.find(person => person.id == idPerson);
    return res.status(200).json({ status: 'success', person: person });
}