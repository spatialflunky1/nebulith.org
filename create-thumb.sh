#!/bin/bash

DATE=$1

if [[ ${DATE} == "" ]]; then
    echo "Usage: $0 [date]"
    exit 1
fi

magick static/Photos/FeaturedPhoto/${DATE}/image.png -resize 800x static/Photos/FeaturedPhoto/${DATE}/thumbnail.png
# magick input.jpg -auto-orient output.png
