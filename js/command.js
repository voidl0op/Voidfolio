const main = document.querySelector("main");

function createCommandLine() {
  const line = document.createElement("div");

  const user = document.createElement("p");
  user.className = "preprecommand unselectable";
  user.textContent = "user@lazyfolio:";

  const prompt = document.createElement("p");
  prompt.className = "precommand unselectable";
  prompt.textContent = "~$";

  const input = document.createElement("input");
  input.className = "command";
  input.type = "text";
  input.autofocus = true;

  line.append(user, prompt, input);
  main.appendChild(line);

  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value.trim();

      input.disabled = true;
      input.classList.add("unselectable");

      const output = document.createElement("p");
      output.className = "output";

      switch (value) {
        case "Hello":
          output.textContent = "You typed Hello!";
          break;
        case "Hi":
          output.textContent = "You typed Hi!";
          break;
        default:
          output.textContent = `Unknown command: ${value}`;
      }

      const outputLine = document.createElement("div");
      outputLine.appendChild(output);
      main.appendChild(outputLine);

      createCommandLine();
    }
  });
}

createCommandLine();
// i hate javascript