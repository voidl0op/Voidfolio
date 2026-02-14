const main = document.querySelector("main");

const fileSystem = {
  "about.txt": "I'm a 🇲🇦 moroccan university engineering student with some free time on my hands, trying to make the best possible use of it.",
  projects: {
    portfolio: "This website you are currently looking at. Built with Vanilla JS.",
  },
  "contact.txt": "ss.sarghini@gail.com",
  secrets: {
    "plan.txt": "I hate Javascript",
  },
};

let currentPath = [];
let commandHistory = [];
let historyIndex = -1;

/* helpe */
function getDir(path) {
  let current = fileSystem;
  for (const folder of path) {
    if (current[folder] && typeof current[folder] === "object") current = current[folder];
    else return null;
  }
  return current;
}

function getPromptString() {
  return currentPath.length ? "~/" + currentPath.join("/") + "$" : "~$";
}

function scrollToBottom() {
  main.scrollTop = main.scrollHeight;
}

function printOutput(content, className = "output") {
  const div = document.createElement("div");
  div.className = className;

  if (typeof content === "string") div.textContent = content;
  else div.appendChild(content);

  main.appendChild(div);
}

function createSocials() {
  const div = document.createElement("div");
  div.className = "grid-output";

  [
    { name: "GitHub", url: "https://github.com/voidl0op" },
    { name: "LinkedIn", url: "https://linkedin.com/in/salmane-sarghini-147b673aa/" }
  ].forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.textContent = link.name;
    div.appendChild(a);
  });

  return div;
}

/* commands */
const commands = {
  help() {
    printOutput(
`Available commands:
 ls
 cd [dir]
 cat [file]
 whoami
 socials
 date
 clear
 help`
    );
  },

  socials() { printOutput(createSocials()); },
  whoami() { printOutput("user@voidfolio - Main User"); },
  date() { printOutput(new Date().toString()); },
  clear() { main.innerHTML = ""; },

  ls() {
    const dir = getDir(currentPath);
    if (!dir) return;

    const div = document.createElement("div");
    div.className = "grid-output";

    Object.keys(dir).forEach(item => {
      const span = document.createElement("span");
      const isDir = typeof dir[item] === "object";
      span.textContent = isDir ? item + "/" : item;
      span.style.color = isDir ? "var(--blue)" : "var(--green)";
      div.appendChild(span);
    });

    printOutput(div);
  },

  cd(args) {
    const target = args[0];
    if (!target) return (currentPath = []);
    if (target === "..") return currentPath.pop();

    const dir = getDir(currentPath);
    if (dir[target] && typeof dir[target] === "object") currentPath.push(target);
    else printOutput("cd: no such directory: " + target, "output error");
  },

  cat(args) {
    const name = args[0];
    if (!name) return printOutput("usage: cat [file]", "output error");

    const dir = getDir(currentPath);
    const content = dir[name];

    if (!content) printOutput("cat: " + name + ": No such file", "output error");
    else if (typeof content !== "string") printOutput("cat: " + name + ": Is a directory", "output error");
    else printOutput(content);
  }
};

/* input */
function createCommandLine() {
  const line = document.createElement("div");
  line.className = "command-line";

  const user = document.createElement("span");
  user.className = "user unselectable";
  user.textContent = "user@voidfolio:";

  const prompt = document.createElement("span");
  prompt.className = "prompt unselectable";
  prompt.textContent = getPromptString();

  const input = document.createElement("input");
  input.className = "command";
  input.autocomplete = "off";

  line.append(user, prompt, input);
  main.appendChild(line);

  input.focus();
  scrollToBottom();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const raw = this.value;
      const [cmd, ...args] = raw.trim().split(/\s+/);

      this.disabled = true;
      this.classList.add("unselectable");

      if (raw.trim()) {
        commandHistory.push(raw);
        historyIndex = commandHistory.length;
      }

      if (cmd && commands[cmd]) commands[cmd](args);
      else if (cmd) printOutput("command not found: " + cmd, "output error");

      createCommandLine();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) this.value = commandHistory[--historyIndex];
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1)
        this.value = commandHistory[++historyIndex];
      else {
        historyIndex = commandHistory.length;
        this.value = "";
      }
    }
  });
}

/* init */
document.addEventListener("click", () => {
  const input = document.querySelector("input.command:not(:disabled)");
  if (input) input.focus();
});

createCommandLine();
