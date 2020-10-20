function clickElement(element) {
    try {
        element.trigger("click");
    } catch(err) {
        var event = new MouseEvent("click", {view: window, cancelable: true, bubbles: true});
        element.dispatchEvent(event);
    }
}

function type(element, val) {
    try {
        element.trigger("keypress", {which: 50});
    } catch(err) {
        let event = new KeyboardEvent("keypress", {key: val});
        element.dispatchEvent(event);
    }
}

function rgb2hex(color) {
    var digits = /(.*?)rgba\((\d+), (\d+), (\d+), (\d+)\)/.exec(color);
    if (digits == null) {
        digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    }
    var red = parseInt(digits[2],10);
    var green = parseInt(digits[3],10);
    var blue = parseInt(digits[4],10);
    var rgb = blue | (green << 8) | (red << 16);
    if(red == 0){
        return digits[1] + '#00' + rgb.toString(16);
    }else{
        return digits[1] + '#' + rgb.toString(16);
    }
}


suite("HTML tests", function() {
    test("#Unit test 1 testing page title", function(){
        chai.assert.ok($(document).attr('title').indexOf("Temperature Monitor")!=-1,"Checking that the page title is Temperature Monitor");
    });

    test("#Unit test 2 checking for div presence", function() {
        chai.assert.equal($("#monitor").prop("tagName"), "DIV", "Checking that \'monitor\' is a div");
    });

    test("#Unit test 3 testing for heading presence", function(){
        chai.assert.equal($("#heading").prop("tagName"), "H1", "Checking h1 element exists.");
        chai.assert.equal($("#heading").html(), "Temperature Monitor", "Checking heading has the correct value");
    });

    test("#Unit test 4 testing for text input element presence", function(){
        chai.assert.equal($("#temperature").prop("tagName"), "INPUT", "Checking that \'temperature\' is an input.");
        chai.assert.equal($("#temperature").prop("type"), "text", "Checking that \'temperature\' is a text input.");
        chai.assert.equal($("#temperature").val(), "Enter temperature", "Checking that \'temperature\' has correct initial message");
    });

    test("#Unit test 5 testing for checkbox element presence", function() {
        chai.assert.equal($("#fahrenheit").prop("tagName"), "INPUT", "Checking that \'fahrenheit\' is an input.");
        chai.assert.equal($("#fahrenheit").prop("type"), "checkbox", "Checking that \'fahrenheit\' is a checkbox input.");
    });

    test("#Unit test 6 testing for label presence", function(){
        chai.assert.equal($("#fahrenheit_lbl").prop("tagName"), "LABEL", "Checking that \'farenheit_lbl\' is a label");
        chai.assert.equal($("#fahrenheit_lbl").prop("for"), "fahrenheit", "Checking that \'fahrenheit_lbl\' refers to the correct element");
        chai.assert.equal($("#fahrenheit_lbl").html(), "Fahrenheit", "Checking that \'fahrenheit_lbl\' has the correct value");
    });

    test("#Unit test 7 testing for \'output\' element", function(){
        chai.assert.equal($("#output").prop("tagName"), "P", "Checking p element \'output\' exists.");
    });

    test("#Unit test 8 testing for \'date\' element", function(){
        chai.assert.equal($("#date").prop("tagName"), "P", "Checking p element \'date\' exists.");
    });

    test("#Unit test 9 testing for the \'check\' button", function() {
        chai.assert.equal($("#check").prop("tagName"), "BUTTON", "checking that the element with id \'check\' is a button");
        chai.assert.equal($("#check").text(), "Check temperature", "checking that the button with id \'check\' has the text 'Check temperature'");
    });

    test("#Unit test 10 testing for the \'reset\' button", function() {
        chai.assert.equal($("#reset").prop("tagName"), "BUTTON", "checking that the element with id \'reset\' is a button");
        chai.assert.equal($("#reset").text(), "Reset", "checking that the button with id \'check\' has the text 'Reset temperature'");
    });

    test("#Unit test 11 testing the buttons are disabled", function() {
        chai.assert.isTrue($("#reset").prop("disabled"), "Both buttons should be disabled");
    });
});


