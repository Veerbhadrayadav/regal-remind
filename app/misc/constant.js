const today = new Date().toLocaleString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  export default {
    TODAY: today,
    TASK: {
      id: Date.now(),
      createdDate: today,
      title: '',
      desc: '',
      target: 0,
      daytime: '',
      currentStreak: 0,
      maxStreak: 0,
      progress: 0,
      completed: false,
      deleted: false,
      details: '',
    },
    DATASTRUCTURE: {
      'userData': [
        {
          'user_1': [
            { TASK: 'some task with many key:value pair' },
          ]
        }
      ]
    },
    USER_DATA: 'userData'
  };
  