from typing import Type
from flask import Flask, json, request, render_template, jsonify, make_response
from flask.wrappers import Response
import requests
from flask_cors import CORS
import stripe
import os
import sqlite3 as sql
import logging

logging.basicConfig(filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s')
log= logging

from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager, jwt_required

stripe_keys = {
    'secret_key': 'sk_test_51JbVJwAr4prWcoB9B9S0L5xv75WH7qP5aGhl7ZksGdQuzHziJ2GEWkl0xO2G1aVXyjpnY7ppSlgXrrpvMag33ygU00vfTfMoFr',
    'publishable_key': 'pk_test_51JbVJwAr4prWcoB9HqQSb4nxM1r7uxaw7wp9xQ308od1ixzYHdGJ4wPcKdgNdPhbERetg4w5cUkDDMZrE1s6hWGp00z0u5DM81'
}

stripe.api_key = stripe_keys['secret_key']


app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)
CORS(app)
app.debug = True

connection = sql.Connection(
    '/home/usama/Desktop/Ecommerce FE/database', check_same_thread=False)
db = connection.cursor()


# -------------------------------------------------------------
# # SignUp BE
# ----------------------------------------------------------------------

@app.route('/SignUp', methods=["POST"])
def login():
    # logging.warning("request")
    log.warning('This will get logged to a file')

    
    if request.method == "POST":
        try:
            pass
            username = request.form['username']
            email = request.form['email']
            first_name = request.form['first_name']
            last_name = request.form['last_name']
            print(request.form['password'])
            password = generate_password_hash(request.form['password'])

            print("Username from form ", username)
            db.execute("SELECT * FROM User WHERE Username=?", [username])
            x = db.fetchone()
            print(x)
            if x is not None:
                try:
                    pass
                    return jsonify("User already created")

                except Exception as e:
                    print(e)

            elif x is None:

                db.execute("INSERT INTO User (Username,F_Name,L_Name,Password,Email) VALUES (?,?,?,?,?)",
                           (username, first_name, last_name, password, email))
                connection.commit()
                return jsonify("success")

        except Exception as e:

            return str(e)


# -------------------------------------------------------------
# # Login BE
# ----------------------------------------------------------------------
@app.route("/Login", methods=["POST"])
def protected():

    try:
        pass
        username = request.form['username']

        password = request.form['password']

        db.execute("SELECT * FROM User WHERE Username=?", [username])
        x = db.fetchone()

        if x is not None:
            

            if check_password_hash(x[4], password):
                jwt_token = create_access_token(identity=username)
                return jsonify(jwt_token)
            else:
                return jsonify("Wrong Password")
        else:
            return jsonify("User not found")

    except Exception as e:
        print(e)
        return str(e)




# -------------------------------------------------------------
# Create Products on Stripe
# ----------------------------------------------------------------------


@app.route('/CreateProduct', methods=['POST'])
def CreateProduct():
    if request.method == 'POST':

        req = request.get_json()
        product = None
        if req:

            if 'product' in req:
                product = req['product']
            try:
                pass
            # stripe.Product.create(
        #                     id=product['id'],
        #                     name=product['title'],
        #                     images=[product['image']],

        #                 )
            except Exception as e:
                print(e)


# -------------------------------------------------------------
# Create Price of Product on Stripe
# ----------------------------------------------------------------------


@app.route('/CreatePrice', methods=['POST'])
def CreatePrice():
    if request.method == 'POST':

        req = request.get_json()
        product = None
        if req:

            if 'product' in req:
                product = req['product']
        try:
            pass

            #   stripe.Price.create(

            #                 product=product['id'],
            #                 unit_amount=int(product['price'])*100,
            #                 currency='usd',
            #                 active=True,
            #             )

        except Exception as e:
            print(e)


# -------------------------------------------------------------
# # Payment Stripe
# ----------------------------------------------------------------------


@app.route('/payment', methods=['GET', 'POST'])
@jwt_required()
def payment():

    try:
        pass
        user = get_jwt_identity()
        db.execute("SELECT * FROM User WHERE Username=?", [user])
        x = db.fetchone()
        if x is not None:
            if request.method == 'POST':
                req = request.get_json()
                if req and req['products']!=[]:
                    print("ee")
                    products = req['products']
                    arr = [i for i in stripe.Price.list()]
                    temp = [i['product'] for i in arr]
                    for product in products:
                        if str(product['price']) in temp:
                            idx = temp.index(str(product['price']))
                            product['price'] = arr[idx].get('id')

                    payment = stripe.checkout.Session.create(
                        success_url="http://localhost:4200/Stripe",
                        cancel_url="http://localhost:4200/",
                        payment_method_types=["card"],
                        line_items=products,

                        mode="payment",)
                    print(payment['url'])
                    return payment
                else:
                    return jsonify("Empty Cart")

          
        else:
            return jsonify("Unauthorized Access Please Login firstly")

    except Exception as e:
        print(e)
        return str(e)
   
   


@app.route('/charge', methods=['GET', 'POST'])
def charge():
    # Amount in cents
    try:

        pass
        request_data = request.get_json()
       # print(request_data)

        token = None
        id = None
        # python_version = None
        # example = None
        # boolean_test = None

        if request_data:

            if 'token' in request_data:
                token = request_data['token']
                # return jsonify(token)
                print("token.id", token.id)
        #         return token

        # pass

                amount = 500
                customer = stripe.Customer.create(
                    email='djangotest1997@gmail.com',
                    source=request_data
                )

                charge = stripe.Charge.create(
                    customer=customer.id,
                    amount=amount,
                    currency='usd',
                    description='Flask Charge'
                )

                payment = stripe.PaymentIntent.create(


                )

                return jsonify(charge)
    except Exception as e:
        print(e)
        return e


if __name__ == '__main__':
    app.run(debug=True)
