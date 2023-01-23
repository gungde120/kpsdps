const { Kps } = require("../models/kps.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createKps = asyncMiddleware(async (req, res) => {
    const result = await Kps.create(req.body, req.file);
    res.status(200).json({ result });
});

exports.getAllKps = asyncMiddleware(async (req, res) => {
    const result = await Kps.getAll();
    res.status(200).json({ result });
});

exports.getKps = asyncMiddleware(async (req, res) => {
    const result = await Kps.get(req.params.id);
    if (!result.length) {
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json(result[0]);
});

exports.updateKps = asyncMiddleware(async (req, res) => {
    const result = await Kps.update(req.params.id, req.body, req.file);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json({ result });
});

exports.deleteKps = asyncMiddleware(async (req, res) => {
    const result = await Kps.delete(req.params.id);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Kps not found' });
    }
    res.status(200).json({ result });
});