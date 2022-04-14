import qrcode
import cv2

def qr_create(data, file_name):
    qr = qrcode.QRCode(version=1, box_size=10, border=4)
    qr.add_data(data)
    qr.make()
    img = qr.make_image(fill_color="black", back_color="white")
    img.save("qr/" + file_name)

def qr_detect(file_name):
        img = cv2.imread('qr/' + file_name)
        detector = cv2.QRCodeDetector()
        data, bbox, straight_qrcode = detector.detectAndDecode(img)
        return data
    

def main():
    qr_create("This is Authenticity QR", "qr.png")
    qr_detect("qr.png")