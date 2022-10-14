#!/bin/bash
while :
do

  COMMAND=`/usr/bin/nc -l [port]`

  echo COMMAND

  if [ "$COMMAND" = "power_off_signal" ]; then
    shutdown now
  else
    echo "miss"
  fi

done
