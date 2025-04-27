export enum ActionType {
  CreateFile,
  ModifyFile,
  DeleteFile,
  CreateFolder,
  DeleteFolder,
  RenameFolder,
  RunScript,
}


/**
 * 
 * @param response 
 * 
 * input: string
 *  <boltArtifact id="todo-api" title="Todo API with Node.js and Express">
        <boltAction type="file" filePath="package.json">
          {
            "name": "todo-api",
            "version": "1.0.0",
            "description": "A simple todo API",
            "main": "index.js",
            "scripts": {
              "start": "node index.js"
            },
            "dependencies": {
              "express": "^4.18.2"
            }
          }
    </boltAction>
    <boltAction type="shell">
      npm install --yes
    </boltAction>
    <boltAction type="file" filePath="index.js">
      const express = require('express');
      const app = express();
      const port = 3000;
      let todos = [];
      app.use(express.json());
      app.get('/todos', (req, res) => {
        res.json(todos);
      });
      app.post('/todos', (req, res) => {
      const todo = req.body;
        todos.push(todo);
        res.status(201).json(todo);
      });

      app.put('/todos/:id', (req, res) => {
      const id = parseInt(req.params.id);

      const updatedTodo = req.body;
        todos[id] = updatedTodo;
        res.json(todos[id]);
      });
      app.delete('/todos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        todos.splice(id, 1);
        res.status(204).send();
      });

      app.listen(port, () => {
        console.log(`Todo API listening on port ${port}`);
      });
    </boltAction>
    <boltAction type="shell">
      node index.js
    </boltAction>
  </boltArtifact>
 * 
 * output:
 *  
 * [
 *  {
 *    title:'Project file',
 *     status:'Pending',
 *  },
 *   {
 *    title:'create package.json',
 *    type: ActionType.CreateFile,
 *    filePath: "package.json",
 *    code :`
 *     {
            "name": "todo-api",
            "version": "1.0.0",
            "description": "A simple todo API",
            "main": "index.js",
            "scripts": {
              "start": "node index.js"
            },
            "dependencies": {
              "express": "^4.18.2"
            }
          }
 * `
 *   },{
 *  title:'Run command',
 * code: 'npm install --yes',
 * status:'Pending'
 * type : ActionType.RunScript
 * }
 * 
 * ]
 * 
 * the input can have multiple boltAction tags
 * the input can have strings in the middle they need to be ignored
 */

export const xmlParser = (response: string) => {
  const actions: any[] = [];

  // Remove code block markers if present
  response = response.replace(/```html|```/g, "").trim();

  // Extract all <boltAction> tags
  const actionRegex = /<boltAction[^>]+type="([^"]+)"[^>]*>([\s\S]*?)<\/boltAction>/g;
  let match;

  while ((match = actionRegex.exec(response)) !== null) {
    const type = match[1];
    let content = match[2].trim();

    // Handle CDATA sections if present
    const cdataMatch = content.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
    if (cdataMatch) {
      content = cdataMatch[1].trim();
    }

    if (type === "file") {
      const filePathMatch = match[0].match(/filePath="([^"]+)"/);
      if (filePathMatch) {
        actions.push({
          title: `Create ${filePathMatch[1]}`,
          type: ActionType.CreateFile,
          filePath: filePathMatch[1],
          code: content,
        });
      }
    } else if (type === "shell") {
      actions.push({
        title: "Run command",
        code: content,
        status: "Pending",
        type: ActionType.RunScript,
      });
    }
  }

  // Adding project file info
  actions.unshift({
    title: "Project file",
    status: "Pending",
  });

  return actions;
};

