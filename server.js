const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'partials/layout');

// Session config
const sessionStore = new SequelizeStore({
    db: sequelize
});

app.use(session({
    secret: 'aura_sissies_secret_key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

sessionStore.sync();

// Global variables for templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.cart = req.session.cart || [];
    res.locals.cartCount = req.session.cart ? req.session.cart.reduce((total, item) => total + item.quantity, 0) : 0;
    next();
});

// Import Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/shop', require('./routes/shop'));
app.use('/api', require('./routes/api'));

// Start server and sync DB
sequelize.sync({ alter: !process.env.VERCEL }).then(() => {
    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
}).catch(err => {
    console.log('Database sync error:', err);
});

module.exports = app;
