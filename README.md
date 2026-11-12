# E-STRI – Local Ironing & Cleaning Service Platform

E-STRI is a web-based platform designed to connect customers with local ironing, laundry and cleaning service providers. It provides a convenient way to explore services, view vendors and make service bookings through a simple and user-friendly interface.

The project also includes AI-based price prediction and an AI chatbot to improve the customer experience.

## Features

- **Service Browsing:** Explore ironing, laundry, dry cleaning, shoe cleaning and curtain cleaning services.
- **Vendor Management:** View available vendors, their service areas, prices and ratings.
- **Online Booking:** Submit service booking details, including customer information, selected service and number of clothes.
- **Booking Management:** Store and manage customer bookings through the backend.
- **Vendor Dashboard:** Provides a dashboard-style interface for viewing orders, earnings and service availability.
- **AI Price Prediction:** Uses a Multivariate Linear Regression model to estimate service prices based on the number of clothes, service type and urgency.
- **AI Chatbot:** Uses the Google Gemini API to answer questions about E-STRI services and booking guidance.
- **Vendor Map:** Includes a map interface for displaying nearby vendors.
- **Responsive Interface:** Designed to provide a user-friendly experience across different screen sizes.

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Artificial Intelligence**
- Multivariate Linear Regression
- Google Gemini API

**Other Tools and Libraries**
- Leaflet.js
- Font Awesome
- Git and GitHub
- Visual Studio Code

## AI Implementation

### 1. AI-Based Price Prediction

E-STRI includes a machine learning model developed using Multivariate Linear Regression.

The model uses three input parameters:
- Number of clothes
- Service type
- Urgency of the service

Based on these inputs, it predicts an estimated service price.

### 2. AI Chatbot

The platform includes a chatbot integrated with the Google Gemini API. It is designed to assist users with service-related questions, vendor information and booking guidance.

## Project Structure

```text
E-STRI/
│
├── ai/
│   ├── train-model.js
│   └── training-data.js
│
├── index.html
├── services.html
├── vendors.html
├── service-detail.html
├── map.html
├── admin.html
├── vendor-dashboard.html
│
├── server.js
├── chatbot-server.js
├── bookingModel.js
├── vendorModel.js
│
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB
- Google Gemini API key

### Steps

1. Clone the repository:

```bash
git clone https://github.com/sayli-11/E-STRI.git
```

2. Navigate to the project folder:

```bash
cd E-STRI
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

5. Make sure MongoDB is running locally.

6. Start the backend server:

```bash
node server.js
```

7. Open the application in your browser:

```text
http://localhost:5000
```

## Learning Outcomes

Through this project, I gained practical experience in:

- Developing a full-stack web application.
- Building REST API endpoints using Node.js and Express.js.
- Connecting a web application to MongoDB.
- Implementing machine learning-based price prediction.
- Integrating an external generative AI API.
- Managing project files and version control using Git and GitHub.

## Future Enhancements

- User authentication and individual customer accounts.
- Online payment integration.
- Real-time booking status and order tracking.
- Improved vendor location and map-based search.
- Customer feedback and review management.
- Enhanced vendor and administrator dashboards.

## Author

**Sayli Krishnadev Shelar**

M.Sc. Artificial Intelligence Student | B.Sc. Information Technology Graduate

GitHub: https://github.com/sayli-11

LinkedIn: https://www.linkedin.com/in/saylishelar

---

*E-STRI is an academic project developed to explore web development, database integration and AI-powered features for local service management.*