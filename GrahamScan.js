
/**
 * @param {*} anchor
 * @param {*} p
 * @return {*} Angle of anchor and p
 */
function Angle(anchor, p) {
	return Math.atan2( p.y - anchor.y, anchor.x - p.x) * 180/Math.PI + 180
}

/**
 *
 *
 * @param {[x, y]} p1
 * @param {[x, y]} p2
 * @return {*} Slope of two points
 */
function slope(p1, p2) {
	if (p1[0] == p2[0]) {
		return float('inf')
	}
	else {
		return (p1[1] - p2[1]) / (p1[0] - p2[0])
	}
}

/**
 * @param {[x, y]} a
 * @param {[x, y]} b
 * @param {[x, y]} c
 * @return {Boolean} True if right turn, false if left turn
 */
function ccw(a, b, c) {
	return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0;
}

/**
 * @return {*} Graham scan 
 * @
 */
function ConvexHull_GrahamScale() {
	points = []
	var nodes = $('.point');
	for(var i = 0; i<nodes.length; i++){
		points.push(html_point.get(nodes[i]));
	}


	let sorted_points = points.sort((a,b) => b.y - a.y);
	hull = [];
	let anchor = sorted_points[0];

	//lowest point is in hull
	hull.push(anchor);

	let sort_by_polar_angle = points;
	sort_by_polar_angle.splice(points.indexOf( anchor ), 1);
  	
  	//sort points by angle from x-axis (lowest point)
  	sort_by_polar_angle = points.sort((a, b) => {
	    let getTanAngleToP0 = (p) => ((p.x - p0.x) / (p.y - p0.y));
	    let angleA = Angle(anchor, a);
	    let angleB = Angle(anchor, b);
	    if (angleA == angleB) return angleA;
	    return angleA - angleB;
  	});


	let pointIndex = 0;
	let done = 0;

	// while(done != points.length){
	//   	let p = sort_by_polar_angle[pointIndex];
	//   	if (p) {
	//     	if (hull.length > 1 && ccw(hull[hull.length - 2], hull[hull.length - 1], p)) {
	//       		hull.pop();
	//     	}
	//     	else{
	//       		hull.push(p);
	// 			pointIndex++;
	// 			done++;
	//     	}
	//     }
	//     else{
	//     	//closing line
	//     	//hull[hull.length] to hull[0]
	//     	continue;
	//     }
	// }

	for (i = 0; i < points.length; i++) {
		hull.append(points[i])
		while (hull.length > 1 && ccw(hull[hull.length - 2], hull[hull.length - 1], p)) {
			hull.pop();
		}

		
	}

	hull.forEach(el => point_html.get(el).className = "point-hull");
	ConnectHull();
	isRunning = false;

}



