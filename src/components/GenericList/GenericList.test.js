import React from 'react';
import renderer from 'react-test-renderer';
import GenerictList from './GenericList';

describe('GenerictList Component', () => {
    it('Rendered', () =>{
        const listComponent = renderer.create(
            <GenerictList />
        )
    })
})