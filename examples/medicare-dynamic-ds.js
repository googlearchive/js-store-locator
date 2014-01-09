/**
 * @implements storeLocator.DataFeed
 * @constructor
 */
function MedicareDataSource() {
}

MedicareDataSource.prototype.getStores = function(bounds, features, callback) {
  var that = this;
  var center = bounds.getCenter();
  var audioFeature = this.FEATURES_.getById('Audio-YES');
  var wheelchairFeature = this.FEATURES_.getById('Wheelchair-YES');

  var where = '(ST_INTERSECTS(geometry, ' + this.boundsToWkt_(bounds) + ')' +
      ' OR ST_DISTANCE(geometry, ' + this.latLngToWkt_(center) + ') < 20000)';

  if (features.contains(audioFeature)) {
    where += " AND Audio='YES'";
  }
  if (features.contains(wheelchairFeature)) {
    where += " AND Wheelchair='YES'";
  }

  var tableId = '12421761926155747447-06672618218968397709';
  var url = 'https://www.googleapis.com/mapsengine/v1/tables/' + tableId +
      '/features?callback=?';

  $.getJSON(url, {
    key: 'AIzaSyAtunhRg0VTElV-P7n4Agpm9tYlABQDCAM',
    where: where,
    version: 'published',
    maxResults: 300
  }, function(resp) {
    var stores = that.parse_(resp);
    that.sortByDistance_(center, stores);
    callback(stores);
  });
};

MedicareDataSource.prototype.latLngToWkt_ = function(point) {
  return 'ST_POINT(' + point.lng() + ', ' + point.lat() + ')';
};

MedicareDataSource.prototype.boundsToWkt_ = function(bounds) {
  var ne = bounds.getNorthEast();
  var sw = bounds.getSouthWest();
  return [
    "ST_GEOMFROMTEXT('POLYGON ((",
    sw.lng(), ' ', sw.lat(), ', ',
    ne.lng(), ' ', sw.lat(), ', ',
    ne.lng(), ' ', ne.lat(), ', ',
    sw.lng(), ' ', ne.lat(), ', ',
    sw.lng(), ' ', sw.lat(),
    "))')"
  ].join('');
};

MedicareDataSource.prototype.parse_ = function(data) {
  var stores = [];
  for (var i = 0, row; row = data.features[i]; i++) {
    var props = row.properties;
    var features = new storeLocator.FeatureSet;
    features.add(this.FEATURES_.getById('Wheelchair-' + props.Wheelchair));
    features.add(this.FEATURES_.getById('Audio-' + props.Audio));

    var position = new google.maps.LatLng(row.geometry.coordinates[1],
                                          row.geometry.coordinates[0]);

    var shop = this.join_([props.Shp_num_an, props.Shp_centre], ', ');
    var locality = this.join_([props.Locality, props.Postcode], ', ');

    var store = new storeLocator.Store(props.uuid, position, features, {
      title: props.Fcilty_nam,
      address: this.join_([shop, props.Street_add, locality], '<br>'),
      hours: props.Hrs_of_bus
    });
    stores.push(store);
  }
  return stores;
};

/**
 * @const
 * @type {!storeLocator.FeatureSet}
 * @private
 */
MedicareDataSource.prototype.FEATURES_ = new storeLocator.FeatureSet(
  new storeLocator.Feature('Wheelchair-YES', 'Wheelchair access'),
  new storeLocator.Feature('Audio-YES', 'Audio')
);

/**
 * @return {!storeLocator.FeatureSet}
 */
MedicareDataSource.prototype.getFeatures = function() {
  return this.FEATURES_;
};


/**
 * Joins elements of an array that are non-empty and non-null.
 * @private
 * @param {!Array} arr array of elements to join.
 * @param {string} sep the separator.
 * @return {string}
 */
MedicareDataSource.prototype.join_ = function(arr, sep) {
  var parts = [];
  for (var i = 0, ii = arr.length; i < ii; i++) {
    arr[i] && parts.push(arr[i]);
  }
  return parts.join(sep);
};

/**
 * Sorts a list of given stores by distance from a point in ascending order.
 * Directly manipulates the given array (has side effects).
 * @private
 * @param {google.maps.LatLng} latLng the point to sort from.
 * @param {!Array.<!storeLocator.Store>} stores  the stores to sort.
 */
MedicareDataSource.prototype.sortByDistance_ = function(latLng, stores) {
  stores.sort(function(a, b) {
    return a.distanceTo(latLng) - b.distanceTo(latLng);
  });
};
