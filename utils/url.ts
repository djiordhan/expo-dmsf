const pickWaypoints = (coordinates: any[]) => {
    const maxWaypoints = 20;
    const totalPoints = coordinates.length;
    if (totalPoints <= maxWaypoints) {
      return coordinates.slice(1, totalPoints - 1); // All intermediate points
    }
  
    const skip = Math.floor(totalPoints / (maxWaypoints + 1));
    const waypoints = [];
    for (let i = skip; i < totalPoints - 1; i += skip) {
      waypoints.push(coordinates[i]);
    }
    return waypoints;
  };
  
  // Main function to generate the Google Maps URL
  export const generateGoogleMapsURL = (coordinates: any[]) => {
    if (coordinates.length < 2) return '';
  
    const origin = coordinates[0];
    const destination = coordinates[coordinates.length - 1];
    const waypoints = pickWaypoints(coordinates);
  
    const waypointsParam = waypoints.length > 0 ? `&waypoints=${waypoints.map(coord => `${coord.latitude},${coord.longitude}`).join('|')}` : '';
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}${waypointsParam}`;
  
    return url;
  };