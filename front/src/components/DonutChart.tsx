import ApexCharts from "apexcharts";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface CartChart {
    sum: number;
    max: number;
    min: number;
}


const DonutChart = () => {

    const chartRef = useState<CartChart>({ sum: 0, max: 0, min: 0 });
    const [chartData, setChartData] = useState([]);
    useEffect(() => {

        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cart/chartData/${localStorage.getItem('userId')}`);
                setChartData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCart();
    }, []);

    useEffect(() => {

        if (chartData && chartRef.current) {
            
            const options = {
                chart: {
                    type: 'donut',
                    height: '200px',
                    margin: {
                        top: '10px', 
                    },
                    position: 'fixed'
                },
                series: [chartData.sum, chartData.min, chartData.max],
                labels: ['Total: $ ' , 'Min: $ ' , 'Max: $' ], dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    position: "bottom"
                },
                colors: ['#776B5D', '#EBE3D5', '#B0A695']
            };

            const chart = new ApexCharts(chartRef.current, options);
            chart.render();
        }
    }, [chartData]);

    return <div id="donut-chart" className="absolute bottom-24 " ref={chartRef} />;
};

export default DonutChart
