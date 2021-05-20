var map;
var coordinates = [
    [{ pos: { lat: 31.7947533, lng: 35.2392847 }, desc: "The Kotel" },
        { pos: { lat: 31.7768584, lng: 35.2356397 }, desc: "Nebi Samuel" },
        { pos: { lat: 31.7674809, lng: 35.2270471 }, desc: "Mitcham hatahana" },
        { pos: { lat: 31.7943058, lng: 35.1895208 }, desc: "ISR!!! :)" }
    ],
    [{ pos: { lat: 32.0740769, lng: 34.8097123 }, desc: "Azrieli" },
        { pos: { lat: 32.0652193, lng: 34.8051917 }, desc: "Hashalom" },
        { pos: { lat: 32.075279, lng: 34.7970166 }, desc: "Shawarma" },
        { pos: { lat: 32.0718747, lng: 34.7871834 }, desc: "Hasarona" }
    ],
    [{ pos: { lat: 32.7660509, lng: 35.5520512 }, desc: "Rabi meir baal hanes" },
        { pos: { lat: 32.7660332, lng: 35.5522455 }, desc: "Hotel" },
        { pos: { lat: 32.7657925, lng: 35.5542012 }, desc: "Beach" },
        { pos: { lat: 32.7713326, lng: 35.5663318 }, desc: "Sea" }
    ]
]

var cityDict = {
    "Jerusalem": [0, 1, 2, 3],
    "Tel Aviv": [4, 5, 6, 7],
    "Tiberias": [8, 9, 10, 11]
}
var markers = []

function initMap() {
    const israel = { lat: 32, lng: 35 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: israel,
    });
    var infowindow = new google.maps.InfoWindow({
        content: ''
    });
    for (var i = 0; i < coordinates.length; i++) {
        for (var j = 0; j < coordinates[i].length; j++) {
            var marker = new google.maps.Marker({
                position: coordinates[i][j].pos,
                map: map,
                title: coordinates[i][j].desc,
                animation: google.maps.Animation.DROP
            });
            bindInfoWindow(marker, map, infowindow, "<p>" + coordinates[i][j].desc + "</p>");
            marker.setMap(null);
            markers.push(marker);
        }
    }
}

function bindInfoWindow(marker, map, infowindow, html) {
    google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.setContent(html);
        infowindow.open(map, marker);
    });
}

function showMarker(cityList) {
    hideAllMarkers();
    for (var i = 0; i < cityList.length; i++) {
        markers[cityList[i]].setMap(map);
    }
}

function hideAllMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

$(document).ready(function() {
    const $table = $('#locationsGrid');
    $table.find('tr').each(function(index) {
        if (index == 0) return;
        const $element = $(this);
        $element.on("click", function() {
            const $this = $(this);
            const td = $this.find("td")
            const city = td[0].innerText
            cityList = cityDict[city]
            showMarker(cityList)
        })
    })
})