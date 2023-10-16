getAllItems();

$("#btnItemSave").click(function () {
    if (checkAllItem()){
        saveItem();
    }else{
        alert("Error");
    }

});

$("#btnGetAllItems").click(function () {
    getAllItems();
});


function ItemBindTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let itemId = $(this).children().eq(0).text();
        let itemDescription = $(this).children().eq(1).text();
        let itemQuantity = $(this).children().eq(2).text();
        let itemPrice = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemId").val(itemId);
        $("#txtItemDescription").val(itemDescription);
        $("#txtItemQuantity").val(itemQuantity);
        $("#txtItemPrice").val(itemPrice);
    })
}


function getAllItems() {
    //clear all tbody data before add
    $("#tblItem").empty();

    //get all items
    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;
        let description = itemDB[i].description;
        let quantity = itemDB[i].quantity;
        let price = itemDB[i].price;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${description}</td>
                     <td>${quantity}</td>
                     <td>${price}</td>
                    </tr>`;

        $("#tblItem").append(row);
        ItemBindTrEvents();
    }
}

function searchItem(id) {
    return itemDB.find(function (item) {
        //if the search id match with customer record
        //then return that object
        return item.id == id;
    });
}

// CRUD operation Functions
function saveItem() {
    let itemID = $("#txtItemId").val();
    //check item is exists or not?
    if (searchItem(itemID.trim()) == undefined) {

        //if the item is not available then add him to the array
        let itemDescription = $("#txtItemDescription").val();
        let itemQuantity = $("#txtItemQuantity").val();
        let itemPrice = $("#txtItemPrice").val();

        //by using this one we can create a new object using
        //the customer model with same properties
        let newItem = Object.assign({}, item);

        //assigning new values for the customer object
        newItem.id = itemID;
        newItem.description = itemDescription;
        newItem.quantity = itemQuantity;
        newItem.price = itemPrice;

        //add customer record to the customer array (DB)
        itemDB.push(newItem);
        clearItemInputFields();
        getAllItems();

    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}



$("#btnSearchItem").click(function () {
    var result = itemDB.find(({id}) => id === $("#txtsearchItemId").val());
    clearSearchItemFields();
    console.log(result);

    if (result != null) {
        $("#tblItem").empty();
        var row = `<tr><td>${result.id}</td><td>${result.description}</td><td>${result.quantity}</td><td>${result.price}</td></tr>`;
        $("#tblItem").append(row);

        $("#txtItemId").val(result.id);
        $("#txtItemDescription").val(result.name);
        $("#txtItemQuantity").val(result.age);
        $("#txtItemPrice").val(result.address);

    } else {
        CustomerNotFoundMsg();
        clearSearchCustomerFields();
    }
});

function CustomerNotFoundMsg() {
    alert("Item not found. Please check the information and try again.");
}

$("#btnItemUpdate").click(function () {
    let id = $("#txtItemId").val();
    updateItem(id);
    clearItemInputFields();
});

function updateItem(id) {
    if (searchItem(id) == undefined) {
        alert("No such Item..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this item.?");
        if (consent) {
            let item = searchItem(id);
            //if the item available can we update.?

            let itemDescription = $("#txtItemDescription").val();
            let itemQuantity = $("#txtItemQuantity").val();
            let itemPrice = $("#txtItemPrice").val();

            item.description = itemDescription;
            item.quantity = itemQuantity;
            item.price = itemPrice;

            getAllItems();
        }
    }
}

$("#btnItemDelete").click(function () {
    let id = $("#txtItemId").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(id);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        } else {
            alert("Item Not Removed..!");
        }
    }
});

function deleteItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}