/**
 * Created by jwong on 4/2/17.
 */
var rootURL = "https://thawing-wave-40137.herokuapp.com/api/v1.0";
//var rootURL = "http://localhost:5000/api/v1.0";

function reset() {
    console.log('resetting');
    return $.ajax({
        type: 'GET',
        url: rootURL + '/reset',
        dataType: "json",
        success: function(data, textStatus, xhr) {
            console.log(textStatus);
        }
    });
}


function ordersList(result) {
    console.log('ordersList');
    return $.ajax({
        type: 'GET',
        url: rootURL + '/orders/list',
        dataType: "json",
        success: function(data, textStatus, xhr) {
            console.log(data);
            console.log(textStatus);
            console.log(xhr);
            $('#orderList').html(renderOrderTable(data));
        }
    });
}


function createOrders(result) {
    console.log('createOrders');
    return $.ajax({
        type: 'GET',
        url: rootURL + '/orders/create',
        dataType: "json",
        success: function(data, textStatus, xhr) {
            console.log("createOrder status: " +textStatus);
            console.log(textStatus);
            console.log(xhr);
            $('#orderList').html(renderOrderTable(data));
        }
    })
}


function removeRandomOrder() {
    console.log('removeRandomOrder');
    return $.ajax({
        type: 'GET',
        url: rootURL + '/orders/remove',
        dataType: "json",
        success: function(data, textStatus, xhr) {
            console.log(textStatus);
            $('#removedOrder').text("Removed order with Service Type: " + data.removed[0].service_type);
        }
    });
}


function driverPaths(result) {
    console.log('driverPaths');
    return $.ajax({
        type: 'GET',
        url: rootURL + '/orders/route',
        datatype: "json",
        success: function(data, textStatus, xhr) {
            console.log(data);
            $('#driverPaths').html(renderPathTable(data));
        }
    });
}

function renderOrderTable(data) {
    var list = data == null ? [] : (data instanceof Array ? data : [data]);
    var table_data = "<table border=\"1\">";
    table_data += "<tr><th>ServiceType</th><th>Pickup Location</th><th>Delivery Location</th>" +
        "<th>Pickup Time</th><th>Delivery Time</th></tr>"
    orders = data.orders;
    for (i = 0; i < orders.length; i++) {
        table_data += "<tr>";
        table_data += "<td>" + orders[i][0].service_type + "</td>";
        table_data += "<td>" + orders[i][1].pickup_location.lat + "," + orders[i][1].pickup_location.lng + "</td>";
        table_data += "<td>" + orders[i][2].delivery_location.lat + "," + orders[i][2].delivery_location.lng + "</td>";
        table_data += "<td>" + orders[i][3].pickup_time.time_string + "</td>";
        table_data += "<td>" + orders[i][4].delivery_time.time_string + "</td>";
        table_data += "</tr>";
    }
    table_data += "</table>";

    return table_data;
}


function renderPathTable(data) {
    var list = data == null ? [] : (data instanceof Array ? data : [data]);
    var table_data = "<table border=\"1\">";
    table_data += "<tr><th>Driver</th></th><th>ServiceType</th><th>Action</th>" +
        "<th>Location</th><th>Time</th><th>Travel Distance (KM)</th>" +
        "<th>Travel Time (Min)</th><th>Delayed By (Min)</th></tr>"

    for (d = 0; d < data.length; d++) {
        driver = data[d].driver;
        for (i = 0; i < driver.length; i++) {
            table_data += "<tr>";
            table_data += "<td>" + d + "</td>";
            table_data += "<td>" + driver[i][0].ServiceType + "</td>";
            table_data += "<td>" + driver[i][1].Action + "</td>";
            table_data += "<td>" + driver[i][3].Location[0].lat + "," + driver[i][3].Location[1].lng + "</td>";
            table_data += "<td>" + driver[i][2].Time + "</td>";
            table_data += "<td>" + parseFloat(driver[i][4].Distance/1000).toFixed(1) + "</td>";
            table_data += "<td>" + Math.round(driver[i][5].TravelTime/60) + "</td>";
            table_data += "<td>" + Math.round(driver[i][6].Delayedby/60) + "</td>";
            table_data += "</tr>";
        }
    }
    table_data += "</table>";

    return table_data;
}

