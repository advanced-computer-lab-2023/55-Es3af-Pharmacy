Pharmacy:

Project Title:

 El7a2ni System - Integrated Pharmacy

Motivation:

 El7a2ny extends its capabilities with an integrated pharmacy platform. This feature allows patients to conveniently order prescribed medications through the system, eliminating the need for physical visits to the pharmacy. By providing a secure and efficient process for ordering medication, El7a2ny focuses on accessibility and ensures seamless integration between the virtual clinic and the pharmacy. This integrated pharmacy component is a crucial element of the El7a2ny system, contributing to a more efficient, patient-centric, and technologically advanced approach to healthcare. 

Build Status: (5 MARKS) 

UI Status:** The user interface (UI) is currently under development and may not reflect the final design or functionality. Expect ongoing updates and improvements.

Register Pharmacist:** The registration functionality for pharmacists is currently experiencing issues and is not fully operational. We are actively working on resolving this issue and will update it soon.

Code Style:

The codebase maintains a consistent style and structure across various aspects, enhancing readability and maintainability. Variable names adhere to the camelCase convention, ensuring uniformity throughout. Descriptive names for functions and variables contribute to the code's readability, making it easier to understand their purposes.
Asynchronous operations are efficiently managed using Async/Await, especially in scenarios involving database interactions or external services. Promises are also employed for handling asynchronous tasks, typically within try/catch blocks for error handling within async functions.
Error handling is structured around try/catch blocks, ensuring that errors in asynchronous operations are effectively captured and managed. Responses to different scenarios—be it success, failure, or errors—are consistently formatted in JSON, accompanied by relevant HTTP status codes such as 200 OK or 400 Bad Request, providing clear feedback to consumers of the API.
Endpoints are logically structured, following the HTTP methods and routes pattern (e.g., POST /admins, GET /admins/users), aligning with RESTful conventions. HTTP status codes are appropriately used to communicate the outcome of the request/response cycle, aiding in understanding the result of each interaction.
The codebase integrates middleware functions, such as those handling authentication using JWT tokens, seamlessly into the Express.js framework. These mechanisms indicate a focus on security, ensuring that requests are authenticated before processing, enhancing the overall robustness of the application.
Screenshots: 

![WhatsApp Image 2023-12-17 at 05 34 32_d8513947](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/4943f069-119c-48f2-be50-04eccedde6ae)
![WhatsApp Image 2023-12-17 at 05 34 50_d54d9a75](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/44fa2af9-46db-40d6-9609-a2e74c61b41f)
![WhatsApp Image 2023-12-17 at 05 35 15_0c2328f0](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/b61399ab-9041-4517-a7f4-c8fc0202893c)
![WhatsApp Image 2023-12-17 at 05 37 25_b04c9e38](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/595053)











tech/framework used: (2marks)

React
Node.js
Express
MongoDB
Mongoose
Stripe
Typescript
Git
Github Actions
MongoDB Atlas
Postman
VSCode
Nodemailer
Socket.io
Guest Features
registerPatient: Register as a new patient
pharmacistReq: Request to be a new pharmacist

As a guest I want to:
Register as a new patient
Request to be a pharmacist

Admin Features
forgetPassword: Allows users who have forgotten their passwords to reset them securely.
Login: Grants access to registered users into the system.
addAdmin: Include new administrators.
deleteUser: Remove users.
listUsers: Display user list.
getUsers: Fetch user details.
Logout: Secure log-out.
changePassword: Update login credentials.
acceptPharmacist: Approve pharmacist registrations.
rejectPharmacist: Decline pharmacist registrations.

As an Admin want to:
Reset forgotten passwords securely.
Access the system as a registered user.
Add new administrators to the system.
Remove users from the system.
View the list of registered users.
Retrieve specific user details.
Log out securely from the system.
Modify login credentials.
Approve pharmacist registrations.
Decline pharmacist registrations.

Patient Features
forgetPassword: Allows users who have forgotten their passwords to reset them securely.
Login: Grants access to registered users into the system.
changePassword: Update login credentials
getPatient: Retrieve patient details.
getPatients: Access multiple patient profiles.
viewCart: View items in the shopping cart.
addToCart: Add items to the shopping cart.
removeItem: Remove items from the cart.
checkout: Process the checkout procedure.
addItem: Add new items to the system.
addDelivery: Include delivery information.
viewOrder: Review order details.
cancelOrder: Cancel placed orders.
dropdown: Utilise dropdown functionalities.
removeMed: Delete medications from records.
checkoutSession: Initiate the checkout session.
withdrawFromWallet: Deduct funds from the wallet.
orderAddress: Specify delivery addresses.
getWallet: Retrieve wallet details.
addtoWallet: Add funds to the wallet.
getSales: Access sales records.
listReports: Generate and view reports.

