const { Sungai } = require("../models/sungai.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createSungai = asyncMiddleware(async (req, res) => {
    const result = await Sungai.create(req.body);
    res.status(200).json({ result });
});

exports.getAllSungai = asyncMiddleware(async (req, res) => {
    const result = await Sungai.getAll();
    res.status(200).json({ result });
});

exports.getSungai = asyncMiddleware(async (req, res) => {
    const result = await Sungai.get(req.params.id);
    if (!result.length) {
        return res.status(404).json({ error: 'Sungai not found' });
    }
    res.status(200).json({ result });
});

exports.updateSungai = asyncMiddleware(async (req, res) => {
    const result = await Sungai.update(req.params.id, req.body);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Sungai not found' });
    }
    res.status(200).json({ result });
});

exports.deleteSungai = asyncMiddleware(async (req, res) => {
    const result = await Sungai.delete(req.params.id);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Sungai not found' });
    }
    res.status(200).json({ result });
});