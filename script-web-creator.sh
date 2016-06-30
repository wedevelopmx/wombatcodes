#!/bin/bash
echo "Hola Mundo $1"
val="/public/websites/$1/$2/$3/"
echo $val

echo $(mkdir -p .$val)
echo $(touch .$val'/index.html')

echo $4 >> .$val/'index.html'
