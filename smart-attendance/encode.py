import cv2
import os
import face_recognition
import pickle

# Image directory
folderPath = 'Images'
imgList = []
studentIDs = []

# Traverse each student folder
for studentID in os.listdir(folderPath):
    studentFolder = os.path.join(folderPath, studentID)
    if not os.path.isdir(studentFolder):
        continue  # skip non-folder files

    for imgName in os.listdir(studentFolder):
        if imgName.lower().endswith(('.png', '.jpg', '.jpeg')):
            imgPath = os.path.join(studentFolder, imgName)
            img = cv2.imread(imgPath)
            if img is not None:
                imgList.append(img)
                studentIDs.append(studentID)

print("Student IDs found:", list(set(studentIDs)))

# Generate encodings
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        faces = face_recognition.face_encodings(img)
        if faces:
            encodeList.append(faces[0])  # Only take the first face
        else:
            print("⚠️ Face not detected in one image, skipping.")
    return encodeList

encodeList = findEncodings(imgList)
encodeListWithID = [encodeList, studentIDs]

# Save to pickle file
with open("EncodeFile.p", 'wb') as file:
    pickle.dump(encodeListWithID, file)

print("✅ Encoding complete & saved to EncodeFile.p")
