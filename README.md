# dyenco-web-frontend

Welcome to the DYENCO Training Buddy project's GUI repository! This project aims to provide a user-friendly interface for controlling and monitoring the Training Buddy robot. You can visit the live deployment of this project at https://dyenco.berkinanik.com.

DYENCO Training Buddy is a table tennis ball launcher robot designed and developed by the DYENCO team members in Middle East Technical University, Electrical-Electronics Engineering Department for the Capstone Project in 2022-2023. The robot is designed to be used in tennis training sessions to help players improve their skills. The robot can be controlled using a web application, which allows users to set various parameters, including the speed, spin, and direction of the ball. The robot can also be controlled using voice commands. Project details can be found in this [page](http://capstone.eee.metu.edu.tr/project-fair-2022-2023/#DYENCO).

### Features

#### GUI Interface:

The project utilizes React with Chakra UI components to create a visually appealing and intuitive user interface.

#### Voice Control:

With the help of the `react-speech-recognition` library, users can control the DYENCO Training Buddy using voice commands.

#### Real-time Data:

The application provides real-time data feedback on various parameters, including voltage levels on stepper motor, servo motors, and DC motors via polling the backend running on the raspberry.

#### Target Selection:

Users can interact with the virtual table tennis table and select target areas where the ball will be aimed.

### Dependencies

The project developed using Node v18, TypeScript and yarn. Project's major dependencies are listed below:

- Vite
- React 18
- Chakra UI
- React Query
- Axios
- React Router
- React Hook Form
- Zod
- React Speech Recognition

## Installation

`main` branch contains the latest version of the project which were designed to be work with the deployed backend application on the raspberry pi. If you want to run the project locally, you should use the `preview` branch which is updated by mocking the axios client for the backend requests. The application on gh-pages is also deployed from the `preview` branch.

Clone the repository:

```bash
git clone -b preview https://github.com/berkinanik/dyenco-web-frontend.git
```

Navigate to the project directory:

```bash
cd dyenco-web-frontend
```

Install the dependencies:

```bash
yarn install --frozen-lockfile
```

Run the project:

```bash
yarn dev --port 3000
```

The project will be running on http://localhost:3000.

License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details

Contact
If you have any questions or suggestions regarding this project, feel free to contact me at berkin@berkinanik.com.
