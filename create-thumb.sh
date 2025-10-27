#!/bin/bash

DATE=$1

if [[ ${DATE} == "" ]]; then
    echo "Usage: $0 [date]"
    exit 1
fi

magick static/FeaturedPhoto/${DATE}.png -resize 800x static/FeaturedPhoto/${DATE}.thumb.png
# magick input.jpg -auto-orient output.png
