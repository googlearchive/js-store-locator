// Copyright 2013 Google Inc.

/**
 * @author Chris Broadfoot (Google)
 * @fileoverview
 * Provides access to store data through Google Maps Engine.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A DataFeed where stores are provided by Google Maps Engine.
 * <p>
 * Note: the table that contains the stores needs to be publicly accessible.
 * @example <pre>
 * var dataFeed = new storeLocator.GMEDataFeed({
 *   tableId: '12421761926155747447-06672618218968397709',
 *   apiKey: 'AIzaSyAtunhRg0VTElV-P7n4Agpm9tYlABQDCAM',
 *   propertiesModifier: function(props) {
 *     return {
 *       id: transformId(props.store_id),
 *       title: props.store_title
 *     };
 *   }
 * });
 * new storeLocator.View(map, dataFeed);
 * </pre>
 * @implements storeLocator.DataFeed
 * @param {!storeLocator.GMEDataFeedOptions} opts the table ID, API key and
 * a transformation function for feature/store properties.
 * @constructor
 * @implements storeLocator_GMEDataFeed
 */
storeLocator.GMEDataFeed = function(opts) {
  this.tableId_ = opts['tableId'];
  this.apiKey_ = opts['apiKey'];
  if (opts['propertiesModifier']) {
    this.propertiesModifier_ = opts['propertiesModifier'];
  }
};
storeLocator['GMEDataFeed'] = storeLocator.GMEDataFeed;

storeLocator.GMEDataFeed.prototype.getStores =
    function(bounds, features, callback) {

  // TODO: use features.

  var that = this;
  var center = bounds.getCenter();

  var where = '(ST_INTERSECTS(geometry, ' + this.boundsToWkt_(bounds) + ')' +
      ' OR ST_DISTANCE(geometry, ' + this.latLngToWkt_(center) + ') < 20000)';

  var url = 'https://www.googleapis.com/mapsengine/v1/tables/' + this.tableId_ +
      '/features?callback=?';

  $.getJSON(url, {
    'key': this.apiKey_,
    'where': where,
    'version': 'published',
    'maxResults': 300
  }, function(resp) {
    var stores = that.parse_(resp);
    that.sortByDistance_(center, stores);
    callback(stores);
  });
};

/**
 * @private
 * @param {!google.maps.LatLng} point
 * @return {string}
 */
storeLocator.GMEDataFeed.prototype.latLngToWkt_ = function(point) {
  return 'ST_POINT(' + point.lng() + ', ' + point.lat() + ')';
};

/**
 * @private
 * @param {!google.maps.LatLngBounds} bounds
 * @return {string}
 */
storeLocator.GMEDataFeed.prototype.boundsToWkt_ = function(bounds) {
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

/**
 * @private
 * @param {*} data GeoJSON feature set.
 * @return {!Array.<!storeLocator.Store>}
 */
storeLocator.GMEDataFeed.prototype.parse_ = function(data) {
  if (data['error']) {
    window.alert(data['error']['message']);
    return [];
  }
  var features = data['features'];
  if (!features) {
    return [];
  }
  var stores = [];
  for (var i = 0, row; row = features[i]; i++) {
    var coordinates = row['geometry']['coordinates'];
    var position = new google.maps.LatLng(coordinates[1], coordinates[0]);

    var props = this.propertiesModifier_(row['properties']);
    var store = new storeLocator.Store(props['id'], position, null, props);
    stores.push(store);
  }
  return stores;
};

/**
 * Default properties modifier. Just returns the same properties passed into
 * it. Useful if the columns in the GME table are already appropriate.
 * @private
 * @param {Object} props
 * @return {Object} an Object to be passed into the "props" argument in the
 * Store constructor.
 */
storeLocator.GMEDataFeed.prototype.propertiesModifier_ = function(props) {
  return props;
};

/**
 * Sorts a list of given stores by distance from a point in ascending order.
 * Directly manipulates the given array (has side effects).
 * @private
 * @param {google.maps.LatLng} latLng the point to sort from.
 * @param {!Array.<!storeLocator.Store>} stores  the stores to sort.
 */
storeLocator.GMEDataFeed.prototype.sortByDistance_ =
    function(latLng, stores) {
      stores.sort(function(a, b) {
        return a.distanceTo(latLng) - b.distanceTo(latLng);
      });
    };

/**
 * @example see storeLocator.GMEDataFeed
 * @interface
 */
storeLocator.GMEDataFeedOptions = function() {};

/**
 * The table's asset ID.
 * @type string
 */
storeLocator.GMEDataFeedOptions.prototype.tableId;

/**
 * The API key to use for all requests.
 * @type string
 */
storeLocator.GMEDataFeedOptions.prototype.apiKey;

/**
 * A transformation function. The first argument is the feature's properties.
 * Return an object useful for the <code>"props"</code> argument in the
 * storeLocator.Store constructor. The default properties modifier
 * function passes the feature straight through.
 * <p>
 * Note: storeLocator.GMEDataFeed expects an <code>"id"</code> property.
 * @type ?(function(Object): Object)
 */
storeLocator.GMEDataFeedOptions.prototype.propertiesModifier;
