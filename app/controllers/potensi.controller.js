const { Potensi } = require("../models/potensi.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createPotensi = asyncMiddleware(async (req, res) => {
    const result = await Potensi.create(req.body);
    res.status(200).json({ result });
});

exports.getAllPotensi = asyncMiddleware(async (req, res) => {
    const result = await Potensi.getAll();
    res.status(200).json({ result });
});

exports.getPotensi = asyncMiddleware(async (req, res) => {
    const result = await Potensi.get(req.params.id);
    if (!result.length) {
        return res.status(404).json({ error: 'Potensi not found' });
    }
    res.status(200).json({ result });
});

exports.updatePotensi = asyncMiddleware(async (req, res) => {
    const result = await Potensi.update(req.params.id, req.body);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Potensi not found' });
    }
    res.status(200).json({ result });
});

exports.deletePotensi = asyncMiddleware(async (req, res) => {
    const result = await Potensi.delete(req.params.id);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Potensi not found' });
    }
    res.status(200).json({ result });
});