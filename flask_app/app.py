from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from models import db, User, Product, Order
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'aura_sissies_super_secret'
basedir = os.path.abspath(os.path.dirname(__name__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.before_request
def create_tables():
    app.before_request_funcs[None].remove(create_tables)
    db.create_all()
    # Seed data if empty
    if not User.query.filter_by(role='admin').first():
        admin = User(name='Admin', email='admin@aurasissies.com', role='admin')
        admin.set_password('admin123')
        db.session.add(admin)
        db.session.commit()
    if not Product.query.first():
        products = [
            Product(name='Crochet Tulips Bouquet', description='Beautiful bouquet of mixed color crochet tulips.', price=1800, image='bouquet_gen.png', category='Bouquet'),
            Product(name='Amigurumi Bunny', description='Super soft and fluffy crochet bunny, perfect for cuddling.', price=850, image='bunny.png', category='Plushies'),
            Product(name='Crochet Frog Bucket Hat', description='Cute green frog bucket hat, handmade with soft yarn.', price=1200, image='apparel_gen.png', category='Apparel'),
        ]
        db.session.bulk_save_objects(products)
        db.session.commit()

# Inject user into context
@app.context_processor
def inject_user():
    user = None
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
    return dict(user=user)

@app.route('/')
def index():
    products = Product.query.limit(4).all()
    return render_template('index.html', title='Aura Sissies - Home', products=products)

@app.route('/shop')
def shop():
    try:
        page = int(request.args.get('page', 1))
    except ValueError:
        page = 1
    per_page = 8
    products = Product.query.paginate(page=page, per_page=per_page, error_out=False)
    return render_template('shop.html', title='Shop', products=products.items, current_page=page, has_next=products.has_next, has_prev=products.has_prev)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        flash('Thank you for contacting us! We will get back to you soon.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html', title='Contact Us')

@app.route('/game')
def game():
    return render_template('game.html', title='Play & Earn')

@app.route('/game/earn', methods=['POST'])
def game_earn():
    if 'user_id' not in session:
        return jsonify(success=False)
    user = User.query.get(session['user_id'])
    if user:
        user.gems += 5
        db.session.commit()
        return jsonify(success=True, gems=user.gems)
    return jsonify(success=False)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            flash('Logged in successfully.', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid email or password.', 'danger')
    return render_template('login.html', title='Login')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        if User.query.filter_by(email=email).first():
            flash('Email already exists.', 'danger')
            return redirect(url_for('register'))
        new_user = User(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash('Registration successful. Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Logged out successfully.', 'success')
    return redirect(url_for('index'))

@app.route('/admin')
def admin_dashboard():
    if 'user_id' not in session:
        flash('Please log in.', 'danger')
        return redirect(url_for('login'))
    user = User.query.get(session['user_id'])
    if user.role != 'admin':
        flash('Access denied.', 'danger')
        return redirect(url_for('index'))
    products = Product.query.all()
    return render_template('admin.html', title='Admin Dashboard', products=products)

@app.route('/admin/add_product', methods=['POST'])
def add_product():
    if 'user_id' not in session: return redirect(url_for('login'))
    name = request.form.get('name')
    price = request.form.get('price')
    category = request.form.get('category')
    new_product = Product(name=name, price=float(price), category=category)
    db.session.add(new_product)
    db.session.commit()
    flash('Product added!', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete_product/<int:id>', methods=['POST'])
def delete_product(id):
    if 'user_id' not in session: return redirect(url_for('login'))
    product = Product.query.get(id)
    if product:
        db.session.delete(product)
        db.session.commit()
        flash('Product deleted!', 'success')
    return redirect(url_for('admin_dashboard'))

if __name__ == '__main__':
    app.run(debug=True, port=3000)
