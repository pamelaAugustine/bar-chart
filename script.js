document.addEventListener('DOMContentLoaded', function () {

    fetch('GDP-data.json')
        .then(response => response.json())
        .then(data => {

            let dataset = data.data
            console.log(dataset)

            let myDataSet = dataset.map((item) => {
                return {
                    date: Date.parse(item[0]),
                    gdp: item[1]
                }
            })
console.log(myDataSet);
            const w = 1000;
            const h = 500;

            let dateMin = d3.min(myDataSet, (d) => d.date);
            let dateMax = d3.max(myDataSet, (d) => d.date);

            let formatTime = d3.timeFormat("%B %d, %Y");
            
            let margin = {
                top: 40, right: 20, bottom: 50, left: 120
            };

            const innerWidth = w - margin.left - margin.right;
            const innerHeight = h - margin.top - margin.bottom;

            let gdpMax = d3.max(myDataSet, (d) => d.gdp);

            const svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            const xScale = d3.scaleTime()
                .domain([new Date(dateMin), new Date(dateMax)])
                .range([0, innerWidth]);

            const xAxis = d3.axisBottom(xScale);
            const xAxisLabel = 'Years';
            

            const yScale = d3.scaleLinear()
                .domain([0, gdpMax])
                .range([innerHeight, margin.bottom]);

            const yAxis = d3.axisLeft(yScale);
            const yAxisLabel = 'Gross Domestic Product';

            const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const yAxisG = g.append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('class', 'y-axis');

            const xAxisG = g.append('g')
                .call(xAxis)
                .attr('transform', `translate(0, ${innerHeight})`)
                .attr('id', 'x-axis');

            g.selectAll("rect")
                .data(myDataSet)
                .enter()
                .append('rect')
                .attr('x', d => xScale(d.date))
                .attr("y", d => yScale(d.gdp))
                .attr("width", d => innerWidth / myDataSet.length)
                .attr('height', d => innerHeight - yScale(d.gdp))
                .attr("fill", "magenta")
                .attr('class', 'bar')
                .append('title')
                .text((d) => d.gdp + ' - ' + formatTime(new Date(d.date)));
             

            g.append('text')
                .attr('x', 300)
                .text('United States GDP')
                .attr('id', 'title');

            xAxisG.append('text')
                .attr('class', 'axis-label')
                .attr('y', 50)
                .attr('x', innerWidth / 2)
                .attr('fill', 'black')
                .text(xAxisLabel);

            yAxisG.append('text')
                .attr('id', 'yAxisLabel')
                .attr('transform', 'rotate (-90, 45, 20) translate(0)')
                .attr('fill', 'black')
                .text(yAxisLabel);


        })



       


});