suite("CSS tests", function() {
    test("#Unit test 12 testing body background colour", function(){
        chai.assert.equal(rgb2hex($("body").css("background-color")), "#ffff99", "Checking body background colour is #ffff99");
    });

    test("#Unit test 13 testing body font", function() {
        chai.assert.equal($("body").css("font-family"), "Arial", "Checking body font family is Arial");
    });

    test("#Unit test 14 testing h1 font size", function() {
        chai.assert.equal($("#heading").css("font-size"), "24px", "Checking that the font size of the level-one heading is 24px");
    });

    test("#Unit test 15 testing monitor background", function(){
        chai.assert.equal(rgb2hex($("#monitor").css("background-color")), "#aeaeae", "Checking 'monitor' background colour is #aeaeae");
    });

    test("#Unit test 16 testing monitor width", function(){
        chai.assert.ok(parseInt($("#monitor").css("width").replace('px',''),10)-200>-1.0,"checking that the \'monitor\' element width is no less than -1.0 away from 200");
        chai.assert.ok(parseInt($("#monitor").css("width").replace('px',''),10)-200<1.0,"checking that the \'monitor\' element width is no more than 1.0 away from 200");
    });

    test("#Unit test 17 testing border of monitor element", function(){
        chai.assert.equal($("#monitor").css("border-width"), "1px", "Checking that preview has a 1px border");
        chai.assert.equal($("#monitor").css("border-style"), "solid", "Checking that preview has a solid border");
        chai.assert.equal(rgb2hex($("#monitor").css("border-color")), "#101010", "Checking border colour is #101010");
    });

    test("#Unit test 18 checking button background colour", function() {
        chai.assert.equal(rgb2hex($("button").css("background-color")), "#585858", "Buttons have wrong background colour");
        chai.assert.equal(rgb2hex($("button").css("color")), "#ffffff", "Buttons have wrong foreground colour");
    });

    test("#Unit test 19 testing output paragraph width", function(){
        chai.assert.ok(parseInt($("#output").css("width").replace('px',''),10)-100>-1.0,"checking that the \'output\' element width is no less than -1.0 away from 100");
        chai.assert.ok(parseInt($("#output").css("width").replace('px',''),10)-100<1.0,"checking that the \'output\' element width is no more than 1.0 away from 100");
    });

    test("#Unit test 20 testing the foreground colour of the label", function() {
        chai.assert.equal(rgb2hex($("#fahrenheit_lbl").css("color")), "#1000fe", "Label has wrong foreground colour");
    });
});

