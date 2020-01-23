# RPi Temperature Sensor Client

A Raspberry Pi based temperature sensor client that collects temperature data from a DHT11 temperature module, and forwards the data onto a pre-configured endpoint.

## Getting Started

The temperature sensor client has been written in Python 3, and should work on any Raspberry Pi with Python 3 installed.

### Prerequisites

Install pip3, using:

```shell
$ sudo apt install python3-pip
```

Install the project requirements with pip, using:

```shell
$ pip3 install -r requirements.txt
```

### Usage

The temperature sensor client collects the current temperature as per the reading from the connected DHT11 and sends this data onto a pre-configured endpoint. Every reading requires a location, which can be something meaningful to the user, for example Bedroom or Lounge.

To invoke performing a reading you will need to give the reading location:

```shell
$ python3 pi-sensor.py lounge
```

In addition to reading the current local temperature, it is possible to also send a reading of the temperature based upon a given city name and country. The city name should be a valid city, while the country should be an ISO 3166 country code. For more information see the Open Weather API [documentation](https://openweathermap.org/current#name) for more details.

In order to invoke this functionality, the `OPEN_WEATHER_APP_ID` environment variable must be set.

```shell
$ export OPEN_WEATHER_APP_ID="MY_APP_ID"
$ python3 pi-sensor.py lounge --city london --country uk
```

#### Cron Setup

It is often required that the sensor will post it's reading at a set interval. The easiest way to achieve this is to setup a cron job, using the crontab editor `crontab -e`, and execute the included pi-sensor script.

To perform a reading every 15 minutes, the following entry within crontab could be added:

```
*/15 * * * * /path/to/sensor/pi-sensor
```

## Built With

* [Python 3](https://www.python.org/)
