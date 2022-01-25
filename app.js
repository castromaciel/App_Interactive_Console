const colors = require('colors');

const { 
  inquirerMenu,
  pause,
  readInput,
  taskListDelete,
  confirm,
  showChecklist
} = require('./helpers/inquirer');

const { 
  saveDB,
  readDB 
} = require('./helpers/saveFile');

const Tasks = require('./models/tasks');

const main = async () => {

  let opt = ''
  const tasks = new Tasks();

  const tasksDB = readDB();

  if( tasksDB ){
    tasks.uploadTasksFromArray( tasksDB )
  }

  do { 
    opt = await inquirerMenu();

    switch(opt){
      case '1':
        const desc = await readInput('Description:');
        tasks.createTask( desc );
      break;
      case '2':
        tasks.completeList();
      break;
      case '3':
        tasks.listPendingCompleted();
      break;
      case '4':
        tasks.listPendingCompleted(false);
      break;
      case '5':
        const ids = await showChecklist(tasks.listArr)
        tasks.toggleCompleted( ids )
      break;
      case '6':
        const id = await taskListDelete( tasks.listArr );
        if( id !== '0' ){
          const confirmDelete = await confirm('¿Are you sure?')
          if(confirmDelete) {
            tasks.deleteTask( id )
            console.log('\n¡Succesfully deleted!'.green);
          }
          
        }
      break;
      case '0':
        //
      break;
    }

    saveDB( tasks.listArr );

    await pause();

  } while(opt !== '0');

}

main()