suite("JavaScript tests", function() {
    test("#Unit test 21 testing that the reset button is not disabled if the check button has been clicked", function() {
        // console.log("pre-click, reset button is disabled: " + $("#reset").prop("disabled"));

        clickElement($("#check"));

        // $("#reset").prop("disabled", false);

        // console.log("post-click, reset button is disabled: " + $("#reset").prop("disabled"));
        //if disabled is false
        chai.assert.isFalse($("#reset").prop("disabled"), "Reset button should be not be disabled if check has been clicked");
    });

    test("#Unit test 22a checking output element has correct content and styling for 12 degrees", function() {
        let original = $("#temperature").val();
        let originalBg = $("#output").css("background-color");
        let originalTxt = $("#output").html();
        $("#temperature").val(12);
        clickElement($("#check"));
        chai.assert.equal(rgb2hex($("#output").css("background-color")), "#6699ff", "Background colour is wrong");
        chai.assert.equal($("#output").html(), "Too cold", "\'output\' element has the wrong text, should be \'Too cold\'");
        $("#temperature").val(original);
        $("#output").html(originalTxt);
        $("#output").css("background-color", originalBg);
    });

    test("#Unit test 22b checking output element has correct content and styling for 17 degrees", function() {
        let original = $("#temperature").val();
        let originalBg = $("#output").css("background-color");
        let originalTxt = $("#output").html();
        $("#temperature").val(17);
        clickElement($("#check"));
        chai.assert.equal(rgb2hex($("#output").css("background-color")), "#ffcc00", "Background colour is wrong");
        chai.assert.equal($("#output").html(), "Ideal", "\'output\' element has the wrong text, should be \'Ideal\'");
        $("#temperature").val(original);
        $("#output").html(originalTxt);
        $("#output").css("background-color", originalBg);
    });

    test("#Unit test 22c checking output element has correct content and styling for 21 degrees", function() {
        let original = $("#temperature").val();
        let originalBg = $("#output").css("background-color");
        let originalTxt = $("#output").html();
        $("#temperature").val(21);
        clickElement($("#check"));
        chai.assert.equal(rgb2hex($("#output").css("background-color")), "#ff9900", "Background colour is wrong");
        chai.assert.equal($("#output").html(), "Warm", "\'output\' element has the wrong text, should be \'Warm\'");
        $("#temperature").val(original);
        $("#output").html(originalTxt);
        $("#output").css("background-color", originalBg);
    });

    test("#Unit test 22d checking output element has correct content and styling for 25 degrees", function() {
        let original = $("#temperature").val();
        let originalBg = $("#output").css("background-color");
        let originalTxt = $("#output").html();
        $("#temperature").val(25);
        clickElement($("#check"));
        chai.assert.equal(rgb2hex($("#output").css("background-color")), "#ff0000", "Background colour is wrong");
        chai.assert.equal($("#output").html(), "Too hot", "\'output\' element has the wrong text, should be \'Too hot\'");
        $("#temperature").val(original);
        $("#output").html(originalTxt);
        $("#output").css("background-color", originalBg);
    });

    test("#Unit test 23a testing operation of fahrenheit function", function() {
        chai.assert.equal(f2c(95), 35, "95 deg Fahrenheit should be 35 degrees centigrade");
    });

    test("#Unit test 23b testing the fahrenheit conversion displays correctly", function() {
        $("#fahrenheit").prop("checked", true);
        $("#temperature").val(50);
        clickElement($("#check"));
        chai.assert.equal(rgb2hex($("#output").css("background-color")), "#6699ff", "Background colour is wrong");
        chai.assert.equal($("#output").html(), "Too cold", "\'output\' element has the wrong text, should be \'Too cold\'");
        $("#temperature").val("");
        $("#output").html("");
        $("#output").css("background-color", "#ffffff");
    });

    test("#Unit test 24 testing the reset button functions correctly", function() {
        $("#temperature").val(15);
        clickElement($("#check"));
        clickElement($("#reset"));
        chai.assert.equal(rgb2hex($("#output").css("background-color")), "#ffffff", "Background colour is wrong");
        chai.assert.equal($("#output").html(), "", "\'output\' element has the wrong text, should be empty");
        chai.assert.equal($("#temperature").val(), "", "Temperature input has the wrong text, should be empty");
    });

    test("#Unit test 25 testing the date stamp works properly", function() {
        let date = new Date();
        let dateStr = date.getFullYear() + "-";
        let month = date.getMonth() + 1;
        if (month > 9) {
            dateStr += month + "-";
        } else {
            dateStr += "0" + month + "-";
        }
        if (date.getDate() > 9) {
            dateStr += date.getDate();
        } else {
            dateStr += "0" + date.getDate();
        }
        clickElement($("#check"));
        chai.assert.equal($("#date").html(), dateStr, "\'date\' element has the wrong date");
        $("#date").html("");
        $("#temperature").val("");
    });

    test("#Unit test 26 testing the date stamp is reset correctly", function() {
        $("#date").html("2020-10-05");
        $("#reset").prop("disabled", false);
        clickElement($("#reset"));
        chai.assert.equal($("#date").html(), "", "\'date\' element should be empty");
    });
});