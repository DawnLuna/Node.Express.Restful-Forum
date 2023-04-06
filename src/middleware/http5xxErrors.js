export const notImplemented = (req, res) => {
    return res.status(501).json({ succes: false, message: 'Not implemented, try again later' });
};