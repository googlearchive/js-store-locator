Store Locator Library for the Google Maps JavaScript API v3
==============

This library enables developers to easily build store locator-type applications using the Google Maps JavaScript API v3.
![Analytics](https://ga-beacon.appspot.com/UA-12846745-20/js-store-locator/readme?pixel)

The library provides the following features:

* Pluggable data source – display stores from a data source of your choosing
* HTML5 Geolocation – determines a good initial viewport for the user
* Info window – shows details about a store
* Street View
* Extensible – customise your own markers, info windows, etc.
* Fully-featured side panel, providing:
  * Feature filtering
  * Autocomplete search
  * List of nearby stores
  * Directions

## Examples/Demos

The best way to become acquainted with the library is to see some of the examples:

1. [panel.html](https://googlemaps.github.io/js-store-locator/examples/panel.html) – A simple store locator, including panel. Data is fetched from a static CSV file.
2. [dynamic.html](https://googlemaps.github.io/js-store-locator/examples/dynamic.html) – Same as above, except stores are fetched dynamically from a JSONP web service.
3. [gme.html](https://googlemaps.github.io/js-store-locator/examples/gme.html) – Same as above, except stores are fetched dynamically from Google Maps Engine.
4. [custom.html](https://googlemaps.github.io/js-store-locator/examples/custom.html) – Various customisations to the default UI including custom markers and info window.
5. [places.html](https://googlemaps.github.io/js-store-locator/examples/places.html) – Places are searched using the Google Places API, and displayed as a store locator.

## Reference documentation

For detailed documentation on the library, including classes, events and sample usage, please see the [reference documentation](https://googlemaps.github.io/js-store-locator/reference.html).

## Quick Start

To get started, include the [store-locator.min.js](https://github.com/googlemaps/js-store-locator/blob/gh-pages/dist/store-locator.min.js) file on your HTML page. A set of [CSS styles](https://github.com/googlemaps/js-store-locator/blob/gh-pages/css/storelocator.css) are also available, which provide styling for store details and side panel.

The library's functions are contained under the `storeLocator` namespace. The main class is called `storeLocator.View`. A `View` has two required parameters, a `google.maps.Map`, and a `storeLocator.DataFeed`.

A `DataFeed` is an object with the function `getStores`. This function is called each time the map needs an update. A simple example of a `DataFeed` can be found in the [reference](https://googlemaps.github.io/js-store-locator/reference.html#storeLocator.DataFeed).

## Contributing

Want to contribute? Check out the [contributing guide](CONTRIBUTING.md)!

## License

Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
