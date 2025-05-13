from flask import Flask, render_template, request, redirect
app = Flask(__name__)

# Dummy data
products = [
    {"name": "Classic Panel", "description": "Glossy white PVC panel", "price": "499", "image": "kumarpvci1.jpeg"},
    {"name": "Textured Panel", "description": "Wood finish texture", "price": "599", "image": "kumarpvci2.jpeg"},
    {"name": "Matte Panel", "description": "Smooth matte finish", "price": "549", "image": "kumarpvci3.jpeg"}
]

@app.route('/')
def index():
    return render_template('index.html', products=products)

@app.route('/add', methods=['POST'])
def add_product():
    name = request.form['name']
    description = request.form['description']
    price = request.form['price']
    image = request.form['image']
    products.append({
        "name": name,
        "description": description,
        "price": price,
        "image": image
    })
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
