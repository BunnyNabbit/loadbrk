# About
loadbrk is a script written for node-hill that lets you load brk files with a simple command. it also automatically loads a new map within a certain interval (default 10 minutes) so that your set is always fresh with a new map.

# installation and instructions
installing loadbrk is very simple. just clone the repository and copy the `loadbrk.js` file into your `user_scripts` folder.

## Commands
using loadbrk is also simple. here are the commands:

`/load` loads a brk file. For example, typing `/load house` in chat will load the map at `./maps/house.brk`.

`/add` adds a set to the autoload catalog. For example, typing `/add house` adds the map `./maps/house.brk`.

`/pop` removes the last added map.

`/remove` removes a certain map (e.g. `/remove house` removes `./maps/house.brk` from the autoload catalog).

`/guitoggle` toggles the the GUI that shows the time until next autoload, among other things.

`/skip` resets the countdown and runs autoload, effectively skipping the current map.

`/sets` lists all sets in the autoload catalog.

If `flatfiledbEnabled` is set to true all of these settings will persist.

## more configuration options
loadbrk contains many configuration options that you can change in the `loadbrk.js` file. here are all of the extra configuration options:

`sets` is a hardcoded list of sets that you can use if you have set `flatfiledbEnabled` to false. If `flatfiledbEnabled` is true, this list is ignored.

`ownerAdminId` is the ID of your user. you can find your ID by going to your profile and copying the number at the end. don't forget to set this number to your ID, or else commands may not work.

`countdownDefault` is the default amount of time between autoload cycles in seconds. the default is 600 seconds, which is 10 minutes.

`guiEnable` enables or disables the GUI by default, instead of running `/guitoggle`.

if `flatfiledbEnabled` is true then all changes made by these commands will persist

`ownerAdminId` will also be saved

`flatfiledbEnabled` enables or disables the usage of flat-file-db to make maps and settings persist. if you don't have flat-file-db, either run `npm i flat-file-db` to install it or keep this disabled.

`consoleOutput` outputs some useful information to the server console, such as when an autoload occurs.
