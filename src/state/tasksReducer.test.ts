import {asyncActions, slice} from "../features/todolist-list/tasksReducer";
import {TaskPriorities, TaskStatus} from "../api/types";
import {todolistsActions} from "../features/todolist-list";
import {tasksType} from "../features/todolist-list/TodolistList";

const {reducer: tasksReducer}=slice
const {fetchTodolistsThunk,deleteTodolistTC,createTodolistTC}=todolistsActions
const {fetchTasksTC,createTasksTC,deleteTaskTC,updateTaskTC}= asyncActions

test('correct task should be deleted from correct array', () => {
    const startState: tasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "milk", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "tea",status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  }
        ]
    };

    const action = deleteTaskTC.fulfilled({taskId: "2",todolistId: "todolistId2"}, 'requestId',{taskId: "2",todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },

            { id: "3", title: "tea",status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const startState: tasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "milk", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "tea",status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  }
        ]
    };
    let task = {
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatus.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists',
        completed: true
    }
    const action = createTasksTC.fulfilled(task, "requestId",{title: task.title, todolistId: task.todoListId} );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
})

test('status of specified task should be changed', () => {
    const startState: tasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "milk", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "tea",status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  }
        ]
    };
    let updateModel = {taskId: '2', model: {status: TaskStatus.New}, todolistId: 'todolistId2'}

    const action = updateTaskTC.fulfilled(updateModel, "requestId", updateModel);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatus.New);
    expect(endState["todolistId2"][1].title).toBe("milk");
});

test('value of specified task should be changed', () => {
    const startState: tasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "milk", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "tea",status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  }
        ]
    };
    let updateModel = {taskId: '2', model: {title: 'yogurt'}, todolistId: 'todolistId2'}

    const action = updateTaskTC.fulfilled(updateModel,'requestId', updateModel );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("yogurt");
});
test('new array should be added when new todolist is added', () => {
    const startState: tasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "milk", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "tea",status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  }
        ]
    };
    let payload = {
        todolist: {
            id: 'blabla',
            title: 'new todolist',
            order: 0,
            addedDate: ''
        }
    }

    const action = createTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: tasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "JS", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "React", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  },
            { id: "2", title: "milk", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
            { id: "3", title: "tea",status: TaskStatus.New, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:""  }
        ]
    };

    const action = deleteTodolistTC.fulfilled({id: 'todolistId2'}, 'requestId', 'todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});




