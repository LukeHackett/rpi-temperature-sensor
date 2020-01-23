#!/usr/bin/env python3

import os
import json
import time
import argparse
import urllib.request
import Adafruit_DHT

# Sensor Settings
# Set sensor type : Options are DHT11,DHT22 or AM2302
SENSOR = Adafruit_DHT.DHT11
GPIO_PIN = os.getenv('GPIO_PIN', 17)

# Open Weather Application ID
# Sign up for an account here: https://www.openweathermap.org/ (default key is a sample key)
APP_ID = os.getenv('OPEN_WEATHER_APP_ID', 'b6907d289e10d714a6e88b30761fae22')

def argument_parser():
    parser = argparse.ArgumentParser(prog='sensor', description='description of the program')
    parser.add_argument('location', type=str, help="the sensor's local location, e.g. bedroom or lounge")
    parser.add_argument('--city', type=str, help="the sensor's city")
    parser.add_argument('--country', type=str, help="the sensor's country")
    return parser


def fetch_readings_from_sensor():
    # Use read_retry method. This will retry up to 15 times to
    # get a sensor reading (waiting 2 seconds between each retry).
    humidity, temperature = Adafruit_DHT.read_retry(SENSOR, int(GPIO_PIN))

    # Reading the DHT11 is very sensitive to timings and occasionally
    # the Pi might fail to get a valid reading. So check if readings are valid
    return temperature, humidity


def fetch_readings_from_api(city=None, country=None):
    if city and country:
        # todo add &units=metric to enable metric readings
        url = "https://samples.openweathermap.org/data/2.5/weather?q={0},{1}&appid={2}".format(city, country, APP_ID)
        response = urllib.request.urlopen(url).read()
        body = json.loads(response)
        return float(body['main']['temp']), float(body['main']['humidity'])

    return None, None


def record_reading(reading):
    # Create a json body
    body = json.dumps(reading)
    body = str(body).encode('utf-8')

    # Post Method is invoked if data != None
    # request = urllib.request.Request('', data=body)

    # Response
    # response = urllib.request.urlopen(request)

    print(body)

    return None


def epoch_in_seconds():
    return int(time.time())


def celsius_to_kelvin(value):
    return float(value + 273.15)


def celsius_to_fahrenheit(value):
    return float((value * 9/5) + 32)


def get_reading(location, celsius, humidity, timestamp=None):
    if timestamp == None:
        timestamp = epoch_in_seconds()

    return {
        'location': location,
        'temperature': {
            'celsius': round(celsius, 2),
            'kelvin': round(celsius_to_kelvin(celsius), 2),
            'fahrenheit': round(celsius_to_fahrenheit(celsius), 2)
        },
        'humidity': humidity,
        'timestamp': timestamp
    }


if __name__ == "__main__":
    # Parse the application arguments
    parser = argument_parser()
    args = parser.parse_args()

    # Use a consistent timestamp for readings
    timestamp = epoch_in_seconds()

    # Record the sensor's temperature and humidity
    sensor_temperature, sensor_humidity = fetch_readings_from_sensor()
    if sensor_temperature and sensor_humidity:
        reading = get_reading(args.location, sensor_temperature, sensor_humidity, timestamp)
        record_reading(reading)

    # Record the external location's temperature and humidity (if configured)
    location_temperature, location_humidity = fetch_readings_from_api(args.city, args.country)
    if location_temperature and location_humidity:
        reading = get_reading(args.city, location_temperature, location_humidity, timestamp)
        record_reading(reading)
