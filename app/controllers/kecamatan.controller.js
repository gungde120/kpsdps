const { Kecamatan } = require("../models/kecamatan.model");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.createKecamatan = asyncMiddleware(async (req, res) => {
    const result = await Kecamatan.create(req.body);
    res.status(200).json({ result });
});

exports.getAllKecamatan = asyncMiddleware(async (req, res) => {
    const result = await Kecamatan.getAll();
    res.status(200).json({ result });
});

exports.getDasKecamatan = asyncMiddleware(async (req, res) => {
    const result = await Kecamatan.getDasByKecamatan(req.params.id);
    if (!result.length) {
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json({ result });
});

exports.getKpsKecamatan = asyncMiddleware(async (req, res) => {
    const result = await Kecamatan.getKpsByKecamatan(req.params.id);
    if (!result.length) {
        return res.status(404).json({ error: 'Das not found' });
    }
    res.status(200).json({ result });
});

exports.updateKecamatan = asyncMiddleware(async (req, res) => {
    const result = await Kecamatan.update(req.params.id, req.body);
    if(result.affectedRows === 0){
        return res.status(404).json({ error: 'Kecamatan not found' });
    }
    res.status(200).json({ result });
});

exports.deleteKecamatan = asyncMiddleware(async (req, res) => {
    const result = await Kecamatan.delete(req.params.id);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Kecamatan not found' });
    }
    res.status(200).json({ result });
});