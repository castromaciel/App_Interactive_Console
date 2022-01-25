require('colors')

const showMenu = () => {

  return new Promise( ( resolve, reject )  => {

    console.log('========================='.green);
    console.log('  SELECCIONE UNA OPCION  '.green);
    console.log('=========================\n'.green);
  
    console.log(`${'1.'.green}Create a task`);
    console.log(`${'2.'.green}List tasks`);
    console.log(`${'3.'.green}List completed tasks`);
    console.log(`${'4.'.green}List pendings tasks`);
    console.log(`${'5.'.green}Complete task(s)`);
    console.log(`${'6.'.green}Delete task(s)`);
    console.log(`0.Exit\n`.red);
  
    //Here we create the userinterface
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    }) 
  
    readline.question('Select an option: ', ( opt ) => {
      readline.close();
      resolve(opt)
    })
  })
}


const pause = () => {

  return new Promise( (resolve, reject ) => {

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    }) 
  
    readline.question(`\nPress ${ 'ENTER'.green } to continue\n`, (opt) => {
      readline.close();
      resolve();
    })
  })
}

module.exports = { showMenu, pause }