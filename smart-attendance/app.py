import os
import cv2
from flask import Flask, render_template, request, redirect, url_for,flash
import subprocess

app = Flask(__name__)

# Dummy credentials for admin login
ADMIN_CREDENTIALS = {
    'admin_id': 'admin123',
    'password': 'password'
}

def capture_images(student_id):
    save_path = f"Images/{student_id}"
    num_images = 50
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    cap = cv2.VideoCapture(0)
    cap.set(3, 640)  # Set width
    cap.set(4, 480)  # Set height

    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    count = 0
    print(f"[INFO] Starting capture for student {student_id}...")

    while count < num_images:
        success, frame = cap.read()
        if not success:
            print("❌ Failed to grab frame.")
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

        print(f"[INFO] Detected {len(faces)} faces")  # Debugging line to see how many faces are detected

        if len(faces) > 0:
            for (x, y, w, h) in faces:
                face_img = frame[y:y + h, x:x + w]
                face_img = cv2.resize(face_img, (300, 300))  # Resize face to a fixed size

                count += 1
                img_name = os.path.join(save_path, f"{student_id}_{count}.jpg")
                cv2.imwrite(img_name, face_img)  # Save the image

                print(f"[INFO] Captured {count}/{num_images} images.")  # Debugging line to track image count

                # Draw rectangle around the face (optional, if you want to visually highlight faces)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, f"Captured: {count}/{num_images}", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    success_message = f"✅ Student ID {student_id} registered successfully"
    failure_message = f"⚠️ Only {count} images were captured for {student_id}. Please try again."

    return success_message if count >= num_images else failure_message


@app.route('/')
def home():
    return redirect(url_for('login'))

# Route for admin login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        admin_id = request.form['username']
        password = request.form['password']

        if admin_id == ADMIN_CREDENTIALS['admin_id'] and password == ADMIN_CREDENTIALS['password']:
            return redirect(url_for('register_student')) #if logged in then redirect to the register student page
        else:
            error_message = "❌ Incorrect Username/Password. Please try again."
            return render_template('login.html', error=error_message)

    return render_template('login.html')

# Route for registering students
@app.route('/register', methods=['GET', 'POST'])
def register_student():
    if request.method == 'POST':
        student_id = request.form['student_id']

        # Capture images in a separate thread and get the result messageasda
        message = capture_images(student_id)

        subprocess.run(['python', 'encode.py'])

        # Render the registration page, passing the success or failure message
        return render_template('register.html', student_id=student_id, message=message)

    return render_template('register.html')


if __name__ == '__main__':
    app.run(debug=True)
