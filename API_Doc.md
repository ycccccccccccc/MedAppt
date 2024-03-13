# MedAppt API Documentation

## URL example

http://localhost:3000

---

## User

### User Sign Up API

* **End Point:** `/user/signup`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Content-Type | String | Only accept `application/json`. |

* **Request Example:**

  `http://localhost:3000/user/signup`

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| phone | String | Required |
| password | String | Required |

* **Request Body Example:**

```
{
  "phone":"0912345678",
  "password":"test"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| access_token | String | Access token from server. |
| user | `User Object` | User information |

* **Success Response Example:**

```
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6joiYXJ0aHVIjoxNjEzNTY3MzA0fQ.6EPCOfBGynidAfpVqlvbHGWHCJ5LZLtKvPaQ",
    "user": {
      "id": 1,
      "phone": "0912345678"
    }
  }
}
```

* **Email Already Exists: 403**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |


----
### User Sign In API

* **End Point:** `/user/signin`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Content-Type | String | Only accept `application/json`. |

* **Request Example:**

  `http://localhost:3000/user/signin`

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| phone | String | User's phone |
| password | String | User's password |

* **Request Body Example:**

```
{
  "phone":"0912345678",
  "password":"test"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| access_token | String | Access token from server. |
| user | `User Object` | User information |

* **Success Response Example:**

```
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6joiYXJ0aHVIjoxNjEzNTY3MzA0fQ.6EPCOfBGynidAfpVqlvbHGWHCJ5LZLtKvPaQ",
    "user": {
      "id": 11245642,
      "name": "Pei",
      "email": "pei@appworks.tw"
    }
  }
}
```

* **Sign In Failed (Wrong Password, User Not Found, Wrong provider): 403**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

----
## Patient

### Create patient API

>Authorization

* **End Point:** `/patient`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |
| patient | `Patient Object` | Patient information |

* **Request Example:**

  `http://localhost:3000/patient`

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| name | String | Patient's name |
| identification | DATETIME | Patient's identification. |
| birthday | String | Patient's birthday |
| address | DATETIME | Patient's address |

* **Request Body Example:**

```
{
    "name": "Andy",
    "identification": "O100000000",
    "birthday": "2021-01-02",
    "address": "台北市中山區赤峰街"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| patient.id | INT | Patient's id. |

* **Success Response Example:**

```
{
    "message": "Create patient",
    "data": {
        "patient": {
            "id": 6
        }
    }
}
```

### Get patients API

>Authorization

* **End Point:** `/patients`

* **Method:** `GET`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Request Example:**

  `http://localhost:3000/patients`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| patients | Array | Array of `Patient Object`. |

* **Success Response Example:**

```
{
    "message": "Get patients",
    "data": {
        "patients": [
            {
                "id": 4,
                "user_id": 2,
                "name": "Banana",
                "identification": "O100000004",
                "birthday": "2021-01-02",
                "address": "屏東市萬巒鄉"
            }
        ]
    }
}
```

--- 


## Appointment

### Create appointment API

>Authorization

* **End Point:** `/appointment/:patient_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |
| Content-Type | String | Only accept `application/json`. |

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| patient_id | String | Required |


* **Request Example:**

  `http://localhost:3000/appointment/1`

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| content | String | Consultation content |
| datetime | DATETIME | Appointment |

* **Request Body Example:**

```
{
    "content": "頭痛",
    "datetime": "2024-04-10T19:00:00"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| appointment.id | INT | Appointment's id. |

* **Success Response Example:**

```
{
    "message": "Create appointment",
    "data": {
        "patient": {
            "id": 31
        }
    }
}
```

### Appointments Get API

>Authorization

* **End Point:** `/appointments`

* **Method:** `GET`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Request Example:**

  `http://localhost:3000/appointments`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| appointments | Array | Array of `Appointment Object`. |

* **Success Response Example:**

```
{
    "message": "Get appointments",
    "data": {
        "patients": [
            {
                "id": 29,
                "user_id": 2,
                "patient_id": 4,
                "content": "頭痛",
                "datetime": "2024-04-10 18:30:00",
                "created_at": "2024-03-13 11:30:16"
            }
        ]
    }
}
```

--- 

### Appointment delete API

>Authorization

* **End Point:** `/appointment/:appointment_id`

* **Method:** `DELETE`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| appointment_id | String | Required |

* **Request Example:**

  `http://localhost:3000/appointment/1`


* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| appointment.id | INT | Appointment's id. |

* **Success Response Example:**

```
{
    "message": "Delete appointment",
    "data": {
        "tasks": {
            "id": 29
        }
    }
}
```