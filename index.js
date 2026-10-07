const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middleware = jsonServer.defaults();

const PORT = 3000;

server.use(middleware);
server.use(jsonServer.bodyParser);
server.post('/login', (req, res) => {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = router.db.get('users').find((candidate) =>
        candidate.email?.toLowerCase() === email.trim().toLowerCase() &&
        candidate.password === password &&
        candidate.role === 'user'
    ).value();

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});
server.use(router);

server.listen(PORT, () => {
    console.log(`JSON Server running at http://localhost:${PORT}`);
});