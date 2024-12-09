### COMP 3612 (Fall 2024): Node API

#### Overview
This is an application writting in NodeJS with a particular heavy usage of the Express Module.
The application main purpose is to provide clients with the stats of F1 series across different 
seasons. Specifically, the web application provides the following services:

|API|Description|
|:------:|:------:|
|/api/circuits|Returns all circuits.
|/api.circuits/id|Returns single circuit specified by the passed circuitId value, e.g., */api/circuits/1*|
|/api/constructors|Returns all constructors.
|/api/constructors/ref|Returns single constructor specified by the passed constructorRef value.|
|/api/constructorResults/mclaren/2023|Returns the race results for a specified contructor (constructorRef value) and session.|
|/api/drives|Returns all drivers|
|/api/drivers/ref|Returns single driver specified by the passed driverRef value, e.g., */api/drivers/piastre*|
|/api/driverResults/ref/year|Returns the race results for a specified driver (driverRef value) and season, e.g., */api/driverResults/piastr/2023*|
|/api/races/season/year|Returns all the races for the specified season, e.g.,*/api/races/season/2023*|
|/api/races/id/id|Returns just the specified race (raceId value), e.g., */api/races/id/1100*|
|/api/results/race/id|Results all the results for the specified race (raceId value), e.g., */api/results/race/1100*|
|/api/results/season/year|Returns all results for all the races in the season, e.g., */api/results/season/2023*|

** The above are the only valid api calls provided by the application ** 
- Any requests not made using the above api calls   will be met with a "404 Not found error" 
- Requests that do use a valid api call for a non-existent data record will be met with a JSON object containing a an appropriate message

#### Accessing the application 
The application currently resides at glitch.com 
To make use of any of the above api calls, form your web request as follows:
glitc



  
