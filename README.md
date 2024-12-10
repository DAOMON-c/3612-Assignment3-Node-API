  
## COMP 3612 (Fall 2024): Node API

### Overview
This is a web application developed in NodeJS with the Express Module for Assignment #3 of COMP-3612: Web Developement at Mount Royal University.
The application serves as a comprehensive Formula 1 statistics API, providing detailed race data for the 2020 through 2023 seasons. Through the provided endpoints, clients can request and access information about circuits, constructors, drivers, races, and performance statistics. The following API endpoints are made available to the client:

  
|API|Description|
|:------|:------|
|`/api/circuits/id`|Returns single circuit specified by the passed circuitId value, e.g., */api/circuits/1*|
|`/api/constructors`|Returns all constructors.|
|`/api/constructors/ref`|Returns single constructor specified by the passed constructorRef value.|
|`/api/constructorResults/mclaren/2023`|Returns the race results for a specified contructor (constructorRef value) and session.|
|`/api/drivers`|Returns all drivers|
|`/api/drivers/ref`|Returns single driver specified by the passed driverRef value, e.g., */api/drivers/piastre*|
|`/api/driverResults/ref/year`|Returns the race results for a specified driver (driverRef value) and season, e.g., */api/driverResults/piastre/2023*|
|`/api/races/season/year`|Returns all the races for the specified season, e.g.,*/api/races/season/2023*|
|`/api/races/id/id`|Returns just the specified race (raceId value), e.g., */api/races/id/1100*|
|`/api/results/race/id`|Results all the results for the specified race (raceId value), e.g., */api/results/race/1100*|
|`/api/results/season/year`|Returns all results for all the races in the season, e.g., */api/results/season/2023*|  

***The above are the only valid API calls provided by the application***

### REQUEST HANDLING
- Any requests made to undefined endpoints will result in a `404 Not found` HTTP response and return a JSON error object (format shown below). This is the default error response for any invalid API request, not to be confused with valid API requests for invalid records (invalid parameters). In the **TESTING** section, this undefined behaviour will be refrenced as ***`FALL THROUGH`*** - representing requests that `fall through` to the wildcard matcher when no defined route handles them.
````
{
"ServerError":true,
"message":"ERROR: Invalid API endpoint",
"requestedPath":"/api/"
}
````
- Requests that do use a valid API call for an invalid data record will be result in the server responding with a JSON object containing the appropriate message, e.g., */api/drivers/invalidRef* will result in the following response
````
{
  "message":"Drivers: Unable to find driver with Ref=invalidref"
}
```` 

### USING THE APPLICATION
The application is hosted on `glitch.me`, and can currently be accessed at the domain `https://messy-trusted-boron.glitch.me`  
However, since no valid API endpoint is being invoked, this will result in a ***`FALL THROUGH`***. As such, inorder to make use of the services provided by the application, clients must format their request exactly as `domain + api`  
For example to request a single circuit by its `id = 1`, the API endpoint (as shown in the table) would be `/api/circuit/1`, and then appending this endpoint to the domain would result in a request URL of:  
`https://messy-trusted-boron.glitch.me/api/circuit/1` 

### TESTING 
*The expected server response for each API call is shown below where appropriate, additionally the domain URL will be abstracted away for ease of readability, with the sole focus being on the API endpoint*

