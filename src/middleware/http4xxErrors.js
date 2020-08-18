export const notFound = (req, res) => {
    return res.status(404).json({ succes: false, message: 'Page not found' });
};

export const methodNotAllowed = (req, res) => {
    return res.status(405).json({ succes: false, message: 'Method not supported' });
};