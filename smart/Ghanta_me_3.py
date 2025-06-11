import cv2
import time
import random
from datetime import datetime, timedelta

# Initialize camera
cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

# Total duration and capture count
start_time = datetime.now()
end_time = start_time + timedelta(hours=1)
capture_count = 0
max_captures = 3

# Random times within the hour to capture (in seconds from now)
capture_times = sorted(random.sample(range(60 * 60), max_captures))
print("Scheduled capture seconds:", capture_times)

# Track when to capture
while datetime.now() < end_time and capture_count < max_captures:
    ret, frame = cap.read()
    now = datetime.now()
    elapsed = int((now - start_time).total_seconds())

    # Check if it's time to capture
    if elapsed == capture_times[capture_count]:
        img_name = f"captured_image_{capture_count + 1}.jpg"
        cv2.imwrite(img_name, frame)
        print(f"📸 Captured image {capture_count + 1} at {now.strftime('%H:%M:%S')}")
        capture_count += 1

    cv2.imshow("Webcam", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("❌ Stopped manually.")
        break

cap.release()
cv2.destroyAllWindows()
print("✅ Done capturing.")
