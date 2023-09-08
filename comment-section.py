from textblob import TextBlob
from flask import Flask, request, jsonify, render_template

from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    name = "John Doe"  # Your name or any data you want to send to the frontend
    return render_template('index.html', name=name)


@app.route('/comment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    comment = data['comment']

    # Sentiment analysis
    # Create a TextBlob object
    blob = TextBlob(comment)
    
    # Get sentiment scores
    sentiment = blob.sentiment

    # Determine sentiment polarity
    if sentiment.polarity > 0:
        sentiment_label = 'Positive'
    elif sentiment.polarity < 0:
        sentiment_label = 'Negative'
    else:
        sentiment_label = 'Neutral'

    
    res = {'comment': sentiment_label}
    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)

