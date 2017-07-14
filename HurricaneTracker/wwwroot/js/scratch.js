$(document).ready(function (evt) {
    abcAsync();
});

function timeoutAsync(milliseconds) {
    var deferred = $.Deferred();
    console.log(deferred);
    setTimeout(function () {
        deferred.resolve();
    }, milliseconds);
    console.log(deferred.promise());
    return deferred.promise();
}

function abcAsync() {
    var firstPromise = timeoutAsync(2000);
    var secondPromise = firstPromise.pipe(function () {
        console.log("second promise");
        return timeoutAsync(3000);
    });
    var thirdPromise = secondPromise.pipe(function () {
        console.log("third promise");
        return timeoutAsync(1000);
    });
    var fourthPromise = thirdPromise.pipe(function () {
        console.log("fourth promise");
        return timeoutAsync(1234);
    });
    fourthPromise.done(function () {
        alert('done!');
        return fourthPromise;
    });
}