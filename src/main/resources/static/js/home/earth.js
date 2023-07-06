var cnt = 0;
var current = d3.select('#current')

/** 국가 조회 */
function loadData(cb){
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json', function(data){
        /** 국가 이름 한글 조회 */
        d3.tsv('/other/tsv/world-country-names.tsv', function(error, a) {
            if (error) throw error
            cb(data, a)
        })

        if(cnt == 0){
            countries = topojson.feature(data, data.objects.countries)
            cnt++;
            setGpath();
        }
    });
}

/** svg 태그로 그리기 */
function setGpath(){
    let width = d3.select("body").node().getBoundingClientRect().width - 17
    let height = 900
    const sensitivity = 75

    let projection = d3.geoOrthographic()
        .scale(10)
        .center([0, 0])
        .rotate([-128,-38])
        .translate([width / 2, height / 2])

    const initialScale = projection.scale()
    let path = d3.geoPath().projection(projection)

    let svg = d3.select("#content")
        .append("svg")
        .attr("width", width)
        .attr("height", d3.select("body").node().getBoundingClientRect().height- 17)
        // .style("height", "100vh")


    let globe = svg.append("circle")
        .attr("fill", "#3579bd")
        .attr("stroke", "#000")
        .attr("stroke-width", "0.2")
        .attr("cx", width/2)
        .attr("cy", height/2)
        .attr("r", initialScale)

    svg.call(d3.drag().on('drag', () => {
        const rotate = projection.rotate()
        const k = sensitivity / projection.scale()
        projection.rotate([
            rotate[0] + d3.event.dx * k,
            rotate[1] - d3.event.dy * k
        ])
        path = d3.geoPath().projection(projection)
        svg.selectAll("path").attr("d", path)
    })).call(d3.zoom()
        .scaleExtent([0, 300])
        .on('zoom', () => {
        if(d3.event.transform.k > 0.3) {
            projection.scale(initialScale * d3.event.transform.k)
            path = d3.geoPath().projection(projection)
            svg.selectAll("path").attr("d", path)
            globe.attr("r", projection.scale())
        }
        else {
            d3.event.transform.k = 0.3
        }
    }))
    .on("dblclick.zoom", null)

    let map = svg.append("g")
    let data = countries
    map.append("g")
        .attr("class", "countries" )
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", d => "country_" + d.properties.name.replace(" ","_"))
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", "white")
        .style('stroke', 'black')
        .style('stroke-width', 0.3)
        // .style("opacity",0.8)
        // .on("mouseover", function (d) {
        //     enter(d)
        // })
        .on("dblclick",function(d) {

            projection.scale(3000)
            path = d3.geoPath().projection(projection)
            const bounds = path.bounds(d3.select(this));
            console.log(bounds);
            svg.selectAll("path").transition().duration(2000).attr("d", path)
            globe.transition().duration(2000).attr("r", projection.scale())
            d3.select("body").transition().duration(1500).style("opacity", 0)
            // setTimeout(() => location.href = "/map/" + d.properties.name.replaceAll(" ", "_").toLowerCase(), 1500);
        })
        .append('title')
        .text(d => d.properties.name)


    // document.getElementById("pic").style.width = "100%";
    // document.getElementById("pic").style.height = height + "px";

    /** 자동 회전 */
    // d3.timer(function(elapsed) {
    // 	const rotate = projection.rotate()
    // 	const k = sensitivity / projection.scale()
    // 	projection.rotate([
    // 		rotate[0] - 1 * k,
    // 		rotate[1]
    // 	])
    // 	path = d3.geoPath().projection(projection)
    // 	svg.selectAll("path").attr("d", path)
    // },200)
}

/** 국가 조회 */
loadData(function(world, cList) {
    countries = topojson.feature(world, world.objects.countries)
    countryList = cList
})

/** 나라이름 출력 */
// function enter(country) {
//     var country = countryList.find(function(c) {
//         return parseInt(c.id, 10) === parseInt(country.id, 10)
//     })
//     current.text(country && country.name || '')
// }