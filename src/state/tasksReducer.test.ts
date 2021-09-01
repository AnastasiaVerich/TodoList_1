import {tasksType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../features/todolist-list/tasksReducer";
import {AddTodolistAC, RemoveTodolistAC} from "../features/todolist-list/todolistsReducer";
import {TaskPriorities, TaskStatus} from "../api/todolist-api";

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

    const action = removeTaskAC({taskID: "2",todolistId: "todolistId2"});

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

    const action = addTaskAC({title:"juce", todolistId:"todolistId2", taskId:"3"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.Complited);
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

    const action = changeTaskStatusAC({taskID: "2", status:TaskStatus.New,  todolistId:"todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatus.New);
    expect(endState["todolistId2"][1].title).toBe("milk");
});

test('title of specified task should be changed', () => {
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

    const action = changeTaskTitleAC({taskID:"2",title: "NEWNAME",todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("NEWNAME");
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

    const action = AddTodolistAC({ title:"new todolist", id:"111"});

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

    const action = RemoveTodolistAC({id:"todolistId2"});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});




