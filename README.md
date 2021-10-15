# Quorah_Solo_Project
A Quora Clone using Express, React, Redux, Thunk, CSS, Node


Quorah is an online website where you can share questions by posting to the main feed. User can compose their question filled with whatever your heart desires! Users can leave comments under a user's question. You can also like said user's question too! Our goal of Quorah is to allow people a space to share their questions with others, learn from others, seek help with others, the potentials are limitless!

#Link to Quorah website live on Heroku https://quorah.herokuapp.com/

# Dynamic features
 * Comments
  *As a logged-in user, you can post and delete owned comments. Utilizing React and Redux State, the website can update the page without the need of refreshing or being routed/redirected.
  *Likes
    *As a logged-in user, you can like a question. However, each user is only able to like a particular question once, re-clicking the like will remove the like for that story. This is done dynamically via Redux State meaning this page does also not need to be refreshed, rendered, or redirected.
Breakthroughs
Creating and Delete comments
Implementing these features proved to be no easy task. To have these features working dynamically I had to manipulate Redux State. A particular part that was quite challenging, was creating the comments (dynamically). 
# Technology
I used a variety of technologies throughout this project. For the backend, I used Postgres and Sequelize to create our database system. I use Express to build our frontend routes. I use the middleware csurf to secure our routes, along with validators to ensure that I only receive what I intend to from the user's inputs. For the frontend structure, React, this helped remove the amount of boilerplate code that would have had to been written. To style I used CSS, adding stylesheets to each React component makes changes to elements more appealing. All of these technologies allowed us to have complete control over the looks and functionality of our application!

I hope you enjoy it!
