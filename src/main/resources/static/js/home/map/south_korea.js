var cnt = 0;
var current = d3.select('#current')
var geojson = "";
/** 한국 데이터 조회 */
function loadData(){
    d3.json('/json/administrative.geojson', function(data){
        console.log(data)
        if(cnt == 0){
            geojson = data
            cnt++;
            setKoreaMap();
        }
    });
}

/** svg 태그로 그리기 */
function setKoreaMap(){
    // 지도정보
    const mapData = geojson;
    // 지도의 중심점 찾기
    const center = d3.geoCentroid(mapData);

    // 현재의 브라우저의 크기 계산
    let width = d3.select("#earth_tb_dv").node().getBoundingClientRect().width
    let height = 832

    // 지도를 그리기 위한 svg 생성
    let svg = d3.select('#earth_tb_dv')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let background = svg.append('rect')
        .attr('class', 'background')
        .attr('width', width)
        .attr('height', height)
        .attr("fill", "#3579bd")

    // 지도가 그려지는 그래픽 노드(g) 생성
    const g = svg.append('g');

    // 지도가 그려지는 그래픽 노드
    const mapLayer = g.append('g').classed('map-layer', true);
    var labels;

    // 지도의 출력 방법을 선택(메로카토르)
    let projection = d3.geoMercator()
        .scale(1)
        .translate([0, 0]);

    // svg 그림의 크기에 따라 출력될 지도의 크기를 다시 계산
    const path = d3.geoPath().projection(projection);
    const bounds = path.bounds(geojson);
    const widthScale = (bounds[1][0] - bounds[0][0]) / width;
    const heightScale = (bounds[1][1] - bounds[0][1]) / height;
    const scale = 0.95 / Math.max(widthScale, heightScale);
    const xoffset = width/2 - scale * (bounds[1][0] + bounds[0][0]) /2 + 0;
    const yoffset = height/2 - scale * (bounds[1][1] + bounds[0][1])/2 + 0;
    const offset = [xoffset, yoffset];
    projection.scale(scale).translate(offset);

    mapLayer.selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .attr("fill", "white")
        .attr("stroke", "#000")
        .on("mouseover", function (d) {
            current.text(d.properties.name);
            this.classList.add('dosi_over');
        })
        .on("mouseout", function (d) {
            this.classList.remove('dosi_over');
        })
        .attr('class', function(d) {
            return 'dosi label-' + d.properties.name_eng;
        })
        .append('title')
        .text(d => d.properties.name)

    mapLayer.selectAll('text')
        .data(geojson.features) //라벨표시
        .enter()
        .append('text')
        .attr("class", function(d) {
            if(d.properties.code == 11 || d.properties.code == 23 || d.properties.code == 22
                || d.properties.code == 26 || d.properties.code == 21 || d.properties.code == 24
                || d.properties.code == 25 || d.properties.code == 29 || d.properties.code == 39){
                return "labelText";
            }else if(d.properties.code == 32 || d.properties.code == 37 || d.properties.code == 38
                || d.properties.code == 35 || d.properties.code == 36){
                return "labelTextFont";
            }else if(d.properties.code == 33 || d.properties.code == 34 || d.properties.code == 31){
                return "labelTextFont20";
            }
        })
        .on("mouseover", function (d) {
            mapLayer.select('text').classed("dosi_over", true);
            mapLayer.select(".label-" + d.properties.name_eng).classed("dosi_over", true);
        })
        .on("mouseout", function (d) {
            mapLayer.select('text').classed("dosi_over", false);
            mapLayer.select(".label-" + d.properties.name_eng).classed("dosi_over", false);
        })
        .attr('transform', translateTolabel)
        .attr('id', function(d) {
            return 'label-' + d.properties.name_eng;
        })
        .attr('text-anchor', 'middle')
        .attr('dy', function(d){
            if(d.properties.code == 33){
                return '-1em';
            }else if(d.properties.code == 31){
                return '2.8em';
            }else if(d.properties.code == 34){
                return '-1.35em';
            }else{
                return '.35em';
            }
        })
        .text(function(d) {
            return d.properties.name;
        });


    //텍스트 위치 조절 - 하드코딩으로 위치 조절을 했습니다.
    function translateTolabel(d) {
        var arr = path.centroid(d);
        return 'translate(' + arr + ')';
    }
}

/** 행정구역 조회 */
loadData();