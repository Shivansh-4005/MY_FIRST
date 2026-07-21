// Enables quantity input when checkbox is checked, disables when unchecked
function enableQuantity(checkboxId, quantityId) {
    var checkbox = document.getElementById(checkboxId);
    var quantityInput = document.getElementById(quantityId);
    
    if (checkbox.checked) {
        quantityInput.disabled = false;
        quantityInput.value = 1;
    } else {
        quantityInput.disabled = true;
        quantityInput.value = "";
    }
}

// Calculates and displays the total bill
function showBill() {
    var total = 0;
    
    // Loop through all 5 rows
    for (var i = 1; i <= 5; i++) {
        var checkbox = document.getElementById("ps" + i);
        var quantityInput = document.getElementById("Q" + i);
        
        if (checkbox.checked) {
            var price = Number(checkbox.value);
            var qty = Number(quantityInput.value);
            total += price * qty;
        }
    }
    
    document.getElementById("billResult").innerHTML = "<h3>Total Bill: " + total + "</h3>";
}

// Clears the bill text on reset
function resetForm() {
    document.getElementById("billResult").innerHTML = "";
    
    // Disables all quantity boxes after form clears
    setTimeout(function() {
        for (var i = 1; i <= 5; i++) {
            document.getElementById("Q" + i).disabled = true;
        }
    }, 10);
}
