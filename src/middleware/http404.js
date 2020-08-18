export const notFound = (req, res) => {
    res.status(404).json({ succes: false, message: 'Page not found' });
};