- #### Circuits route
  - **Valid Parameter:** [/api/circuits/1](https://messy-trusted-boron.glitch.me/api/circuits/1)
     
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
  - **`Invalid Parameter:`** [/api/circuits/100000000](https://messy-trusted-boron.glitch.me/api/circuits/100000000)
    
    ````
    {
      "message":"Circuits: Unable to find circuit with id=100000000"
    }
    ````
  - Any other request format is a ***FALL THROUGH***
    
- #### Constructors route
  - All
    - **Valid Request:** [/api/constructors](https://messy-trusted-boron.glitch.me/api/constructors) should return `214 constructors; constructorID:{1 to 214}`.

    - Any other request format is a ***FALL THROUGH***

  - ref
    - **Valid Parameter:** [/api/constructors/ref/ferrari](https://messy-trusted-boron.glitch.me/api/constructors/ferrari)
      
      ````
      {
        "constructorId": 6,
        "constructorRef": "ferrari",
        "name": "Ferrari",
        "nationality": "Italian",
        "url": "http://en.wikipedia.org/wiki/Scuderia_Ferrari"
      }
      ````
    - **`Invalid Parameter:`** [/api/constructors/ref/ferrariiii](https://messy-trusted-boron.glitch.me/api/constructors/ferrariiii)
        
      ````
      {
        "message": "Constructors: Unable to find constructor with ref=ferrariiii"
      }
      ````
      
    - Any other request format is a ***FALL THROUGH***
      
- #### constructorResults route
  -**Valid Parameter:** [/api/constructorResults/ferrari/2020](https://messy-trusted-boron.glitch.me/api/constructorResults/ferrari/2020) should return `44 records`, containing all of ferrari's 2020 races.

  - **`Invalid Parameter:`** Invalid constructor refrence, with a valid season: [/api/constructorResults/ferrariiii/2020](https://messy-trusted-boron.glitch.me/api/constructorResults/ferrariiii/2020)
    
    ````
    {
      "message": "ConstructorResults: Unable to find results with both ref=ferrariiii and season=2023"
    }
    ````
  - **`Invalid Parameter:`** Valid constructor refrence, with an invalid season: [/api/constructorResults/ferrari/3020](https://messy-trusted-boron.glitch.me/api/constructorResults/ferrari/3020)
    
    ````
    {
      "message": "ConstructorResults: Unable to find results with both ref=ferrari and season=3020"
    }
    ````
  - Any other request format is a ***FALL THROUGH***
    
- #### drivers route
  - All
    - **Valid Request:** [/api/drivers](https://messy-trusted-boron.glitch.me/api/drivers) should return all the drivers' records, which is `858 records` for this request.
      
    - Any other request format is a ***FALL THROUGH***

  - ref
    - **Valid Parameter:** [/api/drivers/hamilton](https://messy-trusted-boron.glitch.me/api/drivers/hamilton)
      
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
    - **`Invalid Parameter:`** [/api/drivers/afakeRefrence](https://messy-trusted-boron.glitch.me/api/drivers/afakeRefrence)
    - 
      ````
      {
        "message": "Drivers: Unable to find driver with ref=afakerefrence"
      }
      ````
    - Any other request format is a ***FALL THROUGH***
  
- #### driverResults route
  - **Valid Parameter:** [/api/driverResults/hamilton/2020](https://messy-trusted-boron.glitch.me/api/driverResults/hamilton/2020) should return `16 records` for this request.

  - **`Invalid Parameter:`** Valid driver refrence, with an invalid season: [/api/driverResults/hamilton/3020](https://messy-trusted-boron.glitch.me/api/driverResults/hamilton/3020)
    
    ````
    {
      "message": "DriverResults: Unable to find results with both ref=hamilton and year=3020"
    }
    ````
  - **`Invalid Parameter:`** Invalid driver refrence, with a valid season: [/api/driverResults/afakerefrence/2020](https://messy-trusted-boron.glitch.me/api/driverResults/afakerefrence/2020)

     ````
      {
        "message": "DriverResults: Unable to find results with both ref=afakerefrence and year=2020"
      }
     ````
  - Any other request format is a ***FALL THROUGH***  
- #### races route
  - /season/`year`
    - **Valid Parameter:** [/api/races/season/2020](https://messy-trusted-boron.glitch.me/api/races/season/2020) should return `17 records` for this request.
    - **`Invalid Parameter:`** [/api/races/season/3020](https://messy-trusted-boron.glitch.me/api/races/season/3020)
      
      ````
      {
        "message":"Races: Unable to find races for requested season=3020"
      }
      ````
      
    - Any other request format is a ***FALL THROUGH***
      
  - /id/`id`
    - **Valid Parameter:** [/api/races/id/-1](https://messy-trusted-boron.glitch.me/api/id/1085)
      
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
  
    - **`Invalid Parameter:`** [/api/races/id/-1](https://messy-trusted-boron.glitch.me/api/races/id/-1)
      
    ````
    {
      "message":"Races: Unable to find races with requested id=-1"
    }
    ````
    - Any other request format is a ***FALL THROUGH***

- #### results route
  - /race/`id`
    - **Valid Parameter:** [/api/results/race/1085](https://messy-trusted-boron.glitch.me/api/results/race/1085) should return `20 records` for this request.
      
    - **`Invalid Parameter:`** [/api/results/race/-1](https://messy-trusted-boron.glitch.me/api/results/race/-1)
      
      ````
      {
        "message":"Results: Unable to find races with requested id=-1"
      }
      ````
    - Any other request format is a ***FALL THROUGH***

  - /season/`year`
    - **Valid Parameter:** [/api/results/season/2020](https://messy-trusted-boron.glitch.me/api/results/season/2020) should return `340 records` for this request.
      
    - **`Invalid Parameter:`** [/api/results/season/3020](https://messy-trusted-boron.glitch.me/api/results/season/3020)
      
      ````
      {
        "message":"Races: Unable to find races for requested season=3024"
      }
      ````
    
    - Any other request format is a ***FALL THROUGH***

