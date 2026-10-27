const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const context = vm.createContext({});
vm.runInContext(source.slice(source.indexOf("\tfunction npcNamesForText("), source.indexOf("\t// Alt1's readers only")), context);
const run = code => vm.runInContext(code, context);
for (const title of ["WHAT WOULD YOU LIKE TO SAY?", "What would you like to do?", "Choose an option", "Jhallan"]) {
  assert.equal(run('dialogTitleConflicts({npcNames:["Jhallan"]}, ' + JSON.stringify(title) + ')'), false, title);
}
assert.equal(run('dialogTitleConflicts({npcNames:["Jhallan"]}, "Reldo")'), true);
assert.equal(run('matchOptions("1 Is this spot peaceful enough for you?", [{text:"Is this spot peaceful enough for you?"},{text:"Can you stop following me?"},{text:"Never mind."}],0,0)[0].text'), "Is this spot peaceful enough for you?");
console.log("6 dialogue title regression checks passed.");
