// write express boilerplate code 
// write express.json() middleware


const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const app = express();

app.use(express.json());

app.post("/todo", async (req, res) => {
    const createPaylode = req.body;
    const parsePaylode = createTodo.safeParse(createPaylode);

    if(!parsePaylode.success){ 
        return res.status(411).json({
            msg: "You pass the wrong input",
        })

    }
    
    // put it in mongoDB
    await todo.create({
        title: createPaylode.title,
        description: createPaylode.description,
        completed: false,
    });

    res.json({
        msg: "Todo Created"
    })

});

app.get("/todos", async (req, res) => {
    try {
        const todos = await todo.find({});
        res.json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            msg: "Failed to fetch todos",
            error,
        });
    }
});


// app.get("/todos", async (req, res) => {
//     const todos = await todo.find();
//     console.log(todos);

//      res.json({
//         todos
//     })
// });

app.put("/completed", async (req, res) => {
    const updatePaylode = req.body;
    const parsePaylode = updateTodo.safeParse(updatePaylode);

    if(!parsePaylode.success) {
        res.status(411).json({
            msg: "you pass the wrong input"
        })
        return
    }

    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "Todo mark as completed"
    })
});

app.listen(3000);

