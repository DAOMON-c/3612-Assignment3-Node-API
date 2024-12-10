  
## COMP 3612 (Fall 2024): Node API

### Overview
This is a web application written in NodeJS using the Express Module for Assignment #3 of COMP-3612: Web Developement.
The core purpose of the app is to provide clients with the stats of F1 series across different 
seasons, allowing them to inspect and analyse the performance of drivers and contructors across multiple seasons, . The web application specifically provides the following API services exclusively:
<br><br>

|API|Description|
|:------|:------|
|`/api/circuits/id`|Returns single circuit specified by the passed circuitId value, e.g., */api/circuits/1*|
|`/api/constructors`|Returns all constructors.|
|`/api/constructors/ref`|Returns single constructor specified by the passed constructorRef value.|
|`/api/constructorResults/mclaren/2023`|Returns the race results for a specified contructor (constructorRef value) and session.|
|`/api/drives`|Returns all drivers|
|`/api/drivers/ref`|Returns single driver specified by the passed driverRef value, e.g., */api/drivers/piastre*|
|`/api/driverResults/ref/year`|Returns the race results for a specified driver (driverRef value) and season, e.g., */api/driverResults/piastre/2023*|
|`/api/races/season/year`|Returns all the races for the specified season, e.g.,*/api/races/season/2023*|
|`/api/races/id/id`|Returns just the specified race (raceId value), e.g., */api/races/id/1100*|
|`/api/results/race/id`|Results all the results for the specified race (raceId value), e.g., */api/results/race/1100*|
|`/api/results/season/year`|Returns all results for all the races in the season, e.g., */api/results/season/2023*|

**The above are the only valid api calls provided by the application** 
- Any requests not made using these api calls will result in a `404 - Not found` HTTP response error by the server, and a JSON object response shown below, this is the default error for any API request (or lack thereof). This is the ***`FALL THROUGH`*** refrenced below, as routes return when they aren't supposed to.
````
{
"ServerError":true,
"message":"ERROR: Invalid API endpoint",
"requestedPath":"/api/"
}
````
- Requests that do use a valid api call for a non-existent data record will be result in the server responding with a JSON object containing the appropriate message, e.g., */api/drivers/invalidRef* will result in the following response
````
{
"message":"Drivers: Unable to find driver with Ref=invalidref"
}
```` 

### Accessing the application 
The application is currently hosted on `glitch.me` and can currently be accessed at the domain `https://messy-trusted-boron.glitch.me`  
However, since no valid API endpoint is being invoked, this will result in the server responding with the error messages described above. As such, inorder to make use of the services provided by the application, clients must format their request exactly as `domain + api`  
For example to request a single circuit by its `id = 1`, the API endpoint (as shown in the table above) would be `/api/circuit/1`, and then appending this endpoint to the domain would result in a request URL of:  
`https://messy-trusted-boron.glitch.me/api/circuit/1` 

### Testing 
*The domain URL will be abstracted away for ease of readability, with the sole focus on the API*

