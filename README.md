# loadbrk.js
loadbrk.js is a node-hill script that lets you load brk files in brick hill. that simple.

## more information
loadbrk.js is a script written in javascript that lets you load certain brk files with a simple command. it also automatically loads these files within a certain interval (default 10 minutes) so that your set is always fresh with a new map.

# instructions

## how to install
installing loadbrk.js is very simple. just plop it into your `user_scripts` directory in your node-hill server directory.

## how to use it
using loadbrk.js is also simple. loadbrk comes with some commands that you can use to do certain things. here they are:

`/load` loads a file that you specify. for example, typing `/load house` into chat would load the map `./maps/house.brk`.

`/add` adds a file to the sets in the autoload catalog. example: `/add house` adds the map `./maps/house.brk`

`/pop` removes the last added map.

`/remove` removes a certain map. example: `/remove house` removes `./maps/house.brk` from the autoload catalog.

`/guitoggle` toggles the gui that shows the current map and time until next autoload.

`/skip` resets the countdown and runs autoload, effectively skipping the current map.

`/sets` lists all sets used by the autoloader

if `flatfiledbEnabled` is true then all changes made by these commands will persist



