import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from twilio.rest import Client
from werkzeug.utils import secure_filename
import time
from dotenv import load_dotenv
load_dotenv()
print("TWILIO_SID:", os.getenv("TWILIO_SID"))
app = Flask(__name__)
CORS(app)

model = YOLO("models/best.pt")

TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_FROM = os.getenv("TWILIO_FROM")
TWILIO_TO = os.getenv("TWILIO_TO")

client = Client(TWILIO_SID, TWILIO_AUTH)

@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "No image file"}), 400

    image = request.files["image"]
    upload_dir = os.path.join(os.path.dirname(__file__), 'uploads')
    os.makedirs(upload_dir, exist_ok=True)

    image_path = os.path.join(upload_dir, secure_filename(image.filename))
    image.save(image_path)

    while not os.path.exists(image_path):
        time.sleep(0.1)

    results = model(image_path)
    detections = []

    for r in results:
        for box in r.boxes:
            cls = int(box.cls[0])
            label = model.names[cls]
            xyxy = box.xyxy[0].tolist()
            conf = float(box.conf[0])
            detections.append({
                "class": label,
                "bbox": [round(coord, 2) for coord in xyxy],
                "confidence": round(conf, 2)
            })

    if detections:
        alert_message = f"Wildlife Detected: {', '.join(set([d['class'] for d in detections]))}"
        try:
            client.messages.create(
                body=alert_message,
                from_=TWILIO_FROM,
                to=TWILIO_TO
            )
        except Exception as e:
            print("Error sending SMS:", e)

    os.remove(image_path)

    return jsonify({"detections": detections})

@app.route("/send-alert", methods=["POST"])
def send_alert():
    data = request.get_json()
    try:
        message = client.messages.create(
            body=f"Wildlife Alert!\nSpecies: {data['species']}\nLocation: {data['location']}\nTime: {data['time']}",
            from_=TWILIO_FROM,
            to=TWILIO_TO
        )
        return jsonify({"success": True, "sid": message.sid})
    except Exception as e:
        print("Twilio error:", e)
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True)
