import React from 'react';
import axios from 'axios';
import { Card } from '../../views/generic/card';
import { GenericTableWithSearch } from '../genericTableWithSearch';
import { WorldStatsView } from '../../views/layouts/worldStats';
import { get } from 'lodash';
import './coronaTracker.scss';
export class coronaTracker extends React.Component {

    constructor( props ) {
        super( props );

        this.apiData = {}; // api response

        this.state = {
            haveError: false, // if error encountered
            erroMessage: '', // error mssg to show
            isLoading: true // is loading or not
        }
    }

    // *******************************
    // Simulate sleep action 
    // *******************************
    sleep( ms ) {
        return new Promise( ( resolve ) => {
            setTimeout( () => {
                resolve();
            }, ms );
        });
    }

    async componentDidMount() {
        const apiUrl = 'https://api.covid19api.com/summary';

        try {
            await this.sleep( 1000 );
            const response = await axios.get( apiUrl );
            
            console.debug( 'Network Response', response.data );
            
            this.apiData = response.data;

            this.setState( {
                isLoading: false
            } );

        } catch ( error ){
            console.error( 'Network Request Failed', error );
            this.setState( {
                haveError: true,
                erroMessage: 'Network Request Failed :(',
                isLoading: false
            } );
        }
    }

    handleLoadingOrError( isLoading, haveError, erroMessage ) {
        if( isLoading ) {
            return <div className='ui-corona-tracker--loading' />
        }
        
        if( haveError ) {
            return(
                <div className='ui-corona-tracker__error'>
                    <span> { erroMessage }</span>
                </div>
            );
        }
    }

    render() {
        const { isLoading, haveError, erroMessage } = this.state;

        const globalData = get( this.apiData, 'Global', {} );
        const countries = get( this.apiData, 'Countries', {} );

        return(
            <div className = 'ui-corona-tracker'>
                {
                    isLoading || haveError
                    ? this.handleLoadingOrError( isLoading, haveError, erroMessage )
                    :
                    <>
                        <Card widthInPercent = { 80 }>
                            <WorldStatsView
                                globalData = { globalData }
                                title = { 'World Covid-19 Tracks' }
                            />
                        </Card>
                        
                        <Card widthInPercent = { 80 }>
                            <GenericTableWithSearch
                                countries = { countries }
                                rowCount = { 10 }
                            />
                        </Card>
                    </>
                }
            </div>
        );
    }

}