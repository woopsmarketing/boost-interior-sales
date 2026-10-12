#!/bin/zsh
# sheet.sh <shot.jpg> <slice height> <slice width in the sheet> <out.jpg> — cuts a full-page shot into columns, side by side.
in=$1; sh=$2; sw=$3; out=$4
w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$in")
h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$in")
n=$(( (h + sh - 1) / sh ))
filters=""; labels=""
for ((i = 0; i < n; i++)); do
  y=$(( i * sh )); ch=$sh; (( y + ch > h )) && ch=$(( h - y ))
  filters+="[0:v]crop=${w}:${ch}:0:${y},pad=${w}:${sh}:0:0:white,scale=${sw}:-2[s${i}];"
  labels+="[s${i}]"
done
if (( n > 1 )); then filters+="${labels}hstack=inputs=${n}"; else filters="[0:v]scale=${sw}:-2"; fi
ffmpeg -v error -y -i "$in" -filter_complex "$filters" -frames:v 1 -q:v 4 "$out"
