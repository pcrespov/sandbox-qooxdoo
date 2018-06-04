#!/bin/bash


if test "$0" = "qx"
then

else
  python generator.py

for FILE1 in "$@" 
do
wc $FILE1
done