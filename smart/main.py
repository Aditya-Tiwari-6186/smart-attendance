import csv
import pickle
import numpy as np
import cv2
import os
import face_recognition
import cvzone
from pymongo import MongoClient
from datetime import datetime, timedelta

# Connect to MongoDB
client = MongoClient("mongodb+srv://adityatiwari6186:Aditya2005@cluster0.o945ljb.mongodb.net/Attendance")
db = client["Attendance"]
collection = db["studentAttendance"]

# Export Data in CSV Format
def export():
    csv_file = "attendance_data.csv"

    # === Fetch all records ===
    students = collection.find()

    # === Write to CSV ===
    with open(csv_file, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Student ID", "Total Attendance", "Last Attendance Time"])

        for student in students:
            writer.writerow([
                student.get("_id", ""),
                student.get("total_attendance", 0),
                student.get("last_attendance_time", "")
            ])

    print(f"✅ Attendance data has been exported to {csv_file}")

# Initialise Database
def initialise_db(student_ids):

    # Time 1 hour ago from now
    one_hour_ago = (datetime.now() - timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")

    existing_ids = [doc['_id'] for doc in collection.find({}, {'_id': 1})]

    for sid in student_ids:
        if sid not in existing_ids:
            collection.update_one(
                {"_id": sid},
                {
                    "$set": {
                        "last_attendance_time": one_hour_ago,
                        "total_attendance": 0
                    }
                },
                upsert=True
            )
    print("✅ Initialized all students with attendance time 1 hour ago.")

# Mark Attendance if not marked within 1 hour
def mark_attendance(student_id):
    now = datetime.now()

    student = collection.find_one({"_id": student_id})

    if student:
        last_time_str = student.get("last_attendance_time")
        if last_time_str:
            last_time = datetime.strptime(last_time_str, "%Y-%m-%d %H:%M:%S")
            if now - last_time < timedelta(hours=1):
                print(f"⏱️ Already marked attendance for {student_id} within the last hour.")
                return  # Don't update
        collection.update_one(
            {"_id": student_id},
            {"$set": {"last_attendance_time": now.strftime("%Y-%m-%d %H:%M:%S")},
             "$inc": {"total_attendance": 1}}
        )
        print(f"✅ Updated attendance for {student_id}")
    else:
        collection.insert_one({
            "_id": student_id,
            "last_attendance_time": now.strftime("%Y-%m-%d %H:%M:%S"),
            "total_attendance": 1
        })
        print(f"🆕 New student {student_id} marked present")

# Image Capture from CV2 Module, Camera index->0
cap=cv2.VideoCapture(0)
cap.set(3,640) # 640 x 480 ka bg me image ka slot hai
cap.set(4,480)
img_bg=cv2.imread('Resources/background.png')

# Importing Modes
folderPath='Resources/Modes'
modePath=os.listdir(folderPath)
imgModeList=[]
for path in modePath:
    if not path.startswith('.'):
        imgModeList.append(cv2.imread(os.path.join(folderPath,path)))

# Load Encoded File
print('Loading Encoded File...')
file = open("EncodeFile.p",'rb')
encodeListWithID = pickle.load(file)
file.close()
encodeList,StudentID = encodeListWithID
initialise_db(StudentID)
print('Encode File Loaded')

# Taking Image
start_time = datetime.now()
duration_seconds = 15  # Capture duration

while (datetime.now() - start_time).seconds < duration_seconds:
    success,img=cap.read()
    imgSmall = cv2.resize(img,(0,0),None,0.25,0.25)
    imgSmall = cv2.cvtColor(imgSmall, cv2.COLOR_BGR2RGB)

    faceCurrFrame = face_recognition.face_locations(imgSmall)
    encodeCurrFrame = face_recognition.face_encodings(imgSmall,faceCurrFrame)

    img_bg[162:162+480,55:55+640]=img #background ka shi slot me webcam jayega
    imgModeResized = cv2.resize(imgModeList[0], (414, 633))
    img_bg[44:44 + 633, 808:808 + 414] = imgModeResized

    for encodeFace, faceLocation in zip(encodeCurrFrame, faceCurrFrame):
        matches = face_recognition.compare_faces(encodeList, encodeFace)
        faceDist = face_recognition.face_distance(encodeList, encodeFace)
        matchIndex = np.argmin(faceDist)

        if matches[matchIndex] and faceDist[matchIndex] < 0.45:
            student_id = StudentID[matchIndex]
            y1, x2, y2, x1 = faceLocation
            y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            bbox = 55 + x1, 162 + y1, x2 - x1, y2 - y1
            img_bg = cvzone.cornerRect(img_bg, bbox, rt=0) # Face pr Green pointer ayega
            mark_attendance(student_id)
            #print("✅ Match:", student_id)
        else:
            print("❌ Unknown")

    cv2.imshow("Webcam",img)
    cv2.imshow("Face Attendance",img_bg)
    cv2.waitKey(10)

# Cleanup after 20 seconds
cap.release()
cv2.destroyAllWindows()
export()
print("🛑 Capture stopped after 15 seconds.")
