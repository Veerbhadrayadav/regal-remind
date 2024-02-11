import Realm from 'realm';
import constant from '../misc/constant';


// User schema
class User extends Realm.Object {
  static get() {
    return realmObject.objects(User.schema.name);
  }
  static schema = {
    name: 'User',
    primaryKey: 'username',
    properties: {
      username: { type: 'string' },
    //   email: { type: 'string', default: 'abc@example.com' },
      tasks: { type: 'list', objectType: 'Task', default: [] },
      // Add other user-related fields as needed
    },
  };
}

// Detail schema
class Detail extends Realm.Object {
  static get() {
    return realmObject.objects(Detail.schema.name);
  }
  static schema = {
    name: 'Detail',
    primaryKey: 'date',
    properties: {
      date: { type: 'string', default: constant.TODAY },
      timeSpent: { type: 'int', default: 0 },
      info: { type: 'string', default: 'No info provided' },
      task: { type: 'linkingObjects', objectType: 'Task', property: 'details' },
      // Add other detail-related fields as needed
    },
  };
}

// Task schema
class Task extends Realm.Object {
  static get() {
    return realmObject.objects(Task.schema.name);
  }
  static schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', default: Date.now().toString() },
      completed: { type: 'bool', default: false },
      createdTimestamp: { type: 'string', default: constant.TODAY },
      currentStreak: {type: 'int', default: 0},
      daytime: {type: 'string', default: ''},
      deleted: { type: 'bool', default: false },
      description: { type: 'string' },
      maxStreak: {type: 'int', default: 0},
      progress: {type: 'float', default: 0},
      target: {type: 'int', default: 21},
      title: { type: 'string' },
      user: { type: 'linkingObjects', objectType: 'User', property: 'tasks'},
      details: { type: 'list', objectType: 'Detail', default: [] },
      // Add other task-related fields as needed
    },
  };
}

const realmObject = new Realm({ schema: [User, Detail, Task] });

export default realmObject;

// // Example of creating a user, a task, and a detail
// realm.write(() => {
//   const newUser = realm.create('User', {
//     id: '1',
//     username: 'exampleUser',
//     email: 'user@example.com',
//   });

//   const newTask = realm.create('Task', {
//     id: 'task1',
//     title: 'Example Task',
//     description: 'This is an example task.',
//     createdTimestamp: new Date(),
//   });

//   const newDetail = realm.create('Detail', {
//     id: 'detail1',
//     date: new Date(),
//     timeSpent: 120, // time spent in minutes
//     info: 'Details for the task.',
//   });

//   newTask.details.push(newDetail);
//   newUser.tasks.push(newTask);
// });

