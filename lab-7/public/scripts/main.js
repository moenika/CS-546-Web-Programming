//moenika chowdhury

var palindromeForm = document.getElementById('palindromeForm');

palindromeForm.addEventListener('submit', function(e) //submission button
{
    e.preventDefault();
    //stores values in possiblePalindrome
    var possiblePalindrome = document.getElementById("inputText").value;

    if (possiblePalindrome != ""){
        var node = document.createElement("li");
        node.className = isPalindrome(possiblePalindrome);
        var textnode=document.createTextNode(possiblePalindrome);
        node.appendChild(textnode);

        document.getElementById('palindromeList').appendChild(node);
        document.getElementById("inputText").value = "";
    } else {
        alert("Please enter a word you want to check!");
    }
}); 

//returns if the text is a palindrome or not and stores it

function isPalindrome(text){
    if (text === undefined){
        return;
    }
    var originalString = text.toLowerCase().replace(/[^\w]|_/g, "");

    var reversedString = text.toLowerCase().replace(/[^\w]|_/g, "").split("").reverse().join("");

    if (originalString == reversedString){
        return 'is-palindrome';
    } else {
        return 'not-palindrome';
    }
}