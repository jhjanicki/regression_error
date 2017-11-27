
 
d3.custom.scatterplotsea = function module() {
	var margin = {top: 30, right: 30, bottom: 100, left: 40},
    	width = 400,
    	height = 350,
    	xValue ='IslandArea',
    	yValue='Taxonomic',
    	xLabel='Area',
    	yLabel = 'Taxonomic Diversity',
    	_index = 0,
    	xlog='log'
    	landsea='Sea';
    

    
    
    	var svg;
    
    	function exports(_selection) {
			_selection.each(function(_data) {
		
			var x;
			var xAxis;
		
				if(xlog=='log'){
				
					 x = d3.scale.log()
					.range([0, width]);
					
					xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.ticks(10, ",.1s")
    				.tickSize(6, 0);
    				
    				x.domain([350000,1300000000]);
    				
				}else{
					 x = d3.scale.linear()
					.range([0, width]);
					
					xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.ticks(10, ",1s")
    				.tickSize(6, 0);
    				
    				x.domain([1900,6400]);
				}

				var y = d3.scale.linear()
					.range([height, 0]);


					// .tickFormat(function (d) {
// 						return x.tickFormat(4,d3.format(",d"))(d)
// 					});
					
					

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left");

			

		
				if (!svg) {
					 svg = d3.select(this).append('svg');
					 var container = svg.append('g').classed('container-group'+_index, true);

				}
			
				svg.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom);
			
				container
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					
				  // x.domain(d3.extent(_data, function(d) { return d[xValue]; }));
// 				  
// 				  console.log(x.domain());
				  
				  // console.log(x.domain());
				  
				  if(yValue == 'Phylogenetic' && landsea == 'Sea'){
				  
				  	y.domain([60,150]);
				  
				  }else if(yValue == 'Taxonomic' && landsea == 'Sea'){
				  	y.domain([0,60]);
				  }else{
				  
				  	y.domain(d3.extent(_data, function(d) { return d[yValue]; })).nice();
				  }
				

				   //x-axis labels
				  container.append("g")
					  .attr("class", "x axis")
					  .attr("transform", "translate(0," + height + ")")
					  .call(xAxis)
					  .selectAll("text")	
							.style("text-anchor", "end")
							.attr("dx", "-.8em")
							.attr("dy", ".15em")
							.attr("transform", function(d) {
								return "rotate(-65)" 
							});
   
				   //x-axis title label
					container.append("g")
					  .attr("class", "x axis")
					  .attr("transform", "translate(-5," + height + ")")
					  .append("text")
					  .attr("class", "label")
					  .attr("x", width)
					  .attr("y", -6)
					  .style("text-anchor", "end")
					  .text(xLabel);

				 //y-axis title label
				  container.append("g")
					  .attr("class", "y axis")
					  .call(yAxis)
					  .append("text")
					  .attr("class", "label")
					  .attr("transform", "rotate(-90)")
					  .attr("y", 6)
					  .attr("dy", ".71em")
					  .style("text-anchor", "end")
					  .text(yLabel);
				  
					
					// draw 5 trophic groups, 5 groups of dots
					
					//vert, omni, invert
					 
					
	  
	  				//sea
	  				var insectivore = _data.filter(function(d){
						return d.Trophic == 'Invert' && d.LandSea == landsea;
					});
					

				  container.selectAll(".dot2"+_index)
					  .data(insectivore)
					  .enter().append("path")
      				  .attr("d", d3.svg.symbol().type("triangle-up"))
					  .attr("class", "dot")
					  .attr("transform", function(d){ return "translate(" + x(d[xValue]) + "," +y(d[yValue]) + ")"})
					  .style("fill", '#56B4E9')
					  .style("opacity",0.9);
	  

	  				//sea
	  				var omnivore = _data.filter(function(d){
						return d.Trophic == 'Omni' && d.LandSea == landsea;
					});
	  				
					container.selectAll(".dot3"+_index)
					  .data(omnivore)
					  .enter().append("path")
      				  .attr("d", d3.svg.symbol().type("cross"))
					  .attr("class", "dot")
					  .attr("transform", function(d){ return "translate(" + x(d[xValue]) + "," +y(d[yValue]) + ")"})
					  .style("fill", '#009E73')
					  .style("opacity",0.9);
					  
					  
					  
					  
					  	
					  
					//sea
					 var carnivore = _data.filter(function(d){
						return d.Trophic == 'Vert' && d.LandSea == landsea;
					 }); 
					 
					  container.selectAll(".dot5"+_index)
					  .data(carnivore)
					  .enter().append("path").attr("d", d3.svg.symbol().type("diamond"))
					  .attr("class", "dot")
					  .attr("transform", function(d){ return "translate(" + x(d[xValue]) + "," +y(d[yValue]) + ")"})
					  .style("fill", '#F0E442')
					  .style("opacity",0.9);
					  

						
					var xSeries_I = insectivore.map(function(d){
								return d[xValue]});			
 					var xSeries_O = omnivore.map(function(d){
								return d[xValue]});

					var xSeries_C = carnivore.map(function(d){
								return d[xValue]});
								
								
					
// 					
					// could be tax, phy or func, depending on what you pass in for the y value  
// 					//get the x and y values for least squares
					var ySeries_I = insectivore.map(function(d) { return d[yValue] });
					var ySeries_O = omnivore.map(function(d) { return d[yValue] });
					var ySeries_C = carnivore.map(function(d) { return d[yValue] });

					var dataArray_I=[];
					var dataArray_O=[];
					var dataArray_C=[];
 		
					for (var i=0;i<xSeries_I.length;i++){
		
						
						var indvArray_I = [];
						indvArray_I.push(xSeries_I[i],ySeries_I[i]);
						dataArray_I.push(indvArray_I);
						
						var indvArray_O = [];
						indvArray_O.push(xSeries_O[i],ySeries_O[i]);
						dataArray_O.push(indvArray_O);
						
						
						
						var indvArray_C = [];
						indvArray_C.push(xSeries_C[i],ySeries_C[i]);
						dataArray_C.push(indvArray_C);
						
					}

				

					var result_I = regression('linear', dataArray_I);
					var slope_I = result_I.equation[0];
					var yIntercept_I = result_I.equation[1];
					

					var result_O = regression('linear', dataArray_O);
					var slope_O = result_O.equation[0];
					var yIntercept_O = result_O.equation[1];	
					
					
					var result_C = regression('linear', dataArray_C);
					var slope_C = result_C.equation[0];
					var yIntercept_C = result_C.equation[1];
// 		
// 					
// 		
// 					// apply the reults of the least squares regression
// 		

					
					var x1_I = d3.min(xSeries_I);
					var y1_I = slope_I*x1_I+ yIntercept_I;
					var x2_I = d3.max(xSeries_I);
					var y2_I= slope_I*x2_I + yIntercept_I;
					var trendData_I= [[x1_I,y1_I,x2_I,y2_I]];
					
					var x1_O = d3.min(xSeries_O);
					var y1_O = slope_O*x1_O+ yIntercept_O;
					var x2_O = d3.max(xSeries_O);
					var y2_O= slope_O*x2_O + yIntercept_O;
					var trendData_O= [[x1_O,y1_O,x2_O,y2_O]];

					
					var x1_C = d3.min(xSeries_C);
					var y1_C = slope_C*x1_C+ yIntercept_C;
					var x2_C = d3.max(xSeries_C);
					var y2_C= slope_C*x2_C + yIntercept_C;
					var trendData_C= [[x1_C,y1_C,x2_C,y2_C]];


					var trendline_I=container.selectAll(".trendline2"+_index)
						.data(trendData_I);
			
				    var trendline_O= container.selectAll(".trendline3"+_index)
						.data(trendData_O);
					
					var trendline_C= container.selectAll(".trendline5"+_index)
						.data(trendData_C);
 			
// 		
					trendline_I.enter()
						.append("line")
						.attr("class", "trendline")
						.attr("x1", function(d) { return x(d[0]); })
						.attr("y1", function(d) { return y(d[1]); })
						.attr("x2", function(d) { return x(d[2]); })
						.attr("y2", function(d) { return y(d[3]); })
						.attr("stroke", "#56B4E9")
						.attr("stroke-width", 1);
			
					trendline_O.enter()
						.append("line")
						.attr("class", "trendline")
						.attr("x1", function(d) { return x(d[0]); })
						.attr("y1", function(d) { return y(d[1]); })
						.attr("x2", function(d) { return x(d[2]); })
						.attr("y2", function(d) { return y(d[3]); })
						.attr("stroke", "#009E73")
						.attr("stroke-width", 1);
	
						
					trendline_C.enter()
						.append("line")
						.attr("class", "trendline")
						.attr("x1", function(d) { return x(d[0]); })
						.attr("y1", function(d) { return y(d[1]); })
						.attr("x2", function(d) { return x(d[2]); })
						.attr("y2", function(d) { return y(d[3]); })
						.attr("stroke", "#F0E442")
						.attr("stroke-width", 1);
// 					  
					  
					  
					  

			})
	
		}
		
		exports.xValue = function(value) {
			if (!arguments.length) return xValue;
			xValue = value;
			return this;
		}
		
	
		exports.yValue = function(value) {
			if (!arguments.length) return yValue;
			yValue = value;
			return this;
		}
		
		exports.y2Value = function(value) {
			if (!arguments.length) return y2Value;
			y2Value = value;
			return this;
		}
		
		exports.y3Value = function(value) {
			if (!arguments.length) return y3Value;
			y3Value = value;
			return this;
		}
		
		exports.xLabel = function(value) {
			if (!arguments.length) return xLabel;
			xLabel = value;
			return this;
		}
		
		exports.yLabel = function(value) {
			if (!arguments.length) return yLabel;
			yLabel = value;
			return this;
		}
		
		exports.y2Label = function(value) {
			if (!arguments.length) return y2Label;
			y2Label = value;
			return this;
		}
	
	
		exports._index = function(value) {
			if (!arguments.length) return _index;
			_index = value;
			return this;
		}
		
		exports.xlog = function(value) {
			if (!arguments.length) return xlog;
			xlog = value;
			return this;
		}
		
		exports.landsea = function(value) {
			if (!arguments.length) return landsea;
			landsea = value;
			return this;
		}
	
	
		return exports;

}








  




  

	


