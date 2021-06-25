import {tasksType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolistsReducer";
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

    const action = removeTaskAC("2", "todolistId2");

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
            { id: "2", title: "milk", status: TaskStatus.Complited, addedDate:"", order:0
                , priority: TaskPriorities.Hi, completed: true, todoListId:""
                , description:"", deadline:"", startDate:"" },
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

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][3].title).toBe("juce");
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

    const action = changeTaskStatusAC("2", TaskStatus.New, "todolistId2");

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

    const action = changeTaskTitleAC("2", "NEWNAME", "todolistId2");

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

    const action = AddTodolistAC("new todolist");

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

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});




