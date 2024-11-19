import { useState } from "react";

export function CreateTodo(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div>
        <input style={{padding: 10, margin: 10}} onChange={
            function(e) {
                setTitle(e.target.value);
            }
        } type="text" placeholder="title"/> <br /><br />

        <input style={{padding: 10, margin: 10}} onChange={
            function(e) {
                setDescription(e.target.value);
            }
        }  type="text" placeholder="description"/> <br /><br />

        <button style={{padding: 10, margin: 10}} onClick={
            () => {
                // axios
                fetch('http://localhost:3000/todo', {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }                    
                })
                .then(async function(res) {
                    const json = await res.json();
                    alert("Todo created");
                })
            }
        } >Add a TODO</button>
    </div>
}