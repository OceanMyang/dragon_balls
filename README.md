# Dragon Balls
## Video Demo:  https://youtu.be/44wO81BcoDM
## Description: 
Dragon Balls is a simple web game similar to gomoku. In vanilla gomoku, the player plays on a 19 * 19 go board and whoever achieves **five in a row** first -i.e. five consecutive stones- wins. 

In Dragon Balls, you can not only customize the size of your go board, but also set a **magic number** to replace **five**. The black and white stones are replaced by the dragon balls as a parody to the manga “Dragon Ball.” In the original setting, a person who successfully collects seven dragon balls is able to summon the Shenron and make a wish. In this game, you can collect your own dragon balls and summon the dragon by clicking on the go board! There is only one thing of concern: your opponent may summon the dragon before you and take away your wish! 

### File Summary
I wrote this game mainly in javascript, html and css. dragonballs.js is the source code of the game and other interactive features on the website. dbboard.html is the main html page which contains including the start screen and the game UI interface. dbstyle is the style for the game. 

### Basic Graphical Interface: 
`buildGame()` The games starts by generating a two dimensional array of nulls (a vitrual board). `renderBoard()` The virtual board is then rendered and printed to the screen. When the player clicks on a cell of the graphical board, the coordinates of that cell will be stored and results in a change to the corresponding **coordinates** on virtual board (in fact the value assigned to that position is the playing player’s name, because I’m lazy). So, after rendering, the player can see that a dragon ball appears after clicking an empty cell.

### Victory Condition Detection: 
An important thing I want to talk about is the algorithm which detects the **victory condition** (`a player summons the dragon!`). A straightforward algorithm is to check every element of the board if it is involved in a certain number in a row. However, the performance of this algorithm is horrible. Consider a board with `n * n` size. After each click, the algorithm checks for n * n cells. The players can click for at most `n * n` times (a tie). In the worst case, the total running time is `O(n^4)`. 

My algorithm is different. `visitDirection()` First, starting from the coordinates which the player clicked, the algorithm visits in one direction as far as it can until reaching out of the boundary or the opponent’s stone. In addition, it counts the number of stones in the same color in this direction. `maxSumDirection()` Next, it **sums** up the counts on two opposite directions together minus 1 (since the origin stone is counted twice). Then, it extracts the **maximum** of all these sums in all possible lines (eight possible directions but two directions in the same line give out the same sum). Finally, if ` maximum >= the magic number`, a **victory condition** occurs. Back to our consideration of the performance. Whenever a player clicks, this algorithm only checks for a constant number of cells. In the worst case of a tie, the total running time is `O(n^2)`, which is much better. Moreover, you may notice a major feature that _the number of stars on the dragon ball changes with the number of connected balls_. This feature is realized via the output from this algorithm. 

### Style:
In vanilla gomoku, two players are represented by two different colors. Generally, the first player is black and the second is white. I want to continue this convention in my game, so I designed a suitable style correspondingly. You can see this from the **status bar** right above the go board. This bar toggles between black and white corresponding to the player who is playing. Moreover, this black and white design also extends to other features, such as the big play button.

### Improvement:
There are also flaws in the source code of this project. First, it’s not efficient and abstract enough. Basically, all the functions and variables are in the typescript, but I think I should have packed them into classes. For example, I should wrap all the functions related to the board game into a single class instead of mixing them with the DOM related functions. Moreover, despite my victory condition detection, my tie condition detection still goes over the whole board with performance `O(n^2)`.

### Message:
There are still a lot of things I need to learn, but CS50 has already taught me a lot. I’m very grateful to this course. I spent three days on this project tirelessly. Thanks to CS50, I found my enthusiasm in computer science!
