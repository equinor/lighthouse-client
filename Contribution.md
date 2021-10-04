## Code Conventions

-   Strive for **clean code** (and what to look for in code reviews/PRs)
    -   Use well defined function/variable names. (A well defined name is much better than comments, which often quickly get outdated/obsolete)
    -   Function names should tell what a function does. Bad: OnClick()/HandleOnClick() **Good: OpenTag()**
    -   Avoid negative names. **Good: IsActive IsEnabled**. Bad IsInActive/IsDeactivated IsDisabled. If(IsEnabled) is eaier to read than if(!isDisabled) <- (double not)
    -   Single Responsibility - A Function/Class should only do one thing. Split into sub functions.
    -   Use **PURE** functions to Avoid hidden side effects. It also makes it a lot easier to add Unit Tests
    -   **Avoid Code smells** like: Code duplication, Long method, Long class, Long parameter list. etc
    -   **No Magic numbers** or strings! Bad: const time = 600000; **Good: const millisecondsInTenMinutes = 10 _ 60 _ 1000;**
    -   Write code in a way that the compiler finds the BUGS! **Avoid ANY**. Define variables as optional/nullable in interfaces.
    -   Try to split UI and Logic in different files. Ideally the UI shouldn't contain any logic. Logic also wants to get unit tested.
    -   Favor functional programming over imperative programming: Use map, filter, find, etc instead of loops/ifs
    -   Prefer **immutable** objects/interfaces
    -   Avoid premature optimization - benchmark first.
-   **Fix** all **eslint warnings and errors** in your files.
-   Always checkin the code in better shape than you found it, fix/cleanup smaller things as you edit a file.

### VSCode plugins for better code

We use several extensions that helps keeping the code clean. Visual studio Code will give suggestions on which plugins should be installed with this project.

We have enabled strict eslint rules, which will give errors/warnings if the code doesn't follow our standard guidlines. All these must be fixed before merge to dev.

Must have plugins:

-   Code Spell Checker: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
-   ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
-   Prettier - Code formatter: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
-   SonarLint: https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode

Other usefull plugins:

-   GitHub Pull Requests and Issues: https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github
-   Import Cost: https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost
-   Azure App Service https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice
-   Docker: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
