const { PotensiDas } = require("../models/potensi.das.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createPotensiDas = asyncMiddleware(async (req, res) => {
    const result = await PotensiDas.create(req.body, req.file);
    res.status(200).json({ result });
});

exports.getAllPotensiDas = asyncMiddleware(async (req, res) => {
    const result = await PotensiDas.getAll();
    res.status(200).json({ result });
});

exports.getPotensiDas = asyncMiddleware(async (req, res) => {
    const result = await PotensiDas.get(req.params.id);
    if (!result.length) {
        return res.status(404).json({ error: 'Potensi Das not found' });
    }
    res.status(200).json({ result });
});

exports.updatePotensiDas = asyncMiddleware(async (req, res) => {
    const result = await PotensiDas.update(req.params.id, req.body, req.file);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Potensi Das not found' });
    }
    res.status(200).json({ result });
});

exports.deletePotensiDas = asyncMiddleware(async (req, res) => {
    const result = await PotensiDas.delete(req.params.id);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Potensi Das not found' });
    }
    res.status(200).json({ result });
});