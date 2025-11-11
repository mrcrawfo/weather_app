import { useEffect } from "react";
import Highcharts from "highcharts";

export const ComparisonGraph = ({ primaryForecastHourly, secondaryForecastHourly, primaryForecastCity, primaryForecastState, secondaryForecastCity, secondaryForecastState }: { primaryForecastHourly: any, secondaryForecastHourly: any, primaryForecastCity: string, primaryForecastState: string, secondaryForecastCity: string, secondaryForecastState: string }) => {
    useEffect(() => {
        Highcharts.chart({
            chart: {
                renderTo: 'comparison-graph',
                type: 'line'
            },
            title: {
                text: '72-Hour Temperature Comparison'
            },
            xAxis: {
                categories: primaryForecastHourly.properties.periods.slice(0, 72).map((period: any) => {
                    const date = new Date(period.startTime);
                    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:00${date.getHours() < 12 ? 'am' : 'pm'}`;
                }),
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'Temperature (°F)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                type: 'line',
                name: `${primaryForecastCity}, ${primaryForecastState}`,
                data: primaryForecastHourly.properties.periods.slice(0, 72).map((period: any) => period.temperature)
            }, {
                type: 'line',
                name: `${secondaryForecastCity}, ${secondaryForecastState}`,
                data: secondaryForecastHourly.properties.periods.slice(0, 72).map((period: any) => period.temperature)
            }]
        });
    }, [primaryForecastHourly, secondaryForecastHourly]);

    return (
        <div id='comparison-graph' className="w-full h-96 flex items-center justify-center border border-gray-300 rounded-md mt-4" />
    );
};

export default ComparisonGraph;