- Circuits route
  - API request for a valid record of [/api/circuits/1](https://messy-trusted-boron.glitch.me/api/circuits/1) should return: 
    ````
    {
      "circuitId": 1,
      "circuitRef": "albert_park",
      "name": "Albert Park Grand Prix Circuit",
      "location": "Melbourne",
      "country": "Australia",
      "lat": -37.8497,
      "lng": 144.968,
      "alt": 10,
      "url": "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit"
    }
    ````
  - API request for an invalid record of [/api/circuits/100000000](https://messy-trusted-boron.glitch.me/api/circuits/100000000) should return:
    ````
    {
      "message":"Circuits: Unable to find circuit with ID=100000000"
    }
    ````
  - Any other request format is a ***FALL THROUGH***
    
- Constructors route
  - All
    - API request for a valid record of [/api/constructors](https://messy-trusted-boron.glitch.me/api/constructors) should return all 214 constructors; constructorID:{1 to 214} in a JSON array object.

    - Any other request format is a ***FALL THROUGH***

  - ref
    - API request for a valid record of [/api/constructors/ref/ferrari](https://messy-trusted-boron.glitch.me/api/constructors/ferrari) should return:
      
      ````
      {
        "constructorId": 6,
        "constructorRef": "ferrari",
        "name": "Ferrari",
        "nationality": "Italian",
        "url": "http://en.wikipedia.org/wiki/Scuderia_Ferrari"
      }
      ````
    - API request for an invalid record of [/api/constructors/ref/ferrari](https://messy-trusted-boron.glitch.me/api/constructors/ferrariiii) should return:  
      ````
      {
        "message": "Constructors: Unable to find constructor with Ref=ferrariiii"
      }
      ````
    - Any other request format is a ***FALL THROUGH***
      
- constructorResults route
  - API request for a valid record of [/api/constructorResults/ferrari/2020](https://messy-trusted-boron.glitch.me/api/constructorResults/ferrari/2020) should return a JSON array of size 44, containing all the races the ferrari constructor has been in, in the season of 2020.

  - API request for an invalid constructor refrence, in a valid season of [/api/constructorResults/ferrariiii/2020](https://messy-trusted-boron.glitch.me/api/constructorResults/ferrari/2020) should return:
    ````
    {
      "message": "ConstructorResults: Unable to find results with both ref=ferrarii and season=2023"
    }
    ````
  - API request for a valid constructor refrence, in an invalid season of [/api/constructorResults/ferrariiii/3020](https://messy-trusted-boron.glitch.me/api/constructorResults/ferrari/3020) should return:
    ````
    {
      "message": "ConstructorResults: Unable to find results with both ref=ferrari and season=3020"
    }
    ````
  - Any other request format is a ***FALL THROUGH***
    
- drivers route
  - All
    - API request for a valid record of [/api/drivers](https://messy-trusted-boron.glitch.me/api/drivers) should return all the drivers' records, which is `858 records` for this request.
      
    - Any other request format is a ***FALL THROUGH***

  - ref
    - API request for a valid record of [/api/drivers/hamilton](https://messy-trusted-boron.glitch.me/api/drivers/hamilton) should return:
      ````
      {
        "driverId": 1,
        "driverRef": "hamilton",
        "number": 44,
        "code": "HAM",
        "forename": "Lewis",
        "surname": "Hamilton",
        "dob": "1985-01-07",
        "nationality": "British",
        "url": "http://en.wikipedia.org/wiki/Lewis_Hamilton"
      }
      ````
    - API request for an invalid record of [/api/drivers/afakeRefrence](https://messy-trusted-boron.glitch.me/api/drivers/afakeRefrence) should return:
      ````
      {
        "message": "Drivers: Unable to find driver with Ref=afakerefrence"
      }
      ````
    - Any other request format is a ***FALL THROUGH***
- driverResults route
  - API request for a valid record of [/api/driverResults/hamilton/2020](https://messy-trusted-boron.glitch.me/api/driverResults/hamilton/2020) should return `16 records` for this request.

  - API request for a valid driver refrence, with an invalid season of [/api/driverResults/hamilton/3020](https://messy-trusted-boron.glitch.me/api/driverResults/hamilton/3020) should return:
    ````
    {
      "message": "DriverResults: Unable to find results with both ref=hamilton and year=3020"
    }
    ````
  - API request for an invalid driver refrence, with a valid season of [/api/driverResults/afakerefrence/2020](https://messy-trusted-boron.glitch.me/api/driverResults/afakerefrence/2020) should return:
     ````
      {
        "message": "DriverResults: Unable to find results with both ref=afakerefrence and year=2020"
      }
     ````
  - Any other request format is a ***FALL THROUGH***  
- races route
  - /season/`year`
    - API request for a valid record of [/api/races/season/2020](https://messy-trusted-boron.glitch.me/api/races/season/2020) should return `17 records` for this request.
    - Any other request format is a ***FALL THROUGH***
  - /id/`id`
    - API request for a valid record of [/api/races/id/id](https://messy-trusted-boron.glitch.me/api/id/1085) should return:
    ````
    {
    "id": 1085,
    "year": 2022,
    "round": 12,
    "name": "French Grand Prix",
    "date": "2022-07-24",
    "time": "13:00:00",
    "url": "http://en.wikipedia.org/wiki/2022_French_Grand_Prix",
    "circuit": {
      "id": 34,
      "ref": "ricard",
      "name": "Circuit Paul Ricard",
      "location": "Le Castellet",
      "country": "France",
      "lat": 43.2506,
      "lng": 5.79167,
      "url": "http://en.wikipedia.org/wiki/Paul_Ricard_Circuit"
      }
    }
    ````
    - Any other request format is a ***FALL THROUGH***

- results route
  - /race/`id`
    - API request for a valid record of [/api/results/race/1085](https://messy-trusted-boron.glitch.me/api/results/race/1085) should return `20 records` for this request.
    - Any other request format is a ***FALL THROUGH***

  - /season/`year`
    - API request for a valid record of [/api/results/season/2020](https://messy-trusted-boron.glitch.me/api/results/season/2020) should return `340 records` for this request.
    - Any other request format is a ***FALL THROUGH***

