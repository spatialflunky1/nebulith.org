import os
from datetime import datetime

def get_date_filename(filename):
    return filename.split(".")[0]

date_format = "%m-%d-%Y"
def convert_str_to_date(string):
    return datetime.strptime(string, date_format)

def convert_date_to_str(date):
    return date.strftime(date_format)

def get_dates():
    featured_photo_files = os.listdir("./static/FeaturedPhoto")
    # Convert to a set and back removes duplicates
    dates = list(set(list(map(get_date_filename, featured_photo_files))))
    # Convert strings to dates for sorting and then back to strings
    dates = list(map(convert_str_to_date, dates))
    dates.sort()
    dates = list(map(convert_date_to_str, dates))
    return dates

def get_latest_date():
    return get_dates()[-1]
