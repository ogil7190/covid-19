import React from 'react';
import { get, chunk, size, forEach, toLower, includes, trim } from 'lodash';
import { genericTableWithSearch as GenericTableWithSearchView } from '../../views/layouts/genericTableWithSearch';
export class GenericTableWithSearch extends React.Component {

    constructor( props ) {
        super( props );
        
        this.__bind();

        const { pages, pagesCount, countries } = this.selectedCountries( '', 0 )
        
        this.state = {
            searchQuery: '',
            currentIndex: 0,
            pages,
            pagesCount,
            countries
        };
    }

    __bind() {
        this.handleSearch = this.handleSearch.bind( this );
        this.selectedCountries  = this.selectedCountries.bind( this );
        this.handleShowNextPage = this.handleShowNextPage.bind( this );
        this.handleShowLastPage = this.handleShowLastPage.bind( this );
        this.handleShowFirstPage = this.handleShowFirstPage.bind( this );
        this.handleShowPreviousPage = this.handleShowPreviousPage.bind( this );
    }

    handleSearch( value ) {
        const searchQuery = trim( value );
        
        if( this.state.searchQuery !== searchQuery ) {
            const { countries, pagesCount } = this.selectedCountries( searchQuery, 0 );
            
            this.setState({
                searchQuery: searchQuery,
                currentIndex: 0,
                countries: countries,
                pagesCount
            });
        }
    }

    handleShowNextPage() {
        if( this.state.currentIndex !== this.state.pagesCount ) {
            const { countries, pages, pagesCount } = this.selectedCountries( this.state.searchQuery , this.state.currentIndex + 1 );

            this.setState({
                currentIndex: this.state.currentIndex + 1,
                countries: countries,
                pagesCount,
                pages
            });
        }
    }

    handleShowPreviousPage() {
        if( this.state.currentIndex !== 0 ) {
            const { countries, pages, pagesCount } = this.selectedCountries( this.state.searchQuery , this.state.currentIndex - 1 );

            this.setState({
                currentIndex: this.state.currentIndex - 1,
                countries: countries,
                pagesCount,
                pages
            });
        }
    }

    handleShowFirstPage() {
        this.setState( { currentIndex: 0, countries: this.state.pages[ 0 ] } );
    }
    
    handleShowLastPage() {
        this.setState( { currentIndex: this.state.pagesCount - 1, countries: this.state.pages[ this.state.pagesCount - 1 ] } );
    }

    selectedCountries( query = '', currentIndex = 0 ) {
        const countries = get( this.props, 'countries', [] );

        let indexCountries = [];

        forEach( countries, ( country ) => {
            if( includes( toLower( country.Country ), toLower( query ) ) ) {
                indexCountries.push( country );
            }
        } );
        
        indexCountries = chunk( indexCountries,  this.props.rowCount );

        return {
            countries: indexCountries[ currentIndex ],
            pagesCount: size( indexCountries ),
            pages: indexCountries
        };
    }

    render() {
        return(
               <GenericTableWithSearchView
                    { ...this.props }
                    { ...this.state }
                    countries = { this.state.countries }
                    handleSearch = { this.handleSearch }
                    handleShowNextPage = { this.handleShowNextPage }
                    handleShowPreviousPage = { this.handleShowPreviousPage }
                    handleShowFirstPage = { this.handleShowFirstPage }
                    handleShowLastPage = { this.handleShowLastPage }
               />
        );
    }

}

GenericTableWithSearch.defaultProps = {
    rowCount: 10,
    searchQuery: ''
};

