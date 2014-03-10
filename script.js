/*jslint browser: true, devel: true */
var grabfile,
    runTest,
    displayResults,
    hosts,
    button;

button = document.getElementsByTagName('button')[0];
button.addEventListener('click', function () {
    'use strict';
    runTest(displayResults);
});

hosts = [
    {
        'name': 'Google CDN',
        'cors': false,
        'file': 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'
    },
    {
        'name': 'CDNJS',
        'cors': false,
        'file': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js'
    },
    {
        'name': 'Microsoft ASP.NET',
        'cors': true,
        'file': 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.0.min.js'
    }
];

grabfile = function (item, result, callback) {
    'use strict';
    var request;
    request = new XMLHttpRequest();
    request.open('GET', item.file, false);

    request.onerror = function () {
        return 'error';
    };
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            result.status = request.status;
            result.endTime = new Date().getTime();
            result.runTime = (result.endTime - result.startTime) / 1000;
            callback(result);
        }
    };
    request.send();
};

displayResults = function (result) {
    'use strict';
    var tableBody = document.getElementsByTagName('tbody')[0],
        row,
        name,
        startTime,
        endTime,
        runTime;
    if (result) {
        row = document.createElement('tr');
        name = document.createElement('td');
        name.textContent = result.name;
        row.appendChild(name);
        startTime = document.createElement('td');
        startTime.textContent = result.startTime;
        row.appendChild(startTime);
        endTime = document.createElement('td');
        endTime.textContent = result.endTime;
        row.appendChild(endTime);
        runTime = document.createElement('td');
        runTime.textContent = result.runTime;
        row.appendChild(runTime);
        tableBody.appendChild(row);
    }
};

runTest = function (callback) {
    'use strict';
    var result = {},
        request,
        data;
    hosts.forEach(function (item) {
        result.name = item.name;
        result.startTime = new Date().getTime();
        grabfile(item, result, callback);

    });
};
