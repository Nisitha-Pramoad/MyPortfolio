//validations for customer
const ITEM_ID_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_DES_REGEX = /^[a-zA-Z0-9\s.,'"!@#%$&*()-]+$/;
const ITEM_QTY_REGEX = /^\d+$/;
const ITEM_PRICE_REGEX = /^\d+(\.\d+)?$/;

//add validations and text fields to the
let i_vArray = new Array();
i_vArray.push({field: $("#txtItemId"), regEx: ITEM_ID_REGEX});
i_vArray.push({field: $("#txtItemDescription"), regEx: ITEM_DES_REGEX});
i_vArray.push({field: $("#txtItemQuantity"), regEx: ITEM_QTY_REGEX});
i_vArray.push({field: $("#txtItemPrice"), regEx: ITEM_PRICE_REGEX});

function clearItemInputFields() {
    $("#txtItemId,#txtItemDescription,#txtItemQuantity,#txtItemPrice").val("");
    $("#txtItemId,#txtItemDescription,#txtItemQuantity,#txtItemPrice").css("border", "1px solid #ced4da");
    $("#txtItemId").focus();
    setItemBtn();
}
setItemBtn();

function clearSearchItemFields() {
    $("#searchItemId").val("");
}

//disable tab
$("#txtItemId,#txtItemDescription,#txtItemQuantity,#txtItemPrice").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = i_vArray.indexOf(i_vArray.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkItemValidations(i_vArray[indexNo]);

    setItemBtn();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != i_vArray[i_vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkItemValidations(i_vArray[indexNo])) {
                i_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkItemValidations(i_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkAllItem() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkItemValidations(i_vArray[i])) return false;
    }
    return true;
}

function checkItemValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setItemBorder(true, object)
        return true;
    }
    setItemBorder(false, object)
    return false;
}

function setItemBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }
}

function setItemBtn() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnItemSave").prop("disabled", false);
    } else {
        $("#btnItemSave").prop("disabled", true);
    }

    let id = $("#txtItemId").val();
    if (searchItem(id) == undefined) {
        $("#btnItemDelete").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }
}
