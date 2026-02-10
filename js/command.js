const main = document.querySelector("main");

function createHelpLine(command, description) {
  const line = document.createElement("p");
  line.className = "preprecommand unselectable";
  line.textContent = `${command} - ${description}`;
  return line;
}

function help() {
  const helpDiv = document.createElement("div");
  helpDiv.appendChild(createHelpLine("ls", "browse the projects"));
  helpDiv.appendChild(createHelpLine("cd", "socials"));
  return helpDiv;
}

function createSocialLine(name, href, className) {
  const line = document.createElement("a");
  line.className = className + " unselectable";
  line.textContent = name;
  line.href = href;
  line.target = "_blank";
  line.rel = "noopener noreferrer";
  return line;
}

function socials() {
  const socialDiv = document.createElement("div");
  socialDiv.className = "socials";
  socialDiv.appendChild(createSocialLine("github", "https://github.com/voidl0op", "github-link"));
  socialDiv.appendChild(document.createElement("br"));
  socialDiv.appendChild(createSocialLine("linkedin", "https://www.linkedin.com/in/salmane-sarghini-147b673aa/", "linkedin-link"));

  return socialDiv;
}

function createCommandLine() {
  const line = document.createElement("div");

  const user = document.createElement("p");
  user.className = "preprecommand unselectable";
  user.textContent = "> user@voidfolio:";

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

      const outputLine = document.createElement("div");

      switch (value) {
        case "help":
          {
            const helpContent = help();
            outputLine.appendChild(helpContent);
          }
          break;
        case "cd":
          {
            const socialsContent = socials();
            outputLine.appendChild(socialsContent);
          }
          break;
        default:
          {
            const output = document.createElement("p");
            output.className = "output";
            output.textContent = `Unknown command: ${value}`;
            outputLine.appendChild(output);
          }
      }

      main.appendChild(outputLine);

      createCommandLine();
    }
  });
}

createCommandLine();
