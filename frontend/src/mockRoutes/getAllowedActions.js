
function AllowedActions() {
    return {
      "data": {
        "user": {
          "firstName": "Bob",
          "lastName": "Marley",
          "email": "bob@yahoo.com",
          "Pages": [
            {
              "url": "/",
              "title": "Inventory",
              "icon": "pe-7s-graph",
              "component": "Inventory",
              "moduleId": 4,
              "actions": [
                {
                  "actionId": 2,
                  "actionUrl": "create-role",
                  "action": "Create Role",
                  "roleIsActive": true
                },
                {
                  "actionId": 2,
                  "actionUrl": "delete-role",
                  "action": "Delete Role",
                  "roleIsActive": true
                }
              ]
            },
            {
              "url": "/procurement",
              "title": "Procurement",
              "icon": "pe-7s-note2",
              "component": 'Procurement',
              "moduleId": 4,
              "actions": [
                {
                  "actionId": 2,
                  "actionUrl": "create-procurement",
                  "action": "Create Role",
                  "roleIsActive": true
                },
                {
                  "actionId": 2,
                  "actionUrl": "delete-role",
                  "action": "Delete Role",
                  "roleIsActive": true
                }
              ]
            },
            {
              "url": "/employees",
              "title": "Employees",
              "icon": "pe-7s-note2",
              "component": 'Employees',
              "moduleId": 4,
              "actions": [
                {
                  "actionId": 3,
                  "actionUrl": "add-employee",
                  "action": "Add employee",
                  "roleIsActive": true
                }
              ]
            }
          ]
        }
      }
    }
  }
  
  export default AllowedActions;
  