As a Patient want to:
Reset forgotten passwords securely.
Grant access to registered users into the system.
Modify login credentials securely.
Retrieve patient-specific details.
Access details of multiple patient profiles.
Review items stored in the shopping cart.
Add items securely to the shopping cart.
Remove selected items from the cart.
Complete the purchase process securely.
Introduce new items into the system.
Include delivery details for orders.
Review and access order information.
Abort placed orders securely.
Utilize dropdown functionalities effectively.
Remove medications from the records securely.
Initiate and manage the checkout process.
Deduct funds securely from the wallet.
Specify and manage delivery addresses.
Retrieve and review wallet-related details.
Safely add funds to the wallet.
Access and review sales records.
Generate and view comprehensive reports.

Pharmacist Features: (5 marks) 
forgetPassword: Allows users who have forgotten their passwords to reset them securely.
Login: Grants access to registered users into the system.
changePassword: Update login credentials
getPharmacist: Retrieve pharmacist details.
addPharm: Add a new pharmacist to the system.
listPharmacists: Access a list of pharmacists.
getWallet: Retrieve wallet details for pharmacists.
addtoWallet: Add funds to the pharmacist's wallet.

As a Pharmacist want to:
Reset forgotten passwords securely.
Grant access to registered users into the system.
Modify login credentials securely.
Retrieve details of pharmacists.
Add new pharmacists to the system securely.
Access a list of pharmacists in the system.
Retrieve wallet details for pharmacists.
Securely add funds to the pharmacist's wallet.



Code examples: 
![WhatsApp Image 2023-12-17 at 05 52 04_765e3ffa](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/a1c4f24f-87ca-4a83-bc3d-8b983954d0c6)
![WhatsApp Image 2023-12-17 at 05 52 44_d69d38d6](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/5a59dc66-d8fd-4286-8077-5c03592af57f)
![WhatsApp Image 2023-12-17 at 05 53 35_b4a6997a](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/450015e9-2252-448c-9cf5-9405ae5f0c89)




Installation (2marks) // Check Reference ReadMe Links at the top//
you can install the project using git clone ‘https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy.git’ then Navigate to the backend directory and install dependencies by opening the terminal and entering these commands:
cd 55-Es3af-Pharmacy
cd backend
cd src
then run npm install to download all the needed packages using npm install : packages :
node js
express js
mongoose
react
bcrypt
cookie-parser
dotenv
jsonwebtoken
nodemon
stripe
nodemailer
axios
Bootstrap
Other backend-specific packages
Then, Navigate to the frontend directory by opening a new terminal and entering these commands : 
cd 55-Es3af-Pharmacy
cd frontend  
and install dependencies:
react
axios
bootstrap
@mui/icons-material
Other frontend-specific packages
After cloning the project or downloading the ZIP folder open the project using the integrated terminal or by using the CMD then run the frontend / backend servers
In the backend terminal: ” node App.js” to run the backend server on port :7000
In the frontend terminal: “npm start” to run the frontend server on port :4000


API References 

