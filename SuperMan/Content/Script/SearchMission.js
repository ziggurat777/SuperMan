$("div.show-mission").on("click", function () {
    $("#mission-info").fadeIn("slow");
});

$("div.hide-mission").on("click", function () {
    $("#mission-info").fadeOut("slow");
});

var Icon = {
    tag_work: {
        url: UrlBuilder.ImageUrl("tag_work.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    tag_help: {
        url: UrlBuilder.ImageUrl("tag_help.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    tag_join: {
        url: UrlBuilder.ImageUrl("tag_join.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    },
    tag_join2: {
        url: UrlBuilder.ImageUrl("tag_join2.png"),
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    }
}

function showPosition() {
    var center = new google.maps.LatLng(24.1981, 120.6267);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    });

    var data = GetFakeData();

    var markers = [];

    for (var i = 0; i < data.length; i++) {
        var latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
        var marker = {};
        switch (data[i].type) {
            case "help":
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.tag_help,
                    title: data[i].type
                });
                break;
            case "work":
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.tag_work,
                    title: data[i].type
                });
                break;
            case "join":
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.tag_join,
                    title: data[i].type
                });
                break;
            case "join2":
                marker = new google.maps.Marker({
                    position: latLng,
                    icon: Icon.tag_join2,
                    title: data[i].type
                });
                break;
            default:
                return;
        }

        markers.push(marker);

        $.each(markers, function (index, value) {
            google.maps.event.addListener(value, 'click', function () {
                $("div.show-mission").trigger("click");
            });
        });
    }
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m' });

    // user location 
    //console.log(position.coords.latitude + "," + position.coords.longitude);
    //google.maps.event.addListener(marker, "click", function () {
    //    infowindow.setContent('Super Man');
    //    infowindow.setPosition(marker.position);
    //    infowindow.open(map, this);
    //});

    //google.maps.event.addListener(map, 'click', function (event) {
    //    //alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
    //});

    //markerCluster.addMarker(marker);
};

function initialize() {
    //Get user position
    navigator.geolocation.getCurrentPosition(showPosition);
}

function GetFakeData() {
    // fake data
    var data = [
        { type: "help", latitude: 24.1981, longitude: 120.6267 },
        { type: "work", latitude: 24.1620, longitude: 120.6404 },
        { type: "join", latitude: 24.1760, longitude: 120.6470 },
        { type: "work", latitude: 24.196436, longitude: 120.543454 },
        { type: "help", latitude: 24.181015, longitude: 120.545292 },
        { type: "work", latitude: 24.197154, longitude: 120.523584 },
        { type: "join2", latitude: 24.189514, longitude: 120.512417 },
        { type: "work", latitude: 24.146845, longitude: 120.645157 },
        { type: "help", latitude: 24.145183, longitude: 120.646917 },
        { type: "join", latitude: 24.145875, longitude: 120.644701 },
        { type: "join2", latitude: 24.144960, longitude: 120.629129 },
        { type: "help", latitude: 24.139321, longitude: 120.584154 },
        { type: "work", latitude: 24.186072, longitude: 120.661487 },
        { type: "join", latitude: 24.152009, longitude: 120.682258 },
    ];

    return data;
}