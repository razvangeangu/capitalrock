$(function () {
    $('#pDeg').keyup(function () {
        getPolDeg();
    });
    $('#gcalculate').click(function () {
        if (gisValid()) {
            gcalculate();
            gdisplay();
        }
    });
    $('#gplot').click(function () {
        if (gisValid()) {
            gcalculate();
            gPlot();
        }
    });
});
// Degree of the polynomial
function getPolDeg() {
    iDeg = Number($('#pDeg').val());
    if (!isInt(iDeg)) {
        $('#polyMessage').html('<p>Degree must be an integer.</p>');
        $('#polyMessage').show();
        return false;
    } else {
        $('#polyMessage').hide();
    }
    /*Build Polynomial Equation and Inputs*/
    var polyEq = '<legend>y = ';
    var sInputs = '';
    sInputs += '<div class="pure-control-group">';
    sInputs += '<label for="xmin">X min</label>';
    sInputs += '<input type="text" id="xmin" name="xmin" size="2" />';
    sInputs += '</div>';
    sInputs += '<div class="pure-control-group">';
    sInputs += '<label for="xmax">X max</label>';
    sInputs += '<input type="text" id="xmax" name="xmax" size="2" />';
    sInputs += '</div>';
    for (var i = iDeg; i >= 0; i--) {
        if (i !== 0) {
            polyEq += 'a<sub>' + i + '</sub>x<sup>' + i + '</sup> + ';
        }
        sInputs += '<div class="pure-control-group">';
        sInputs += '<label for="a_' + 1 + '">a<sub>' + i + '</sub></label>';
        sInputs += '<input type="text" id="a[' + i + ']" name="a[' + i + ']" size="2" />';
        sInputs += '</div>';
    }
    polyEq += 'a<sub>0</sub></legend>';
    $('#polyEq').html(polyEq);
    $('#sInputs').html(sInputs);
}
// Is int function
function isInt(n) {
    return typeof n == "number" && isFinite(n) && n % 1 === 0;
}
/*GLOBALS*/
var iDeg, xmin, xmax;
var a = new Array();
var data = new Array();
// The function called when you click calculate
function gcalculate() {
    var aForm = $('form#googleForm').serializeArray();
    xmin = aForm[1].value;
    xmax = aForm[2].value;
    data = [];
    data[0] = ["X Values", "Y Values"];
    // Build an array of a values
    for (var i = 3; i < aForm.length; i++) {
        a[i - 3] = aForm[i].value;
    }
    // Calculate all the y values for each x
    for (var x = xmin; x <= xmax; x++) {
        y = gcalculatey(x, a);
        data.push([x, y]);
    }
}
// calculate each individual y vlue from the x value
function gcalculatey(xval, aArray) {
    var y = 0;
    var eqpo = iDeg;
    for (var z = 0; z < aArray.length; z++) {
        y += aArray[z] * Math.pow(xval, eqpo);
        eqpo--;
    }
    return y;
}
// Make a google chart
google.load("visualization", "1", {
    packages: ["corechart"]
});

function gPlot() {
    var theData = google.visualization.arrayToDataTable(data);
    var options = {
        title: 'Polynomial Graph'
    };
    var chart = new google.visualization.LineChart(document.getElementById('googleContainer'));
    chart.draw(theData, options);
    // Send the display to this div
    location.hash = "#";
    location.hash = "#googleContainer";
    history.pushState("", document.title, window.location.pathname);
}
// Display the values in text
function gdisplay() {
    var pGoogle = '<legend>y = ';
    var expo = iDeg;
    for (var h = 0; h < (a.length - 1); h++) {
        expo = (expo !== 1) ? expo : '';
        pGoogle += a[h] + 'x<sup>' + expo + '</sup> + ';
        expo--;
    }
    pGoogle += a[a.length - 1] + '</legend>';
    for (var i = 1; i < data.length; i++) {
        pGoogle += 'X = ' + data[i][0] + ', Y = ' + data[i][1] + '<br />';
    }
    $('#googleOut').html(pGoogle);
    // Send the display to this div
    location.hash = "#";
    location.hash = "#googleOut";
    history.pushState("", document.title, window.location.pathname);
}

function gisValid() {
    var bBool = true;
    var aForm = $('form#googleForm').serializeArray();
    for (var i = 0; i < aForm.length; i++) {
        if (bBool) {
            bBool = $.isNumeric(aForm[i].value);
        }
    }
    if (!bBool) {
        $('#polyMessage').html('<p>An input is not numeric.</p>');
        $('#polyMessage').show();
        // Make the page go where I want it to go.
        location.hash = "#";
        location.hash = "#polyMessage";
        history.pushState("", document.title, window.location.pathname);
    } else {
        $('#polyMessage').hide();
    }
    return bBool;
}