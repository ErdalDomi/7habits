# 7habits
Internet and Mobile Services: Semester Project
2017
Erdal Domi
Gabriela Boyadjiyska 


1. The project
a) Our project provides an initial implementation of core features we thought would make a good complement to the book with the same title: 7 Habits of Highly Effective People. The ideas and implementation are tightly based there and as such users who are already familiar with the book will have an intuitive knowledge about how to use the website. 
b) We used the MeteorJS framework which operates with a NodeJS server and MongoDB database for the backend. For the frontend, the main components we made use of are Bootstrap3, Jquery, JqueryUI, FullCalendar and SnapSVG. We had little to no initial exposure to these libraries and technologies and as such the learning curve was quite steep. That accounts for most drawbacks in the project and leaves many features that can be implemented on further versions. Nonetheless, we achieved what we set out for and implemented all the functionality we thought were necessary for a coherent and initial website.
c) The way we structured the project was largely dictated by how our framework works. There are 4 important folders in a MeteorJS project directory: client, server, both, public. In the client folder, code that must be run on the client is placed. The same way works for server and both. Public folder is for content like images and other resources. The ‘stylesheets’ folder was created to divide styling from scaffolding and functionality. The file names are coherent and have the same name, differing only by the extensions: css, html, js. The missions.html contains information about the mission template, and so forth. 
d) The project can be setup in your local machine by the following steps: 
- Install meteor: https://www.meteor.com/install
Note: the installation may take a while and sometimes it seems like it’s stuck in windows. In linux it generally goes faster. 
-Unpack the code found on the zip file. Otherwise clone the github repository found https://github.com/ErdalDomi/7habits
-open console and navigate to the meteor directory
- ‘meteor’ to fire up the server
Note: an error is likely to appear, although it’s stated in the console error, you need to run the 
meteor npm install --save babel-runtime
command.



2. Features and functionality
Users will be greeted with 3 quotes and a sign-in button in the start page. The menu is quite simple and includes an About and Home option. When the user is logged in the logout button will appear on the left side of the menu. 
When clicking the signin button, a modal will appear prompting the user for their credentials. If users have not registered, they might do so by the help of another modal from which they can register. A small button on the right of the password will make users double check if their password is the one they want and not ask them to write it twice. 

After registering or signing in, the user will be redirected to the home page where they’ll see an svg canvas with the classic 7 Habits of Highly Effective people habit chart. When hovering on the lower habits, an animation will fill the background and show relevant text for the hovered habit. 
When clicking the proactivity habit, the user will be send to a 30-day challenge progress list. This page holds 30 elements and an ‘advance’ button. When clicking on advance the element will be filled and a quote will appear. This version has two minor restrictions for this page. A mechanism for ensuring each user can click on advance button only once per day and more (numerically) encouraging prompts. 
The mission habit, will take users to their mission statement draft. This page is quite simple too as to refrain distractions, save some insightful questions that will iterate above the writing area. 
The main part of the project is the ‘first things’ habit. The roots of this habit are the first 2 we just explained. In short, habit 1 instills a sense of possibility and responsibility, it says things are possible. Habit 2 dwells on the question, if everything is possible then, what do I want out of my life. By writing a mission statement, users can have a clearer idea of where they’re headed, which will show the what roles they have in their lives. In habit 3, after defining their roles, they write them down, together with 4 goals for each role. One might have a pirate role, where goals can be: Steal ship; Recruit crew; Find parrot; Paint flag; Once users write down the roles and goals, they can start creating events they will prioritize this week, always in focusing on the goals at hand. Add event button will make a form appear where a title, description and color will be chosen. Once created, events can be dragged into the appropriate time slots of the week users wish to commit to that goal. If the events duration is different from the default one, users can resize the even anyway they want, confined to a minimum 1-hour duration. Events conflicting for time periods will be halved. We encourage you to add many events to get a feel for the calendar. Users can also delete events by dragging them into the trash area. We and the author believe this is a more effective way of planning, since it deals with week scheduling, prioritizing and long-term roles and goals. 

3. Future work 
The book is a rich reading experience and full of ideas that can be implemented. Working with other development frameworks it is possible to further the functionality of the webapp not only to the remaining 3 habits, but to also make a more in-depth approach, especially to habit 1 and 2. Habit 1 can contain a more engaging progress checker and ways of understanding the principles of proactivity. Habit 2 can be changed to be a more encompassing guide how to realize your passions, important things in your life and how to plan and work steadily towards the goals you want. There already exist such frameworks that could be integrated nicely there. 
