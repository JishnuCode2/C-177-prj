from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

words = [
    {
        "inputs":4,
        "hints": ["Category is Sports","Can be played by upto Four Players", "It is a Board Game", "Dice are used"],
        "word": "ludo"
    },
    {
        "inputs":6,
        "hints": ["It is the Name of a European Country", "It is the largest country by territory in Europe", "In South-West part of Europe", "Revolution of 1789"],
        "word": "france"
    }
];

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get-template")
def get_template():
    return jsonify({
        "status": "success",
        "word": random.choice(words)
    })

if __name__ == "__main__":
    app.run(debug=True)