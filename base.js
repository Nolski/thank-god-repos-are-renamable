
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center:  {lat: 41.85, lng: -87.65},
    zoom: 8
  });

  putMarkers();

}

var points = [
  {lat: 41.85, lng: -87.65},
  {lat: 41.95, lng: -87.55},
  {lat: 42.05, lng: -87.35},
  {lat: 41.99, lng: -87.45},
  {lat: 42.00, lng: -87.55},
  {lat: 41.90, lng: -87.50}
];

function dist(p1, p2) {
  return Math.sqrt((p1.lat - p2.lat) * (p1.lat - p2.lat) +
    (p1.lng - p2.lng) * (p1.lng - p2.lng));
}

function putMarkers() {
  for (var pt in points) {
    points[pt].lat -= 0.5;
    points[pt].lon -= 0.5;
    var marker = new google.maps.Marker({
      position: points[pt],
      map: map,
      title: 'Hello World!'
    });

    marker.setMap(map);
  }
}


function findPath(start, maxDist, path) {
  //alert('findPath' + JSON.stringify(start) + maxDist + JSON.stringify(path));
  if (maxDist <= 0) {
    return path;
  }
  if (!path)
    path = [];
  var min = 9999;
  start.visited = true;
  for (var pt in points) {
    if (points[pt].visited)
      continue;
    var dis = dist(points[pt], start);
    if (dis === 0)
      continue;
    if (dis < min) {
      min = dis;
      minPt = points[pt];
    }
  }

  if (min === 9999) {
    return path; // we've run out of points?
}
  path.push(minPt);
  return findPath(minPt , maxDist - min, path);
}

alert(JSON.stringify(findPath({lat: 41.90, lng: -87.50}, 0.2)));
