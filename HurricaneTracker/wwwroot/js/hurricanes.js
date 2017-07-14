var accessToken = "sk.eyJ1Ijoibmljay1vY2MiLCJhIjoiY2l4Zzg5cXRjMDAxcDJ6cWZrZ211NzFqMCJ9.J9jkrI4YlMQ4XpGPoJa89w";
var hurricanes;
var colors = ["red","green","blue"]
var polyline = [];
var curr_hurricane;

$(document).ready(function (evt) {
    slider = $("#slider").slider({
        value: 1851,
        step: 1,
        min: 1851,
        max: 2016,
        slide: function (evt, ui) {
            
            $(this).next().val(ui.value);
            console.log(ui.value)
            $("#date-header").text(ui.value);
        }
    })
    var selection = $("#slider").slider("value");
    console.log(selection);

    $("#date-header").text($("#slider").slider("option", "value"));
    var leafletmap = L.map('leafletmap').setView([39.50404070558415, -98.61328125], 3);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken, {
        id: 'mapbox.streets',
        attribution: ''
    }).addTo(leafletmap);

    $.getJSON("/json/hurricanes_2015.json", function (result) {
        
        hurricanes = result.data;
        console.log(hurricanes);

        //console.log(Math.floor(Math.random() * 3)+1);
        
        for (h in hurricanes) {
            latlngs = []
            location_data = hurricanes[h].location_data
            var year = hurricanes[h].location_data[0].date.slice(0, 4);
            var month = hurricanes[h].location_data[0].date.slice(4, 6);
            var day = hurricanes[h].location_data[0].date.slice(6);
            dt = new Date(year, month-1, day);
            $("#hurricane-select").append("<option value='" + hurricanes[h].id + "'>" + hurricanes[h].name + " - " + month + "\\" + day + "\\" + year + "</option>");

            for (ld in location_data) {
                latlngs.push([parseFloat(location_data[ld].lat), -1*(parseFloat(location_data[ld].lon))]);
            }
            polyline.push(L.polyline(latlngs, { color: colors[Math.floor(Math.random() * 3)] }));    
        }

        curr_hurricane = 0
        polyline[0].addTo(leafletmap)
            .bindPopup("Test");
        leafletmap.fitBounds(polyline[0].getBounds());      

        polyline[curr_hurricane].on("click", function (evt) {
            polyline[0].openPopup();
        });
    });



    $("#hurricane-select").change(function (evt) {
        console.log(polyline[curr_hurricane]);
        polyline[curr_hurricane].remove();

        $.each(hurricanes, function (i, v) {
            if (v.id == $("#hurricane-select").val()) {
                curr_hurricane = i;
                polyline[i].addTo(leafletmap)
                    .bindPopup("Test");
                leafletmap.fitBounds(polyline[i].getBounds());
                
                if (!("_events" in polyline[curr_hurricane])) {
                    
                    polyline[curr_hurricane].on("click", function (evt) {
                        console.log(evt);
                        polyline[i].openPopup();
                    });
                    
                }
            }
        });
    })
})