export const basePrompt = `Project Files:
The following is a list of all project files and their complete contents that are currently visible and accessible to you.
index.js:
\`\`\`
  // run \`node index.js\` in the terminal=
  console.log(\`Hello Node.js v\${process.versions.node}!\`);
\`\`\`
package.json:
\`\`\`
{
  "name": "node-starter",
  "private": true,
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  }
}
\`\`\`
Here is a list of files that exist on the file system but are not being shown to you:

  - package-lock.json
  - .gitignore
  - .bolt/config.json
`;
