import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer  } from 'recharts';
import './worldStats.view.scss';

export const WorldStatsView = ( props ) => {
    const { globalData = {} , title } = props;
    const [ activeIndex, setActiveIndex ] = useState( 0 );

    const { TotalConfirmed, TotalRecovered, TotalDeaths } = globalData;
    const activeCases = TotalConfirmed - ( TotalRecovered + TotalDeaths );

    const chartData = [ 
        { 'name': 'Active', value: activeCases, fill: '#3273cf' },
        { 'name': 'Recovered', value: TotalRecovered, fill: '#6aa25b' },
        { 'name': 'Deaths', value: TotalDeaths, fill: '#b74d3d' }
     ]

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
          cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload,
          fill, percent, value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
      
        return (
            <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 6}
              outerRadius={outerRadius + 10}
              fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${chartData[activeIndex].name} ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
              {`${(percent * 100).toFixed(2)}%`}
            </text>
          </g>
        );
    };

    const onPieEnter = (data, index) => {
        setActiveIndex( index );
    };

    return(
        <div className = { 'ui-world-stats-view' } >
            <div className='ui-world-stats-view__main'>
                <div className = { 'ui-world-stats-view__title' } > { title } </div>
                <div className = { 'ui-world-stats-view__total-patients' }>
                    <p className = 'ui-world-stats-view__total-patients__title'> Total Patients </p>
                    <p className = 'ui-world-stats-view__total-patients__value'> { `${TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` } </p>
                </div>
                <div className = { 'ui-world-stats-view__stats-container' }>
                    <div className = { 'ui-world-stats-view__stats-container__table' }>
                        
                        <div className = { 'ui-world-stats-view__stats-container__table__item ui-world-stats-view__stats-container__table__total-active' }>
                            <div className = 'ui-world-stats-view__stats-container__table__total-active__box'></div>
                            <span> Active </span>
                        </div>
                        
                        <div className = { 'ui-world-stats-view__stats-container__table__item ui-world-stats-view__stats-container__table__total-recovered' }>
                            <div className = { 'ui-world-stats-view__stats-container__table__total-recovered__box' }></div>
                            <span> Recovered </span>
                        </div>

                        <div className = { 'ui-world-stats-view__stats-container__table__item ui-world-stats-view__stats-container__table__total-deaths' }>
                            <div className = { 'ui-world-stats-view__stats-container__table__total-deaths__box' }></div>
                            <span> Deaths </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className = { 'ui-world-stats-view__graph' }>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart height={250}>
                    <Pie
                        activeShape={renderActiveShape}
                        activeIndex={activeIndex}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius = { 80 }
                        outerRadius={150}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );  
};
