from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="prueba_tecnica"
)

cursor = db.cursor(dictionary=True)

@app.route("/orders", methods=["GET"])
def get_orders():
    cursor.execute("SELECT * FROM orders")
    orders = cursor.fetchall()
    return jsonify(orders)

@app.route("/orders/<int:id>", methods=["GET"])
def get_order(id):
    cursor.execute("SELECT * FROM orders WHERE id = %s", (id,))
    order = cursor.fetchone()
    return jsonify(order)

@app.route("/orders", methods=["POST"])
def create_order():
    data = request.json
    cursor.execute("INSERT INTO orders (order_number, num_products, final_price) VALUES (%s, %s, %s)", 
                   (data["order_number"], data["num_products"], data["final_price"]))
    db.commit()
    return jsonify({"message": "Order created"}), 201

@app.route("/orders/<int:id>", methods=["PUT"])
def update_order(id):
    data = request.json
    cursor.execute("UPDATE orders SET order_number=%s, num_products=%s, final_price=%s WHERE id=%s", 
                   (data["order_number"], data["num_products"], data["final_price"], id))
    db.commit()
    return jsonify({"message": "Order updated"})

@app.route("/orders/<int:id>", methods=["DELETE"])
def delete_order(id):
    cursor.execute("DELETE FROM orders WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Order deleted"})

if __name__ == "__main__":
    app.run(debug=True)
