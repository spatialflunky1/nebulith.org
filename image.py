import os
from datetime import datetime
import csv
from PIL import Image
from PIL.ExifTags import TAGS
import humanize

date_format = "%m-%d-%Y"
def convert_str_to_date(string):
    return datetime.strptime(string, date_format)

def convert_date_to_str(date):
    return date.strftime(date_format)

def get_featured_dates():
    featured_photo_folders = os.listdir("./static/Photos/FeaturedPhoto")
    # Convert strings to dates for sorting and then back to strings
    dates = list(map(convert_str_to_date, featured_photo_folders))
    dates.sort()
    dates = list(map(convert_date_to_str, dates))
    return dates

def get_featured_latest_date():
    return get_featured_dates()[-1]

def get_image_file_details(filepath):
    details = ["" for i in range(3)]
    details[0] = ["" for i in range(2)]
    details[1] = humanize.naturalsize(os.path.getsize(filepath))
    try:
        with Image.open(filepath) as img:
            exif = img._getexif()
            if exif:
                for i,j in exif.items():
                    if TAGS.get(i,i) == "ExifImageWidth":
                        details[0][0] = str(j)
                    if TAGS.get(i,i) == "ExifImageHeight":
                        details[0][1] = str(j)
                    if TAGS.get(i,i) == "DateTimeOriginal":
                        details[2] = str(j)
                details[0] = "x".join(details[0])
                return details
            else:
                print(f"No EXIF data found for image: {filepath}")
    except Exception as e:
        print(f"Error: {e}")
    exit()

def get_image_details(image):
    details = []

    # 0: Path
    details.append("Photos/"+image+"/image.png")

    # 1,2,3: Size, Resolution, Photo Date
    file_info = get_image_file_details("static/Photos/"+image+"/image.png")
    details.append(file_info[0])
    details.append(file_info[1])
    details.append(file_info[2])

    # 4 and 5: Location and Taken By
    try:
        with open("static/Photos/"+image+"/details.csv", "r", newline="") as file:
            image_info = list(csv.reader(file, delimiter=","))[1]
            details.append(image_info[0])
            details.append(image_info[1])
    except Exception as e:
        print(f"Error: {e}")
            

    # 6: Short description
    try:
        with open("static/Photos/"+image+"/descriptionShort.txt", "r") as file:
            details.append(file.read())
    except Exception as e:
        print(f"Error: {e}")

    # 7: Long description
    try:
        with open("static/Photos/"+image+"/descriptionExtended.txt", "r") as file:
            details.append(file.read())
    except Exception as e:
        print(f"Error: {e}")

    return details
