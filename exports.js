/** @interface */
function storeLocator_Feature() {};
storeLocator_Feature.prototype.getId = function(var_args) {};
storeLocator_Feature.prototype.getDisplayName = function(var_args) {};

/** @interface */
function storeLocator_FeatureSet() {};
storeLocator_FeatureSet.prototype.toggle = function(var_args) {};
storeLocator_FeatureSet.prototype.contains = function(var_args) {};
storeLocator_FeatureSet.prototype.getById = function(var_args) {};
storeLocator_FeatureSet.prototype.add = function(var_args) {};
storeLocator_FeatureSet.prototype.remove = function(var_args) {};
storeLocator_FeatureSet.prototype.asList = function(var_args) {};

/** @interface */
function storeLocator_GMEDataFeed() {};

/** @interface */
function storeLocator_Panel() {};
storeLocator_Panel.prototype.searchPosition = function(var_args) {};
storeLocator_Panel.prototype.setView = function(var_args) {};
storeLocator_Panel.prototype.view_changed = function(var_args) {};
storeLocator_Panel.prototype.stores_changed = function(var_args) {};
storeLocator_Panel.prototype.selectedStore_changed = function(var_args) {};
storeLocator_Panel.prototype.hideDirections = function(var_args) {};
storeLocator_Panel.prototype.showDirections = function(var_args) {};
storeLocator_Panel.prototype.featureFilter_changed = function(var_args) {};

/** @interface */
function storeLocator_StaticDataFeed() {};
storeLocator_StaticDataFeed.prototype.setStores = function(var_args) {};
storeLocator_StaticDataFeed.prototype.getStores = function(var_args) {};

/** @interface */
function storeLocator_Store() {};
storeLocator_Store.prototype.setMarker = function(var_args) {};
storeLocator_Store.prototype.getMarker = function(var_args) {};
storeLocator_Store.prototype.getId = function(var_args) {};
storeLocator_Store.prototype.getLocation = function(var_args) {};
storeLocator_Store.prototype.getFeatures = function(var_args) {};
storeLocator_Store.prototype.hasFeature = function(var_args) {};
storeLocator_Store.prototype.hasAllFeatures = function(var_args) {};
storeLocator_Store.prototype.getDetails = function(var_args) {};
storeLocator_Store.prototype.getInfoWindowContent = function(var_args) {};
storeLocator_Store.prototype.getInfoPanelContent = function(var_args) {};
storeLocator_Store.prototype.getInfoPanelItem = function(var_args) {};
storeLocator_Store.prototype.distanceTo = function(var_args) {};

/** @interface */
function storeLocator_View() {};
storeLocator_View.prototype.updateOnPan_changed = function(var_args) {};
storeLocator_View.prototype.addStoreToMap = function(var_args) {};
storeLocator_View.prototype.createMarker = function(var_args) {};
storeLocator_View.prototype.getMarker = function(var_args) {};
storeLocator_View.prototype.getInfoWindow = function(var_args) {};
storeLocator_View.prototype.getFeatures = function(var_args) {};
storeLocator_View.prototype.getFeatureById = function(var_args) {};
storeLocator_View.prototype.featureFilter_changed = function(var_args) {};
storeLocator_View.prototype.clearMarkers = function(var_args) {};
storeLocator_View.prototype.refreshView = function(var_args) {};
storeLocator_View.prototype.stores_changed = function(var_args) {};
storeLocator_View.prototype.getMap = function(var_args) {};
storeLocator_View.prototype.highlight = function(var_args) {};
storeLocator_View.prototype.selectedStore_changed = function(var_args) {};

