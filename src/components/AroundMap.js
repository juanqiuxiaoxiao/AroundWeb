import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { AroundMarker } from './AroundMarker';
import { POS_KEY } from '../Constants';

class AroundMap extends React.Component {
    reloadMarker = () => {
        const center = this.map.getCenter();
        const location = { lat: center.lat(), lon: center.lng() };
        const range = this.getRange();
        this.props.loadNearbyPosts(location, range);


    }
    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    getMapref = (map) => {
        this.map = map;
        window.map = map;
    }

    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));

        return(
            <GoogleMap
                ref={this.getMapref}
                onDragEnd={this.reloadMarker}
                onZoomChanged={this.reloadMarker}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon }}
            >
                {this.props.posts.map((post) => <AroundMarker key={post.url} post={post}/> )}
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
