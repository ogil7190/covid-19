import React from 'react';
import './genericTableWithSearch.view.scss';
import { TableView } from '../../generic/table';
import { isEmpty } from 'lodash';
import { FaChevronCircleRight, FaChevronCircleLeft, FaSearch, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { InputField } from '../../generic/inputField';

export const genericTableWithSearch = ( props ) => {
    const { handleSearch, handleShowNextPage, handleShowPreviousPage, handleShowFirstPage, handleShowLastPage,  currentIndex, pagesCount, countries } = props;

    return (
        <div className = 'ui-generic-table-with-search-container'>
            <h1 className = 'ui-generic-table-with-search-container__heading'>
                {'Country wise Statistics'}
            </h1>

            <InputField
                type='text'
                placeholder="Enter name of Country"
                iconPosition = 'left'
                onChange={ ( value ) => handleSearch( value ) }
                icon={FaSearch}
                renderIcon = { () => <FaSearch size={15} color='gray' /> }>
            </InputField>

            <TableView {...props} />
            {
                !isEmpty( countries ) && pagesCount > 1 &&
                <div className = { 'ui-generic-table-with-search-container__navigation' }>
                {
                    currentIndex !==0 && 
                    <>
                        <div className = { 'ui-generic-table-with-search-container__navigation__leftmost-arrow'} onClick = { handleShowFirstPage }>
                            <FaAngleDoubleLeft size = { 20 } />
                        </div>
                        
                        <div className = { 'ui-generic-table-with-search-container__navigation__left-arrow'} onClick = { handleShowPreviousPage }>
                            <FaChevronCircleLeft size = { 20 } />
                        </div>
                    </>
                }
                <p className = 'ui-generic-table-with-search-container__navigation__page-number' > { `${currentIndex + 1} of ${pagesCount} pages` }</p>
                {
                    currentIndex !== pagesCount - 1 &&
                    <>
                        <div className = { 'ui-generic-table-with-search-container__navigation__right-arrow'} onClick = { handleShowNextPage }>
                            <FaChevronCircleRight size = { 20 } />
                        </div>
                        
                        <div className = { 'ui-generic-table-with-search-container__navigation__rightmost-arrow'} onClick = { handleShowLastPage }>
                            <FaAngleDoubleRight size = { 20 } />
                        </div>
                    </>
                }
                </div>
            }
        </div>
    );
}