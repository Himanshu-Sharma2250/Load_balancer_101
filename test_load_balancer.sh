#!/bin/bash

# Number of request to send
REQUESTS=10

# URL of your load balancer
URL="http://localhost:3000"

# Loops to send requests
for ((i=1; i<=REQUESTS; i++)); do
    curl $URL &
done

wait
echo "All requests have been sent."