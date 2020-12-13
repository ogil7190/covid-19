import React from 'react';
import './table.view.scss';
import { isEmpty, map } from 'lodash';

export const TableView = ( props ) => {
    const { countries = [] } = props;
    
    const columns = [ 'Country', 'TotalConfirmed', 'TotalRecovered', 'TotalDeaths']
    const columnsHeader = [ 'Country', 'Total Confirmed', 'Total Recovered', 'Total Deaths']

    if( isEmpty( countries ) ) {
        return <span> No Country Found</span>
    } else {
        return (
            <div className = 'ui-table'>
                <div className = 'ui-table__head'> 
                {
                    map( columnsHeader, ( column, index ) => {
                            return (
                                <div className = 'ui-table__head__cell'>{ column } </div>
                        );
                    } )
                }
                </div>
                <div className = 'ui-table__body'> 
                {
                    map( countries, ( country, index ) => {
                        return (
                            <div className = 'ui-table__body__row'> 
                            {
                                columns.map( ( column, index ) => {
                                    return (
                                    <div className = 'ui-table__body__row__cell'> { country[ column ] }</div>
                                );
                            } )
                            }
                            </div>
                        );
                        
                    })
                }
                </div>
            </div>
        )
    }
};
