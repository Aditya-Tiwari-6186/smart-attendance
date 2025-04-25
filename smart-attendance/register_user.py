# import tkinter as tk
# from tkinter import messagebox
# import cv2
# import os

# def capture_images(student_id):

#     # === ASK FOR STUDENT ID ===
#     save_path = f"Images/{student_id}"
#     num_images = 50

#     # === CREATE DIRECTORY IF NOT EXISTS ===
#     if not os.path.exists(save_path):
#         os.makedirs(save_path)

#     # === SETUP CAMERA ===
#     cap = cv2.VideoCapture(0)
#     cap.set(3, 640)
#     cap.set(4, 480)

#     # === LOAD FACE DETECTOR ===
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

#     count = 0
#     print(f"[INFO] Starting capture for {student_id}...")

#     while True:
#         success, frame = cap.read()
#         if not success:
#             print("❌ Failed to grab frame.")
#             break

#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

#         for (x, y, w, h) in faces:
#             face_img = frame[y:y + h, x:x + w]
#             face_img = cv2.resize(face_img, (300, 300))
#             count += 1

#             img_name = os.path.join(save_path, f"{student_id}_{count}.jpg")
#             cv2.imwrite(img_name, face_img)

#             # Display box and counter
#             cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
#             cv2.putText(frame, f"Captured: {count}/{num_images}", (10, 30),
#                         cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

#         cv2.imshow("Capturing Faces", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break
#         if count >= num_images:
#             break
#     cap.release()
#     cv2.destroyAllWindows()
#     messagebox.showinfo(f"[INFO] Capture complete! {count} images saved to '{save_path}'.")



# def on_submit():
#     student_id = entry.get().strip()
#     capture_images(student_id)


# # ====================== Tkinter Frontend ======================
# root = tk.Tk()
# root.title("NIT JAMSHEDPUR Registration")
# root.geometry("600x400")
# root.configure(bg="#ADD8E6")  # Light blue background

# # Header Label
# header = tk.Label(root, text="NIT JAMSHEDPUR", font=("Helvetica", 28, "bold"),
#                   bg="#ADD8E6", fg="#00008B")
# header.pack(pady=20)

# # Student ID Input Label
# label = tk.Label(root, text="Enter Student ID:", font=("Helvetica", 18), bg="#ADD8E6")
# label.pack(pady=10)

# # Entry Field for Student ID
# entry = tk.Entry(root, font=("Helvetica", 18), width=20)
# entry.pack(pady=10)

# # Submit Button
# submit_btn = tk.Button(root, text="Submit", font=("Helvetica", 18), command=on_submit)
# submit_btn.pack(pady=20)

# root.mainloop()