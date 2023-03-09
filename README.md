

# Food Chosen
Food Chosen is a lightweight ordering and group-buying web platform that allows users to easily place orders in the most intuitive and efficient way possible. It primarily features three main functions, which include meal group-buying, accounting calculation, and meal selection.
## How to use
Upon entering the homepage, there is a demo animation that briefly describes the functions of this website. Click "Login" to proceed, and if you do not have an account, please register first.

This website is group-oriented, so you need to enter a group to perform any actions. You can create your own group or accept invitations.

Once you enter a group, you can click on the group name at the top to access the group menu. From there, you can edit the group name and password (only available to the group owner), view the group members, order records, personal stored balance, and exit the group.

Returning to the group homepage, you can view the stores and create group orders. Within the store menu, you can view and modify the created stores and menu items, as well as add new menu items.

To start a group order, simply click "Create Group Order" and input the store, order date, and order deadline, then submit. If you're unsure about what to order, you can click "Foodchosen" at the top to have the system choose for you.

Once you have confirmed your order, you can proceed to place your order by selecting the desired quantity and clicking "Submit".

Afterwards, you can browse through the group order list to view the order details and member orders. You can check each member's order, finalize the order after all members have placed their orders, and confirm the correctness of the order before submitting it. The website will automatically calculate the bill, eliminating the need for members to constantly handle money.

## Technical Explanation
### Frontend Technology
The frontend part of this project uses JavaScript, CSS, and HTML. In JavaScript, we did not use any frameworks or libraries but used native JavaScript instead. This approach helps to make the code lightweight and reduce external library dependencies.

### Backend Technology
The backend part of the project is developed using Python language with Flask framework as the web application framework. To connect to the MySQL database, we used mysql.connector and mysql.connector.pooling packages to facilitate database management and access. Additionally, we used the JWT framework to establish a token mechanism to improve database security and created a .env file using the dotenv package to ensure that account passwords are not exposed within the project.

In terms of architecture, we adopted the MVC architecture and separated the frontend and backend. This approach improves code readability, maintainability, and extensibility.

### Deployment Technology
To facilitate easy deployment and operation of the application, we used Docker for packaging. This approach ensures consistent operation of the application across different environments and reduces issues arising from environmental differences. We deployed the application on AWS EC2 using Ubuntu as the primary operating system and Nginx as the web server to enhance the performance and security of the application. We used Git as the version control system to facilitate team collaboration and code management.

In addition, during the deployment process, we used CI/CD for automated deployment. We used Github Actions as the CI tool to automatically run tests, build Docker images, and deploy them to EC2 when code is merged into the main branch.

### Feedback
After using this website, if you have spare time, could you please help fill out a questionnaire? Thank you very much.
https://forms.gle/RNh8W65DvhfX5eH49
