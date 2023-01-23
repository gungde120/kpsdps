const { Das } = require("../models/das.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createDas = asyncMiddleware(async (req, res) => {
    const result = await Das.create(req.body, req.file);
    res.status(200).json({ result });
});

exports.getAllDas = asyncMiddleware(async (req, res) => {
    const result = await Das.getAll();
    res.status(200).json({ result });
});

exports.getDas = asyncMiddleware(async (req, res) => {
    const result = await Das.get(req.params.id);
    if (!result.length) {
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json(result[0]);
});

exports.updateDas = asyncMiddleware(async (req, res) => {
    const result = await Das.update(req.params.id, req.body, req.file);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json({ result });
});

exports.deleteDas = asyncMiddleware(async (req, res) => {
    const result = await Das.delete(req.params.id);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json({ result });
});