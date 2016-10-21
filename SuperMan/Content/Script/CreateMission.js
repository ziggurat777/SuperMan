$("#filterbtn").hover(function () {
    $('#collapseExample').collapse('show');
}, function () {
    //$('#collapseExample').collapse('hide');
}
);

$("#filterbtn").click(function () {
    if ($('#collapseExample').is(":visible")) {
        $('#collapseExample').collapse('hide');
    }
    else {
        $('#collapseExample').collapse('show');
    }
}
);

// BEGIN create mission js.
//Initialize tooltips
$('.nav-tabs > li a[title]').tooltip();

//Wizard
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

    var $target = $(e.target);

    if ($target.parent().hasClass('disabled')) {
        return false;
    }
});

// button
$(".next-step").click(function (e) {
    if ($("#step1 > ul > li > button").is(e.toElement)) {
        if (!$("#missionlat").val() || !$("#missionlng").val()) {
            alert("請在地圖上選擇任務位置");
            return;
        }
    }
    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    nextTab($active);

});

$(".prev-step").click(function (e) {

    var $active = $('.wizard .nav-tabs li.active');
    prevTab($active);

});

//image mission next
$(".image-mission.image-halo").click(function (e) {
    $(this).parent().siblings().find(".image-mission.image-halo").each(function () {
        $(this).attr("class", "image-mission image-halo")
    });

    $(this).attr("class", "image-mission image-halo active");
    setMissionType($(this).attr("src"), $(this).siblings("p").text());

    var $active = $('.wizard .nav-tabs li.active');
    $active.next().removeClass('disabled');
    nextTab($active);
});

//image egg next
$(".image-egg.image-halo").click(function (e) {
    $(this).parent().siblings().find(".image-egg.image-halo").each(function () {
        $(this).attr("class", "image-egg image-halo")
    });

    $(this).attr("class", "image-egg image-halo active");

    // custoemr egg
    if ($(this).attr("id") == "custom-egg") {
        $("#custom-egg-val").removeAttr('disabled').focus();
        $("#custom-egg-btn").removeAttr('style');
    }
    else {
        $("#custom-egg-val").attr('disabled', 'disabled');
        $("#custom-egg-btn").attr('style', 'display:none');

        setEgg($(this).siblings("p").text().substr(2, $(this).siblings("p").text().length));

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);
    }
});

// custom egg input submit .
$("#custom-egg-val").keypress(function (e) {
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        e.preventDefault();
        if (checkEgg($("#custom-egg-val").val())) {
            setEgg($("#custom-egg-val").val());

            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
        }
        else {
            $('#custom-egg-val').tooltip('show');
        }
    }
});

// custom egg btn submit.
$("#custom-egg-btn").click(function (e) {
    if (checkEgg($("#custom-egg-val").val())) {
        setEgg($("#custom-egg-val").val());

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);
    }
    else {
        $('#custom-egg-val').tooltip('show');
    }
});

function checkEgg(count) {
    if ((count % 5) == 0) {
        return true;
    }
    return false;
}

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function setPosition(lat, lng) {
    // call google api ...  padding...
}

function setMissionType(image, title) {
    $("#t-missionType > strong").text(title);
}

function setEgg(count) {
    $("#t-egg > strong").text("x " + count);
}
// END


// for select user own position
function showUserClickPanel() {
    var center = new google.maps.LatLng(24.1981, 120.6267);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var marker = null;

    var icon = {
        url: "http://wfarm1.dataknet.com/static/resources/icons/set105/7ce3e2c.png", // url
        //url: "image/FamilyWork.png",
        size: new google.maps.Size(36, 48),
        scaledSize: new google.maps.Size(36, 48), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    google.maps.event.addListener(map, 'click', function (event) {
        //call function to create marker
        if (marker) {
            marker.setMap(null);
            marker = null;
        }

        marker = createMarker(event.latLng, "name", "<b>Location</b><br>" + event.latLng);

        var markerPosition = marker.getPosition();
        // map to center
        //map.setCenter(markerPosition);

        var infowindow = new google.maps.InfoWindow({});
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            'latLng': markerPosition
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results) {
                    // 將取得的資訊傳入 marker infowindow.
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);

                    $("#missionAddress").val(results[1].formatted_address)
                }
            } else {
                alert("Reverse Geocoding failed because: " + status);
            }
        });
    });
};

// A function to create the marker and set up the event window function 
function createMarker(latlng, name) {
    //var contentString = html;

    var icon = {
        url: UrlBuilder.ImageUrl("point.png"), // url
        //url: "image/FamilyWork.png",
        size: new google.maps.Size(36, 60),
        scaledSize: new google.maps.Size(36, 60), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 60) // anchor
    };

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: icon,
        zIndex: Math.round(latlng.lat() * -100000) << 5
    });

    google.maps.event.addListener(marker, 'click', function () {
        $("#missionlat").val(marker.position.lat());
        $("#missionlng").val(marker.position.lng());
        //infowindow.setContent(contentString); 
        //infowindow.open(map,marker);
    });
    google.maps.event.trigger(marker, 'click');
    return marker;
}
//end