# ReachInbox Assignment

## Overview

This project is an implementation of the ReachInbox assignment using Next.js, Tailwind CSS, and custom APIs. The application features a login page, a onebox screen, keyboard shortcuts, a custom text editor, and supports both light and dark modes.

**Hosted URL**: [one-box-3mlf.vercel.app](https://one-box-3mlf.vercel.app)

## Features

1. **Login Page**: A responsive login page as per the provided design.
2. **Onebox Screen**: Displays fetched data using API integration.
   - **GET /onebox/list**: Fetches the list of threads.
   - **GET /onebox/:thread_id**: Fetches details of a specific thread.
   - **DELETE /onebox/:thread_id**: Deletes a specific thread.
3. **Keyboard Shortcuts**:
   - Press `D` to delete a thread.
   - Press `R` to open the reply box.
4. **Custom Text Editor**:
   - Includes a "SAVE" button.
   - Supports "Variables" for text customization.
5. **Reply Functionality**:
   - Clicking "Send" sends a reply.
   - **POST /reply/:thread_id**: Sends a reply with the specified details.
6. **Light and Dark Mode**: Toggle between light and dark themes.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/reachinbox-assignment.git

 

2. **Navigate to the Project Directory**
     ```bash
      cd reachinbox-assignment


3. **Install Dependencies**

     ```bash
     npm install


4. **Run the Development Server**
     ```bash
     npm run dev
