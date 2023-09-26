// ADD THIS FUNCTIONALITY: Add a checkbox next to every website and be able to delete specific websites if the checkbox is marked
let myLeads = []
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteSingleTabBtn = document.getElementById("deleteSingleTab");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// Check if leadsFromLocalStorage is truthy 
// If so, set my leads to its value and call renderLeads()
if (leadsFromLocalStorage){ // This expression reads as if there are leadsFromLocalStorage, then do the following:
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// Function to handle delete button click
deleteSingleTabBtn.addEventListener("click", function deleteItems() {
    // Get all the checked checkboxes
    const checkedItems = ulEl.querySelectorAll("input[type='checkbox']:checked");
  
    // Loop through the checked checkboxes and remove the corresponding items
    for (let i = 0; i < checkedItems.length; i++) {
      const listItem = checkedItems[i].parentNode;
      const itemIndex = Array.prototype.indexOf.call(list.children, listItem);
  
      // Remove the list item from the DOM
      listItem.remove();
  
      // Remove the corresponding item from the array stored in localStorage
      const storedItems = JSON.parse(localStorage.getItem("myLeads"));
      storedItems.splice(itemIndex, 1);
      localStorage.setItem("myLeads", JSON.stringify(storedItems));
    }
  }) 


// deleteSingleTabBtn.addEventListener("click", function(){
//     let checkboxes = ulEl.querySelectorAll("input[type='checkbox']:checked");
//     for (let i=0; i<checkboxes.length; i++){
//         if (checkboxes[i].checked){
//             checkboxes[i].parentElement.remove();
//             // Retrieve the array from localStorage
//             let myArray = JSON.parse(localStorage.getItem("myLeads"));

//             // Find the index of the item to remove
//             // loop through the array to find the index 
//             let indexToRemove = myArray.indexOf("youtube.com");

//             // Remove the item from the array
//             if (indexToRemove > -1) {
//             myArray.splice(indexToRemove, 1);
//             }

//             // Store the modified array back in localStorage
//             localStorage.setItem("myLeads", JSON.stringify(myArray));
//         }
//     }

//     // checkboxes.forEach(function(checkbox){
//     //     if(checkbox.checked){
//     //         checkbox.parentElement.remove();
//     //     }
//     // })
// })

tabBtn.addEventListener("click", function(){
    // Grab the URL of the current tab
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // })
    // active is the current tab, current window: is the main window user is using
    // tabs is the value directly from chrome
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // tabs keyword gets a hold of the link
        myLeads.push(tabs[0].url)
        // JSON.stringify turns an array into a JSON array
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads);
    })
})

// Refactor the function so that it takes a parameter, leads, that uses
// instead of the global myLeads variable. Remember to update all invocations
// of the function as well. 
function render(leads) {
    let listItems = "";
    for (let i=0; i<leads.length; i++){
        //ulEl.innerHTML += "<li>" + myLeads[i] + " " + "</li>"
        //listItems += "<li><a target = '_blank' href='"+myLeads[i]+"'>" + myLeads[i] + " " + "</a></li>"
        // String templating 
        listItems += `
            <li> 
                <input id="checkbox-el" type="checkbox">
                <a target = '_blank' href='${leads[i]}'>${leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}


// Listen for double-clicks on the delete button
// WHen clicked, clear localStorage, myLeads, and the DOM
// Clearing the dom, just calls rendersLeads() without anything inside
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads); 
})

// When button is clicked, push the values that are in the box to the array myLeads 
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);    
    inputEl.value = ""; 
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    // JSON.parse(localStorage.getItem("myLeads"));
    render(myLeads)
});