router.use("/medicine", medicineRoutes);
router.use("/user", userRoutes);
router.use("/patient", patientRoutes);
router.use("/pharmacist" , pharmacistRoutes);
router.use("/requestPharmacist", pharmacistRequestsRoutes);
router.get("/logout", userController.logout);
medicineRoutes.post('/unarchiveMedicine', medicineController.unarchiveMedicine);
medicineRoutes.post("/", medicineController.addMedicine);
medicineRoutes.put("/update", medicineController.updateMedicine);
medicineRoutes.get("/",medicineController.listMedicine);
medicineRoutes.get("/searchByName", medicineController.searchMedicinebyName);
medicineRoutes.get("/filter", medicineController.filterMedicinebyUse);
medicineRoutes.delete("/", medicineController.deleteMedicine);
medicineRoutes.post('/uploadImage', upload.single('image'), medicineController.uploadImage);
medicineRoutes.post('/archiveMedicine', medicineController.archiveMedicine);
patientRoutes.get("/patients", patientController.getPatients)
patientRoutes.get("/Cart", patientController.viewCart );
patientRoutes.put('/widrawFromWallet',patientController.withdrawFromWallet)
patientRoutes.post("/checkout",patientController.checkout);
patientRoutes.post("/addToCart",patientController.addToCart);
patientRoutes.post("/removeItem",patientController.removeItem);
patientRoutes.post("/addItem",patientController.addItem);
patientRoutes.post("/addDel" ,patientController.addDelivery);
patientRoutes.get("/order", patientController.viewOrder);
patientRoutes.get("/dropdown",patientController.dropdown)
patientRoutes.get("/cancel" , patientController.cancelOrder);
patientRoutes.post("/deleteMed", patientController.removeMed);
patientRoutes.post("/selectAddress", patientController.orderAddress);
patientRoutes.get("/wallet", patientController.getWallet);
patientRoutes.put('/updatePassword', userController.changePassword)
patientRoutes.post("/addwallet", patientController.addtoWallet);
pharmacistRoutes.get("/pharmacists", pharmacistController.listPharmacists);
pharmacistRoutes.get("/wallet", pharmacistController.getWallet);
pharmacistRoutes.get("/salesRep" , patientController.getSales);
pharmacistRoutes.get("/:id", pharmacistController.getPharmacist);
pharmacistRoutes.post("/pharm", pharmacistController.addPharm);
pharmacistRequestsRoutes.get("/getPharmReq",pharmacistRequestsController.getPharmacistReq);
pharmacistRequestsRoutes.post('/', upload.fields([ { name: 'IDfile', maxCount: 1 },  { name: 'WorkingLicenses', maxCount: 10 },  { name: 'PharmacyDegree', maxCount: 1 },]), pharmacistRequestsController.pharmacistReq);
userRoutes.post("/admin", userController.addAdmin);
userRoutes.get("/", userController.listUsers);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.put('/updatePassword', userController.changePassword)
userRoutes.get('/notifi', userController.getNotifications)
userRoutes.get("/salesRep" , patientController.getSales);









Tests

The api routes were tested using postman , Postman is an application used for API testing. It is an HTTP client that tests HTTP requests, utilizing a graphical user interface, through which we obtain different types of responses that need to be subsequently validated. Postman offers many endpoint interaction methods. The following are some of the most used, including their functions:
GET: Obtain information
POST: Add information
PUT: Replace information
PATCH: Update certain information
DELETE: Delete information
Examples:
![WhatsApp Image 2023-12-17 at 05 23 46_1faa16b7](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/1aa17249-6b4b-4f0c-86ac-54e824f25e72)
![WhatsApp Image 2023-12-17 at 05 23 59_52c84673](https://github.com/advanced-computer-lab-2023/55-Es3af-Pharmacy/assets/59505346/afd13e43-15df-41d0-9626-8dbed0e3a38e)
46/2dd74ab7-0321-4d35-a2e2-85c83ba482d3)


How to Use (2 marks)

Create a New Request: Click on the "New" button and select "Request" to create a new API request. Give your request a name for easy reference.

Choose HTTP Method: Select the appropriate HTTP method for your API (GET, POST, PUT, DELETE, etc.) from the dropdown menu.

Enter Request URL: In the URL field, input the endpoint URL you want to test. For instance, https://api.example.com/users.

Add Headers (if needed): If your API requires headers (such as authentication tokens or content type), you can add them by clicking on the "Headers" tab and specifying the key-value pairs.

Input Request Body (if needed): For requests that require a body (like POST or PUT), switch to the "Body" tab, choose the appropriate format (JSON, form-data, etc.), and enter the request payload.

Send the Request: Click on the "Send" button to execute the API request. You'll receive a response in the right-hand pane, displaying details like status code, headers, and the response body.

Inspect and Validate the Response: Check the response body and status code to ensure the API is working as expected. You can also view response time, cookies, and other details.

Save and Organise Requests: Save your requests for future use by clicking the "Save" button. Organise them into collections to group related requests.

Test Automation (optional): Postman allows for setting up automated tests. You can write test scripts to check if the API responses meet certain criteria, ensuring the API's functionality.

Documentation and Sharing: Postman provides the ability to generate documentation for your APIs, making it easier to share API collections with team members or other stakeholders.

Contribute (1marks)  

The project currently under development and there are some styling problems to be fixed
Credits (1mark) This includes any source that you used online for help. INCLUDING 

https://www.udemy.com/share/101Wv63@NkAA8Xr2469JcrSs1ADFQkQlyuIQYTK0pV92Y9jpo1J4w7TZZNSf2er6WlIOPxojWw==/
https://discord.gg/NDxf3hWC
https://chat.openai.com/

License (2marks)

This project is licenced under Apache Licence 2.0


