import React, { Component } from "react";
import Inventory from "../components/Inventory"
import ProcurementForm from "../components/Procurement";

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
                // {
                //   "actionId": 34,
                //   "actionUrl": "errors",
                //   "action": "Errors",
                //   "roleIsActive": true
                // },
                // {
                //   "actionId": 35,
                //   "actionUrl": "followers",
                //   "action": "Followers",
                //   "roleIsActive": true
                // },
                // {
                //   "actionId": 36,
                //   "actionUrl": "users_behavior",
                //   "action": "Users Behavior",
                //   "roleIsActive": true
                // },
                // {
                //   "actionId": 37,
                //   "actionUrl": "email_statistics",
                //   "action": "Email Statistics",
                //   "roleIsActive": true
                // },
                // {
                //   "actionId": 38,
                //   "actionUrl": "sales",
                //   "action": "Sales",
                //   "roleIsActive": true
                // },
                // {
                //   "actionId": 39,
                //   "actionUrl": "tasks",
                //   "action": "Tasks",
                //   "roleIsActive": true
                // }
              ]
            },
            {
              "url": "/procurement",
              "title": "New Procurement",
              "icon": "pe-7s-note2",
              "component": 'Procurement',
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
            }
          ]
        }
      }
    }
  }
  
  export default AllowedActions;
  