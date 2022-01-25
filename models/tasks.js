const Task = require('./task')
/*
  _list: 
    {'uuid-1234123-12344123-2: { id:12, desc:asdasd, completedIn:92231} };
*/

class Tasks {

  _list = {};

  get listArr() {

    const list = [];
    Object.keys(this._list).forEach( key => {
      const task = this._list[key]
      list.push( task );
    })

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask( id = ''){
    if( this._list[id] ){
      delete this._list[id];
    }
  }

  uploadTasksFromArray( tasks = [] ){

    tasks.forEach( t => {
      this._list[t.id] = t

    })
  }

  createTask( description = ''){
  
    const task = new Task(description); 
    this._list[task.id] = task;
  }

  completeList( ){
    console.log();
    this.listArr.forEach( (task, index) => {

      const i = `${index+1}`.green;
      const { description, completedIn } = task;
      const state = ( completedIn )
                      ? 'Completed'.green
                      : 'Pending'.red
      console.log(`${i}. ${description} :: ${state}`);


    })
  }

  listPendingCompleted( completed = true) {
    console.log();
    let contador = 0;
    this.listArr.forEach( task => {

      const { description, completedIn } = task;

      const state = ( completedIn )
                      ? 'Completed'.green
                      : 'Pending'.red

      if(completed){
        //Show completed tasks
        if(completedIn){
          contador ++
          console.log(`${(contador + '.').green} ${description} :: ${completedIn.green}`);
        }
      } else{
        //Show pendings tasks
        if(!completedIn){
          contador ++
          console.log(`${(contador + '.').green} ${description} :: ${state}`);
        }
      }

    })

  }

  toggleCompleted( ids = [] ){

    ids.forEach( id => {

      const task = this._list[id];
      if ( !task.completedIn ) task.completedIn = new Date().toISOString()

    })
  }

}

module.exports = Tasks