# Screening Project

## Technology version:
| Name                        	| Version 	    |
|-----------------------------	|-------------- |
| Python                      	| 3.6.8      	|
| Django                      	| 2.2.2       	|
| Django-rest-framework 	    | 3.9.4       	|
| Nodejs                        | 10.15.3       |
| npm                           | 6.9.0         |


# Backend(API) project setup process

1. Create Virtual environment usnig python3
    ```
    python3 -m virtualenv venv
    ```

2. Active virtual environment
    ```
    source venv/bin/active (Linux)
    ```
    ```
    venv\Scripts\activate (Windows)
    ```
3. Clone project repository 
    
    [Click here to clone](https://github.com/theasad/screening-project.git)

4. Goto backend(API) directory
    ```
    cd screening-project/backend
    ```
    
5. Install Requirements using pip
    ```
    pip install -r requirements.txt
    ```

6. Migrate database
    ```
    python manage.py migrate
    ```

7. Run Django server on port 8000
    ```
    python manage.py runserver 
    ```
    or

    ```
    python manage.py runserver  127.0.0.1:8000
    ```

***********************************

# Front-End project setup process

1. Goto front-end directory
    ```
    cd screening-project/front-end
    ```
2. Install all packages using npm (make sure install nodejs and npm on your machine)
    ```
    npm install
    ```
4. If need to change api url then open Config.js file from front-end directory and update the API_URL with your updated link otherwise skip this step.

    ```
    const API_URL = "http://127.0.0.1:8000"
    ```

3. Now run project using npm
    ```
    npm run dev
    ```
4. Now access project url
    
      http://localhost:3000
    

***********************************
            <HappyCodding />
***********************************

